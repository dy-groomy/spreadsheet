import {setTable, clear, exportTable2Csv, fileNameTest, rowAdd, colAdd} from "./function.js"

const table = document.getElementById("spreadsheet");
const createBtn = document.getElementById("createSpreadSheet");
const exportBtn = document.getElementById("export");
const clearBtn = document.getElementById("clear");
const rowAddBtn = document.getElementById("rowAdd");
const colAddBtn = document.getElementById("colAdd");


/**
 * 표 생성 
 * 
 * */
createBtn.onclick = () =>{
  const numRow = Number(document.getElementById("numRow").value);
  const numCol = Number(document.getElementById("numCol").value);

  if(Number.isInteger(numRow)&&Number.isInteger(numCol)&&numRow>0&&numCol>0)
  {    
    setTable(table,numRow,numCol);
    return;
  } 
  else{    
    alert("행, 열 수를 다시 입력하세요.");
    return;
  }

}

/**clear */
clearBtn.onclick = ()=> {clear(table);};

rowAddBtn.onclick = () =>{rowAdd(table);};

colAddBtn.onclick = () =>{colAdd(table);};
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
  const validFileName = fileNameTest(inputValue);
  if(!validFileName){
    alert("제대로된 파일명이 입력되지 않았습니다.");
    return;
  } 

  exportTable2Csv(table,inputValue);
};


