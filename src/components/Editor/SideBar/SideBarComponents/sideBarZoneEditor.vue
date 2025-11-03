<script>
import {useEditorStore} from "@/stores/useEditorStore";
import eventBus from "@/eventBus/eventBus";
export default {
  methods : {
    useEditorStore,
    confirmZoneSelection(emitMessage){
      useEditorStore().switchSideBar('zoneList')
      useEditorStore().finishPlacing()
      eventBus.emit(emitMessage); // Emit the event
    },
    getRandomColor() {
        // Generate random values for red, green, and blue components
      return `#${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}`;
    },
    canBeConfirmed(){
      return (useEditorStore().mode.roomZone.zoneName !== '')
    }
  },
  created() {
    useEditorStore().mode.roomZone.color = this.getRandomColor()
  }
}
</script>

<template>
  <el-space direction="vertical" :fill="true" style="width: 100%">
    <el-input placeholder="Enter room name" v-model="useEditorStore().mode.roomZone.zoneName"></el-input>
    <el-space>
      <el-col><el-color-picker v-model="useEditorStore().mode.roomZone.color"></el-color-picker></el-col>
      <el-col><el-text>Choose color</el-text></el-col>
    </el-space>
    <el-button @click="confirmZoneSelection('confirmRoomZone')" :disabled="!this.canBeConfirmed()">Confirm</el-button>
    <el-button @click="confirmZoneSelection('cancelRoomZone')">Cancel</el-button>
  </el-space>
</template>

<style scoped>

</style>