<template>
  <div class="header"></div>
  <a-form :form="formState" layout="inline" >
    <a-form-item
      v-for="column in config"
      :key="column.key"
      :name="column.label"
      :label="column.label"
      class="form-item-margin"
    >
      <component
        v-bind:is="column.type || 'a-input'"
        v-bind="column.props"
        :size="size"
        v-model:value="formState[column.key]"
        v-on="column.on || {}"
      ></component>
    </a-form-item>
    <a-form-item class="form-item-margin">
      <a-button type="primary" @click="handleSearch">搜索</a-button>
      <a-button class="left-btn-split" @click="handleReset">重置</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { defineProps, reactive, withDefaults} from 'vue';
// 定义props
const props = withDefaults(
    defineProps<{
      config: any[]
      size: string
    }>(),
    {
      size: 'default'
    }
)
const formState = reactive({});
const handleReset = () => {
  console.log(formState);
}
const handleSearch = () => {
  console.log(formState);
}
</script>

<style scoped lang="less">
.form-item-margin{
  margin-top: 10px;
  .left-btn-split {
    margin-left: 8px;
  }
}
</style>
