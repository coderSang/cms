<template>
  <a-breadcrumb separator="/">
    <a-breadcrumb-item v-for="item in arrBread" :key="item.path">
      <router-link :to="item.path">
        {{ item.name }}
      </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
// 获取当前页面的多级路径
import { IBreadcrumb } from '@/base-ui/breadcrumb/types';
defineProps<{
  arrBread: IBreadcrumb[]
}>()
</script>

<style scoped lang="less">
</style>
