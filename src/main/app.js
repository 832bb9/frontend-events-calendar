import ReactDOM from "react-dom";
import React from "react";
import _ from "lodash/fp";

import { EventsList } from "../events/list";

import "babel-polyfill";

import "./app.css";

const App = () => {
  return (
    <div className="page">
      <div className="section">
        <div className="section-content">
          <h1 className="page-header">Список событий</h1>
        </div>
      </div>
      <EventsList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
