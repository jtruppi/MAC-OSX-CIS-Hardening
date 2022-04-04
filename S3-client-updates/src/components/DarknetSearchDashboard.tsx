import React, { useState } from 'react';
import '../scss/DarknetSearchDashboard.scss';
import Button from './Button';
import Shell from './Shell';
import { submitForm } from '../lib/darknetSearch';
import { FormValues, SubmissionResults } from '../models/darknet';
import DarknetResults from './DarknetResults';

type Props = {};

const inputs = [
  // {
  //   name: 'pin',
  //   label: 'Pin',
  // },
  {
    name: 'email',
    label: 'Email',
  },
  {
    name: 'username',
    label: 'Username',
  },
  {
    name: 'phone',
    label: 'Phone',
  },
  {
    name: 'ip_address',
    label: 'IP address',
  },
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'address',
    label: 'Address',
  },
  {
    name: 'vin',
    label: 'Vin',
  },
  {
    name: 'domain',
    label: 'Domain',
  },
]

const getInitialValues = () => {
  const values: Record<string, string> = {};
  inputs.forEach(input => {
    values[input.name] = '';
  });
  return values;
}

const DarknetSearchDashboard: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(getInitialValues());
  const [submissionResults, setSubmissionResults] = useState<SubmissionResults | null>(null)

  const changeValue = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [key]: event.target.value,
    })
  }

  const handleSubmit = () => {
    // Clear any existing results
    setSubmissionResults(null);
    setLoading(true);
    submitForm(values as FormValues)
    .then(results => {
      setLoading(false);
      setSubmissionResults(results);
    })
    .catch(e => {
      setLoading(false);
    })
  }

  return (
    <Shell>
      <div className='darknet-search-dashboard'>
        <div className='left-side'>
        <div className='form-container'>
          <div className='inputs-container'>
            {inputs.map((input) => (
              <div className='input-item' key={input.name}>
                <label>
                  {input.label}
                </label>
                <input
                  name={input.name}
                  value={values[input.name]}
                  onChange={changeValue(input.name)}
                />
              </div>
            ))}
          </div>
          <div className='buttons-container'>
            <Button
              onClick={handleSubmit}
              className='primary'
              loading={loading}
            >
              Submit
            </Button>
          </div>
        </div>
        </div>
        <div className='right-side'>
        {loading && (
          <div className='loading-container'>
            <p className='loading-copy'>
              Performing search...
            </p>
          </div>
        )}
        {!loading && submissionResults && (
          <div className='results-container'>
            <div className='darknet-results-container'>
              <DarknetResults results={submissionResults} />
            </div>
          </div>
        )}
        {!loading && !submissionResults && (
          <div className='intro-container'>
            <h2>Target Scan</h2>
            {/* <p className='intro-copy'>Submit any available target information to search for related data.</p> */}
          </div>
        )}
        </div>
      </div>
    </Shell>
  );
}

export default DarknetSearchDashboard;
