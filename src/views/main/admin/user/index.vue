<template>
  <page-search
      :search-form-config="SearchConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
  ></page-search>
  <page-content
      ref="pageContentRef"
      page-name="user"
      :content-table-config="contentTableConfig"
      @handleInsert="handleNewData"
      @handleEdit="handleEditData"
  >
    <template v-slot:otherHeaderHandle>
      <a-button class="btns-group" @click="downLoad">下载模板</a-button>
    </template>
    <template v-slot:otherHandle="record">
      <a-button
          class="btn"
          type="link"
          size="small"
          @click = handlePassword(record)
      >修改密码</a-button>
    </template>
  </page-content>
  <page-modal
      ref="pageModalRef"
      :modal-config="modalConfig"
      :default-info="defaultInfo"
      :submitBeforeCommand="submitBeforeCommand"
      page-name="user"
  ></page-modal>
</template>
<script lang="ts" setup>
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';
import SearchConfig from './config/search.config';
import contentTableConfig from './config/content.config';
import modalConfig from './config/modal.config'
import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageContent } from '@/hooks/usePageContent';

// 提交之前添加可对数据进行处理操作
const submitBeforeCommand = (formData: any) => {
  const sourcemap: IObjKeyValue = {
    1: '00',
    2: '01',
    3: '02',
    4: '03',
  };
  // 编辑操作
  if (typeof formData.userType === 'string') {
    formData.userType = sourcemap[formData.roleIds];
    if (formData.roleIds !== '3') {
      formData.streetCode = '';
    }
    formData.roleIds = [formData.roleIds];
  } else {
    // 新增操作
    formData.userType = sourcemap[formData.roleIds[0]];
    if (formData.roleIds[0] !== '3') {
      formData.streetCode = '';
    }
    formData.roleIds = [formData.roleIds[0]];
  }
  return formData
}
// 新增编辑对表单的操作
const newCallBack = () => {
  const passwordItem = modalConfig.formItems.find(
      (item) => item.key === 'password'
  )
  const confirmPasswordItem = modalConfig.formItems.find(
      (item) => item.key === 'confirmPwd'
  )
  passwordItem!.isHidden = false;
  confirmPasswordItem!.isHidden = false;
}
const editCallBack = () => {
  const passwordItem = modalConfig.formItems.find(
      (item) => item.key === 'password'
  )
  const confirmPasswordItem = modalConfig.formItems.find(
      (item) => item.key === 'confirmPwd'
  )
  passwordItem!.isHidden = true;
  confirmPasswordItem!.isHidden = true;
}

const [ pageContentRef, handleResetClick, handleQueryClick ] = usePageSearch();
const [ pageModalRef, defaultInfo, handleNewData, handleEditData ]
    = usePageContent(pageContentRef, modalConfig, newCallBack, editCallBack);

// 下载模板
const downLoad = () => {
  let a = document.createElement('a')
  a.href ="./src/assets/审核员导入模板.xlsx"
  a.click();
}
const handlePassword = (record: any) => {
  console.log(record)
}
</script>
<style scoped lang="less">
.btns-group{
  margin-right: 8px;
}
</style>
