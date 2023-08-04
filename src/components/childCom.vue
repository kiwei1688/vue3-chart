<template lang="pug">
div
  slot(name="default")
  slot(name="sign")
  slot(name="smallTurnip")
  // 傳值給父(作用域插槽)
  slot(personName="roy chen" age="18")
  // 具名作用域插槽
  slot.reBor(name="bigTurn" message="我是夢北")
</template>

<script type="module" setup lang="ts">
 
</script>

<style scoped>
.redBor {
  border: 1px solid red;
}
</style>