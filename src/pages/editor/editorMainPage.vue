<script>
import { useUserStore } from '@/stores/useUserStore'
import {useEditorStore} from "@/stores/useEditorStore";
import {useProjectStore} from "@/stores/useProjectStore";
import ToolBar from "@/components/Editor/ToolBar/toolBar.vue";
import SideBar from "@/components/Editor/SideBar/sideBar.vue";
import ConstructionCanvas from "@/components/Editor/constructionCanvas.vue";
import RoomZoneCanvas from "@/components/Editor/roomZoneCanvas.vue";
import SensorCanvas from "@/components/Editor/sensorCanvas.vue";

export default {
  methods: {useEditorStore, useProjectStore},
  components : {
    SensorCanvas,
    RoomZoneCanvas,
    ConstructionCanvas,
    SideBar,
    ToolBar
  },
  data() {
    return {
      user : useUserStore(),
      project: useProjectStore(),
      editor : useEditorStore(),
      test : false
    }
  },
  created(){
    this.user.isAuthenticated();
    this.project.getProjectInfo();
    this.editor.finishPlacing();
  },
}
</script>

<template>
  <div>
    <tool-bar style="z-index: 2"></tool-bar>
    <side-bar style="z-index: 2"></side-bar>
  </div>
  <!-- todo -->
  <div style="margin-left: 250px">
    <construction-canvas
        class="overlay-element"
        ref="canvas"
        v-show="useEditorStore().mode.construction.show"
        :style="{'pointer-events': useEditorStore().mode.construction.collision ? 'auto' : 'none'}"
    >
    </construction-canvas>
    <room-zone-canvas
        class="overlay-element"
        ref="roomZone"
        v-show="useEditorStore().mode.roomZone.show"
        style="opacity: 50%"
        :style="{'pointer-events': useEditorStore().mode.roomZone.collision ? 'auto' : 'none'}"
    >
    </room-zone-canvas>
    <sensor-canvas
        class="overlay-element"
        ref="sensor"
        v-show="useEditorStore().mode.sensor.show"
        :style="{'pointer-events': useEditorStore().mode.sensor.collision ? 'auto' : 'none'}"
        style="z-index: 5"
    >
    </sensor-canvas>
  </div>
</template>

<style scoped>
.overlay-element {
  position: absolute;
  z-index: 1;  /* Убедитесь, что z-index больше, чем у фонового элемента */
}
</style>
