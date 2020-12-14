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
import D3BAR from './D3BAR';
import { D3LINE } from './D3LINE';
import { D3MULTILINE } from './D3MULTILINE';
import { D3LINEMELTINGDATA } from './D3LINEMELTINGDATA';
import { D3LINESCATTERPLOT } from './D3LINESCATTERPLOT';
import { D3AREA } from './D3AREA';
import { D3AREAPOPULATION } from './D3AREAPOPULATION';
import { D3SCATTERPLOT } from './D3SCATTERPLOT';
import { D3SCATTERPLOTCAR } from './D3SCATTERPLOTCAR';
import { D3SCATTERPLOTWITHMENUS } from './D3SCATTERPLOTWITHMENUS';
import { D3SCATTERPLOTTWOMENUS } from './D3SCATTERPLOTTWOMENUS';
import { D3GENERALUPDATEPATTERN } from './components/d3/D3GENERALUPDATEPATTERN';
import { D3LEGEND } from './components/d3/D3LEGEND';
import { D3CLICK } from './components/d3/D3CLICK';
import { D3HOVER } from './components/d3/D3HOVER';
import { D3WORLDMAP } from './components/d3/D3WORLDMAP';
import { D3WORLDMAPINTERACTION } from './components/d3/D3WORLDMAPINTERACTION';
import { D3CHOROMAP } from './components/d3/D3CHOROMAP';
import { D3CHOROINTERMAP } from './components/d3/D3CHOROINTERMAP';
import { D3CIRCLEMAP } from './components/d3/D3CIRCLEMAP';
import { D3CANVAS } from './components/d3/D3CANVAS';
import { D3TREE } from './components/d3/D3TREE';
import { D3ARTTREE } from './components/d3/D3ARTTREE';
import { D3World } from './D3World';
import BasicShape from './BasicShape';
import { Pie } from './Pie';

function App() {
  const navItems = [
    { key: "basic-chart", component: BasicChart },
    { key: "pie", component: Pie },
    { key: "summary-v1", component: SummaryV1 },
    { key: "world", component: World },
    { key: "usa", component: USA },
    { key: "australia", component: AUSTRALIA },
    { key: "d3", component: <D3 /> },
    { key: "d3-bar", component: <D3BAR /> },
    { key: "d3-scatter-plot", component: <D3SCATTERPLOT /> },
    { key: "d3-scatter-plot-car", component: <D3SCATTERPLOTCAR /> },
    { key: "d3-scatter-plot-with-menus", component: <D3SCATTERPLOTWITHMENUS /> },
    { key: "d3-scatter-plot-two-menus", component: <D3SCATTERPLOTTWOMENUS /> },
    { key: "d3-line", component: <D3LINE /> },
    { key: "d3-multi-line", component: <D3MULTILINE /> },
    { key: "d3-line-melting-data", component: <D3LINEMELTINGDATA /> },
    { key: "d3-line-scatter-plot", component: <D3LINESCATTERPLOT /> },
    { key: "d3-area", component: <D3AREA /> },
    { key: "d3-area-population", component: <D3AREAPOPULATION /> },
    { key: "d3-general-update-pattern", component: <D3GENERALUPDATEPATTERN /> },
    { key: "d3-legend", component: <D3LEGEND /> },
    { key: "d3-click", component: <D3CLICK /> },
    { key: "d3-hover", component: <D3HOVER /> },
    { key: "d3-world", component: <D3World /> },
    { key: "d3-world-map", component: <D3WORLDMAP /> },
    { key: "d3-world-map-interaction", component: <D3WORLDMAPINTERACTION /> },
    { key: "d3-choropleth-map", component: <D3CHOROMAP /> },
    { key: "d3-circle-map", component: <D3CIRCLEMAP /> },
    { key: "d3-choropleth-interactive-map", component: <D3CHOROINTERMAP /> },
    { key: "basic-shape", component: <BasicShape /> },
    { key: "d3-canvas", component: <D3CANVAS /> },
    { key: "d3-tree", component: <D3TREE /> },
    { key: "d3-art-tree", component: <D3ARTTREE /> },
    { key: "", component: <Summary /> },
  ];
  return (
    <Router>
      <>
        <nav>
          <ul>
            {navItems.map(({ key, _ }) => key && <li key={`nav_${key}`}><Link to={`/${key}`}>{`${key}`}</Link></li>)}
          </ul>
        </nav>
        <Switch>
          {navItems.map(({ key, component }) =>
            <Route key={`route_${key}`} path={`/${key}`}>{component}</Route>
          )}
        </Switch>
      </>
    </Router >
  );
}

export default App;
