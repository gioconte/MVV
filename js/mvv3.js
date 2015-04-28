/**
 * Created by giorgioconte on 28/04/15.
 */

var width = window.innerWidth;
var height = window.innerHeight;
var radius = 8;
var duration = 7;
var t = 0;
var length = 30;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("rect")
    .attr("width",width)
    .attr("height",height)
    .attr("fill","#fff7bc");


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
    var linesGroup = svg.selectAll("line").data(data);

    linesGroup.enter().append("line")
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

    circleGroup = svg.selectAll("circle").data(data);


    circleGroup.enter()
        .append("circle")
        .attr("id", function(d){
            return d.id;
        })
        .attr("cx", function (d) {
            return d.cx;
        })
        .attr("cy", function(d){
            return d.cy;
        })
        .attr("r", radius)
        .attr("fill", "#2171b5");

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