
$(document).ready(function() {
  
  var data = {
      datasets: [{
          data: [
              20,
              16,
              10,
              7,
              18,
  			18,
  			20
          ],
          backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB",
  			"#E04321",
  			"#C8C7CB"
          ],
          label: 'My dataset' // for legend
      }],
      labels: [
          "Business Intelligence",
          "SQL",
          "Statistics",
          "Python",
          "Team Management"
  		"Platform Management"
  		"Communication"
      ]
  };

  var ctx = $('#badass_chart');
  
  new Chart(ctx, {
      data: data,
      type: 'polarArea'
      //options: options
  });
  
}); 
