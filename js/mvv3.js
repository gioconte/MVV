/**
 * Created by giorgioconte on 28/04/15.
 */

var width = window.innerWidth;
var height = window.innerHeight;
var radius = 8;
var duration = 7;
var t = 0;
var length = 30;
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


var circleGroup  = svg.append("g").classed("group");
/*
circleGroup = svg.selectAll("group.circle").data(data);

circleGroup.enter()
    .append("circle")
    .attr("cx", function (d) {
        return d.cx;
    })
    .attr("cy", function(d){
        //return d.cy * (1 + Math.sin(t) / (1 - d.uncertainty));
        console.log(d.cy);
        return d.cy * (1 + Math.sin(t) / (1 - d.uncertainty)); ;
    })
    .attr("r", radius)
    .attr("fill", "#2171b5");*/

var update = function () {
    var linesGroup = svg.selectAll(".avg").data(data);

    linesGroup.enter().append("line").classed("avg",true)
        .attr("x1", function(d) {return d.cx - length/2})
        .attr("x2", function (d) {
            return d.cx + length/2;
        })
        .attr("y1", function (d) {
            return d.cy;
        })
        .attr("y2", function(d){
            return d.cy;
    })
        .style({
            "stroke" : "rgb(255,0,0)",
            "stroke-width" : "3"
        }
);



    circleGroup = svg.selectAll(".dots").data(data);


    circleGroup.enter()
        .append("circle")
        .classed("dots",true)
        .attr("id", function(d){
            return d.id;
        })
        .attr("cx", function (d) {
            return d.cx;
        })
        .attr("cy", function(d){
            return d.cy;
        })
        .attr("r", radius);


    circleGroup.transition().duration(duration)
        .attr({
            transform: function(d) {
                var frequency = Math.pow((1/(4*(1 - d.uncertainty))),3);

                var y = 3 * Math.sin( t * frequency);

                return "translate(" + [0, y] + ")"; }
        });


};



update();
window.setInterval(switchData, duration);

function switchData() {
    t = t+1;

   /* data.forEach(function(d){

       d.cy = d.cy * (1 + Math.sin(t) / (1 - d.uncertainty));
        return;
    });*/
    update();
}