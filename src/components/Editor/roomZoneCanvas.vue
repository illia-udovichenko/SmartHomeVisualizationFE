<template>
  <div class="grid">
    <div v-for="(row, y) in grid" :key="'row-' + y" class="grid-row">
      <div
          v-for="(cell, x) in row"
          :key="'cell-' + y + '-' + x"
          class="grid-cell"
          @click="toggleCellState(x, y)"
          :style="{ backgroundColor: cell.active ? cell.color : 'transparent' }"
      >
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, watch} from 'vue';
import { useUserStore } from "@/stores/useUserStore";
import {useEditorStore} from "@/stores/useEditorStore";
import eventBus from '@/eventBus/eventBus';
import {useProjectStore} from "@/stores/useProjectStore";

let width = useProjectStore().x;
let height = useProjectStore().y;

let grid = [];

function createGrid() {
  width = useProjectStore().x;
  height = useProjectStore().y
  grid = reactive(Array.from({length: height}, (_, y) =>
      Array.from({length: width}, (_, x) => ({
        active: (useUserStore().getCellColor(x, y) !== 'black'),
        color: useUserStore().getCellColor(x, y)
      }))
  ));
}

//new roomZone
let tmpAdd = {
  name : useEditorStore().mode.roomZone.zoneName,
  color: useEditorStore().mode.roomZone.color,
  coordinates : []
}

let tmpRemove = []

// Toggle the active state of a cell
const toggleCellState = (x, y) => {
  if (!grid[y][x].active){
    //add zone to an empty cell
    grid[y][x].color = useEditorStore().mode.roomZone.color
    tmpAdd.coordinates.push({
      x : x,
      y: y
    })
  }
  //active cell
  else {
    const indexToRemoveTmpAdd = tmpAdd.coordinates.findIndex(coord => coord.x === x && coord.y === y);
    //new zone colored cell
    if (indexToRemoveTmpAdd !== -1) {
      tmpAdd.coordinates.splice(indexToRemoveTmpAdd, 1);
      const indexToRemoveTmpRemove = tmpRemove.findIndex(coord => coord.x === x && coord.y === y);
      //was assigned to an existing zone before, return to initial state
      if (indexToRemoveTmpRemove !== - 1) {
        tmpRemove.splice(indexToRemoveTmpRemove, 1);
        grid[y][x].color = useUserStore().getCellColor(x, y);
        return
      }
    }
    //existing zone cell
    else {
      //reassign cell to a new roomZone
      grid[y][x].color = useEditorStore().mode.roomZone.color
      tmpAdd.coordinates.push({
        x : x,
        y: y
      })
      tmpRemove.push({
            x : x,
            y : y
          })
      return
    }
  }
  grid[y][x].active = !grid[y][x].active;
};

if (typeof eventBus !== 'undefined') {
  eventBus.on('confirmRoomZone', () => {
    if (typeof eventBus !== 'undefined' && tmpAdd.coordinates.length !== 0) {
      for (let tmpRemoveElement of tmpRemove) {
        useUserStore().removeRoomZoneCell(tmpRemoveElement.x, tmpRemoveElement.y)
      }
      //todo: in addition to local saving, post zapros to backend
      useProjectStore().zones.push(
          {
            name : tmpAdd.name.value,
            color: tmpAdd.color.value,
            coordinates : tmpAdd.coordinates
          }
      )
      tmpAdd.coordinates = []
      tmpRemove = []
    }
  })
  eventBus.on('cancelRoomZone', () => {
    if (typeof eventBus !== 'undefined') {
      tmpAdd.coordinates = []
      tmpRemove = []
    }
  })
}

watch(() => useEditorStore().mode.roomZone.zoneName, () => {
  tmpAdd.name = useEditorStore().mode.roomZone.zoneName;
});

watch(() => useEditorStore().mode.roomZone.color, () => {
    tmpAdd.color = useEditorStore().mode.roomZone.color;
    for (let i = 0; i < tmpAdd.coordinates.length; i++) {
      grid[tmpAdd.coordinates[i].x][tmpAdd.coordinates[i].y].color = tmpAdd.color
    }
});

watch([() => useEditorStore().mode.roomZone.show, ()=> useEditorStore().deleteRoomZone()], () => {
  createGrid(); // Call createGrid when either value changes
});

</script>

<style>
.grid {
  display: flex;
  flex-direction: column;
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
