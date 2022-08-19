import { createPinia } from 'pinia';
import { useLoginStore } from '@/stores/login';
import { useConstantStore } from '@/stores/constant';

const pinia = createPinia();
export default pinia;

// 页面进入加载localStorage数据
export async function setupStore() {
  const loginStore = useLoginStore();
  const constantStore = useConstantStore();
  await loginStore.loadLocalLogin();
  try {
    constantStore.loadConstantData();
  } catch (err) {
    console.log(err)
  }
}
