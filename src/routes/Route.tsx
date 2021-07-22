import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

export default function PublicRoute({ ...routeProps }: RouteProps): any {
  return <Route {...routeProps} />;
}