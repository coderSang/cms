<template>
  <page-search
    :search-form-config="SearchConfig"
    @resetBtnClick="handleResetClick"
    @queryBtnClick="handleQueryClick"
  ></page-search>
  <page-content
    ref="pageContentRef"
    page-name="examination"
    :content-table-config="contentTableConfig"
    :options="options"
  >
    <template v-slot:stayEndTime="record">
      {{ record.row.stayStartTime }} - {{ record.row.stayEndTime }}
    </template>
    <template v-slot:handle="record">
      <div style="display: flex;font-size: 12px;">
        <a style="margin-right: 8px">删除</a>
        <a>编辑</a>
      </div>
    </template>
    <template v-slot:status="record">
      <span v-if="record.row.status === 0 " style="color: #0d2bc2">
        未审核
      </span>
      <span v-else-if="record.row.status === 1 " style="color: #2fa165">
        审核通过
      </span>
      <span v-else-if="record.row.status === 2 " style="color: #cb0d23">
        申请驳回
      </span>
      <span v-else-if="record.row.status === 3" style="color: #2fa165">
        已结束
      </span>
      <span v-else-if="record.row.status === 4" style="color: rgb(154,153,150)">
        已撤销
      </span>
    </template>
    <template v-slot:driverType="record">
      <span>{{record.row.driverType === 0?'省内':'省外'}}</span>
    </template>
  </page-content>
</template>
<script lang="ts" setup>
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import SearchConfig from './config/search.config';
import contentTableConfig from './config/content.config';
import { usePageSearch } from '@/hooks/usePageSearch';

const [ pageContentRef, handleResetClick, handleQueryClick ] = usePageSearch()
const options = {
  insert: false,
  export: true,
}
const handleInsert = () => {
  console.log(1)
}
const handleExport = () => {
  console.log(2)
}
</script>
