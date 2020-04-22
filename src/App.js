import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { populationDataFemale } from "./data/DataFemale";
import { populationDataMale } from "./data/DataMale";
import { BasicChart } from './BaiscChart';
import { Summary } from './Summary';
import { SummaryV1 } from './SummaryV1';
import { World } from './World';
import { USA } from './USA';
import { AUSTRALIA } from './AUSTRALIA';
import { D3 } from './D3';
import { D3World } from './D3World';
import BasicShape from './BasicShape';
import { Pie } from './Pie';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/basic-chart">
          <BasicChart />
        </Route>
        <Route path="/pie">
          <Pie />
        </Route>
        <Route path="/summary-v1">
          <SummaryV1 />
        </Route>
        <Route path="/world">
          <World />
        </Route>
        <Route path="/usa">
          <USA />
        </Route>
        <Route path="/australia">
          <AUSTRALIA />
        </Route>
        <Route path="/d3">
          <D3 />
        </Route>
        <Route path="/d3-world">
          <D3World />
        </Route>
        <Route path="/basic-shape">
          <BasicShape />
        </Route>
        <Route path="/">
          <Summary />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
