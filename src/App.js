// App.js
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import Child1 from "./Child1";
import Child2 from "./Child2";
import tips from "./tips.csv";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load the CSV data
    d3.csv(tips).then((data) => {
      // Convert relevant fields to numbers
      data.forEach((d) => {
        d.total_bill = +d.total_bill;
        d.tip = +d.tip;
      });
      setData(data);
    });
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>Tips Data Visualization</h1>

      {/* Chart 1: Scatter Plot (Total Bill vs Tips) */}
      <div style={{ marginBottom: "40px" }}>
        <Child1 data={data} />
      </div>

      {/* Chart 2: Bar Chart (Average Tip by Day) */}
      <div>
        <Child2 data={data} />
      </div>
    </div>
  );
};

export default App;
