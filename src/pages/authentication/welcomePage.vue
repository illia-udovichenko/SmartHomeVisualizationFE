<script>
</script>

<template>
  <div class="background">
    <div class="welcome-page">
      <div class="content">
        <h1>Step into the future</h1>
        <p>Design your smart home right now</p>
        <div class="buttons">
          <el-button @click="this.$router.push('login')" class="upper-button">
            Login
          </el-button>
          <el-button @click="this.$router.push('registration')" class="lower-button">
            Registration
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  text-align: center;
  color: #fff;
}

.content h1 {
  margin-top: 5vh;
  font-size: 3rem;
  margin-bottom: 6vh;
}

.content p {
  margin: 10vh 0;
  font-size: 1.5rem;
  white-space: nowrap;
}

.buttons {
  margin-top: 10vh;
  display: flex; /* Make the buttons container a flex container */
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
}

.el-button {
  font-size: 2rem;
  padding: 3vh 14vw 4vh;
  margin: 2vh;
  width: 16vw; /* Fixed width for the buttons */
  border-radius: 20px; /* Rounded border */
  color: white; /* Default font color */
  border: none; /* Remove border */
}

.upper-button {
  background-color: rgba(0, 120, 255, 0.5);
}

.lower-button {
  background-color: rgb(0, 120, 255);
}
</style>