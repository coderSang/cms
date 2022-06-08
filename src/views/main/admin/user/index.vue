<template>
  <div>
    <page-search :config="SearchConfig"></page-search>
  </div>
</template>
<script lang="ts" setup>
import PageSearch from '@/components/page-search'
import SearchConfig from './config/search.config'
</script>
