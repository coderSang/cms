import { createPinia } from 'pinia';
import { useLoginStore } from '@/stores/login';

const pinia = createPinia();
export default pinia;

// 页面进入加载localStorage数据
export async function setupStore() {
  const loginStore = useLoginStore()
  await loginStore.loadLocalLogin();
}
