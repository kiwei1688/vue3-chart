<template>
<!-- <div class="home"> -->
  <el-row>
    <el-col :span="24">
      <navBar/>
    </el-col>
  </el-row>
  <el-row>
    <!-- 左側選單 -->
    <el-col :span="3">
      <sideBar/>
    </el-col>
    <!-- 右側 內容區 -->
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>
<!-- </div> -->
</template>

<script type="module" setup lang="ts">
  import { onMounted } from 'vue'
  import axios from '../utils/https';
  // header
  import navBar from '../components/navBar.vue';

  onMounted(async () => {
    const userPath = "/api/users/current";
    try {
      // const { token } = JSON.parse(localStorage.getItem('memberInfo') || '{}');
      // 獲取用戶訊息
      // const data = await axios.get(userPath, {
      //   headers: {
      //     Authorization: token
      //   }
      // })

      // 獲取用戶資訊
      const data = await axios.get(userPath)
    } catch(err) {
      console.error(err)
    }
  })
  
</script>

<style>

</style>