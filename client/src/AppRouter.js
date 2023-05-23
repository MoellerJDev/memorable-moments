import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import your components here
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import PhotoUpload from './components/PhotoUpload';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/upload" component={PhotoUpload} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
