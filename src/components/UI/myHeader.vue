<script>
import {ArrowLeft} from "@element-plus/icons-vue";

export default {
  props: {
    link: {
      type: String,
      default: '/mainMenu'
    }
  },
  methods: {
    goBack() {
      this.$router.push(this.link);
    }
  },
  components: {
    ArrowLeft
  }
}
</script>

<template>
  <div class="header">
    <div class="back-link" @click="goBack">
      <ArrowLeft alt="Back Arrow" class="arrow-icon" />
      <span class="back-text">Back</span>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  z-index: 1000;
}

.back-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.arrow-icon {
  width: 24px;
  height: 24px;
  margin-left: 1vw;
  margin-right: 2vw;
  color: white;
}

.back-text {
  font-size: 1.5rem;
  color: white;
}
</style>