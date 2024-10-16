// Child2.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Child2 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const margin = { top: 40, right: 20, bottom: 60, left: 60 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.selectAll("*").remove();

    const filteredData = data.filter(d => d.tip !== undefined && d.day !== undefined);

    const averageTips = d3.rollups(
      filteredData,
      (v) => d3.mean(v, (d) => d.tip),
      (d) => d.day
    );

    const x = d3.scaleBand()
      .domain(averageTips.map(d => d[0]))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(averageTips, d => d[1])])
      .range([height, 0]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.selectAll(".bar")
      .data(averageTips)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d[0]))
      .attr("y", d => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d[1]))
      .attr("fill", "#69b3a2");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .attr("class", "x-axis-label")
      .text("Day");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .attr("class", "y-axis-label")
      .text("Average Tip");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -20)
      .attr("class", "chart-title")
      .text("Average Tip by Day");

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Child2;
