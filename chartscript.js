var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
		var lineChartData = {
			labels : [" "," "," "," "," "," ",time],
			datasets : [
				{
					label: "My First dataset",
					fillColor : "rgba(220,220,220,0.2)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					pointHighlightFill : "#fff",
					pointHighlightStroke : "rgba(220,220,220,1)",
					data : ["0","0","0","0","0","0",dB2]
				}
			]

		}

	window.onload = function(){
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx).Line(lineChartData, {
			responsive: true,
            scaleShowGridLines : false,
            pointDot : false,
            scaleOverride: true, scaleStartValue: 0, scaleStepWidth: 20, scaleSteps: 5
		});
	}
    var index = 1;
    setInterval(function() {
  myLine.removeData();
  myLine.addData([dB2],time);
  index++;
}, 1000);