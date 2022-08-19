<template>
  <page-search
      :search-form-config="SearchConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
  ></page-search>
  <page-content
      ref="pageContentRef"
      page-name="dept"
      :content-table-config="contentTableConfig"
      @handleInsert="handleNewData"
      @handleEdit="handleEditData"
      @handleReQuery="handleReQuery"
  ></page-content>
  <page-modal
      ref="pageModalRef"
      page-name="dept"
      :modal-config="modalConfig"
      @handleModalQuery="handleReQuery"
      :default-info="defaultInfo"
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

const [ pageContentRef, handleResetClick, handleQueryClick, handleReQuery ] = usePageSearch();
const [ pageModalRef, defaultInfo, handleNewData, handleEditData ]
    = usePageContent(pageContentRef, modalConfig);
</script>
<style scoped lang="less">
.btns-group{
  margin-right: 8px;
}
</style>
