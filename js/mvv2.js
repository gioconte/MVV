/**
 * Created by giorgioconte on 27/04/15.
 */

var width = window.innerWidth;
var height = window.innerHeight;
var radius = 8;
var svgLegend;

var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

svg.append("rect")
    .attr("width",width)
    .attr("height",height)
    .attr("fill","#fff7bc");

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
    .range(['#66c2a4','#2ca25f','#006d2c']);

var g = svg.append("g");

g = svg.selectAll("circle").data(data);


g.enter().append("circle")
    .attr("id", function(d){return d.id})
    .attr("cx", function(d) {return d.cx})
    .attr("cy", function(d) {return d.cy})
    .attr("r",radius)
    .attr("fill", function(d){return quantileScale(d.uncertainty)});

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

        svgLegend.append("text").text("Level Of Uncertainty")
            .attr("x", 10)
            .attr("y", 30);
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



