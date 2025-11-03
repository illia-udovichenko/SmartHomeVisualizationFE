<script>
import { useEditorStore } from '@/stores/useEditorStore'
export default {
  data() {
    return {
      editor : useEditorStore()
    }
  }
}
</script>

<template>
<el-space class="container">
    <el-space direction="vertical" :fill="true">
      <el-button>remove actual floor</el-button>
      <el-button>add floor above</el-button>
      <el-button>add floor below</el-button>
    </el-space>
    <el-space direction="vertical" :fill="true">
      <el-button>Floor: {{this.editor.floor.actualFloor}}</el-button>
      <el-button>Go above</el-button>
      <el-button>Go below</el-button>
    </el-space>
</el-space>
</template>

<style scoped>
.container {
  margin: 10px
}

</style>