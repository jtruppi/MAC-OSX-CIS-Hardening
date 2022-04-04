import { Route, Switch, Redirect } from 'react-router';
import DarknetSearchDashboard from './DarknetSearchDashboard';
import ObjectScanDashboard from './ObjectScanDashboard';
import HawkEyeDashboard from './HawkEyeDashboard';

function App() {
  return (
    <Switch>
      <Route path='/files' component={ObjectScanDashboard} />
      <Route path='/search' component={DarknetSearchDashboard} />
      <Route path='/hawkeye' component={HawkEyeDashboard} />
      <Redirect to='/files' />
    </Switch>
  );
}

export default App;
