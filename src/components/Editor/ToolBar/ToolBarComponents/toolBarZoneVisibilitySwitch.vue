<script>
import { useEditorStore } from '@/stores/useEditorStore'
export default {
  methods: {useEditorStore},
  data() {
    return {
    }
  }
}
</script>

<template>
  <el-space direction="vertical" :fill="true" :size="0">
    <el-checkbox>Sensor zones</el-checkbox>
    <el-checkbox v-model="useEditorStore().mode.roomZone.show">Room zones</el-checkbox>
  </el-space>
</template>

<style scoped>
</style>