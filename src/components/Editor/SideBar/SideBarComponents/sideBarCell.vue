<script>

import MyItem from "@/components/UI/myItem.vue";

export default {
  components: {MyItem},
  data() {
    return {
      mode: "Sensors",
      sensors : ["1","2","3"],
      constructions : ["1","2","3", "4", "5"]
    }
  }
}
</script>

<template>
  <el-scrollbar>
    <my-item action="Delete" v-for="sensor in sensors" :key="sensor">sensor {{sensor}}</my-item>
  </el-scrollbar>
</template>

<style scoped>

</style>