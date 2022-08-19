import { defineStore } from 'pinia';
import { useConstantStore } from '@/stores/constant';
import localCache from '@/utils/cache'
import router from '@/router';
import { getCache, getLogin, getUserInfo, getMenus } from '@/service/login';
import { ILoginType } from '@/service/types'
import { mapMenusToRoutes } from '@/utils/map-menus';
export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      verifyCode: '',
      token: '',
      userInfo: null,
      userMenus: [],
      counter: 6,
      permissions: [
        'system:user:insert','system:user:import','system:user:update',
        'system:user:delete',
        'system:dept:insert', 'system:dept:update', 'system:dept:delete',
      ],
    };
  },
  actions: {
    async getVerify() {
      const result = await getCache()
      this.verifyCode = result.data.img;
      return result.data.img;
    },
    async getLogin(params: ILoginType) {
      // 登录处理
      const result = await getLogin(params)
      if (result.code === 200) {
        this.token = result.data;
        localCache.setCache('token', result.data);
      }
      await this.getUserInfo()
      await this.getMenus()
      await this.mapToMenus();
      const constantStore = useConstantStore();
      await constantStore.loadConstantData();
      await router.push('/main')
    },
    // 获取用户信息
    async getUserInfo() {
      const result = await getUserInfo();
      this.userInfo = result.data;
      localCache.setCache('userInfo', result.data);
    },
    // 获取菜单
    async getMenus() {
      const result = await getMenus();
      this.userMenus = result.data;
      localCache.setCache('userMenus', result.data);
    },
    // 动态绑定路由
    async mapToMenus() {
      const routes = await mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
    // 从缓存读取数据
    async loadLocalLogin() {
      const token = localCache.getCache('token');
      if (token) {
        this.token = token;
      }
      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        this.userInfo = userInfo;
      }
      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        this.userMenus = userMenus;
        await this.mapToMenus();
      }
    }
  }
});
