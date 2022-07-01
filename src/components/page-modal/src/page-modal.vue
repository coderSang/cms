<template>
  <a-modal
      :title="commandType === 'edit' ? '编辑': '新增'"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      width="40%"
  >
    <base-form
      v-bind="modalConfig"
      v-model="formData"
      ref="baseFormRef"
    ></base-form>
    <slot></slot>
    <template #footer>
      <a-button key="back" @click="handleCancel">关闭</a-button>
      <a-button key="submit"
                html-type="submit"
                type="primary"
                :loading="loading"
                @click="handleOk">保存</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { message } from 'ant-design-vue';

import { useMainStore } from '@/stores/main';
import BaseForm from '@/base-ui/form';
import { IFormConfig } from '@/components/page-search/types';

const mainStore = useMainStore()
// defaultInfo初始值，edit
const props = defineProps<{
  modalConfig: IFormConfig
  defaultInfo: object
  otherInfo?: object
  pageName: string,
  submitBeforeCommand?: Function
}>()
const emit = defineEmits(['handleModalQuery']);

const baseFormRef = ref<InstanceType<typeof BaseForm>>()
// 表单值
const formData = ref<IObjKeyValue>({})
watch(
    () => props.defaultInfo,
    (newValue: IObjKeyValue) => {
      for (const item of props.modalConfig.formItems) {
        formData.value[`${item.key}`] = newValue[`${item.key}`]
      }
    }
)
const visible = ref<boolean>(false);
const loading = ref<boolean>(false);
const commandType = ref<'insert'|'edit'>('insert');

// 弹窗确定关闭按钮
const handleCancel = () => {
  visible.value = false;
  baseFormRef.value.resetForm()
}
const handleOk = () => {
  baseFormRef.value.checkValidate().then(async () => {
    loading.value = true;
    let params = formData.value;
    // 进行submit函数处理,如果参数需要变化都从这里走
    if (props.submitBeforeCommand) {
      params = props.submitBeforeCommand(formData.value);
    }
    let res;
    if (commandType.value === 'insert') {
      res = await mainStore.insertPageDataAction(props.pageName, params);
    }
    else {
      res = await mainStore.editPageDataAction(props.pageName, params);
    }
    if (res.code === 200) {
      message.success(res.msg || '成功', 0.5).then(() => {
        handleCancel();
        // 关闭后重新请求列表
        emit('handleModalQuery');
      })
    } else {
      message.error(res.msg || '失败')
    }
    loading.value = false;
  }).catch(() => {})
}

defineExpose({
  visible,
  commandType,
})
</script>

<style scoped lang="less">
</style>
