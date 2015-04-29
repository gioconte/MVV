/**
 * Created by giorgioconte on 28/04/15.
 */
var width = window.innerWidth;
var height = window.innerHeight;
var radius = 10;
var hy1 = 350;
var hy2 = 350;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("id","canvas")
    .attr("width",width)
    .attr("height",height)
    .attr("fill","#fff7bc");

//vertical line;
//grey rgb(149, 165, 166)
svg.append("line")
    .attr("id","vertical")
    .classed("axis",true)
    .attr("x1", 50)
    .attr("x2",50)
    .attr("y1", 50)
    .attr("y2", hy1 + 10);

//horizontal line
svg.append("line")
    .attr("id","horizontal")
    .classed("axis",true)
    .attr("x1", 40)
    .attr("x2", 450)
    .attr("y1", hy1)
    .attr("y2", hy2);
//time label

svg.append("text")
    .text("time")
    .attr("x", 430)
    .attr("y", hy1 + 30);


var emptyCircle = svg.append("g");

emptyCircle.selectAll(".border").data(data)
    .enter().append("circle").classed("border",true)
    .attr("cx", function (d) {
        return d.cx;
    })
    .attr("cy", function (d) {
        return d.cy;
    })
    .attr("r", function (d) {
        return radius *(1+ d.uncertainty);
    });

emptyCircle.selectAll(".empty").data(data)
    .enter().append("circle").classed("empty",true)
    .attr("cx", function (d) {
        return d.cx;
    })
    .attr("cy", function (d) {
        return d.cy;
    })
    .attr("r", function (d) {
        return radius *(1+ d.uncertainty) - 1;
    })
    .attr("fill","#9ecae1");


var fullCircles  = svg.append("g");


fullCircles.selectAll(".dots").data(data)
    .enter().append("circle").classed("dots",true)
    .attr("cx", function (d) {
        return d.cx;
    })
    .attr("cy", function (d) {
        return d.cy;
    })
    .attr("r",radius);


