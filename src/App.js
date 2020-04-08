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
        <Route path="/">
          <Summary />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
