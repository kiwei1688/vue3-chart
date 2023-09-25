<template lang="pug">
div.index-container
  div.index-content
    h1.title Hello world
    p.lead {{ $t('sysName') }}
</template>

<script type="module" setup lang="ts">
 import { onMounted } from 'vue'

 onMounted(() => {
    console.log(import.meta.env.VITE_API_URL, import.meta.env.VITE_APP_ID)
  })
</script>

<style scoped>

</style>