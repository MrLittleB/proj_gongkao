<script setup>
defineProps({
  results: { type: Object, required: true },
});
const emit = defineEmits(['retry']);
</script>

<template>
  <div class="summary-container">
    <div class="summary-header">
      <h1>训练完成!</h1>
      <button class="retry-btn" @click="emit('retry')">再来一次</button>
    </div>

    <div class="stats-grid">
      <div class="stat-item">
        <div class="value">{{ results.totalTime }}s</div>
        <div class="label">总用时</div>
      </div>
      <div class="stat-item">
        <div class="value">{{ results.correctCount }} / {{ results.questionCount }}</div>
        <div class="label">答对题数</div>
      </div>
      <div class="stat-item">
        <div class="value">{{ results.accuracy }}%</div>
        <div class="label">正确率</div>
      </div>
    </div>

    <div class="details-section">
      <h3>答题详情</h3>
      <div class="details-list-container">
        <ul class="details-list">
          <li v-for="(item, index) in results.details" :key="index" :class="{ correct: item.isCorrect, incorrect: !item.isCorrect }">
            <div class="left-info">
              <span class="question-number">{{ index + 1 }}.</span>
              <span class="question">{{ item.question }} =</span>
            </div>
            <div class="right-info">
              <span v-if="!item.isAnswered" class="user-answer incorrect">未作答 ✗</span>
              <span v-else class="user-answer" :class="{ correct: item.isCorrect, incorrect: !item.isCorrect }">
                {{ item.userAnswer }} {{ item.isCorrect ? '✓' : '✗' }}
              </span>
              <span v-if="!item.isCorrect" class="correct-answer">
                正确: {{ item.correctAnswer }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1. 修改：将主容器设置为 flex 布局 */
.summary-container {
  max-width: 420px;
  margin: 0 auto;
  padding: 20px 20px 0 20px; /* 底部 padding 移除，交由子元素控制 */
  display: flex; /* 开启 flex 布局 */
  flex-direction: column; /* 设置为垂直方向 */
  /* 计算高度，填满从顶部 Bar 下方到屏幕底部的空间 */
  height: calc(100vh - 50px - 40px); /* 100vh - 顶部 Bar 高度 - 上下 padding */
  box-sizing: border-box;
}

.summary-header, .stats-grid {
  flex-shrink: 0; /* 防止这些元素在空间不足时被压缩 */
}

.summary-header {
  text-align: center;
  margin-bottom: 24px;
}

h1 {
  margin-top: 0;
  margin-bottom: 16px;
}

.retry-btn {
  width: 100%;
  padding: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background-color: #e0e0e0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}

.stat-item {
  background-color: #fff;
  padding: 16px 8px;
  text-align: center;
}

.stat-item .value { font-size: 20px; font-weight: bold; margin-bottom: 4px; }
.stat-item .label { font-size: 12px; color: #6c757d; }

/* 2. 修改：让详情区域能够伸展 */
.details-section {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* 关键：让这个区域占据所有剩余的垂直空间 */
  min-height: 0; /* flex 布局中的一个重要技巧，防止内容溢出 */
}

.details-section h3 {
  margin-bottom: 12px;
  flex-shrink: 0;
}

.details-list-container {
  /* 移除了 max-height，让其自然填充 */
  overflow-y: auto; /* 当内容超出时，显示垂直滚动条 */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  background-color: #fff;
  flex-grow: 1; /* 确保它在 .details-section 内也能填满空间 */
}

.details-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* ... 列表项 li 内部的样式保持不变 ... */
.details-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  border-left: 4px solid;
  border-bottom: 1px solid #f0f0f0;
}
.details-list li:last-child { border-bottom: none; }
.details-list li.correct { border-left-color: #28a745; }
.details-list li.incorrect { border-left-color: #dc3545; }
.left-info { display: flex; align-items: center; gap: 8px; }
.right-info { display: flex; align-items: baseline; gap: 8px; }
.question-number { color: #6c757d; }
.question { font-weight: 500; }
.user-answer { font-weight: bold; }
.correct-answer { font-size: 12px; color: #6c757d; }
.correct .user-answer { color: #28a745; }
.incorrect .user-answer { color: #dc3545; }
</style>