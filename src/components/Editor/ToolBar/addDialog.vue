<script>
export default {
  props() {
    return {
      tittle : {
        type: String,
        default : 'FormText'
      }
    }
  },
  data(){
    return {
      dialogVisible : false,
    }
  },
  methods : {
    hide() {
      this.dialogVisible = false
    }
  }
}

</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      :title = tittle
      width="500"
  >
    <!--input -->
    <slot name="inputField"></slot>
    <!-- buttons -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="hide">
          Cancel
        </el-button>
        <slot name="confirmButton"></slot>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>