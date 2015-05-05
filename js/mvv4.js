/**
 * Created by giorgioconte on 27/04/15.
 */

var width = window.innerWidth;
var height = window.innerHeight;
var radius = 8;
var svgLegend;
var hy1 = 350;
var hy2 = 350;

var colors = ['#08519c','#3182bd', '#6baed6'];

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

var quantileScale = d3.scale.quantile()
    .domain(uncertainties)
    //.range(['#66c2a4','#2ca25f','#006d2c']);
.range(colors)

var g = svg.append("g");

g = svg.selectAll("circle").data(data);


g.enter().append("circle")
    .attr("id", function(d){return d.id})
    .attr("cx", function(d) {return d.cx})
    .attr("cy", function(d) {return d.cy})
    .attr("r",radius)
    .attr("fill", function(d){return quantileScale(d.uncertainty)})
    .style({
        "stroke-width" : "2px",
        "stroke": "black"
    });

//var legendGroup = svg.append("g").classed("legendGroup");

//var svgLegend = d3.select("#legend");
var i=0;

/*
svgLegend.append("circle")
.attr("cx", 20)
.attr("cy", 20)
.attr("r", 5)
.attr("fill", "green");
*/

var drawLegend = function () {
    svgLegend = d3.select("#legend");

    var min = d3.min(uncertainties);
    var max = d3.max(uncertainties);

    svgLegend.append("text").text("Level Of Uncertainty")
        .attr("x", 10)
        .attr("y", 30);





    /* this somehow works


    var verticalLegend = d3.svg.legend()
        .labelFormat("none").cellPadding(5).orientation("vertical")
        .units("Things in a List").cellWidth(25).cellHeight(18)
        .inputScale(quantileScale).cellStepping(10);

    svgLegend.append("g").attr("transform", "translate(10,50)").attr("class", "legend").call(verticalLegend);*/


    var quantiles = quantileScale.quantiles();
    var l = quantiles.length;
    for(i = 0; i < l + 1; i++){
        var color;
        var leftRange;
        var rightRange;

        if( i == 0){

            color = quantileScale(min);
            leftRange = round(min,2);
            rightRange = round(quantiles[i],2);

        } else if(i == quantiles.length ){

            color = quantileScale(max);

            leftRange = round(quantiles[i - 1],2);
            rightRange = round(max,2);

        } else{

            leftRange = round(quantiles[i - 1 ],2);
            rightRange = round(quantiles[i],2);

            color = quantileScale((leftRange + rightRange)/2);
        }

        var y = 30 + i*35;
        var elementGroup = svgLegend.append("g")
            .attr("transform","translate(10,"+y+")")
            .attr("id",i);

        elementGroup.append("rect")
            .attr("x",5)
            .attr("y",10)
            .attr("width", 30)
            .attr("height", 30)
            .attr("fill", color);

        elementGroup.append("text")
            .text(leftRange + " - " + rightRange )
            .attr("font-family","'Open Sans',sans-serif")
            .attr("font-size","20px")
            .attr("x",45)
            .attr("y",20)
            .attr("text-anchor","left")
            .attr("dy",12)
            .attr("fill","black");

    }
};

$(document).ready(
    drawLegend
);


var round = function(number, digits){
    digits = Math.pow(10,digits);
    return Math.round(number*digits)/digits;

}



