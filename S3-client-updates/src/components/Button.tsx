import React from 'react';
import { getClasses } from '../lib/utils';
import '../scss/Button.scss';
import Icon from './Icon';
import Link from './Link';

type Props = {
  label?: string,
  className?: string,
  link?: string,
  loading?: boolean,
  onClick?: () => void,
};

const Button: React.FC<Props> = (props) => {
  const {
    label,
    link,
    className = '',
    loading = false,
    onClick,
    children,
  } = props;

  const handleClick = () => {
    if (onClick && !loading) onClick();
  }

  if (link) {
    return (
      <Link to={link} className={className}>
        {label}
      </Link>
    )
  }
  const classes = getClasses({
    'app-button': true,
    [className]: true,
    'loading': loading,
  })
  return (
    <button className={classes} onClick={handleClick}>
      {children}
      {loading && (
        <div className='loading-mask'>
          <Icon icon='ellipsis-v' />
        </div>
      )}
    </button>
  );
}

export default Button;
