import axios, { AxiosResponse } from "axios";
import { Analysis, CheckUrlsResult, CheckDomainsResult, CheckIpAddressesResult, CheckFilesResult, AnalysisStats, AnalysisThreatLevel, AnalysisStatus, AnalysisType, CheckIpAddressResult, EngineResults, CheckUrlResult, CheckFileResult, CheckDomainResult } from "../models/objectScan";
import { getApiUrl } from "./utils";

export const sortResults = (analysisType: AnalysisType, result: CheckIpAddressesResult | CheckDomainsResult | CheckFilesResult | CheckUrlsResult): CheckIpAddressResult[] | CheckDomainResult[] | CheckFileResult[] | CheckUrlResult[] => {
  const items = Object.values(result);
  items.sort((el1, el2) => {
    const stats1 = el1.analysis
      ? getStatsForAnalysisType(analysisType, el1.analysis as Analysis)
      : null;
    const stats2 = el2.analysis
      ? getStatsForAnalysisType(analysisType, el2.analysis as Analysis)
      : null;
    const threatLevel1 = stats1
      ? getThreatLevelFromStats(stats1)
      : null;
    const threatLevel2 = stats2
      ? getThreatLevelFromStats(stats2)
      : null;
    if (threatLevel1 === AnalysisThreatLevel.MALICIOUS && threatLevel2 !== AnalysisThreatLevel.MALICIOUS) {
      return -1;
    }
    else if (threatLevel2 === AnalysisThreatLevel.MALICIOUS && threatLevel1 !== AnalysisThreatLevel.MALICIOUS) {
      return 1;
    }
    else if (threatLevel1 === AnalysisThreatLevel.SUSPICIOUS && threatLevel2 !== AnalysisThreatLevel.SUSPICIOUS && threatLevel2 !== AnalysisThreatLevel.MALICIOUS) {
      return -1;
    }
    else if (threatLevel2 === AnalysisThreatLevel.SUSPICIOUS && threatLevel1 !== AnalysisThreatLevel.SUSPICIOUS && threatLevel1 !== AnalysisThreatLevel.MALICIOUS) {
      return 1;
    }
    else {
      return 0;
    }
  });
  return items;
}

type RequestConfig = {
  url: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  data?: any,
}

export const doRequest = (config: RequestConfig) => {
  const nextConfig = {
    ...config,
    url: `${getApiUrl()}/v1${config.url}`,
  }
  return axios(nextConfig);
}

export const fetchAnalysis = async (analysisId: string): Promise<{response: AxiosResponse, analysis: Analysis}> => {
  const config = {
    url: `/analyses/${analysisId}`,
    method: 'get' as const,
  }
  return doRequest(config)
  .then(response => {
    const {analysis} = response.data;
    return {response, analysis};
  })
  .catch((error) => {
    return Promise.reject({error});
  })
}

export const checkUrls = async (urls: string[]): Promise<{response: AxiosResponse, result: CheckUrlsResult}> => {
  const config = {
    url: '/scan-objects',
    method: 'post' as const,
    data: {urls},
  }
  return doRequest(config)
  .then(response => {
    const {result} = response.data;
    return {response, result}
  })
  .catch((error) => {
    return Promise.reject({error});
  })
}

export const checkDomains = async (domains: string[]): Promise<{response: any, result: CheckDomainsResult}> => {
  const config = {
    url: `/scan-objects`,
    method: 'post' as const,
    data: {domains},
  }
  return doRequest(config)
  .then(response => {
    const {result} = response.data;
    return {response, result}
  })
  .catch((error) => {
    return Promise.reject({error});
  })
}

export const checkIpAddresses = async (ips: string[]): Promise<{response?: AxiosResponse, result: CheckIpAddressesResult}> => {
  const config = {
    url: `/scan-objects`,
    method: 'post' as const,
    data: {ips},
  }
  return doRequest(config)
  .then(response => {
    const {result} = response.data;
    return {response, result}
  })
  .catch((error) => {
    return Promise.reject({error});
  })
}

export const checkFile = async (file: File): Promise<{response: AxiosResponse, result: CheckFilesResult}> => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    url: '/scan-files',
    method: 'post' as const,
    data: formData,
  }
  return doRequest(config)
  .then(response => {
    const {result} = response.data;
    const value = file.name || 'File';
    return {response, result: {[value]: result}};
  })
  .catch((error) => {
    return Promise.reject({error});
  })
}

export const getThreatLevelFromStats = (stats: AnalysisStats): AnalysisThreatLevel => {
  const maliciousCount = stats?.malicious;
  const suspiciousCount = stats?.suspicious;
  if (maliciousCount) {
    return AnalysisThreatLevel.MALICIOUS;
  } else if (suspiciousCount) {
    return AnalysisThreatLevel.SUSPICIOUS;
  }
  else {
    return AnalysisThreatLevel.SAFE;
  }
}

export const getIsAnalysisCompleted = (status: AnalysisStatus) => {
  return status === AnalysisStatus.COMPLETED;
}

export const formatThreatLevel = (level: AnalysisThreatLevel | null) => {
  switch(level) {
    case AnalysisThreatLevel.MALICIOUS: return 'Malicious';
    case AnalysisThreatLevel.SUSPICIOUS: return 'Suspicious';
    case AnalysisThreatLevel.SAFE: return 'Safe';
    default: return 'Unknown';
  }
}

export const getStatsForAnalysisType = (analysisType: AnalysisType, analysis: Analysis): AnalysisStats => {
  if ([AnalysisType.DOMAIN, AnalysisType.IP_ADDRESS].includes(analysisType)) {
    return analysis.attributes.last_analysis_stats as AnalysisStats;
  }
  else {
    return analysis.attributes.stats as AnalysisStats;
  }
}

export const getEngineResultsForAnalysisType = (analysisType: AnalysisType, analysis: Analysis): EngineResults => {
  if ([AnalysisType.DOMAIN, AnalysisType.IP_ADDRESS].includes(analysisType)) {
    return analysis.attributes.last_analysis_results as EngineResults;
  }
  else {
    return analysis.attributes.results as EngineResults;
  }
}
