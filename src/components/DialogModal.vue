<template>
  <!-- vue3 v-model雙相綁定props會錯 改用:modalValue -->
  <!-- :before-close 點按鈕 觸發 -->
  <el-dialog
    :before-close="handleClose" 
    :modelValue="show" 
    :title="props.getEditData?._id ? $t('editData') : $t('addData')"
  >
    <el-form 
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="120px" 
      class="form-wrap"
    >
      <el-form-item :label="$t('type')">
        <el-select v-model="formData.type" :placeholder="$t('type')">
          <el-option 
            v-for="(item, index) in typeList"
            :key="index" 
            :label="$t(item)"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="describe" :label="$t('describe')">
        <el-input v-model="formData.describe" type="describe" :placeholder="$t('describeTxt')"></el-input>
      </el-form-item>

      <el-form-item prop="income" :label="$t('income')">
        <el-input v-model="formData.income" type="income" :placeholder="$t('incomeTxt')"></el-input>
      </el-form-item>

      <el-form-item prop="expend" :label="$t('revenue')">
        <el-input v-model="formData.expend" type="expend" :placeholder="$t('revenueTxt')"></el-input>
      </el-form-item>

      <el-form-item prop="cash" :label="$t('accCash')">
        <el-input v-model="formData.cash" type="cash" :placeholder="$t('accTxt')"></el-input>
      </el-form-item>

      <el-form-item :label="$t('remark')">
        <el-input v-model="formData.remark" type="textarea" :placeholder="$t('remarkTxt')"></el-input>
      </el-form-item>
      <!-- btn -->
      <div class="text-wrap">
        <el-form-item class="text-right">
          <el-button type="danger" @click="handleClose">{{ $t('cancel') }}</el-button>
          <el-button type="primary" @click="handleSubmit(form)">{{ $t('comfirm') }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>
</template>

<script type="module" setup lang="ts">
  import { ref, watch } from 'vue'
  // 校驗
  import { ElMessage, FormInstance } from 'element-plus'
  // ts 數據類型
  import { formDataTypes, formRulesTypes } from '../utils/types'
  import axios from '../utils/https';
  // 處理語系
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const typeList = ref(["cash", "Line Pay", "creditCard"])
  const form = ref<FormInstance>()

  // 監聽父層 傳入編輯的數據
  watch(
    () => props.getEditData, // 監聽編輯數據是否更新
    () => {
      formData.value = props.getEditData; // 編輯數據有更新直接複寫新數據
    }
  );

  // 父層傳遞props
  const props = defineProps({
    show: {
      type: Boolean,
    },
    // 父層 傳入的編輯數據
    getEditData: {
      // 將object類型改為formDataTypes
      type: Object as () => formDataTypes,
    },
  })

  // 綁定數據
  const formData = ref<formDataTypes | any>({
    type: "現金",
    describe: "購買課程",
    income: "1580",
    expend: "1580",
    cash: "1580",
    remark: "提升技能,升值加薪"
  })

  // form校驗規則
  const formRules: formRulesTypes = {
    describe: [{ required: true, message: t("noDescribe"), trigger: "blur"}],
    income: [{ required: true, message: t("noIncome"), trigger: "blur"}],
    expend: [{ required: true, message: t("noRevenue"), trigger: "blur"}],
    cash: [{ required: true, message: t("noCash"), trigger: "blur"}],
  }

  // 驗證表單 (處理新增or編輯數據)
  const handleSubmit = (formEl: FormInstance | undefined) => {
    if(!formEl) return
    // 驗證
    formEl.validate(async (valid: boolean) => {
      if(valid) {
        // 判斷當下數據是否有id yes -> 編輯 / no -> 新增
        const url = !props.getEditData?._id ? 'add' : `edit/${props.getEditData._id}`;

        try {
          // 新增數據
          await axios.post(`/api/profiles/${url}`, formData.value)
          // @ts-ignore
          ElMessage.success(!props.getEditData?._id ? t("addOK") : t("editOK"))
          // 父層 重新拉取新增後的數據
          emits('handleUpdateProfiles')
          // 關閉彈窗
          emits('closeModal')
        } catch(err) {
          console.error('errrr', err)
        }
      } else {

      }
    })
  }

  // 回傳給父層方法
  const emits = defineEmits(['closeModal', 'handleUpdateProfiles'])

  // 關閉彈窗
  const handleClose = () => {
    emits('closeModal')
  }
</script>

<style scoped>
  .form-wrap{
    margin: 10px;
    width: auto;
  }
  .form-wrap .text-wrap {
    display: flex;
    justify-content: end;
  }
</style>