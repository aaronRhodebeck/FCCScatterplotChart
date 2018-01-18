import * as d3 from "d3";

function makeScatterPlot(
  elementToAttachTo,
  dataset,
  parentComponent,
  svgConfig = {
    width: 600,
    height: 400,
    margin: { left: 45, top: 15, right: 15, bottom: 30 },
    scaleable: true,
    classes: []
  } // Defaults, can be passed in for specific needs
) {
  //#region Shared variables
  const { width, height, margin, scaleable, classes } = svgConfig;
  const chart = d3.select(elementToAttachTo).append("svg");
  //#endregion

  //#region Setup SVG
  chart.attr("class", `${classes.join(" ")}`);
  if (scaleable) {
    chart
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMinYMin");
  }
  //#endregion

  //#region Make scales

  const scaleX = d3.scaleLinear(); // Year
  const scaleY = d3.scaleLinear(); // Time to complete course

  const minYear = d3.min(dataset, d => d.Year - 1);
  const maxYear = d3.max(dataset, d => d.Year);

  const minTime = d3.min(dataset, d => d.Seconds);
  const maxTime = d3.max(dataset, d => d.Seconds);

  scaleX
    .domain([minYear, maxYear])
    .nice()
    .range([margin.left, width - (margin.left + margin.right)]);
  scaleY
    .domain([maxTime, minTime])
    .nice()
    .range([height - margin.bottom, margin.top]);
  //#endregion

  //#region Add dots
  const dots = chart
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", d => scaleX(d.Year))
    .attr("cy", d => scaleY(d.Seconds))
    .attr("r", 4);

  // Change color to indicate doping allegations
  const hasDopingAllegations = datapoint => datapoint.Doping !== "";
  const redFill = "rgba(255, 40, 40, .5)";
  const greenFill = "rgba(40, 255, 40, .5)";

  dots
    .style("stroke", "black")
    .style("fill", d => (hasDopingAllegations(d) ? redFill : greenFill));
  //#endregion

  //#region Add axes
  const axisX = d3.axisBottom(scaleX).tickFormat(year => year.toString());
  const axisY = d3.axisLeft(scaleY).tickFormat(seconds => {
    return `${Math.floor(seconds / 60)}:${("0" + seconds % 60).slice(-2)}`;
  });

  chart
    .append("g")
    .call(axisX)
    .attr("transform", `translate(0,${height - margin.bottom})`);
  chart
    .append("g")
    .call(axisY)
    .attr("transform", `translate(${margin.left},0)`);
  //#endregion

  //#region Add tool tip
  dots.on("mouseover", (d, i) => {
    parentComponent.setState({
      tooltipVisibility: "visible",
      tooltipX: d3.event.pageX,
      tooltipY: d3.event.pageY,
      tooltipData: d
    });
  });
  //#endregion
}
export default makeScatterPlot;
