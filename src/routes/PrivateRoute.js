import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/Auth';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { updateAuthState } = useAuth();
  const { path, authenticated } = rest;
  localStorage.setItem("referer", path);
  const authRefererPath = localStorage.getItem("authRefererPath");
  useEffect(() => {
    updateAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Route
      {...rest}
      render={props => (
        authenticated
          ? <Component {...props} />
          : authRefererPath ? <Redirect to={authRefererPath} /> : <Redirect to='/login' />
      )}
    />
)};