/** table 생성 */
export function setTable(table){
  for (let i = 0; i <= 10; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j <= 10; j++) {
      let cell = row.insertCell(j);
      if (i === 0) {
        cell.innerHTML = j === 0 ? "" : String.fromCharCode(64 + j);
      } else if (j === 0) {
        cell.innerHTML = i;
      } else {
        cell.contentEditable = "true";
      }
    }
  }  
}

/** clear */
export function clear(table){
  while(table.firstChild) table.removeChild(table.firstChild);
  setTable(table);
}

/** csv 파일로 export */
export function exportTable2Csv(table, fileName){
  let csv = [];
  for (let i = 1; i < table.rows.length; i++) {
    let row = [];
    for (let j = 1; j < table.rows[i].cells.length; j++) {
      row.push(table.rows[i].cells[j].innerText);
    }
    csv.push(row.join(","));
  }
  let csvString = csv.join("\n");
  let blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

