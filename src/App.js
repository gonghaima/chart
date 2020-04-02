import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { populationDataFemale } from "./DataFemale";
import { populationDataMale } from "./DataMale";
import { BasicChart } from './BaiscChart';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/basic-chart">
          <BasicChart />
        </Route>
        <Route path="/">
          <div>
            main chart
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
