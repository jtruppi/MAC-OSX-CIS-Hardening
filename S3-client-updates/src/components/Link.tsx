import React from 'react';
import {Link as BrowserLink} from 'react-router-dom';
import '../scss/Link.scss';

type Props = {
  to: string,
  className?: string,
};

const Link: React.FC<Props> = (props) => {
  const {to, className = '', children} = props;
  return (
    <BrowserLink to={to} className={className}>
      {children}
    </BrowserLink>
  );
}

export default Link;
