import React from 'react';
import { downloadJSON } from '../lib/utils';
import { SubmissionResults, Report as ReportType } from '../models/darknet';
import '../scss/DarknetResults.scss';
import Button from './Button';
import Report from './Report';

type Props = {
  results: SubmissionResults,
};

const DarknetResults: React.FC<Props> = (props) => {
  const {results} = props;
  const passwordResults = Object.values(results.passwordReport);
  const hasPasswordResults = passwordResults.length > 0;
  const reports = Object.values(results.rawResults)
    .map(result => result?.report)
    .filter(Boolean);
  const hasReports = reports.length > 0;

  const handleDownload = () => {
    const entries = reports.map(report => report?.entries || []).flat();
    downloadJSON(JSON.stringify({results: entries}));
  }
  return (
    <div className='darknet-results'>
      <div className='results-section'>
        {!hasPasswordResults && (
          <p className='no-results password-results'>No passwords found</p>
        )}
        {hasPasswordResults && (
          <div className='password-results-section'>
            <h3 className='password-results-header'>Password results</h3>
            <ul className='password-results-list'>
              {passwordResults.map((result, index) => (
                <li key={index}>
                  <p className='result-password'>{result.value}</p>
                  <p className='result-entries'>({result.entries.length})</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!hasReports && (
          <p className='no-results report-results'>No reports found</p>
        )}
        {hasReports && (
          <div className='report-results-section'>
            <div className='report-results-header'>
              <h3>Reports</h3>
              <Button onClick={handleDownload} className='download-button secondary'>
                Download as JSON
              </Button>
            </div>
            <ul className='report-results-list'>
              {reports.map((report, index) => (
                <li key={index}>
                  <Report report={report as ReportType} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DarknetResults;
