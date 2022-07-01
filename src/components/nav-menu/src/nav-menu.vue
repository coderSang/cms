<template>
  <div class="nav-menu">
    <a-menu
        mode="inline"
        theme="light"
        v-model:selectedKeys="selectedKeys"
        @click="handleClick"
    >
      <template v-for="menu in menusPermission">
        <a-menu-item v-if="menu.children.length === 0" :key="menu.path">
          <span>{{ menu.name }}</span>
        </a-menu-item>
        <a-sub-menu v-else :key="menu.id">
          <template #title>{{ menu.name }}</template>
          <a-menu-item v-for="subMenu in menu.children" :key="subMenu.path">
            {{ subMenu.name }}
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/login';

const loginStore = useLoginStore();
const router = useRouter();
// router
const route = useRoute()
const selectedKeys = ref<string[]>([route.path]);
const menusPermission = computed(() => loginStore.userMenus);

interface menuItem {
  key: string
}
const handleClick = (item: menuItem) => {
  router.replace(item.key);
};
</script>

<style scoped lang="less">
</style>
