<script>
import sideBarCell from "@/components/Editor/SideBar/SideBarComponents/sideBarCell.vue";
import sideBarZoneEditor from "@/components/Editor/SideBar/SideBarComponents/sideBarZoneEditor.vue";
import sideBarZoneList from "@/components/Editor/SideBar/SideBarComponents/sideBarZoneList.vue";
import sideBarSensorEditor from "@/components/Editor/SideBar/SideBarComponents/sideBarSensorEditor.vue";
import {useEditorStore} from "@/stores/useEditorStore";

export default {
  methods: {useEditorStore},
  components : {
    sideBarCell,
    sideBarZoneList,
    sideBarZoneEditor,
    sideBarSensorEditor
  },
  data() {
    return {
      editor: useEditorStore(),
      // todo problem while reading undefined sideBarState
      activeMode : useEditorStore().sideBarState
    }
  }
}
</script>

<template>
  <div class="sideBar">
      <el-header style="display: flex; align-items: center; justify-content: center">
        <el-text>PROJECT NAME</el-text>
      </el-header>
      <!-- Add dynamic navigation -->
      <el-main style="height: 100%">
        <!--
        <div v-if="activeMode === '' "/>
        -->
        <side-bar-zone-list     v-if="editor.sideBarState === 'zoneList'"/>
        <side-bar-zone-editor   v-else-if="activeMode === 'zoneEditor'"/>
        <side-bar-cell          v-else-if="activeMode === 'cell'"/>
        <side-bar-sensor-editor v-else-if="activeMode === 'sensorEditor'"/>
      </el-main>
  </div>
</template>

<style scoped>
.sideBar {
  position: fixed;
  width: 300px;
  height: 100%;
  right: 0;
  border-left: 2px solid var(--el-border-color);
  background-color: white;
}
</style>