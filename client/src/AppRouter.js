import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import PhotoUpload from './components/PhotoUpload';
import UserProfile from './components/UserProfile';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={PhotoUpload} />
        <Route exact path="/profile" component={UserProfile} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
