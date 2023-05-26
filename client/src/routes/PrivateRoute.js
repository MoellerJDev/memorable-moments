import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser, setAuthPopupOpen} = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <>
            <Redirect to={"/signin"} />
            <Dialog open={!currentUser} onClose={() => setAuthPopupOpen(false)}>
              <DialogContent>
                <SignIn />
                <SignUp />
              </DialogContent>
            </Dialog>
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
