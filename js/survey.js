
$(document).ready(function() {
  
var data2 = {
    labels: ["Customers knew who the team was", "Customers knew support member by name", "Customers were satisfied with platform support", "Customers felt they understood platform direction", "% would reccomend team", "Technologies fit needs", "I like James"],
    datasets: [
        {
            label: "Results of pre- James Customer satisfation survey",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [10, 5, 25, 6, 45, 50, 0]
        },
        {
            label: "James' Ideal Environement",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [100, 91, 93, 84, 96, 82, 100]
        }
    ]
};

 var ctr = $('#2badass_chart');
  
var myRadarChart = new Chart(ctr, {
    type: 'radar',
    data: data2,
    //options: options
});  
  
}); 
