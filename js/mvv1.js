/**
 * Created by giorgioconte on 16/04/15.
 */

var width = window.innerWidth;
var height = window.innerHeight;
var length = 30;
var hy1 = 350;
var hy2 = 350;

var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        ;

var rectangle = svg.append("rect")
                    .attr("width",width)
                    .attr("height",height)
                    .attr("fill","#fff7bc");


//vertical line;
//grey rgb(149, 165, 166)
svg.append("line")
    .attr("id","vertical")
    .attr("x1", 50)
    .attr("x2",50)
    .attr("y1", 50)
    .attr("y2", hy1 + 10)
    .style({
        "stroke" : "rgb(0, 0, 0)",
        "stroke-width" : "3"
    });

//horizontal line
svg.append("line")
    .attr("id","horizontal")
    .attr("x1", 40)
    .attr("x2", 450)
    .attr("y1", hy1)
    .attr("y2", hy2)
    .style({
        "stroke" : "rgb(0, 0, 0)",
        "stroke-width" : "3"
    });

//time label

svg.append("text")
    .text("time")
    .attr("x", 430)
    .attr("y", hy1 + 30);

var plus = 0;
var radius = 10;
var duration = 900;

var Color = net.brehaut.Color;

//green
//var color = Color("#addd8e");

//blue
var color = Color("#31a354");


var update = function() {

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

    var uncertainGroup = svg.append("g").
    uncertainGroup = svg.selectAll("circle").data(data);



    uncertainGroup.enter().append("circle")
        .attr("id", function(d){return d.id})
        .attr("r", function (d) {
            return d.computedValue;
        })
        .attr("cx", function (d) {
            return d.cx;
        })
        .attr("cy", function(d){
            return d.cy;
        })
        .attr("fill", color)
        ;


    uncertainGroup.transition().duration(duration)
        .attr({
            transform: function(d) {
                var y;
                y = - d.cy *  d.uncertainty;

                return "translate(" + [0, y] + ")"; }
        })
        .attr("r", function (d){
            return radius * (1- d.uncertainty);
        });

    uncertainGroup.transition().duration(duration).delay(duration)
        .attr({
            transform: function(d) {

                return "translate(" + [0, 0] + ")"; }
        }).attr("r", function (d){
            return radius;
        });

    uncertainGroup.transition().duration(duration).delay(2*duration)
        .attr({
            transform: function(d) {
                var y;
                y = d.cy *  d.uncertainty;
                return "translate(" + [0, y] + ")"; }
        })
        .attr("r", function (d){
            return radius * (1- d.uncertainty);
        });

    uncertainGroup.transition().duration(duration).delay(3*duration)
        .attr({
            transform: function(d) {

                return "translate(" + [0, 0] + ")"; }
        })
        .attr("r", radius);




    /*
    circles.transition().duration(300)
        .attr({
        transform: function(d) {
            var x;
            var y;
            if(plus == 1){
                //x = d.cx * (1 + d.uncertainty);
                y = d.cy * (1 + d.uncertainty);
            } else {
                //x = d.cx * (1 - d.uncertainty);
                y = d.cy * (1 - d.uncertainty);
            }
            return "translate(" + [d.cx, y] + ")"; }
        })
        .attr("r",function(d) {
            var identifier = "#"+ d.id;
            //var fac = (d3.select(identifier).attr("cy") - d.cy)/(2* d.uncertainty* d.cy);

            console.log(d.computedValue * (1+fac));
            console.log("ciao");
            return d.computedValue * (1+fac);
          })/*
        .attr("fill",function(d) {
            if(plus == 1)
                return color.lightenByRatio(d.uncertainty);
            return color.darkenByRatio(d.uncertainty);
        });*/

    uncertainGroup.exit().remove();


};

/*
var UpEndPointsGroup = svg.append("g");

UpEndPointsGroup.selectAll("g.circle").data(data)
    .enter().append("circle")
    .attr("r",radius)
    .attr("cx", function (d) {
        return d.cx;
    })
    .attr("cy", function (d) {
        return d.cy * (1+ d.uncertainty);
    })
    .style("fill-opacity",0.4);

var DownEndPointsGroup = svg.append("g");

DownEndPointsGroup.selectAll("g.circle").data(data)
    .enter().append("circle")
    .attr("r",radius)
    .attr("cx", function (d) {
        return d.cx;
    })
    .attr("cy", function (d) {
        return d.cy * (1 - d.uncertainty);
    })
    .style("fill-opacity",0.4);*/

update();
window.setInterval(switchData, 4*duration);

function switchData() {
    plus = (plus == 0) ? 1: 0;
    data.forEach(function (d){
        var value;
        if (plus == 0)
            value = d.realValue* (1-d.uncertainty);
        else
            value = d.realValue*(1+d.uncertainty);

        d.computedValue = value;
    });
    update();
}

