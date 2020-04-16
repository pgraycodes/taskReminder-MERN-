import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Homepage from './pages/HomePage/Homepage';
import SignUp from './components/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route
          render={() => <h2 className="four-o-four">404 Page Not Found</h2>}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
