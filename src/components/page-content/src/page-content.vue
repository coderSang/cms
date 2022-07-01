<template>
  <div class="page-content">
    <a-table :dataSource="dataSource"
      :columns="contentTableConfig.columns"
      :scroll="{ y: height }"
       @change="pageChange"
       :loading="loading"
      :pagination="{
        current: pageInfo.pageNum,
        pageSize: pageInfo.pageSize,
        total: totalCount
      }">
      <template #title>
        <div class="command-header">
          <slot name="header">
            <a-button type="primary" @click="handleInsert" v-if="isInsert">新建</a-button>
            <a-button type="default" @click="handleExport" :loading="exportLoading" v-if="isExport">导出</a-button>
            <a-upload
                name="file"
                :customRequest="customRequest"
            >
              <a-button>
<!--                <upload-outlined></upload-outlined>-->
                Click to Upload
              </a-button>
            </a-upload>
<!--            <a-button class="btns-group" @click="handleImport" v-if="isImport">导入</a-button>-->
<!--            <div class="upload-class" style="display: flex;-->
<!--    flex-direction: row;-->
<!--    position: relative;-->
<!--    margin-left: 15px;-->
<!--    overflow: hidden;">-->
<!--              <a-button-->
<!--                  type="primary"-->
<!--              >导入</a-button-->
<!--              >-->
<!--              <input-->
<!--                  class="inputfile"-->
<!--                  single-->
<!--                  type="file"-->
<!--                  accept=".xls,.xlsx"-->
<!--              />-->
<!--            </div>-->
            <slot name="otherHeaderHandle"></slot>
          </slot>
        </div>
      </template>
      <template v-slot:bodyCell="{ column, record }">
        <template v-for="item in notCommonKeyItem" :key="item.key">
          <template v-if="column.key === item.key">
            <slot :name="item.key" :row="record"></slot>
          </template>
        </template>
        <template v-if="column.key === 'stayEndTime'">
          {{ record['stayStartTime'] }} - {{  record[column.key] }}
        </template>
        <template v-if="column.key === 'handle'">
          <div>
            <a-button
                class="btn"
                type="link"
                size="small"
                v-if="isUpdate"
                @click="handleEdit(record)"
            >编辑</a-button>
            <a-button
                danger
                class="btn"
                type="link"
                size="small"
                v-if="isDelete"
                @click="handleDelete(record)"
            >删除</a-button>
            <slot name="otherHandle" :row="record"></slot>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { useMainStore } from '@/stores/main';
import { userPermission } from '@/hooks/userPermission'
import { delEmptyQuery } from '@/utils/del-empty-query';
import { BASE_URL } from '@/service/request/config';
const customRequest = (file: IObjKeyValue) => {
  console.log(file);
  const formData = new FormData();
  formData.append('file', file.file);
  const res = mainStore.getPageImportAction(props.pageName, formData);
  console.log(res);
  // getRiskListImport(formData).then((res) => {
  //   if (res.code === 200) {
  //     this.$message.success('上传成功');
  //     this.handleSearch();
  //   }
  // });
}
const props = defineProps({
  contentTableConfig: {
    type: Object,
  },
  pageName: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['handleInsert', 'handleEdit', 'handleReQuery'])

let loading = ref(true)
let exportLoading = ref(false)
const pageInfo = ref({
  pageNum: 1,
  pageSize: 10
})
const queryInfo = ref({})
// 获取操作权限
const isInsert = userPermission(props.pageName, 'insert')
const isDelete = userPermission(props.pageName, 'delete')
const isUpdate = userPermission(props.pageName, 'update')
const isImport = userPermission(props.pageName, 'import')
const isExport = userPermission(props.pageName, 'export')
// 设置公共的commonKey属性,设定后可在page-content组件里统一格式
const commonKey: string | any[] = ['stayEndTime'];
const notCommonKeyItem = props.contentTableConfig?.columns.filter((item: any) => {
  return item.key && commonKey.indexOf(item.key) === -1;
})
//  3.从vuex获取数据
const mainStore = useMainStore()
const dataSource = computed(() =>
    mainStore.pageList
)
const totalCount = computed(() =>
    mainStore.pageCount
)
// 请求数据操作，请求数据的操作都应该放在content里面，请求完数据只会对这个文件有影响
const getPageData = async (query: any = {}, type: string = 'pageChange') => {
  // 保存搜索项，翻页需带上
  queryInfo.value = query;
  loading.value = true;
  // 翻页操作
  if (type === 'pageChange') {
    // 清除下空字段
    const params = delEmptyQuery(query)
    await mainStore.getPageListAction(props.pageName, {
      ...pageInfo.value,
      ...params,
    })
    loading.value = false;
  } else {
    // 搜索或者重置操作，直接修改pageInfo，会监听并处触发翻页
    pageInfo.value = { pageNum: 1, pageSize: 10 }
  }
}
const getPageDataByEditOrInsert = async () => {
  loading.value = true;
  const query = queryInfo.value;
  const params = delEmptyQuery(query)
  await mainStore.getPageListAction(props.pageName, {
    ...pageInfo.value,
    ...params,
  })
  loading.value = false;
}
const pageChange = (e: any) => {
  pageInfo.value = { pageNum: e.current, pageSize: e.pageSize}
}
getPageData();
watch(pageInfo, () => {
  getPageData(queryInfo.value)
})

// 新增编辑都要弹出modal,这里只负责发射事件，不负责逻辑处理
const handleInsert = () => {
  emit('handleInsert')
}
const handleEdit = (record: any) => {
  emit('handleEdit', record)
}

// 导入导出删除都可以直接写
const handleDelete = (record: any) => {
  Modal.confirm({
    title: '确认删除？',
    content: '此操作不可逆，请确认是否删除',
    okText: '确认',
    cancelText: '取消',
    async onOk() {
      let params;
      if (props.pageName === 'user') {
        params = {
          id: record!.userId,
        };
      } else {
        params = {
          id: record!.id
        }
      }
      const res = await mainStore.delPageDataAction(props.pageName, params)
      if (res.code === 200) {
        message.success(res.msg || '删除成功');
        emit('handleReQuery')
      }
    },
    onCancel() {},
  });
}
const handleImport = () => {
  console.log('handleImport')
  // mainStore.getPageExportAction(props.pageName, params).then(() => {
  //   exportLoading.value = false
  // })
}
const handleExport = () => {
  exportLoading.value = true
  const params = delEmptyQuery(queryInfo.value)
  mainStore.getPageExportAction(props.pageName, params).then(() => {
    exportLoading.value = false
  })
}

// 自动计算table高度
const height = ref(0)
onMounted(() => {
  const navHeight = document.getElementsByClassName('nav-header')[0]?.clientHeight || 0
  const searchHeight = document.getElementsByClassName('page-search')[0]?.clientHeight || 0
  const totalHeight = document.getElementsByClassName('main')[0]?.clientHeight || 0
  height.value = totalHeight - navHeight - searchHeight - 220
})

// script setup的组件是默认关闭的，一定要用defineExpose才能将内部的方法给父组件用
defineExpose({
  getPageData,
  handleImport,
  getPageDataByEditOrInsert,
})
</script>

<style scoped lang="less">
.page-content{
  margin: 5px 10px 10px 10px;
  padding: 0 16px;
  background-color: #fff;
  .command-header{
    display: flex;
    button {
      margin-right: 8px;
      border-radius: 5px;
    }
  }
}
</style>
