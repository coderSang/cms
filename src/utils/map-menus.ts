import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
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
// [{ route: page-name }, ...] 生成path-name keymap
export function mapRouteToName(userMenus: any[]) {
  const allMapName: any = {};
  const _recurseGetName = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.children.length === 0) {
        allMapName[menu.path] = menu.name;
      } else {
        _recurseGetName(menu.children)}
    }
  }
  _recurseGetName(userMenus);
  return allMapName;
}
// 面包屑
export function pathBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs;
}
export function pathMapToMenu(userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]) {
  for (const menu of userMenus) {
    if (menu.children.length === 0 && currentPath === menu.path) {
      return menu;
    } else if (menu.children.length > 0) {
      breadcrumbs?.push({ name: menu.name, path: menu.path })
      const findMenu: any = pathMapToMenu(menu.children, currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.path } );
        return findMenu
      } else {
        breadcrumbs?.pop()
      }
    }
  }
}
export { firstMenu };
