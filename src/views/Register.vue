<template>
<!-- //- div.register
//-   section.form-container
//-     div.manage-tip
//-       span.title 後台管理系統
//-       el-form.registerForm(label-width="80px", :model="registerUser")
//-         el-form-item(label="用戶名",prop="name")
//-           el-input(v-model="registerUser.name",placeholder="請輸入用戶名")
//-         el-form-item(label="信箱",prop="email")
//-           el-input(v-model="registerUser.email",placeholder="請輸入用信箱")
//-         el-form-item(label="密碼",prop="password")
//-           el-input(v-model="registerUser.password",placeholder="請輸入密碼",type="password")
//-         el-form-item(label="確認密碼",prop="password2")
//-           el-input(v-model="registerUser.password2",placeholder="請確認密碼",type="password")
//-         el-form-item(label="選擇身分")
//-           el-select(v-model="registerUser.identity",placeholder="選擇身分")
//-             el-option(label="管理員",value="manager")
//-             el-option(label="員工",value="employee")

//-         el-form-item
//-           el-button.submit-btn(@click="handleSubmit") 送出 -->

<div class="register">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">後台管理系統</span>
        <el-form
          :rules="rules"
          ref="ruleFormRef"
          :model="registerUser"
          class="registerForm"
          label-width="80px"
        >
          <el-form-item label="用戶名" prop="name">
            <el-input
              v-model="registerUser.name"
              placeholder="請輸入用戶名"
            ></el-input>
          </el-form-item>
          <el-form-item label="信箱" prop="email">
            <el-input
              v-model="registerUser.email"
              placeholder="請輸入信箱"
            ></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input
              v-model="registerUser.password"
              placeholder="請輸入密碼"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="確認密碼" prop="password2">
            <el-input
              v-model="registerUser.password2"
              placeholder="請確認密碼"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="選擇身分">
            <el-select v-model="registerUser.identity" placeholder="選擇身分">
              <el-option label="管理員" value="manager"></el-option>
              <el-option label="員工" value="employee"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <!-- ruleFormRef : element-plus 校驗 -->
            <el-button @click="handleSubmit(ruleFormRef)" class="submit-btn">註冊</el-button>
          </el-form-item>

          <div class="tiparea">
            <p>{{ $t('hasAcc') }}<router-link to="/login">{{ $t('login') }}</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  //TS驗證數據類型
  import { registerType, registerRulesType } from "../utils/types";
  import { FormInstance } from 'element-plus/lib/components/form/index.js';
  import axios from '../utils/https';
  // 引用路由
  import { useRouter } from 'vue-router';
  //請參考https://element-plus.org/en-US/component/form.html#validation
  const ruleFormRef = ref<FormInstance>()
  const router = useRouter();

  // 檢查密碼 & 確認密碼
  const registerUser = ref<registerType>({
    name: "米斯特吴",
    email: "27732357@qq.com",
    password: "321321",
    password2: "321321",
    identity: "管理员",
  });
  // 驗證密碼
  const validatePass2 = (rule: any, value:any, callback:any) => {
    if(value === '') {
      callback(new Error("請重新輸入密碼"));
    } else if (value !== registerUser.value.password) {
      callback(new Error("兩次密碼輸入不一致"));
    } else {
      callback();
    }
  }

  const rules = reactive<registerRulesType>({
    name: [
      { required: true, message: "用戶名不能為空", trigger: "change" },
      { min: 2, max: 30, message: "長度在2到30個字符之間", trigger: "blur" },
    ],
    email: [
      {
        type: "email",
        required: true,
        message: "信箱格式錯誤",
        trigger: "blur",
      },
    ],
    password: [
      { required: true, message: "密碼不能為空", trigger: "blur" },
      { min: 6, max: 30, message: "長度在6到30個字符之間", trigger: "blur" },
    ],
    password2: [
      // { required: true, message: "密码不能为空", trigger: "blur" },
      { min: 6, max: 30, message: "長度在6到30個字符之間", trigger: "blur" },
      { validator: validatePass2, trigger: "blur" },
    ],
  });

  // 驗證表單註冊規則
  const handleSubmit = (formEl: FormInstance | undefined) => {
    if(!formEl) return
    // 驗證
    formEl.validate(async (valid: boolean) => {
      if(valid) {
        const apiPath = "/api/users/register";
        try {
          // 註冊
          const { data } = await axios.post(apiPath, registerUser.value);
          // console.log('=====', data)

          // @ts-ignore 不檢測ts
          ElMessage({
            message: '用戶註冊成功!.',
            type: 'success',
          })

          router.push({ path: '/' });
        } catch(err) {
          console.error('errrr', err)
        }
      } else {
        console.log('err submit')
        return false
      }
    })
  }
</script>

<style scoped>
</style>