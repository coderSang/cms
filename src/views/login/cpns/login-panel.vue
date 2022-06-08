<template>
  <div class="login-panel">
    <h2 class="title">XXX</h2>
    <div>
      <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off">
        <a-form-item
            label="Username"
            name="userName"
            :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.userName" />
        </a-form-item>

        <a-form-item
            label="Password"
            name="password"
            :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
<!--        <a-form-item-->
<!--            label="verify"-->
<!--            name="verify"-->
<!--            :rules="[{ required: true, message: 'Please input your verify!' }]"-->
<!--        >-->
<!--          <img :src="'data:image/jpeg;base64,' + verifyCode" @click="changeCode" v-if="verifyCode" class="verifybimg" alt="" />-->
<!--&lt;!&ndash;          <a-input v-model:value="formState.password" />&ndash;&gt;-->
<!--        </a-form-item>-->
        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox v-model:checked="remember">Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" @click="login">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue';

import { useLoginStore } from '@/stores/login';
import { ILoginType } from '@/service/types';

// 验证码
const loginStore = useLoginStore();
// loginStore.getVerify()
// const verifyCode = computed(() => loginStore.verifyCode);
// const changeCode = () => {
//   loginStore.getVerify()
// }
// 记录密码
const remember = ref(true);
// 登录
const formState = reactive<ILoginType>({
  userName: 'admin',
  password: 'admin123',
});
const login = () => {
  const result = loginStore.getLogin(formState);
}
</script>

<style scoped lang="less"></style>
