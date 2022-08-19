<template>
  <div class="base-form">
    <div class="search-header">
      <slot name="header"></slot>
    </div>
    <a-form
        ref="formRef"
        :model="formState"
        layout="inline">
      <template v-for="column in formItems" :key="column.key">
        <a-form-item
            v-if="!column?.isHidden"
            :name="column.key"
            :label="column.label"
            :rules="column.rules"
            class="form-item-margin"
        >
          <component
              v-if="column.type !== 'a-range-picker'"
              v-bind:is="column.type || 'a-input'"
              v-bind="column.props"
              :size="size"
              v-model:value="formState[column.key]"
              v-on="column.on || {}"
          ></component>
          <component
              v-else
              v-bind:is="column.type"
              v-bind="column.props"
              :size="size"
              v-on="column.on || {}"
              :onChange="(dates) => datesChange(column.key, dates)"
          ></component>
        </a-form-item>
      </template>
      <a-form-item class="form-item-margin">
        <slot name="footer">
        </slot>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType } from 'vue';
import { IFormItem } from '../types';
const props = defineProps({
  modelValue: {
    type:Object,
  },
  formItems:{
    type: Array as PropType<IFormItem[]>,
  },
  size: {
    type: String,
    default: 'default'
  }
})
// const props = withDefaults(
//   defineProps<{
//     modelValue: object,
//     formItems: IFormItem[],
//     size?: string
//   }>(), {
//   size: 'default'
// })
const emit = defineEmits(['update:modelValue'])
// 解构完没有响应式了，用watch监听，不解构违背单向数据流，先用两个watch
// bug没有响应式
const formState = ref<IObjKeyValue>({ ...props.modelValue })
// watch(
//     () => props.modelValue,
//     (newValue) => {
//       // console.log(newValue)
//       formState.value = { ...newValue }
//     },
//     {
//       deep: true
//     }
// )
watch(
    formState,
    (newValue) => {
      // console.log(newValue);
      emit('update:modelValue', newValue)
    },
    {
      deep: true
    }
)

// 解决选择时间，key是数组，无法生成对应的key
const datesChange = (keys: any, dates: any) => {
  keys.forEach((key: string, index: number) => {
    formState.value[key] = dates[index]
  })
}
// 检查新增编辑时候的字段是否validate 以及关闭的时候清空
const formRef = ref();
const checkValidate = () => {
  return new Promise((resolve, reject) => {
    formRef.value
    .validate().then((res: any) => {
      resolve(res)
    }).catch((error: any) => {
      reject(error)
    })
  })
}
const resetForm = () => {
  formRef.value.resetFields();
}
defineExpose({
  checkValidate,
  resetForm,
})
</script>
<style scoped lang="less">
.base-form{
  display: flex;
  flex-direction: column;
  .form-item-margin{
    margin-top: 10px;
  }
}

</style>
