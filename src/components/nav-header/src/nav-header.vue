<template>
  <div class="nav-header">
    <div class="title">
      {{ title }}
    </div>
    <div class="user-handle">
      <a-dropdown>
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <lock-outlined />
            修改密码
          </a-menu-item>
          <a-menu-item key="2">
            <poweroff-outlined />
            退出
          </a-menu-item>
        </a-menu>
      </template>
      <span>
        <user-outlined />
        {{ loginStore.userInfo.userName }}
        <DownOutlined />
      </span>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PoweroffOutlined, LockOutlined, UserOutlined, DownOutlined } from '@ant-design/icons-vue';

import { useLoginStore } from '@/stores/login';

const loginStore = useLoginStore()
const title = import.meta.env.VITE_APP_TITLE
const handleMenuClick = (e: any) => {
  console.log(e);
}
</script>

<style scoped lang="less">
.nav-header{
  color: #FFF;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .user-handle {
    font-size: 18px;
  }
}
</style>
