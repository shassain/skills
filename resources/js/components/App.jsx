import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container'
import BrowserRouters from '../routes/BrowserRouters'
import Head from '../views/index/Head';
import Body from '../views/index/Body';
import 'bootstrap/dist/css/bootstrap.min.css';
import { routeList } from '../routes/routes'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
export default class App extends Component {
  render() {
    return <BrowserRouter>
      <Container fluid >
        <Head />
        <Body>
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
          </Switch>
        </Body>
      </Container>
    </BrowserRouter>

  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}
