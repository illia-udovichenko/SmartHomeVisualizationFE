<script>
import sideBarZoneVisibilitySwitch from "@/components/Editor/ToolBar/ToolBarComponents/toolBarZoneVisibilitySwitch.vue";
import toolBarFloors from "@/components/Editor/ToolBar/ToolBarComponents/toolBarFloors.vue";
import {CaretLeft, CirclePlus} from "@element-plus/icons-vue";
import { useUserStore } from '@/stores/useUserStore'
import { nanoid } from 'nanoid';
import addDialog from "@/components/Editor/ToolBar/addDialog.vue";
import {useEditorStore} from "@/stores/useEditorStore";

export default {
  components: {
    addDialog,
    CirclePlus,
    CaretLeft,
    sideBarZoneVisibilitySwitch,
    toolBarFloors
  },
  data() {
    return {
      constructions : useUserStore().constructions,
      sensors: useUserStore().sensors,
      //visibilities
      sensorFormVisible : true,
      categoryFormVisible : false,
      //form content
      newCategory : '',
      newSensor : {
        name : '',
        country : '',
        firm : '',
        model : '',
        productionDate : ''
      }
    }
  },
  methods: {
    useEditorStore,
    getID(){
      return nanoid();
    },
    showAddCustomSensorDialog(){
      console.log('new Sensor')
      this.$refs.sensor.dialogVisible = true
    },
    showAddCustomCategoryDialog(){
      this.$refs.category.dialogVisible = true
    },
    addNewCategory(){
        useUserStore().sensors.push({
          category_name: this.newCategory,
          id: nanoid(),
          models: []
        })
        this.$refs.category.hide();
        this.newCategory = ''
      },
    addNewSensor(){
    },
    placeConstruction(constructionType){
      useEditorStore().placeConstruction(constructionType)
      console.log(constructionType)
    },
    finishPlacing() {
      useEditorStore().finishPlacing()
    },
    constructionEnable(){
      return (useEditorStore().mode.roomZone.collision)
    },
    sensorEnabled(){
      return (useEditorStore().mode.roomZone.collision)
    },
  }
}
</script>

<template>
  <div class="toolBar">
  <el-menu mode="horizontal">
    <el-menu-item @click="this.$router.push('/mainMenu')">
      <el-icon><CaretLeft /></el-icon>
    </el-menu-item>
    <!--constructions button -->
    <el-menu-item index="1" >
      <!-- start placing -->
      <el-sub-menu  index="1-1" v-if="!useEditorStore().mode.construction.collision" :disabled=constructionEnable()>
        <template #title>
          <el-text >Constructions</el-text>
        </template>
        <el-menu-item :index="getID()" v-for="construction in constructions" :key="construction" @click="placeConstruction(construction)">{{ construction }}</el-menu-item>
      </el-sub-menu>
      <!-- stop placing -->
      <el-menu-item index="1-2" v-else @click="finishPlacing()">
        {{useEditorStore().mode.construction.constructionMode}}
      </el-menu-item>
    </el-menu-item>
    <!-- sensors button -->
    <el-sub-menu index="2" :disabled=sensorEnabled()>
      <template #title>Sensors</template>
      <el-sub-menu v-for="(item, index) in sensors" :index="`2-${index}`" :key="item.id">
        <template #title>{{ item.category_name }}</template>
        <el-menu-item v-for="(sensor, subIndex) in item.models" :index="`2-${index}-${subIndex}`" :key="sensor.id" @click="useEditorStore().placeSensor(sensor.name)">{{ sensor.name }}</el-menu-item>
        <el-menu-item :index="`${index}-addCustom`" @click="showAddCustomSensorDialog"> <el-icon><CirclePlus /></el-icon> </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="add new category" @click="showAddCustomCategoryDialog"> <el-icon><CirclePlus /></el-icon> </el-menu-item>
    </el-sub-menu>
    <!--save button -->
    <el-menu-item>Save</el-menu-item>
    <el-menu-item>
      <side-bar-zone-visibility-switch></side-bar-zone-visibility-switch>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>Floor</template>
      <tool-bar-floors></tool-bar-floors>
    </el-sub-menu>
  </el-menu>

    <add-dialog ref="category" title="Enter new category data">
      <template #inputField>
        <el-input v-model="newCategory"></el-input>
      </template>
      <template #confirmButton>
        <el-button @click="addNewCategory">Confirm</el-button>
      </template>
    </add-dialog>

    <add-dialog ref="sensor" title="Enter new sensor data">
      <template #inputField>
        <el-space direction="vertical">
          <el-input v-model="newSensor.name" placeholder="name"></el-input>
          <el-input v-model="newSensor.country" placeholder="country"></el-input>
          <el-input v-model="newSensor.model" placeholder="model"></el-input>
          <div class="demo-date-picker">
            <el-space direction="horizontal">
              <span class="demonstration">Default</span>
              <el-date-picker
                  v-model="newSensor.productionDate"
                  type="date"
                  placeholder="Pick a day"
              />
            </el-space>
          </div>
        </el-space>
      </template>
      <template #confirmButton>
        <el-button @click="addNewSensor">Confirm</el-button>
      </template>
    </add-dialog>

  </div>
</template>

<style scoped>
.toolBar {
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 85%;
  margin: 0;
  padding: 0;
}
</style>