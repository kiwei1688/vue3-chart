<template lang="pug">
div.content-wrap
  div.content-inner
    div.content-title
      el-iconDocumentCopy.icons
      span 功能設定

    div.practice
      h2 練習computed用法
      fieldset
        legend 姓名操作
          div
            input(type="text" placeholder="請輸入姓名")
          div
            input(type="text" placeholder="請輸入名字")
      fieldset
        div.div_wrap
          div FirstName: {{ firstName }}
          div lastName: {{ lastName }}
          div FullName: {{ FullName }}

          el-button(@click="change") {{ $t('reset') }}

      fieldset
        div(v-for="(item, index) in arr" :key="index" @click="sltEle(index)") {{ item }}
</template>

<script type="module" setup lang="ts">
  import { computed, ref, reactive } from 'vue'

  const firstName = ref<string>('Kuan')
  const lastName = ref<string>('Chen')
  // 宣告Array存放string
  const arr = reactive<string[]>(['哈哈', '嘿嘿嘿', '喔喔喔'])
  // const arr2 = reactive<string{}>({
  //   str1: 'string'
  // })

  // computed傳入參數處理
  const sltEle = computed( () => {   
    return function(index: number) {
      console.log('index ++++++', index);
    }   
  })  

  const FullName = computed(() => `${firstName.value} ~~ ${lastName.value}`)
  // const FullName = computed({
  //   get() {
  //     return `${firstName.value} ~~ ${lastName.value}`
  //   },
  //   set(newVal:string) {
  //     console.log('=====', newVal)
  //     [firstName.value, lastName.value] = newVal.split(' ')
  //   }
  // })
 
  const change = () => firstName.value = 'SomeOne Else'
</script>

<style scoped>
.div_wrap {
  margin-top: 30px;
}
.practice {
  border: 1px solid red;
  margin: 30px 0;
  padding: 20px;
}
fieldset div {
  margin-top: 10px;
}
fieldset div input {
  font-size: 12px;
  padding: 5px;
}
</style>