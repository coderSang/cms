import { RouteRecordRaw } from 'vue-router'

// 初始化的第一个展示的界面
let firstMenu: any = null

// 动态加载路由
export async function mapMenusToRoutes(userMenus: any[]): Promise<RouteRecordRaw[]> {
  // 返回的route
  const routes: RouteRecordRaw[] = [];
  // 文件中所有的路由
  const allRoutes: RouteRecordRaw[] = []
  const modules = import.meta.glob('../router/main/**/*.ts')
  for (const path in modules) {
    const mod = await modules[path]()
    allRoutes.push(mod.default)
  }
  // 递归获取
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.children.length === 0) {
        if (!firstMenu) {
          firstMenu = menu;
        }
        const route = allRoutes.find((item) => {
          return item.path === menu.path
        })
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes;
}

export { firstMenu };
