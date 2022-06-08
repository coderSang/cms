<template>
  <div class="main">
    <a-layout>
      <a-layout-header>
        <div class="nav-header">
          <nav-header></nav-header>
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider>
          <div class="nav-menu">
            <nav-menu></nav-menu>
          </div>
        </a-layout-sider>
        <a-layout-content>
          <div class="nav-body">
            <router-view></router-view>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import NavHeader from '@/components/nav-header'
import NavMenu from '@/components/nav-menu'
</script>

<style scoped lang="less">
.main{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .nav-header{
    height: 64px;
  }
  .nav-menu{
    height: calc(100vh - 64px);
  }
}
.ant-layout-header{
  background: #1890ff;
}
.ant-layout-sider{
  background: #fff;
}

</style>
