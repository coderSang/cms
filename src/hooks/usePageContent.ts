import { ref } from 'vue';

import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

type CallbackFn = (item?: any) => void
export function usePageContent(
  pageContentRef: InstanceType<typeof PageContent>,
  modalConfig: any,
  newCb?: CallbackFn,
  editCb?: CallbackFn,
) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref<IObjKeyValue>({});

  const handleNewData = () => {
    defaultInfo.value = {};
    modalConfig.formItems.forEach((item: any) => {
      if (item.defaultValue !==undefined) {
        defaultInfo.value[item.key] = item.defaultValue;
      }
    });
    if (pageModalRef.value) {
      pageModalRef.value.visible = true;
      pageModalRef.value.commandType = 'insert';
    }
    newCb && newCb();
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.visible = true;
      pageModalRef.value.commandType = 'edit';
    }
    editCb && editCb();
  };
  return [ pageModalRef, defaultInfo, handleNewData, handleEditData ];
}
