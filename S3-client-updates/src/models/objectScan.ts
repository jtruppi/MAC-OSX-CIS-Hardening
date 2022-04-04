export enum AnalysisType {
  IP_ADDRESS = 'IP_ADDRESS',
  DOMAIN = 'DOMAIN',
  URL = 'URL',
  FILE = 'FILE',
}

export type AnalysisStats = {
  harmless: number
  malicious: number
  suspicious: number
  timeout: number
  undetected: number
}

export enum AnalysisThreatLevel {
  MALICIOUS = 'malicious',
  SUSPICIOUS = 'suspicious',
  SAFE = 'safe',
  UNKNOWN = 'unknown',
}

export enum AnalysisStatus {
  QUEUED = 'queued',
  COMPLETED = 'completed',
  IN_PROGRESS = 'in-progress',
}

export enum EngineResultCategory {
  HARMLESS = 'harmless',
  MALICIOUS = 'malicious',
  SUSPICIOUS = 'suspicious',
  UNDETECTED = 'undetected',
}

export type EngineResult = {
  category: EngineResultCategory
  result: string
  method: string
  engine_name: string
}

export type EngineResults = Record<string, EngineResult>

export type AnalysisAttributes = {
  date: number
  results?: EngineResults
  last_analysis_results?: EngineResults
  stats?: AnalysisStats
  last_analysis_stats?: AnalysisStats
  status: AnalysisStatus
}

export type AnalysisLinks = {
  item: string | null
  self: string | null
}

export type Analysis = {
  id: string;
  type: string;
  attributes: AnalysisAttributes;
  links: AnalysisLinks;
}

export type CheckUrlResult = {
  value: string
  analysis: Analysis | null
  analysisId: string | null
  analysisStatus: AnalysisStatus | null
}

export type CheckUrlsResult = Record<string, CheckUrlResult>

export type CheckDomainResult = {
  value: string
  analysis: Analysis | null
  analysisId: string | null
  analysisStatus: AnalysisStatus | null
}

export type CheckDomainsResult = Record<string, CheckDomainResult>

export type CheckIpAddressResult = {
  value: string
  analysisId: string | null
  analysis: Analysis | null
  analysisStatus: AnalysisStatus | null
}

export type CheckIpAddressesResult = Record<string, CheckIpAddressResult>

export type CheckFileResult = {
  value: string
  analysis: Analysis | null
  analysisId: string | null
  analysisStatus: AnalysisStatus | null
}

export type CheckFilesResult = Record<string, CheckFileResult>
