<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <div class="login-account">
      <a-form :model="account" ref="form" :rules="rules">
        <a-form-item label="账号" props="name">
          <a-input></a-input>
        </a-form-item>
        <a-form-item label="密码" props="password">
          <a-input></a-input>
        </a-form-item>
      </a-form>
    </div>
    <div class="account-control">
      <a-checkbox v-model="isKeepPassword">记住密码</a-checkbox>
      <a-link type="primary">忘了密码</a-link>
    </div>
    <a-button type="primary" class="login-btn" @click="handleLoginClick">
      立即登录
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

// import Cache from '@/utils/cache';
// import rules from '../config/account-config';

const isKeepPassword = ref(true);
const account = reactive({
  name: '',
  password: '',
});
const handleLoginClick = (() => {
  console.log(handleLoginClick);
  // Cache.getCache('username');
});

</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 300px;
  .title {
    text-align: center;
  }
  .login-account {
    padding: 30px;
    border: 1px solid rgba(232, 231, 231, 0.8);
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
