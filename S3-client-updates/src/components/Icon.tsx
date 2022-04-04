import React from 'react';
import '../scss/Icon.scss';
import {
  FaFile,
  FaLink,
  FaEllipsisV,
  FaFileAlt,
  FaMap,
  FaMapMarker,
  FaAt,
} from 'react-icons/fa';

type Props = {
  icon: string,
  className?: string
};

const getIconComponent = (icon: string) => {
  switch(icon) {
    case 'file': return FaFile;
    case 'file-alt': return FaFileAlt;
    case 'link': return FaLink;
    case 'map': return FaMap;
    case 'map-marker': return FaMapMarker;
    case 'at': return FaAt;
    case 'ellipsis-v': return FaEllipsisV;
    default: return FaFile;
  }
}

const Icon: React.FC<Props> = (props) => {
  const {icon, className = ''} = props;
  const IconComponent = getIconComponent(icon);
  return <IconComponent className={className} />
}

export default Icon;
