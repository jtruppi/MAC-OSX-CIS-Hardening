import React, { useEffect, useRef, useState } from 'react';
import { fetchAnalysis, formatThreatLevel, getEngineResultsForAnalysisType, getIsAnalysisCompleted, getStatsForAnalysisType, getThreatLevelFromStats } from '../lib/objectScan';
import {Analysis, AnalysisStatus, AnalysisThreatLevel, AnalysisType, EngineResultCategory} from '../models/objectScan';
import {getClasses} from '../lib/utils'
import '../scss/AnalysisCard.scss';

type Props = {
  queryValue: string
  analysis: Analysis | null
  analysisId: string | null // null analysisId means the initial
  // request to queue an analysis failed with error
  analysisStatus: AnalysisStatus | null
  analysisType: AnalysisType
  setAnalysis: (analysisType: AnalysisType, analysis: Analysis) => void
};

const MAX_POLL_CALLS = 50;
const DELAY_BETWEEN_CALLS = 10000;

const AnalysisCard: React.FC<Props> = (props) => {
  const {queryValue, analysis, analysisType} = props;
  const [loading, setLoading] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const [threatLevel, setThreatLevel] = useState<AnalysisThreatLevel | null>(null);
  const [maxPollsReached, setMaxPollsReached] = useState(false);

  const poller = useRef<NodeJS.Timeout | null>(null);

  const deactivatePoller = () => {
    if (poller.current !== null) {
      window.clearInterval(poller.current);
    }
  }

  const fetchAnalysisData = async () => {
    if (!props.analysisId) return;
    setLoading(true)
    fetchAnalysis(props.analysisId)
    .then((result) => {
      setLoading(false)
      const isCompleted = getIsAnalysisCompleted(result.analysis.attributes.status);
      if (isCompleted) {
        const stats = getStatsForAnalysisType(analysisType, result.analysis);
        const threatLevel = stats
          ? getThreatLevelFromStats(stats)
          : AnalysisThreatLevel.UNKNOWN;
        setThreatLevel(threatLevel)
        props.setAnalysis(props.analysisType, result.analysis);
        deactivatePoller();
      }
    })
    .catch(() => {
      setLoading(false);
      // TODO: show error message / check error and cancel
      // depending on error (e.g. not found)
    })
  }

  useEffect(() => {
    if (pollCount > MAX_POLL_CALLS) {
      setMaxPollsReached(true);
      return deactivatePoller();
    }
  }, [pollCount])

  useEffect(() => {
    // If there's no analysis for this query item (because
    // initial request to queue analysis failed), set error
    // for item
    if (!props.analysisId) {
      return;
    }
    if (props.analysisStatus === AnalysisStatus.COMPLETED) {
      const stats = analysis ? getStatsForAnalysisType(analysisType, analysis) : null;
      const threatLevel = stats
        ? getThreatLevelFromStats(stats)
        : AnalysisThreatLevel.UNKNOWN;
      setThreatLevel(threatLevel);
      return;
    }

    fetchAnalysisData();

    poller.current = setInterval(() => {
      if (loading) {
        return;
      };
      if (maxPollsReached) {
        return;
      }
      setPollCount((prevPollCount) => prevPollCount + 1);
      fetchAnalysisData();
    }, DELAY_BETWEEN_CALLS)
    return () => {
      deactivatePoller();
    }
    // NOTE: intentionally ignore changes in deps in this
    // useEffect hook since we only want to ever run once
    // when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cls = getClasses({
    'analysis-card': true,
    [threatLevel || '']: true,
  });

  const results = analysis
    ? getEngineResultsForAnalysisType(analysisType, analysis)
    : null;

  const enginesMarkingMalicious = results
    ? Object.values(results).filter(item => item.category === EngineResultCategory.MALICIOUS)
    : [];

  const enginesMarkingSuspicious = results
    ? Object.values(results).filter(item => item.category === EngineResultCategory.SUSPICIOUS)
    : [];

  return (
    <div className={cls}>
      <div className='analysis-card-top'>
      <div className='query-value'>{queryValue}</div>
      <div className='right-container'>
        {!props.analysisId && (
          <div className='no-analysis'>
            Operation failed
          </div>
        )}
        {props.analysisId && !threatLevel && !maxPollsReached && (
          <div className='loading-container'>
            <p className='loading-title'>Processing...</p>
            {analysisType === AnalysisType.FILE && (
              <p className='loading-subtitle'>
                This may take a few minutes
              </p>
            )}
          </div>
        )}
        {maxPollsReached && !threatLevel && (
          <div className='max-reached'>
            Operation timed out
          </div>
        )}
        {threatLevel && (
          <div className='threat-level-container'>
            <div className={`threat-level ${threatLevel}`}>
              {formatThreatLevel(threatLevel)}
            </div>
          </div>
        )}
      </div>
      </div>

      <div className='analysis-card-bottom'>
        {enginesMarkingMalicious.length > 0 && (
          <div className='analysis-card-engines-section malicious-category'>
            <div className='analysis-card-engines-header'>
              Engines marking object malicious:
            </div>
            <div className='analysis-card-engines-container'>
              {enginesMarkingMalicious.map((item, index) => (
                <div className='analysis-card-engine' key={index}>
                  {item.engine_name}
                </div>
              ))}
            </div>
          </div>
        )}

        {enginesMarkingSuspicious.length > 0 && (
          <div className='analysis-card-engines-section suspicious-category'>
            <div className='analysis-card-engines-header'>
              Engines marking object suspicious:
            </div>
            <div className='analysis-card-engines-container'>
              {enginesMarkingSuspicious.map((item, index) => (
                <div className='analysis-card-engine' key={index}>
                  {item.engine_name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalysisCard;
