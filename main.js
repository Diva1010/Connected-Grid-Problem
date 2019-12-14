var grid = [];
var seen = [];
var connectedMatrix = [];
var selectedCellElement = {
    row : 0,
    column : 0
};
var selectedBackgroundColor = '';
var hoverColor = '';

document.addEventListener('DOMContentLoaded', function(){ 
    let size = document.getElementById('sizeSelector').value;
    renderGrid(size);
}, false);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 

function generateGrid(size){
    grid = []
    for(var i =0 ;i< size; i++){
        grid[i] = []
        for(var j=0; j<size; j++){
           grid[i][j] = getRandomInt(0,1);
        }
    } 
}

function renderGrid(gridSize){
    document.getElementById('grid').innerHTML = '';
    generateGrid(gridSize);
    grid.forEach((row, i) => {
        let gridRow = '<div class="row" style="grid-template-columns: repeat('+gridSize+', 100px)">';
        row.forEach((column, j) => {
            gridRow+= '<div id="cell_'+i+''+j+'" class="cell'+ (column?' filled"':'"') + 
            'onclick="calculateConnectedGrids('+ i + ','+ j +')"' + 
            'onmouseover="highLightConnectedGrids('+ i + ','+ j +')"'+
            'onmouseout = removeHighlight()></div>'
        })
        document.getElementById('grid').innerHTML += gridRow
    });
    selectedBackgroundColor = document.getElementById('backGroundColor').value;
    hoverColor = document.getElementById('hoverColor').value;
    changeBackgroundColor(selectedBackgroundColor);
}

function findConectedMatrix(selectedRow, selectedCell){
    var START_OF_GRID = 0;
    var rowStart  = Math.max( selectedRow - 1, START_OF_GRID   );
    var rowFinish = Math.min( selectedRow + 1, grid.length - 1 );
    var colStart  = Math.max( selectedCell - 1, START_OF_GRID   );
    var colFinish = Math.min( selectedCell + 1, grid[0].length - 1 );
    
for ( var curRow = rowStart; curRow <= rowFinish; curRow++ ) {
    for ( var curCol = colStart; curCol <= colFinish; curCol++ ) {
        if(grid[curRow][curCol] && seen[curRow][curCol] !== 1 && (!(selectedRow !== curRow && selectedCell !== curCol))){
            seen[curRow][curCol] = 1;
            if(!(curRow === selectedRow && curCol === selectedCell) ){
                findConectedMatrix(curRow, curCol)
            }
            connectedMatrix.push([curRow,curCol]);
        }
            
    }
} 
}

function calculateConnectedGrids(row, column){
    connectedMatrix = [];
    seen = new Array(grid.length).fill(0).map(() => new Array(grid.length).fill(0));
    if(grid[row][column]){
        findConectedMatrix(row, column)
        document.getElementById('cell_'+selectedCellElement.row+''+selectedCellElement.column).innerText = '';
        selectedCellElement = {row , column}
        document.getElementById('cell_'+row+''+column).innerText = connectedMatrix.length;
    } 
    else{
        document.getElementById('cell_'+selectedCellElement.row+''+selectedCellElement.column).innerText = '';
        
    }
    
}

function highLightConnectedGrids(row, column){
    seen = new Array(grid.length).fill(0).map(() => new Array(grid.length).fill(0));
    connectedMatrix = [];
    if(grid[row][column]){
        findConectedMatrix(row, column)
        connectedMatrix.forEach( connectedCell  => {
            document.getElementById('cell_'+connectedCell[0]+''+connectedCell[1]).style.backgroundColor = hoverColor;
        })
    } 

}

function removeHighlight(){
    connectedMatrix.forEach( connectedCell  => {
        document.getElementById('cell_'+connectedCell[0]+''+connectedCell[1]).style.background = selectedBackgroundColor;
    });
}

function changeBackgroundColor(value){
    selectedBackgroundColor = value
    var ele = document.querySelectorAll('.filled');
    ele.forEach((cell) => {
        cell.style.backgroundColor = selectedBackgroundColor;
    })
}

function changeHoverColor(value){
    hoverColor = value;
}

function updatesliderVal(value){
    document.getElementById('rangeVal').innerText = value;
}