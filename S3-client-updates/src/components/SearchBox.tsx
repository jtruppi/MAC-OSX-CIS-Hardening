import React, { useRef, useState } from 'react';
import { parseCsv } from '../lib/csvUtils';
import { dedupeArray, isKeyPressEnter } from '../lib/utils';
import { AnalysisType, CheckDomainsResult,CheckFilesResult, CheckIpAddressesResult, CheckUrlsResult } from '../models/objectScan';
import { checkDomains, checkFile, checkIpAddresses, checkUrls } from '../lib/objectScan';
import '../scss/SearchBox.scss';
import Button from './Button';
import Icon from './Icon';
import Or from './Or';

const exampleLink = "https://google.com"
const MAX_REQUESTS = 25;

type Props = {
  loading: boolean;
  searchType: AnalysisType;
  setSearchType: (searchType: AnalysisType) => void
  setCheckFilesResult: (result: CheckFilesResult | null) => void
  setCheckIpAddressesResult: (result: CheckIpAddressesResult | null) => void
  setCheckUrlsResult: (result: CheckUrlsResult | null) => void
  setCheckDomainsResult: (result: CheckDomainsResult | null) => void
  setLoading: (loading: boolean) => void
};

const configData = {
  [AnalysisType.FILE]: {
    title: 'File',
    placeholder: '',
    cta: 'Submit',
  },
  [AnalysisType.IP_ADDRESS]: {
    title: 'IP Address',
    placeholder: '1.2.3.4',
  },
  [AnalysisType.URL]: {
    title: 'URL',
    placeholder: 'https://example.com',
  },
  [AnalysisType.DOMAIN]: {
    title: 'Domain',
    placeholder: 'example.com',
  },
}

const SearchBox: React.FC<Props> = (props) => {
  const {searchType, loading, setLoading} = props;
  const [query, setQuery] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const config = configData[searchType];

  const updateLoading = (nextLoading?: boolean) => {
    if (typeof nextLoading === 'boolean') {
      setLoading(nextLoading);
    }
    else {
      setLoading(!loading);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const isEnter = isKeyPressEnter(event.keyCode);
    if (isEnter && query.trim()) {
      handleSubmitQuery();
    }
  }

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  const handleSubmitQuery = () => {
    if (!query) return;
    // TODO: consider adding more validation / sanitation here
    const cleaned = query.trim();
    switch (searchType) {
      case AnalysisType.IP_ADDRESS: {
        return handleCheckIpAddresses([cleaned]);
      }
      case AnalysisType.DOMAIN: {
        return handleCheckDomains([cleaned]);
      }
      case AnalysisType.URL: {
        return handleCheckUrls([cleaned]);
      }
      default: {
        return '';
      }
    }
  }

  const handleRequestSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCheckFile = (file: File) => {
    updateLoading(true);
    checkFile(file)
    .then((data) => {
      updateLoading(false);
      props.setCheckFilesResult(data.result);
    })
    .catch(() => {
      updateLoading(false);
    })
  }

  const handleCheckIpAddresses = async (items: string[] | null) => {
    if (!(items && items.length)) {
      const msg = 'Error checking IP addresses. No addresses to check.'
      return alert(msg);
    }
    if (items && items.length > MAX_REQUESTS) {
      const msg = `You can only search for ${MAX_REQUESTS} items at one time.`;
      return alert(msg);
    }
    props.setCheckIpAddressesResult(null);
    updateLoading(true);
    checkIpAddresses(items)
    .then((data) => {
      updateLoading(false);
      props.setCheckIpAddressesResult(data.result);
    })
    .catch(() => {
      updateLoading(false);
    })
  }

  const handleCheckDomains = async (items: string[] | null) => {
    if (!(items && items.length)) {
      const msg = 'Error checking domains. No domains to check.'
      return alert(msg);
    }
    if (items && items.length > MAX_REQUESTS) {
      const msg = `You can only search for ${MAX_REQUESTS} items at one time.`;
      return alert(msg);
    }
    updateLoading(true);
    checkDomains(items)
    .then((data) => {
      updateLoading(false);
      props.setCheckDomainsResult(data.result);
    })
    .catch(() => {
      updateLoading(false);
    })
  }

  const handleCheckUrls = async (items: string[] | null) => {
    if (!(items && items.length)) {
      const msg = 'Error checking URLs. No URLs to check.'
      return alert(msg);
    }
    if (items && items.length > MAX_REQUESTS) {
      const msg = `You can only search for ${MAX_REQUESTS} items at one time.`;
      return alert(msg);
    }
    props.setCheckUrlsResult(null);
    updateLoading(true);
    checkUrls(items)
    .then((data) => {
      updateLoading(false);
      // NOTE: because api returns data for checking urls
      // with keys as the url but analysisId as a different value,
      // and because there is an expectation that the keys
      // of the results match the analysisId's in
      // ObjectScanDashboard.tsx, we need to re-map
      // the results using the analysisId's
      const nextResult: CheckIpAddressesResult = {};
      Object.keys(data.result).forEach(url => {
        const item = data.result[url];
        const {analysisId} = item;
        if (analysisId) {
          nextResult[analysisId] = item;
        }
      })
      props.setCheckUrlsResult(nextResult);
    })
    .catch(() => {
      updateLoading(false);
    })
  }

  const handleFileChange = async (event: any) => {
    // NOTE: it's necessary to destroy/create the file
    // input between file selections, otherwise if user
    // selects the same file more than once, the input
    // doesn't recognize the second selection.
    setFileInputKey(fileInputKey + 1);
    const {files} = event.target;
    // TODO: handle multiple files selected
    const asArray = Array.from(files);
    const file = asArray[0] as File;
    if (!file) { return; }

    switch (searchType) {
      case AnalysisType.FILE: {
        return handleCheckFile(file);
      }
      case AnalysisType.IP_ADDRESS: {
        const items = await parseCsv(file);
        const unique = dedupeArray(items || []);
        return handleCheckIpAddresses(unique);
      }
      case AnalysisType.DOMAIN: {
        const items = await parseCsv(file);
        const unique = dedupeArray(items || []);
        return handleCheckDomains(unique);
      }
      case AnalysisType.URL: {
        const items = await parseCsv(file);
        const unique = dedupeArray(items || []);
        return handleCheckUrls(unique);
      }
      default: {
        return '';
      }
    }
  }

  const handleChangeSearchType = (nextSearchType: AnalysisType) => () => {
    // Reset query when changing type
    if (nextSearchType !== searchType) {
      setQuery('');
    }
    props.setSearchType(nextSearchType);
  }

  const getIconForSearchType = (searchType: AnalysisType): string => {
    switch(searchType) {
      case AnalysisType.DOMAIN: return 'at';
      case AnalysisType.URL: return 'link';
      case AnalysisType.IP_ADDRESS: return 'map-marker';
      default: return 'at';
    }
  }

  const renderFileCheckerBlock = () => {
    return (
      <div className='item file-checker-container'>
        <div className='item-header'>
          <Icon icon='file-alt' />
          <h3>Check file</h3>
        </div>
        <div className='item-content'>
          <Button onClick={handleRequestSelectFile} className='item-button primary' loading={loading}>
            Select file
          </Button>
        </div>
      </div>
    )
  }

  const renderTextInputAndFileSelect = () => {
    return (
      <div className='item ip-checker-container'>
        <div className='item-header'>
          <Icon icon={getIconForSearchType(searchType)} />
          <h3>{config.title}</h3>
        </div>
        <div className='item-content'>
          <div className='single-input-section' onKeyDown={handleKeyDown}>
            <div className='input-container'>
              <input
                value={query}
                onChange={handleChangeQuery}
                placeholder={config.placeholder}
                className='query-input'
              />
            </div>
            <Button onClick={handleSubmitQuery} className='item-button primary' loading={loading}>
              Scan
            </Button>
          </div>

          <div className='or-section'>
            <Or />
          </div>

          <div className='file-upload-section'>
            <p className="file-upload-description">Upload a CSV file with a list of items. <a href={exampleLink} target="_blank" rel="noopener noreferrer">See this example CSV file for expected format</a></p>
            <div className='buttons-container'>
              <Button onClick={handleRequestSelectFile} className='item-button primary' loading={loading}>
                Select file
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const options = [
    {label: 'IP', value: AnalysisType.IP_ADDRESS},
    {label: 'Domain', value: AnalysisType.DOMAIN},
    {label: 'URL', value: AnalysisType.URL},
    {label: 'File', value: AnalysisType.FILE},
  ]

  return (
    <div className='search-box'>
      <ul className='search-box-header'>
        {options.map((option, index) => (
          <li key={index} className={option.value === searchType ? 'active' : ''}>
            <button onClick={handleChangeSearchType(option.value)}>
              <p>{option.label}</p>
            </button>
          </li>
        ))}
      </ul>
      <div className='file-input-container'>
        <input
          key={fileInputKey}
          className='file-input'
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      <div className='search-box-content'>
        {searchType === AnalysisType.FILE && renderFileCheckerBlock()}
        {[AnalysisType.IP_ADDRESS, AnalysisType.URL, AnalysisType.DOMAIN].includes(searchType) && renderTextInputAndFileSelect()}
      </div>
    </div>
  );
}

export default SearchBox;
