var sum = 0;
var deal = 0;
var free = 0;
var maxMrp = 0;
var maxRate = 0;
var near = 0;

function aggregateByName() {
  var sname = $("#sname").val();
  for (var i = 0; i < jsonData.length; i++) {
    if (jsonData[i]['name'] === sname) {

      if (jsonData[i]['stock'] != 'undefined') {
        sum = sum + parseInt(jsonData[i]['stock']);
      }
      if (jsonData[i]['deal'] != 'undefined') {
        deal = jsonData[i]['deal'];
      }
      if (jsonData[i]['free'] != 'undefined') {
        var free = jsonData[i]['free'];
      }
      if (jsonData[i]['mrp'] != 'undefined') {

        var mrp = parseFloat(jsonData[i]['mrp']);
        if (maxMrp > mrp) {
          maxMrp = mrp;
        }
      }
      if (jsonData[i]['rate'] != 'undefined') {

        var rate = parseFloat(jsonData[i]['raet']);
        if (maxRate < rate) {
          maxRate = rate;
        }
      }
      if (jsonData[i]['exp'] != 'undefined') {
        var exp = jsonData[i]['exp'];
        var myDate = new Date(exp);
        var result = myDate.getTime();
        if (near < result) {
          near = result;
          const date = new Date(near);
        }
      }
    }
  }
  aggregateTable();
  metrics();
}

function aggregateTable() {
  var table = $("#aggregateTable")[0];
  if (jsonData.length > 0) {
    var headers = Object.keys(jsonData[0]);
    var htmlHeader = '<thead class="table-dark"><tr>';

    for (var i = 0; i < headers.length; i++) {
      if (headers[i] != 'code' && headers[i] != 'company' && headers[i] != 'supplier')
        htmlHeader += '<th>' + headers[i] + '</th>';
    }
    htmlHeader += '<tr></thead>';
    var htmlBody = '<tbody>';
    var row;
    htmlBody += '<tr>';
    htmlBody += '<td>' + $("#sname").val() + '</td>';
    htmlBody += '<td>ALL</td>';
    htmlBody += '<td>' + sum + '</td>';
    htmlBody += '<td>' + deal + '</td>';
    htmlBody += '<td>' + free + '</td>';
    htmlBody += '<td>' + maxMrp + '</td>';
    htmlBody += '<td>' + maxRate + '</td>';
    htmlBody += '<td>' + near + '</td>';
  }
  htmlBody += '</tr>';
  htmlBody += '</tbody>';
  table.innerHTML = htmlHeader + htmlBody;
}
