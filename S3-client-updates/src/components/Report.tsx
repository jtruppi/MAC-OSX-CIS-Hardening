import React from 'react';
import '../scss/Report.scss';
import {Report as ReportType, Entry} from '../models/darknet'

type Props = {
  report: ReportType
}

const ReportEntry: React.FC<{entry: Entry}> = (props) => {
  const {
    database_name,
    password,
    hashed_password,
    username,
    phone,
    vin,
    ip_address,
    id,
    name,
  } = props.entry;
  const items = [
    {label: 'Database', value: database_name},
    {label: 'Password', value: password},
    {label: 'Hashed password', value: hashed_password},
    {label: 'Username', value: username},
    {label: 'Phone', value: phone},
    {label: 'Vin', value: vin},
    {label: 'IP address', value: ip_address},
    {label: 'ID', value: id},
    {label: 'Name', value: name},
  ].filter(item => Boolean(item.value));
  return (
    <li>
      {items.map((item, index) => (
        <div className='item' key={index}>
          <div className='label'>{item.label}</div>
          <div className='value'>{item.value}</div>
        </div>
      ))}
    </li>
  );
}

const Report: React.FC<Props> = (props) => {
  const {report} = props;
  if (!report) {
    return (
      <div className='report'>
        <p>Unable to parse data</p>
      </div>
    )
  }
  return (
    <div className='report'>
      <ul className='entries'>
        {report.entries.length ? (
          report.entries.map((entry, index) => <ReportEntry entry={entry} key={index} />)
        ) : (
          <li>No results</li>
        )}
      </ul>
    </div>
  );
}

export default Report;
