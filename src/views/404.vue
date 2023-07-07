<template>
  <div>
      <h1>404</h1>
      <button @click="$router.push('/')">回首頁</button>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.not-found {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.not-found img {
  width: 100%;
  height: 100%;
}

.goback {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  background-color: #fff;
  color: #000;
  padding: 10px 30px;
  border-radius: 5px;
  outline: none;
  border: none;
}
</style>