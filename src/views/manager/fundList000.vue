<template lang="pug">
div.content-wrap
  div.content-inner
    div.content-title
      el-iconDocumentCopy.icons
      span {{ $t('moneyList.managements') }}
  
    // table data
    div.tab_wrap(v-if="tableData.length > 0")
      // 新增按鈕
      el-form(:inline="true")
        // 日期篩選
        el-form-item(:label="$t('filterTime')")
          el-date-picker(
            v-model="startTime"
            type="datetime"
            :placeholder="$t('startTime')"
          ) 
          el-date-picker(
            v-model="endTime"
            type="datetime"
            :placeholder="$t('endTime')"
          )
        el-form-item
          el-button(
            type="primary"
            @click="handleSort"
          ) {{ $t('filter') }}

        // 新增按鈕
        el-form-item.btn-right(v-if="user.identity === 'manager'")
          el-button(
            type="primary"
            @click="handleAdd"  
          ) {{ $t('add') }}

      // 表格    
      el-table(
        v-if="tableData.length > 0"
        border
        :data="tableData"
      )
        el-table-column(flexd type="index" :label="$t('serialNUm')" align="center" width="50")
        el-table-column(prop="type" :label="$t('type')" align="center" width="90")
        el-table-column(prop="describe" :label="$t('describe')" align="center" width="auto")
        el-table-column(prop="income" :label="$t('income')" align="center" width="90")
          template(#default="scope")
            span(style="color: #00d053") {{ scope.row.income }}
        el-table-column(prop="expend" :label="$t('revenue')" align="center" width="90")
          template(#default="scope")
            span(style="color: red") {{ scope.row.income }}
        el-table-column(prop="cash" :label="$t('cash')" align="center" width="100")
          template(#default="scope")
            span(style="color: blue") {{ scope.row.income }}
        el-table-column(prop="remark" :label="$t('remark')" align="center" width="auto")
        el-table-column(prop="date" :label="$t('time')" align="center" width="auto")

        el-table-column(
          v-if="user.identity === 'manager'"
          flexd="right" 
          prop="operation" 
          :label="$t('operate')" 
          align="center" 
          width="150"
        )
          template(#default="scope")
            el-button(
              size="small" 
              type="primary"
              @click="handleEdit(scope.row)"
            ) {{ $t('edit') }}

            el-button(
              size="small" 
              type="danger"
              @click="handleDelete(scope.row)"
            ) {{ $t('delete') }}
        
      // 分頁
      el-row(v-if="tableData.length > 0")
        el-col(:span="24")
          div.pagination_wrap
            el-pagination(
              v-model:current-page="page_index"
              v-model:page-size="page_size"
              :page-sizes="page_sizes"
              small="small"
              :layout="layout"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            )


// 彈窗組件
DialogModal(
  :show="isShow" 
  @closeModal="isShow = false"
  @handleUpdateProfiles="getTableProfiles"
  :getEditData="editData"
)
</template>

<script type="module" setup lang="ts">
  import { 
    ref, 
    watchEffect,
    getCurrentInstance 
  } from 'vue';
  import axios from '../../utils/https';
  // 彈窗訊息組件
  import { ElMessageBox, ElMessage } from 'element-plus';
  // store
  import { useAuthStore } from '../../store'
  // lang
  import { useI18n } from 'vue-i18n'

  // ts 數據類型 (會import失敗,待解決)
  // import { formDataTypes, userType } from '../../utils/types'

  // ref & reactive ======================================================
  // 全域loading組件
  // const { proxy } = getCurrentInstance()
  const { t } = useI18n()

  const tableData = ref<any[]>([]); // 渲染用的table數據
  const allTableData = ref<any[]>([]); // 存所有分頁用的table數據
  const fillterTableData = ref<any[]>([]); // 存時間篩選的table數據

  const store = useAuthStore()
  const user = ref() // 存儲當登入用戶信習

  // 控制彈窗組件
  const isShow = ref<boolean>(false);
  // 編輯數據
  const editData = ref();
  // 分頁
  const page_index = ref(1), // 當前位於哪一頁
        page_size = ref(5), // 一頁顯示多少筆
        total = ref(0), // 總筆數
        page_sizes = [5,10,15,20], // 當前每頁顯示多少筆
        layout = "total, sizes, prev, pager, next, jumper" // 翻頁屬性
  // 開始時間
  const startTime = ref<Date>();
  // 結束時間
  const endTime = ref<Date>();
  //
  const fullPage = ref(true)

  // methods ======================================================
  // 處理篩選時間
  const handleSort = () => {
    if(!startTime.value || !endTime.value) {
      // @ts-ignore
      ElMessage({
        type: "warning",
        message: t('chooseTime')
      })
      getData()
      return
    }

    // 時間區間篩選數據
    const sTime = startTime.value.getTime() // 開始時間 時間戳
    const eTime = endTime.value.getTime() // 結束時間 時間戳

    // 篩選數據後還是要處理分頁
    allTableData.value = fillterTableData.value.filter((item: any) => {
      // 取得篩選出的每一筆數據的date
      const itemDate = new Date(item.date)
      const time = itemDate.getTime() // 轉時間戳

      return time >= sTime && time <= eTime
    })

    // 調用分頁功能
    setPagination()
  }

  // try {
      // proxy.$loading.show('LOADING')
    const tableApi = "/api/profiles";
    // api取得數據
    const getData = async () => {
      const { data } = await axios.get(tableApi);
      // proxy.$loading.hide();

      tableData.value = data;
      // 當allTableData 發生改變 分頁用table數據
      allTableData.value = data
      // 時間篩選用table數據
      fillterTableData.value = data

      // 設定分頁
      setPagination()
    }
    // 載入取數據&用戶權限
    watchEffect(() => {
        // 獲取當前登入用戶信息
        user.value = store.getUser
        // 獲取table數據
        getData()
      }
    );
  // } catch(err) {
  //   console.error('errrr', err)
  // proxy.$loading.hide();
  // }

  // 新 增
  const handleAdd = () => {
    isShow.value = true
    // 清空數據
    editData.value = {}
  }
  // 編輯
  const handleEdit = (row:any) => {
    // 開啟彈窗
    isShow.value = true
    // row = 更新當下數據
    editData.value = row
  }
  // 刪除
  const handleDelete = async (row:any) => {
    ElMessageBox.confirm(
      t('comfirmDel'),
      t('tip'),
    {
      confirmButtonText: t('comfirm'),
      cancelButtonText: t('cancel'),
      type: 'warning',
    }
  )
    .then(async () => {
      const url = `/api/profiles/delete/${row._id}`

      try {
        await axios.delete(url)

        // 重新拉取數據
        getData()
      } catch(err) {
        console.error(err)
      }
      // @ts-ignore
      ElMessage({
        type: 'success',
        message: t('delSuccess'),
      })
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: '取消刪除!',
      // })
    })
  }
  // 編輯後重新取的新數據 (彈窗子層回傳)
  const getTableProfiles = () => {
    getData()
  }

  // 分頁 - 處理分頁切換
  const handleSizeChange = (pages: number) => {
    page_index.value = 1
    page_size.value = pages

    // 重新篩選數據
    tableData.value = allTableData.value.filter((item: any, index: number) => {
      return index < page_size.value
    })
  }
  // 分頁 - 選擇正確的分頁
  const handleCurrentChange = (page: number) => {
    // 取得正確展示的筆數
    const currentPage = page_size.value * (page - 1)
    // 過濾掉當前選中page以前的數據筆數
    const pageData = allTableData.value.filter((item: any, index: number) => {
      return index >= currentPage
    })
    // 取出當前頁面要正確渲染的數據
    tableData.value = pageData.filter((item: any, index: number) => {
      return index < page_size.value
    })
  }

  // 分頁 - 
  const setPagination = () => {
    total.value = allTableData.value.length // 獲取當前總筆數
    page_index.value = 1 // 初始筆數為1
    page_size.value = 5 // 初始頁面展示5筆數據
    // 篩選數據
    tableData.value = allTableData.value.filter((item: any, index: number) => {
      return index < page_size.value
    })
  }
</script>

<style scoped>
</style>