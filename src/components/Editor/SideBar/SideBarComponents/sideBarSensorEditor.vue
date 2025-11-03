<script setup>

</script>

<template>
  <el-space direction="vertical" :fill="true">
    <el-header>SENSOR EDITOR</el-header>
    <el-input placeholder="Sensor name"></el-input>
    <el-select placeholder="Model" clearable>
      <el-option>Model 1</el-option>
      <el-option>Model 2</el-option>
      <el-option>Model 3</el-option>
      <!-- todo Add Footer -->
    </el-select>
    <el-select placeholder="Country" clearable>
      <el-option>CR</el-option>
      <el-option>USA</el-option>
      <el-option>FR</el-option>
    </el-select>
    <el-button>Edit zone</el-button>
    <el-button>Remove zone</el-button>
    <el-button>Back</el-button>
  </el-space>
</template>

<style scoped>

</style>