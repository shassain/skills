import React from 'react'
import { routeList } from './routes'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
const BrowserRouters = (props) => {
  let { children } = props;
  return <BrowserRouter>
    <Switch>
      {
        routeList.map((rout, index) => {
          return <Route
            key={index}
            path={rout.url}
            exact={rout.exact}
            children={<rout.main />}
          />
        })
      }
      {children}
    </Switch>

  </BrowserRouter>
}
export default BrowserRouters;