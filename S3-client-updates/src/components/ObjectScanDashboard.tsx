import React, { useState } from 'react';
import '../scss/ObjectScanDashboard.scss';
import Shell from './Shell';
import SearchBox from './SearchBox';
import { Analysis, AnalysisType, CheckDomainsResult, CheckFilesResult, CheckIpAddressesResult, CheckUrlsResult } from '../models/objectScan';
import AnalysisCard from './AnalysisCard';
import { sortResults } from '../lib/objectScan';

type Props = {};

const FileCheckerDashboard: React.FC<Props> = (props) => {
  const [searchType, setSearchType] = useState(AnalysisType.IP_ADDRESS);
  const [checkFilesResult, setCheckFilesResult] = useState<CheckFilesResult | null>(null);
  const [checkIpAddressesResult, setCheckIpAddressesResult] = useState<CheckIpAddressesResult | null>(null);
  const [checkUrlsResult, setCheckUrlsResult] = useState<CheckUrlsResult | null>(null);
  const [checkDomainsResult, setCheckDomainsResult] = useState<CheckDomainsResult | null>(null);
  const [loading, setLoading] = useState(false);

  const clearAllResults = () => {
    setCheckFilesResult(null)
    setCheckIpAddressesResult(null)
    setCheckUrlsResult(null)
    setCheckDomainsResult(null)
  }

  const handleUpdateSearchType = (nextSearchType: AnalysisType) => {
    if (nextSearchType !== searchType) {
      clearAllResults();
    }
    setSearchType(nextSearchType);
  }

  // TODO: clean and DRY up state handling
  const setAnalysis = (analysisType: AnalysisType, analysis: Analysis) => {
    if (analysisType === AnalysisType.DOMAIN && checkDomainsResult && checkDomainsResult[analysis.id]) {
      const current = checkDomainsResult[analysis.id];
      const next = {
        ...current,
        analysis,
      }
      setCheckDomainsResult(prevState => {
        return {
          ...prevState,
          [analysis.id]: next,
        }
      });
    }
    else if (analysisType === AnalysisType.IP_ADDRESS && checkIpAddressesResult && checkIpAddressesResult[analysis.id]) {
      const current = checkIpAddressesResult[analysis.id];
      const next = {
        ...current,
        analysis,
      }
      setCheckIpAddressesResult(prevState => {
        return {
          ...prevState,
          [analysis.id]: next,
        }
      });
    }
    else if (analysisType === AnalysisType.URL && checkUrlsResult && checkUrlsResult[analysis.id]) {
      const current = checkUrlsResult[analysis.id];
      const next = {
        ...current,
        analysis,
      }
      setCheckUrlsResult(prevState => {
        return {
          ...prevState,
          [analysis.id]: next,
        }
      });
    }
    else if (analysisType === AnalysisType.FILE && checkFilesResult && checkFilesResult[analysis.id]) {
      const current = checkFilesResult[analysis.id];
      const next = {
        ...current,
        analysis,
      }
      setCheckFilesResult(prevState => {
        return {
          ...prevState,
          [analysis.id]: next,
        }
      });
    }
  }

  const sortedIpResults = checkIpAddressesResult
    ? sortResults(AnalysisType.IP_ADDRESS, checkIpAddressesResult)
    : [];

  const sortedDomainResults = checkDomainsResult
    ? sortResults(AnalysisType.DOMAIN, checkDomainsResult)
    : [];

  const sortedFileResults = checkFilesResult
    ? sortResults(AnalysisType.FILE, checkFilesResult)
    : [];

  const sortedUrlResults = checkUrlsResult
    ? sortResults(AnalysisType.URL, checkUrlsResult)
    : [];

  return (
    <Shell>
      <div className='object-scan-dashboard'>
        <div className='left-side'>
          <div className='search-box-container'>
            <SearchBox
              loading={loading}
              searchType={searchType}
              setSearchType={handleUpdateSearchType}
              setCheckIpAddressesResult={setCheckIpAddressesResult}
              setCheckUrlsResult={setCheckUrlsResult}
              setCheckDomainsResult={setCheckDomainsResult}
              setCheckFilesResult={setCheckFilesResult}
              setLoading={setLoading}
            />
          </div>
        </div>
        <div className='right-side'>
        {loading && (
          <div className='loading-container'>
            <p className='loading-copy'>
              Processing request...
            </p>
          </div>
        )}

        {!loading && searchType === AnalysisType.URL && checkUrlsResult && (
          <div className='results-container'>
            <h2>Results:</h2>
            {sortedUrlResults.length > 0
              ? (
                <ul className='results-list'>
                  {sortedUrlResults.map((result, index) => (
                    <li key={result.analysisId || index}>
                      <AnalysisCard
                        analysis={result.analysis}
                        analysisStatus={result.analysisStatus}
                        analysisId={result.analysisId}
                        queryValue={result.value}
                        analysisType={AnalysisType.URL}
                        setAnalysis={setAnalysis}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='no-results'>
                  No results
                </div>
              )
            }
          </div>
        )}

        {!loading && searchType === AnalysisType.DOMAIN && checkDomainsResult && (
          <div className='results-container'>
            <h2>Results:</h2>
            {sortedDomainResults.length > 0
              ? (
                <ul className='results-list'>
                  {sortedDomainResults.map((result, index) => (
                    <li key={result.analysisId || index}>
                      <AnalysisCard
                        analysis={result.analysis}
                        analysisStatus={result.analysisStatus}
                        analysisId={result.analysisId}
                        queryValue={result.value}
                        analysisType={AnalysisType.DOMAIN}
                        setAnalysis={setAnalysis}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='no-results'>
                  No results
                </div>
              )
            }
          </div>
        )}

        {!loading && searchType === AnalysisType.IP_ADDRESS && checkIpAddressesResult && (
          <div className='results-container'>
            <h2>Results:</h2>
            {sortedIpResults.length > 0
              ? (
                <ul className='results-list'>
                  {sortedIpResults.map((result, index) => (
                    <li key={result.analysisId || index}>
                      <AnalysisCard
                        analysis={result.analysis}
                        analysisStatus={result.analysisStatus}
                        analysisId={result.analysisId}
                        queryValue={result.value}
                        analysisType={AnalysisType.IP_ADDRESS}
                        setAnalysis={setAnalysis}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='no-results'>
                  No results
                </div>
              )
            }
          </div>
        )}

        {!loading && searchType === AnalysisType.FILE && checkFilesResult && (
          <div className='results-container'>
            <h2>Results:</h2>
            {sortedFileResults.length > 0
              ? (
                <ul className='results-list'>
                  {sortedFileResults.map((result, index) => (
                    <li key={result.analysisId || index}>
                      <AnalysisCard
                        analysis={result.analysis}
                        analysisStatus={result.analysisStatus}
                        analysisId={result.analysisId}
                        queryValue={result.value}
                        analysisType={AnalysisType.FILE}
                        setAnalysis={setAnalysis}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='no-results'>
                  No results
                </div>
              )
            }
          </div>
        )}
        </div>
      </div>
    </Shell>
  );
}

export default FileCheckerDashboard;
