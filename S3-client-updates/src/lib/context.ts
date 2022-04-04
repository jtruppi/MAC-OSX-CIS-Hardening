import React from 'react';

const AppContext = React.createContext({});

export type AppContextType = {
  title: string,
}

export default AppContext;
