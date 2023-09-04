import {setTable, clear, exportTable2Csv} from "./function.js"

const table = document.getElementById("spreadsheet");
const exportBtn = document.getElementById("export");
const clearBtn = document.getElementById("clear");
setTable(table);


/**
 * focus 되면 헤더 배경 파란색
 */
table.addEventListener("focusin", function (event) {
  let row = event.target.parentElement.rowIndex;
  let col = event.target.cellIndex;

  if (row > 0) table.rows[row].cells[0].classList.add("highlight");
  if (col > 0) table.rows[0].cells[col].classList.add("highlight");
});

/**
 * focus out 되면 헤더 배경 초기화
 */
table.addEventListener("focusout", function (event) {
  let row = event.target.parentElement.rowIndex;
  let col = event.target.cellIndex;

  if (row > 0) table.rows[row].cells[0].classList.remove("highlight");
  if (col > 0) table.rows[0].cells[col].classList.remove("highlight");
});

/** csv 파일로 export */
exportBtn.onclick = ()=> {
  const value = prompt('저장할 파일명을 입력하세요:');
  const inputValue = value.trim();
  exportTable2Csv(table,inputValue);
};

/**clear */
clearBtn.onclick = ()=> {clear(table)};

