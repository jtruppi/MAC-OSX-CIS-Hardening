import React from 'react';
import '../scss/Header.scss';

type Props = {};

const config = {
  title: `ShiftState`,
}

const Header: React.FC<Props> = (props) => {
  return (
    <header className='app-header'>
      <div className='header-left'>
        <h3>{config.title}</h3>
      </div>
    </header>
  );
}

export default Header;
