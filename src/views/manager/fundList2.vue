<template lang="pug">
div.content-wrap
  div.content-inner
    div.content-title
      el-iconCoin.icons
      span {{ $t('moneyList.menoyShow') }}

      div.content-box
        child(#default) Hello Juejin
        child(#sign) {{ msg }}
        // 等同#smallTurnip
        child(#[slotName]) 動態插槽練習

        el-button(@click="chgVal") 更改數據
        hr
        // 作用域插槽
        child(v-slot="{ personName, age }")
          | 我名字 {{ personName }} + {{ age }}
        // 具名作用域插槽 (綁定在template)
        child
          template(#bigTurn="bigTurnProps")
            | {{ bigTurnProps.message }}
</template>

<script type="module" setup lang="ts">
import child from '../../components/childCom.vue'

import { ref } from 'vue'

const slotName = ref<string>('smallTurnip')
const msg = ref<string>('哈哈哈哈~~~ 展示出來')

const chgVal = () => {
  isVal()
}

const isVal = () => {
  msg.value = "哈哈哈 ~~~ 被更改了喔"
}
</script>

<style scoped>
.content-box {
  margin-top: 30px;
}
</style>