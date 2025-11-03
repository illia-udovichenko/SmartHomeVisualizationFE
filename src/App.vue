<template>
  <!-- Include Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: auto;
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
}

.header {
  padding: 25px;
}

.background {
  height: 100%;
  background-size: cover;
  background: linear-gradient(45deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
  /* other themes
  background-image: linear-gradient(to right, rgba(180, 170, 255) 0%, #00fffe 100%);
  background-image: linear-gradient(45deg, rgb(180, 130, 255) 0%, #00fffe 100%); */
}
</style>
