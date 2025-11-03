<script>
import {useUserStore} from "@/stores/useUserStore";
import {useEditorStore} from "@/stores/useEditorStore";
import {ElMessage, ElMessageBox} from "element-plus";
import {useProjectStore} from "@/stores/useProjectStore";

export default {
  data() {
    return {
      listOfZones : [],
      user : useUserStore(),
      editor: useEditorStore()
    }
  },
  mounted() {
    this.listOfZones = useProjectStore().zones
  },
  methods : {
    placeRoomZone() {
      this.editor.switchSideBar('zoneEditor')
      this.editor.placeRoomZone()
    },
    deleteRoomZone( roomZoneName ) {
      ElMessageBox.confirm('Are you sure you want to delete this zone?', 'Delete Confirmation', {
        confirmButtonText: 'Continue',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }).then(() => {
        // Call deleteRoomZone function if user clicks Continue
        useEditorStore().deleteRoomZone(roomZoneName)
        ElMessage({
          type: 'success',
          message: 'Zone deleted successfully'
        });
      }).catch(() => {
        // Do nothing if user cancels
      })
    }
  }
}
</script>

<template>
  <div>
    <div v-if="listOfZones.length===0">
      <el-text>No zones yet</el-text>
    </div>
    <div v-else>
      <el-text>Zones</el-text>
      <el-scrollbar v-for="zone in listOfZones" :key="zone.id">
        <el-button
            @click="deleteRoomZone(zone.name)"
            class="zone-button"
        >
          {{zone.name}}
        </el-button>
      </el-scrollbar>
    </div>
    <el-button @click="placeRoomZone()">add new</el-button>
</div>
</template>

<style scoped>
* {
  width: 100%
}
.zone-button:hover {
  background-color: #F56C6C; /* Danger color */
  border-color: #F56C6C; /* Danger color */
  color: #fff; /* Text color */
}
</style>