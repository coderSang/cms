import { defineStore } from 'pinia';
import { getExamination, exportBlobExamination } from '@/service/main/examination';
import { getUser, insertUser, editUser, delUser, importUser } from '@/service/system/user';
import { getStreet, insertStreet, editStreet, delStreet } from '@/service/system/street';

const apisConfig: IObjKeyValue = {
  user: {
    get: getUser,
    insert: insertUser,
    edit: editUser,
    del: delUser,
    blobImport: importUser,
  },
  dept: {
    get: getStreet,
    insert: insertStreet,
    edit: editStreet,
    del: delStreet,
  },
  examination: {
    get: getExamination,
    blobExport: exportBlobExamination,
  }
}
export const useMainStore = defineStore('main', {
  state: () => {
    return {
      pageList: [],
      pageCount: 0,
    };
  },
  actions: {
    // 获取table列表
    async getPageListAction(pageName: string, params: any) {
      const result = await apisConfig[pageName].get(params)
      if (result.code === 200) {
        this.pageList = result.data.rows;
        this.pageCount = result.data.total;
      }
    },
    // 导出操作
    getPageExportAction(pageName: string, params: any) {
      return apisConfig[pageName].blobExport(params)
    },
    // 导入操作
    getPageImportAction(pageName: string, params: any) {
      return apisConfig[pageName].blobImport(params)
    },
    // 编辑
    editPageDataAction(pageName: string, params: any) {
      return apisConfig[pageName].edit(params)
    },
    // 新增
    async insertPageDataAction(pageName: string, params: any) {
      return apisConfig[pageName].insert(params)
    },
    // 删除
    delPageDataAction(pageName: string, params: any) {
      return apisConfig[pageName].del(params)
    },
  }
});
