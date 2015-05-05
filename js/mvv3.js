/**
 * Created by giorgioconte on 28/04/15.
 */
/**
 * Created by giorgioconte on 27/04/15.
 */

var width = window.innerWidth;
var height = window.innerHeight;
var radius = 8;
var svgLegend;
var hy1 = 350;
var hy2 = 350;


//var colors = ['#6baed6','#4292c6' ,'#2171b5','#08519c','#08306b'];

//var colors = ['#6baed6','#08306b'];

var colors = ['#08306b', '#deebf7']
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

/*
 [
 d3.min(data, function(d){return d.uncertainty;})
 ,
 d3.max(data, function(d){return d.uncertainty;})
 ]
 */

var uncertainties = [];

data.forEach(function(d){ uncertainties.push(d.uncertainty)});
/*
var linearScale = d3.scale.linear()
    .domain([
        function () {
            return d3.min(uncertainties);
        }
        ,
        function () {
            return d3.max(uncertainties);
        }
    ])
    .range(['#6baed6','#08306b']);*/

var linearScale = d3.scale.linear().domain([
    d3.min(uncertainties)
    ,
    d3.max(uncertainties)
    ]).range(colors);

var g = svg.append("g");

g = svg.selectAll("circle").data(data);


g.enter().append("circle")
    .attr("id", function(d){return d.id})
    .attr("cx", function(d) {return d.cx})
    .attr("cy", function(d) {return d.cy})
    .attr("r",radius)
    .attr("fill", function(d){return linearScale(d.uncertainty)})
    .style({
        "stroke-width" : "2px",
        "stroke": "black"
    });

var drawLegend = function () {
    console.log("legend");
    svgLegend = d3.select("#legend");

    /*
    var legendItems = svgLegend.selectAll(".legendItem").data(linearScale.ticks(4));

    //enter
    var groupLegendItem = legendItems.enter().append("g").classed("legendItem",true)
        .attr("transform", function (d,i) {
            return "translate("+[5,i*29]+")";
        });

    groupLegendItem.append("rect")
        .attr("x",2)
        .attr("y",2)
        .attr("width", 29)
        .attr("height", 29)
        .attr("fill", function(d){
            return linearScale(d);
        });*/

    var gradient = svgLegend.append("svg:defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    gradient.append("svg:stop")
        .attr("offset", "0%")
        .attr("stop-color", colors[0])
        .attr("stop-opacity", 1);

    gradient.append("svg:stop")
        .attr("offset", "100%")
        .attr("stop-color", colors[1])
        .attr("stop-opacity", 1);

    /*
    gradient
        .append("stop")
        .attr("offset", "0.5")
        .attr("stop-color", "#f00")*/

    svgLegend.append("svg:rect")
        .attr("width", 50)
        .attr("height", 110)
        .attr("y", 20)
        .attr("x",10)
        .style("fill", "url(#gradient)");

    svgLegend.append("text")
        .text(d3.min(uncertainties))
        .attr("x", 70)
        .attr("y", 30)

    svgLegend.append("text")
        .text(d3.max(uncertainties))
        .attr("x", 70)
        .attr("y", 130)


};


$(document).ready(
    drawLegend
);


