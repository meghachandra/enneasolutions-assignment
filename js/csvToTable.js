var tables;
var jsonData = [];
var headers = [];
function upload() {
  var files = document.getElementById('fileUpload').files; //$("#fileUpload")[0].files;
  if (files.length == 0) {
    alert("Please choose a CSV file ");
    return;
  }
  var filename = files[0].name;
  var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
  if (extension == '.CSV') {
    $("#csvtable").html('');
    csvToJSON(files[0]);
  } else {
    alert("Please select a valid CSV file.");
  }
}



function csvToJSON(file) {
  try {
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function(e) {
      var rows = e.target.result.split("\r\n");
      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].split(",");
        var rowData = {};
        for (var j = 0; j < cells.length; j++) {
          if (i == 0) {
            var headerName = cells[j].trim();
            headers.push(headerName);
          } else {
            var key = headers[j];
            if (key) {
              rowData[key] = cells[j].trim();
            }
          }
        }

        if (i != 0) {
          jsonData.push(rowData);
        }
      }
      jsonToTable(jsonData);
    }
  } catch (e) {
    console.error(e);
  }
}

function jsonToTable(jsonData) {
  var table = $("#csvtable")[0];
  if (jsonData.length > 0) {
    var headers = Object.keys(jsonData[0]);
    var htmlHeader = '<thead class="table-dark"><tr>';

    for (var i = 0; i < headers.length; i++) {
      if (headers[i] != 'code' && headers[i] != 'company' && headers[i] != 'supplier')
        htmlHeader += '<th>' + headers[i] + '</th>';
    }
    htmlHeader += '<tr></thead>';

    var htmlBody = '<tbody>';
    for (var i = 0; i < jsonData.length; i++) {
      var row = jsonData[i];
      htmlBody += '<tr>';
      for (var j = 0; j < headers.length; j++) {
        if (headers[j] != 'code' && headers[j] != 'company' && headers[j] != 'supplier') {
          var key = headers[j];
          htmlBody += '<td>' + row[key] + '</td>';
        }
      }
      htmlBody += '</tr>';
    }
    htmlBody += '</tbody>';
    table.innerHTML = htmlHeader + htmlBody;
  } else {
    table.innerHTML = 'There is no data in CSV';
  }
  $("#csvtable thead tr")[1].remove();
  $("#sbox").show();
  tables = $("#csvtable").DataTable();
  $("#csvtable_filter").hide();
}

function Search() {
  var temp = $('#stext')[0]
  tables.column(0).search(temp.value).draw();
}
