<template>
  <div class="grid-with-lines">
    <canvas ref="canvas" :width="width" :height="height" @click="addPoint" @dblclick="finishLine"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
//import {useEditorStore} from "@/stores/useEditorStore";
import {useProjectStore} from "@/stores/useProjectStore";

let columns = 10; // Количество колонок
let rows = 10; // Количество строк

const cellSize = 50; // Размер клетки сетки
let width = columns * cellSize;  // Ширина холста
let height = rows * cellSize; // Высота холста




//vars init
const lines = reactive([]); // Реактивный массив массивов точек для каждой линии
const currentPoints = reactive([]); // Текущий массив точек для рисования
const canvas = ref(null);
const ctx = ref(null);

//get vars from global state


onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext('2d');
    drawGrid();
  }
});

// Рисование сетки
function drawGrid() {
  //columns = useProjectStore().y;
  //columns = useProjectStore().x;
  width = columns * cellSize;  // Ширина холста
  height = rows * cellSize; // Высота холста
  console.log('x: ', rows, 'y: ', columns);
  // Clear the canvas
  ctx.value.clearRect(0, 0, width, height);
  // Draw the grid lines
  ctx.value.beginPath();
  for (let i = 0; i <= rows; i++) {
    ctx.value.moveTo(0, i * cellSize);
    ctx.value.lineTo(width, i * cellSize);
  }
  for (let j = 0; j <= columns; j++) {
    ctx.value.moveTo(j * cellSize, 0);
    ctx.value.lineTo(j * cellSize, height);
  }
  ctx.value.strokeStyle = '#ddd';
  ctx.value.lineWidth = 2;
  ctx.value.stroke();

  // Draw other elements like lines and points
  lines.forEach(line => drawLines(line)); // Draw all lines
  drawPoints(currentPoints); // Draw visual points on the grid
  //todo: fix failing of the editor
  drawLines(useProjectStore().constructions.walls);
  //drawLines(useProjectStore().constructions.windows, 'window');
  //drawLines(useProjectStore().doors, 'door');
}

// Function to handle point addition and line drawing
function addPoint(event) {
  // Get the position of the canvas relative to the viewport
  const rect = canvas.value.getBoundingClientRect();
  // Calculate the coordinates of the click relative to the canvas
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  // Round the coordinates to the nearest multiple of cellSize
  const x = Math.round(clickX / cellSize) * cellSize;
  const y = Math.round(clickY / cellSize) * cellSize;
  // Check if the clicked point already exists in the currentPoints array
  /*if (currentPoints.length > 0 && currentPoints.some(p => p.x === x && p.y === y)) {
    return; // Ignore the click if it's on an existing point (possible double-click)
  }*/
  currentPoints.push({ x, y });
  drawGrid(); // Redraw everything
}

// Function to draw lines between points for any given line array
function drawLines(points, type) {
  if (points.length < 2) return;
  ctx.value.beginPath();
  ctx.value.moveTo(points[0].x, points[0].y);
  points.forEach((point, index) => {
    if (index > 0) {
      ctx.value.lineTo(point.x, point.y);
    }
  });
  //tmp style vars
  let tmpStrokeStyle = '#000000';
  let tmpLineWidth = 2;
  //switch based on constructionType
  switch(type){
    case "door": {
      tmpStrokeStyle = '#A52A2A';
      tmpLineWidth = '3';
      break;
    }
    case "window": {
      tmpStrokeStyle = '#0000FF';
      tmpLineWidth = '3';
      break;
    }
  }
  ctx.value.strokeStyle = tmpStrokeStyle;
  ctx.value.lineWidth = tmpLineWidth;
  ctx.value.stroke();
}

// Function to draw points for any given points array
function drawPoints(points) {
  points.forEach(point => {
    ctx.value.beginPath();
    ctx.value.arc(point.x, point.y, 5, 0, 2 * Math.PI); // Draw circle at point
    ctx.value.fillStyle = 'red'; // Fill with red color
    ctx.value.fill();
  });
}

// Handle double-click to finish line drawing
function finishLine(event) {
  if (currentPoints.length > 1) {
    const rect = canvas.value.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    const x = Math.round(clickX / cellSize) * cellSize;
    const y = Math.round(clickY / cellSize) * cellSize;
    const lastPoint = currentPoints[currentPoints.length - 1];
    if (lastPoint.x === x && lastPoint.y === y) {
      //todo: ilja posts
      /*
      useUserStore().$patch( (state) => {
        for (let currentPoint of currentPoints) {
          switch (useEditorStore().mode.construction.constructionMode) {
            case "wall": {
              state.projects[state.activeProject].constructions.walls.push(currentPoint)
              break
            }
            case "window": {
              state.projects[state.activeProject].constructions.windows.push(currentPoint)
              break
            }
            case "door": {
              state.projects[state.activeProject].constructions.doors.push(currentPoint)
              break
            }
          }
        }
        state.hasChanged = true
      })
     */
      lines.push([...currentPoints]); // Add the current line to lines array
      // в зависимости от режима строительства менять массив
      currentPoints.length = 0; // Reset currentPoints to start a new line next time
      drawGrid();
    }
  }
}
</script>

<style>
.grid-with-lines canvas {
  cursor: pointer;
  margin-top: 100px;
}
</style>
