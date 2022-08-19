<template>
  <div class="page-search">
    <div class="header"></div>
    <a-card>
      <base-form v-bind="searchFormConfig" v-model="formData">
        <template v-slot:header>
          <div v-if="headerMode === 'title'" class="left-part">{{ headerText }}</div>
          <div v-else class="left-part">
            <bread-crumb :arrBread="arrBread"></bread-crumb>
          </div>
        </template>
        <template v-slot:footer>
          <a-button type="primary btns-group" @click="handleQueryClick">搜索</a-button>
          <a-button class="left-btn-split btns-group" @click="handleResetClick">重置</a-button>
        </template>
      </base-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import BaseForm from '@/base-ui/form';
import BreadCrumb from '@/base-ui/breadcrumb';

import { withDefaults, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import localCache from '@/utils/cache';
import { mapRouteToName, pathBreadcrumbs } from '@/utils/map-menus';
import { IFormConfig } from '../types';

const props = withDefaults(
  defineProps<{
    searchFormConfig: IFormConfig
    headerMode?: 'title' | 'bread'
  }>(),{
    headerMode: 'title'
  }
)
const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

// 获取文字类型的头
const route = useRoute();
const userMenus = localCache.getCache('userMenus')
const mapRoute = mapRouteToName(userMenus);
const headerText = computed(() => {
  return mapRoute[route.path]
})

// 获取面包屑的方式
const arrBread = computed(() => pathBreadcrumbs(userMenus, route.path));

const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
// 时间范围选择器有多个key和value
for (const item of formItems) {
  if (item.type === 'a-range-picker') {
    item.key.forEach((singleItem: any, index: number) => {
      formOriginData[singleItem] = item.defaultValue !== undefined ? item.defaultValue[index] : ''
    })
  } else if(item.type === 'a-select') {
    formOriginData[item.key] = item.defaultValue ?? undefined
  } else {
    formOriginData[item.key] = item.defaultValue ?? ''
  }
}
// 转换为响应式对象
const formData = ref(formOriginData)
// 用户点击重置,重置为原始值
const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value[key] = formOriginData[key]
  }
  emit('resetBtnClick', formOriginData)
}
// 用户搜索
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style scoped lang="less">
.page-search{
  margin: 10px 10px 5px;
  .left-btn-split {
    margin-left: 8px;
  }
  .btns-group {
    border-radius: 5px;
  }
  .left-part{
    float: left;
  }
}

</style>
