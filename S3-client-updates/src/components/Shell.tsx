import React from 'react';
import '../scss/Shell.scss';
import Header from './Header';
import SideNav from './SideNav';

type Props = {};

const Shell: React.FC<Props> = (props) => {
  return (
    <div className='shell'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='shell-body'>
        <div className='side-nav-container'>
          <SideNav />
        </div>
        <div className='shell-content'>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Shell;
