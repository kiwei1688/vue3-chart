<template>
<div class="login">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">{{ $t('sysName') }}</span>
        <el-form
          :rules="rules"
          ref="ruleFormRef"
          :model="loginUser"
          class="loginForm"
          label-width="80px"
        >
          <el-form-item :label="$t('mail')" prop="email">
            <el-input
              v-model="loginUser.email"
              :placeholder="$t('keyMail')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('password')" prop="password">
            <el-input
              v-model="loginUser.password"
              :placeholder="$t('keyPW')"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('lang')">
            <el-select v-model="langData.lang" @change="handleChgLang">
              <el-option 
                v-for="(item, index) in langList"
                :key="index" 
                :label="$t(`language.${item}`)"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- ruleFormRef : element-plus 校驗 -->
            <el-button @click="handleSubmit(ruleFormRef)" class="submit-btn">{{ $t('login') }}</el-button>
          </el-form-item>

          <div class="tiparea">
            <p>{{ $t('noAcc') }}<router-link to="/register">{{ $t('register') }}</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { registerType, registerRulesType } from "../utils/types";
  import { FormInstance } from 'element-plus/lib/components/form/index.js';
  // 封裝api
  import axios from '../utils/https';
  // 解析token
  import jwt_decode from 'jwt-decode'
  // pinia
  import { useAuthStore } from '../store'
  // 引用路由
  import { useRouter } from 'vue-router';
  // 切換lang
  import { useI18n } from 'vue-i18n'

  const { locale, t } = useI18n()
  const langList = ref(['zh-TW', 'zh-CN', 'zh-EN'])
  // 綁定語系data
  const langData = ref<any>({
    lang: 'zh-TW'
  })
  //請參考https://element-plus.org/en-US/component/form.html#validation
  const ruleFormRef = ref<FormInstance>()
  const router = useRouter();
  const store = useAuthStore();

  // 檢查密碼 & 確認密碼
  const loginUser = ref<registerType>({
    email: "27732357@qq.com",
    password: "321321",
  });

  // 驗證信箱&密碼規則
  const rules = reactive<registerRulesType>({
    email: [
      {
        type: "email",
        required: true,
        message: t('mailErr'),
        trigger: "blur",
      },
    ],
    password: [
      { required: true, message: t('PWisEmpty'), trigger: "blur" },
      { min: 6, max: 30, message: t('sixTothirty'), trigger: "blur" },
    ]
  });

  // 切換語系
  const handleChgLang = () => {
    locale.value = langData.value.lang

  }
//const tokenDecode= ref<string |null >('')
  // 驗證表單註冊規則
  const handleSubmit = (formEl: FormInstance | undefined) => {
    // 寫入local 語系
    localStorage.setItem('lang', langData.value.lang)

    if(!formEl) return
    // 驗證
    formEl.validate(async (valid: boolean) => {
      if(valid) {
        const apiPath = "/api/users/login";
        try {
          const { 
            data: {success, token, msg},
          } = await axios.post(apiPath, loginUser.value);
 
          const Member = JSON.parse(localStorage.getItem('memberInfo') || '{}');

          // 登入成功
          if(success && token) {
            localStorage.setItem('memberInfo', JSON.stringify({...Member, token}))
            store.setToken(token)

            // 解析token 存至pinia(狀態管理) 全局使用
           // tokenDecode.value = jwt_decode(token)
            //console.log(tokenDecode)
            // 更新pinia state數據
            store.setAuth(!!jwt_decode(token)); // 更新boolean
            store.setUser(jwt_decode(token));
          
            // @ts-ignore 不檢測ts
            ElMessage({
              message: t('loginSuccess'),
              type: 'success',
            })
  
            router.push({ path: '/' });
          }
        } catch(err:any) {
          console.error('err', err)
          console.error('err.response.data.msg',err.response.data.msg)
          // @ts-ignore 不檢測ts
          ElMessage({
            message: err.response.data.msg,
            type: 'error',
          })
        }
      } else {
        console.log('err submit')
        return false
      }
    })
  }

  onMounted(() => {
    // 載入 預設語系
    locale.value = langData.value.lang
  })
</script>

<style scoped>
</style>