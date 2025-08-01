<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="home-container">
    <RouterLink to="/train/basic_cal" class="action-button">
      基础计算训练
    </RouterLink>
  </div>
</template>

<style scoped>
.home-container {
  text-align: center; /* 讓容器內的所有東西都置中 */
  padding-top: 40px;
}
.action-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #1a73e8;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.action-button:hover {
  background-color: #1558b8;
}
</style>