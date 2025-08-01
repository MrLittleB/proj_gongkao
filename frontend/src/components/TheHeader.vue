<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 擴展 dayjs 以支援 UTC 和時區
dayjs.extend(utc);
dayjs.extend(timezone);

const beijingTime = ref('');
let timer;

// 更新時間的函式
const updateTime = () => {
  // 設定時區為 "Asia/Shanghai"，這就是中國標準時間 (CST)，也就是我們常說的北京時間
  beijingTime.value = dayjs().tz("Asia/Shanghai").format('HH:mm:ss');
};

// 元件掛載時，立即更新一次時間，並設定每秒更新的定時器
onMounted(() => {
  updateTime();
  timer = setInterval(updateTime, 1000);
});

// 元件卸載時，清除定時器，避免記憶體洩漏
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<template>
  <header class="top-bar">
    <div class="left-section">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <div class="center-section">
      <span>{{ beijingTime }}</span>
    </div>
    <div class="right-section">
      </div>
  </header>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  background-color: #ffffff;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.left-section, .right-section {
  flex: 1;
}

.right-section {
  text-align: right;
}

.center-section {
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1rem;
}

.left-section a {
  text-decoration: none;
  color: #1a73e8;
  font-weight: 500;
  font-size: 1.1rem;
}
</style>