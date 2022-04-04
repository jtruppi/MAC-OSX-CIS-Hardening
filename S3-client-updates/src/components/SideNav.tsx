import React from 'react';
import { useLocation } from 'react-router';
import '../scss/SideNav.scss';
import Link from './Link';

type Props = {};

const SideNav: React.FC<Props> = (props) => {
  const location = useLocation();
  const {pathname} = location;
  const links = [
    {
      label: 'Password Search',
      path: '/search',
      selected: pathname === '/search',
    },
    {
      label: 'Object Scan',
      path: '/files',
      selected: pathname === '/files',
    },
    // {
    //   label: 'Hawkeye Wireless Analyzer',
    //   path: '/hawkeye',
    // },
  ]
  return (
    <div className='side-nav'>
      <ul className='links-container'>
        {links.map((link, index) => (
          <li key={index} className={link.selected ? 'selected' : ''}>
            <Link to={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNav;
