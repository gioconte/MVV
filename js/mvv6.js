/**
 * Created by giorgioconte on 05/05/15.
 */

var width = window.innerWidth;
var height = window.innerHeight;
var radius = 10;
var hy1 = 350;
var hy2 = 350;
var duration = 800;
var length = 30;

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


var ellGroup = svg.selectAll(".ellipse").data(data);

ellGroup.enter()
    .append("ellipse")
    .classed("ellipse",true)
    .attr("cx", function (d) {
        return d.cx;
    })
    .attr("cy", function (d) {
        return d.cy;
    })
    .attr("rx", radius)
    .attr("ry", radius);


var update = function () {
    ellGroup.transition().duration(duration)
        .attr("ry", function (d) {
            return  d.cy *  d.uncertainty;
        })
        .attr("opacity", function (d) {
            return 1 - d.uncertainty;
        })

    ellGroup.transition().duration(duration).delay(duration)
        .attr("ry", function (d) {
            return  radius;
        })
        .attr("opacity","1");
}


window.setInterval(update, 2*duration);

