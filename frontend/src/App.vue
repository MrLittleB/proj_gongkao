<script setup>
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <div id="app-layout">
    <TheHeader />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* 全域樣式，不使用 scoped */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  background-color: #f8f9fa; /* 淡灰色背景 */
}
</style>

<style scoped>
.main-content {
  /* 手機上的預設樣式 */
  width: 100%;
  padding: 70px 16px 20px 16px;
  box-sizing: border-box;
}

/* 當螢幕寬度大於 768px 時，套用這些樣式 */
@media (min-width: 768px) {
  .main-content {
    max-width: 960px;  /* 限制最大寬度 */
    margin: 0 auto;    /* 水平置中 */
  }
}
</style>