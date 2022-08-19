import { defineStore } from 'pinia';
import { getGroup, getRoleList } from '@/service/basic';
interface State {
  streetGroup: any[]
  roleList: any[]
}
export const useConstantStore = defineStore('constant', {
  state: (): State => {
    return {
      streetGroup: [],
      roleList: [],
    };
  },
  actions: {
    async getStreetGroup() {
      const group = await getGroup({})
      const streetGroup = []
      for (const item of group.data) {
        const params = {
          label: item.name,
          value: item.id
        }
        streetGroup.push(params)
      }
      this.streetGroup = streetGroup
    },
    async getRoleList() {
      const roleList = await getRoleList({})
      const roleGroup = []
      for (const item of roleList.data.rows) {
        const params = {
          label: item.roleName,
          value: item.roleId
        }
        roleGroup.push(params)
      }
      this.roleList = roleGroup
    },
    loadConstantData() {
      this.getStreetGroup();
      this.getRoleList();
    }
  }
})
