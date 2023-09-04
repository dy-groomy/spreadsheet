/** table 생성 */
export function setTable(table, numRow, numCol){
  clear(table);
  for (let i = 0; i <= numRow; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j <= numCol; j++) {
      let cell = row.insertCell(j);
      if (i === 0) {
        cell.innerHTML = j === 0 ? "" : getColumnName(j);
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

/** 행 추가 */
export function rowAdd(table){
  let numRows = table.rows.length-1;
  let numCols = table.rows[0].cells.length - 1;
  let row = table.insertRow(numRows+1);
  for (let j = 0; j <= numCols; j++) {
    let cell = row.insertCell(j);
    if (j === 0) {
      cell.innerHTML = numRows + 1;
    } else {
      cell.contentEditable = "true";
    }
  }
}

/**열 추가 */
export function colAdd(table){
  let numRows = table.rows.length-1;
  let numCols = table.rows[0].cells.length - 1;
  for (let i = 0; i <= numRows; i++) {
    let row = table.rows[i];
    let cell = row.insertCell(numCols+1);
    if (i === 0) {
      cell.innerHTML = getColumnName(numCols + 1);
    } else {
      cell.contentEditable = "true";
    }
  }
}


/** 파일 이름 테스트 */
export function fileNameTest(str){
  const validFileName = /^[a-zA-Z가-힣\-_]+$/;
  return validFileName.test(str);
}

function getColumnName(num) {
  let columnName = "";
  while (num > 0) {
    let remainder = (num - 1) % 26;
    columnName = String.fromCharCode(65 + remainder) + columnName;
    num = Math.floor((num - 1) / 26);
  }
  return columnName;
}
