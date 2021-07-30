import 'antd/dist/antd.css';
import './assets/css/custom.css';

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { route } from '@/config/route';
import Route from '@/routes/Route';

const App: React.FC = () => {
  const generateRoute = () => {
    return route.map((entry, idx) => (
      <Route key={idx} path={entry.path} component={entry.component} exact={entry.exact} />
    ));
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          {generateRoute()}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
