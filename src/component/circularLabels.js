/**
 * Reusable Circular Labels Component
 *
 */
d3.ez.component.circularLabels = function module() {
  // Default Options (Configurable via setters)
  var width = 400;
  var height = 300;
  var radialScale;
  var radius;
  var capitalizeLabels = false;
  var textAnchor = "start";

  function my(selection) {
    selection.each(function(data) {
      var defaultRadius = Math.min(width, height) / 2;
      radius = (typeof radius === 'undefined') ? defaultRadius : radius;

      var labelsSelect = selection.selectAll('.circularLabels')
        .data(function(d) { return [d]; });

      var labels = labelsSelect.enter()
        .append("g")
        .classed("circularLabels", true)
        .merge(labelsSelect);

      // Labels
      var defSelect = labels.selectAll("def")
        .data([radius]);

      defSelect.exit()
        .remove();

      defSelect.enter()
        .append("def")
        .append("path")
        .attr("id", "label-path")
        .merge(defSelect)
        .attr("d", function(d) {
          return "m0 " + -d + " a" + d + " " + d + " 0 1,1 -0.01 0";
        });

      if (typeof radialScale.ticks === "function") {
				// scaleLinear
				var tickData = radialScale.ticks();


        // << temp start >>

        var min = d3.min(radialScale.domain());
        console.log(min);
        var max = d3.max(radialScale.domain());
        console.log(max);
        var range = max - min;
        var split = tickData.length;
        var each = range / split;

        //var newtick = tickData.map(function(d, i) {
        //  return (each * i).toFixed(0);
        //});

        var newtick = [];
        for (i = 0; i < split; i++) {
            newtick[i] = (each * i).toFixed(0);
        }

        console.log(newtick);
        //tickData = newtick;

        // << temp end >>


			} else {
				// scaleBand
				var tickData = radialScale.domain();


			}

      var textSelect = labels.selectAll("text")
        .data(function(d) {
          var textScale = d3.scaleLinear()
            .domain([0, tickData.length])
            .range(radialScale.range());

          return tickData.map(function(d, i) {
            return {
              text: d,
              offset: ((textScale(i) / 360) * 100)
            }
          });
        });

      textSelect.exit()
        .remove();

      textSelect.enter()
        .append("text")
        .style("text-anchor", textAnchor)
        .append("textPath")
        .attr("xlink:href", "#label-path")
        .text(function(d) {
          var text = d.text;
          return capitalizeLabels ? text.toUpperCase() : text;
        })
        .attr("startOffset", function(d) {
          return d.offset + "%";
        })
        .merge(textSelect);

      textSelect.transition()
        .select("textPath")
        .text(function(d) {
          var text = d.text;
          return capitalizeLabels ? text.toUpperCase() : text;
        })
        .attr("startOffset", function(d) {
          return d.offset + "%";
        });
    });
  }

  // Configuration Getters & Setters
  my.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return this;
  };

  my.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return this;
  };

  my.radius = function(_) {
    if (!arguments.length) return radius;
    radius = _;
    return this;
  };

  my.radialScale = function(_) {
    if (!arguments.length) return radialScale;
		radialScale = _;
    return my;
  };

  my.textAnchor = function(_) {
    if (!arguments.length) return textAnchor;
    textAnchor  = _;
    return this;
  };

  return my;
};
