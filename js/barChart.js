function metrics() {

  var xValues = ["Stock", "Deal", "Free", "MRP", "Rate"];
  var yValues = [sum, deal, free, maxMrp, maxRate];
  var barColors = ["red", "green", "blue", "orange", "brown"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Metrics for Aggregated values"
      }
    }
  });
}
