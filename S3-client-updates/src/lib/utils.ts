export enum KeyCodes {
  ENTER = 13,
  BACKSPACE = 8,
  ESCAPE = 27,
  UP_ARROW = 38,
  DOWN_ARROW = 40,
}

export const getClasses = (config: Record<string, boolean>): string => {
  const classes: string[] = [];
  for (const cls in config) {
    if (config[cls] && !classes.includes(cls)) {
      classes.push(cls);
    }
  }
  return classes.join(' ');
};

export const delay = (time: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  })
}

export const isKeyPressEnter = (code: number | undefined): boolean => {
  return code === KeyCodes.ENTER;
}

export const dedupeArray = (items: string[]): string[] => {
  return Array.from(new Set(items));
}

export const downloadLink = (url: string, fileName = '') => {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
};

export const downloadJSON = (data: string, reportName: string = 'report.json') => {
  const blob = new Blob([data], {type: "application/json"});
  const url  = URL.createObjectURL(blob);
  downloadLink(url, reportName);
}

// TODO: get this based on env
export const getApiUrl = () => {
  if (window.location.host.startsWith('localhost')) {
    return `http://localhost:4000`;
  }
  else if (window.location.host.startsWith('ec2-18-116-88-233.us-east-2.compute.amazonaws.com')) {
    return `${window.location.protocol}//ec2-18-116-88-233.us-east-2.compute.amazonaws.com:4000`;
  }
  else if (window.location.host.startsWith('18.116.88.233')) {
    return `${window.location.protocol}//18.116.88.233:4000`;
  }
  else {
    return '';
  }
}
