 
export function AddGraph(projectXp , Attempts) { 
    google.charts.load('current', {'packages':['corechart' , 'bar']});
    let DrawGraphs = DrawGraph.bind([projectXp , Attempts])
    google.charts.setOnLoadCallback(DrawGraphs);
}

function DrawGraph() {
    drawBarColors(this[0])
    DrawAttempsPerExo(this[1])
}

function drawBarColors(data) {
   var data = google.visualization.arrayToDataTable(sumAmountsByDate(data));
   var options = {
      title: 'Company Performance',
      chartArea: {width: '60%'},
      hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
      vAxis: {minValue: 0}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

  function DrawAttempsPerExo(data) {
    var data = google.visualization.arrayToDataTable(DataGraph(data));

    var options = {
      title: 'Attemp number per execice',
      chartArea: {width: '60%'},
      colors: ['#0492C2', '#ffab91'],
      hAxis: {
        title: '',
        minValue: 0
      },
      vAxis: {
        title: 'City'
      }
    };
    var chart = new google.visualization.BarChart(document.getElementById('chart_div1'));
    chart.draw(data, options);
  }

  function DataGraph(data) {
    let res = [['Exercices', 'Attemps per exercice', ]]

    data.forEach(el => {
      res.push([el.object.name , el.object.progresses_aggregate.aggregate.count])
    })
    return res
  }
 function sumAmountsByDate(inputArray) {
  let res = [['Projets', 'xp per project', ]]
  const result = {};
  inputArray.forEach((item) => {
    const { amount, createdAt } = item;
    if (result[createdAt.slice(0,7)]) {
      result[createdAt.slice(0,7)] += amount/1000;
    } else {
      result[createdAt.slice(0,7)] = amount/1000;
    }
  });
  let final = Object.keys(result).map((createdAt) => ([ createdAt,  result[createdAt] ]));
  res.push(...final)
  return res
}