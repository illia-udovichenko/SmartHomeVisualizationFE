<template>
  <div class="grid">
    <div v-for="(row, y) in grid" :key="'row-' + y" class="grid-row">
      <div
          v-for="(cell, x) in row"
          :key="'cell-' + y + '-' + x"
          class="grid-cell"
          @click="toggleCellState(x, y)"
          :style="{
            //backgroundImage: cell.active ? `url('${cell.imageURL}')` : 'none', /* Set image background when active */
            backgroundColor : cell.active ? 'red' : 'transparent' ,
            backgroundSize: 'cover', /* Ensure the image covers the entire cell */
            backgroundRepeat: 'no-repeat' /* Prevent image from repeating */
          }"
      >
        <el-text v-show="cell.names.length !== 0">{{cell.names.length}}</el-text>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch,} from 'vue';
//watch
import { useUserStore } from "@/stores/useUserStore";
import {useEditorStore} from "@/stores/useEditorStore";
import {useConstStore} from "@/stores/useConstStore";
import {useProjectStore} from "@/stores/useProjectStore";
//import {useEditorStore} from "@/stores/useEditorStore";
//import eventBus from '@/eventBus/eventBus';

const width = ref(useProjectStore().x);
const height = ref(useProjectStore().y);

let grid = [];

function createGrid() {
  grid = (Array.from({length: height.value}, (_, y) =>
      Array.from({length: width.value}, (_, x) => ({
        active: (useUserStore().getSensor(x, y).length !== 0) ,
        //imageURL: (useUserStore().getSensor(x, y).length > 1) ? useConstStore().sensorIcons.group : useUserStore().getSensor(x, y)[0].img,
        imageURL: (useUserStore().getSensor(x, y).length === 0)
            ? ''
            : (useUserStore().getSensor(x, y).length === 1)
                ? useUserStore().getSensor(x, y)[0].img
                : useConstStore().sensorIcons.group,
        names : useUserStore().getSensor(x, y).map(sensor => sensor.name)
      }))
  ));
}
createGrid()
watch([() => useEditorStore().mode.sensor.show], () => {
  createGrid(); // Call createGrid when either value changes
});


//new roomZone
/*
let tmp = {
  name : ref(useEditorStore().mode.roomZone.zoneName),
  color: ref(useEditorStore().mode.roomZone.color),
  coordinates : []
} */

// Toggle the active state of a cell
const toggleCellState = (x, y) => {
  if (grid[y][x].active){
    const lengthOfGrid = grid[y][x].length
    if (lengthOfGrid === 0){
      grid[y][x].names.push(useEditorStore().mode.sensor.activeSensor)
      createGrid()
    } else if (lengthOfGrid === 1) {
      //open sensor editor
    } else {
      //open sensor list
    }
  }
};

/*
if (typeof eventBus !== 'undefined') {
  eventBus.on('confirmRoomZone', () => {
    if (typeof eventBus !== 'undefined' && tmp.coordinates.length !== 0) {
      useUserStore().getActiveProject.zones.push(
          {
            name : tmp.name,
            color: tmp.color,
            coordinates : tmp.coordinates
          }
      )
      tmp.coordinates = []
    }
  })
  eventBus.on('cancelRoomZone', () => {
    if (typeof eventBus !== 'undefined') {
      tmp.coordinates = []
    }
  })
}

watch(() => useEditorStore().mode.roomZone.zoneName, () => {
  tmp.name = ref(useEditorStore().mode.roomZone.zoneName);
});

watch(() => useEditorStore().mode.roomZone.color, () => {
    tmp.color = ref(useEditorStore().mode.roomZone.color);
    for (let i = 0; i < tmp.coordinates.length; i++) {
      grid[tmp.coordinates[i].y][tmp.coordinates[i].x].color = tmp.color
    }
});

watch([() => useEditorStore().mode.sensor], () => {
  // Your logic here
  createGrid(); // Call createGrid when either value changes
});
*/
</script>

<style>
.grid {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
}
.grid-row {
  display: flex;
}
.grid-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid transparent;
}
</style>
