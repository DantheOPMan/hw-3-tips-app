import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Child1 from "./Child1";
import Child2 from "./Child2";
import tips from "./tips.csv";
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv(tips).then((data) => {
      data.forEach((d) => {
        d.total_bill = +d.total_bill;
        d.tip = +d.tip;
      });
      setData(data);
    });
  }, []);

  return (
    <div className="app-container">
      <h1>Tips Data Visualization</h1>

      <div className="chart-container">
        <Child1 data={data} />
      </div>

      <div className="chart-container">
        <Child2 data={data} />
      </div>
    </div>
  );
};

export default App;
