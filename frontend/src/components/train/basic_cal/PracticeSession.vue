<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import NumericKeypad from './NumericKeypad.vue';

const emit = defineEmits(['retry', 'submit', 'update:userAnswers']);

const props = defineProps({
  questions: { type: Array, required: true },
  userAnswers: { type: Array, required: true },
});

const currentQuestionIndex = ref(0);
const userAnswer = ref('');
const elapsedTime = ref(0);
let timerInterval = null;

onMounted(() => {
  userAnswer.value = props.userAnswers[currentQuestionIndex.value] || '';
  timerInterval = setInterval(() => { elapsedTime.value++; }, 1000);
});

onUnmounted(() => { if (timerInterval) clearInterval(timerInterval); });

watch(currentQuestionIndex, (newIndex) => {
  userAnswer.value = props.userAnswers[newIndex] || '';
});

watch(userAnswer, (newValue) => {
  const newUserAnswers = [...props.userAnswers];
  newUserAnswers[currentQuestionIndex.value] = newValue;
  emit('update:userAnswers', newUserAnswers);
});

const currentQuestion = computed(() => props.questions[currentQuestionIndex.value]);
const isLastQuestion = computed(() => currentQuestionIndex.value === props.questions.length - 1);

const goToNextQuestion = () => { if (!isLastQuestion.value) currentQuestionIndex.value++; };
const goToPreviousQuestion = () => { if (currentQuestionIndex.value > 0) currentQuestionIndex.value--; };

const handleKeyPress = (key) => {
  if (key === '.' && userAnswer.value.includes('.')) {
    return;
  }
  if (userAnswer.value.length < 10) {
    userAnswer.value += key;
  }
};

const handleBackspace = () => { userAnswer.value = userAnswer.value.slice(0, -1); };
const handleClear = () => { userAnswer.value = ''; };
const handleRetry = () => { emit('retry'); };
const submitPractice = () => { emit('submit', elapsedTime.value); };

const handleToggleSign = () => {
  if (userAnswer.value.startsWith('-')) {
    userAnswer.value = userAnswer.value.substring(1);
  } else {
    userAnswer.value = '-' + userAnswer.value;
  }
};
</script>

<template>
  <div class="practice-session-container">
    <header class="top-info">
      <button class="retry-btn" @click="handleRetry">重来</button>
      <div class="progress">{{ currentQuestionIndex + 1 }} / {{ questions.length }} 题</div>
      <div class="timer">用时: {{ elapsedTime }}s</div>
    </header>
    <main class="question-area">
      <div class="question-text">
        <span>{{ currentQuestion.num1 }}</span>
        <span class="operator">{{ currentQuestion.operator }}</span>
        <span>{{ currentQuestion.num2 }}</span>
        <span>=</span>
        <span class="answer-placeholder">{{ userAnswer || '?' }}</span>
      </div>
    </main>
    <NumericKeypad @key-press="handleKeyPress" @backspace="handleBackspace" @clear="handleClear" @toggle-sign="handleToggleSign" />
    <footer class="footer-nav">
      <button @click="goToPreviousQuestion" :disabled="currentQuestionIndex === 0" class="nav-btn prev-btn">上一题</button>
      <button v-if="!isLastQuestion" @click="goToNextQuestion" class="nav-btn next-btn">下一题</button>
      <button v-else @click="submitPractice" class="nav-btn next-btn">提交</button>
    </footer>
  </div>
</template>

<style scoped>
/* 定义主题颜色变量 */
.practice-session-container {
  /* 浅色模式 (默认) */
  --bg-color: #f0f2f5;
  --text-color-primary: #1f2329;
  --text-color-secondary: #6c757d;
  --keypad-bg-default: #ffffff;
  --keypad-bg-special: #ffc107;
  --keypad-text-special: #1f2329;
  --btn-bg-prev: #6c757d;
  --btn-bg-next: #007bff;
  --btn-text-color: #ffffff;
  --answer-underline: #007bff;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .practice-session-container {
    --bg-color: #1f2329;
    --text-color-primary: #ffffff;
    --text-color-secondary: #adb5bd;
    --keypad-bg-default: #343a40;
    --keypad-bg-special: #ffc107;
    --keypad-text-special: #1f2329;
    --btn-bg-prev: #495057;
    --btn-bg-next: #007bff;
    --btn-text-color: #ffffff;
    --answer-underline: #ffc107;
  }
}

/* 应用变量到样式 */
.practice-session-container {
  background-color: var(--bg-color);
  color: var(--text-color-primary);
  display: flex;
  flex-direction: column;
  align-items: center; 
  /* 关键修改：将 vh 改为 dvh，以适应手机浏览器动态变化的视窗高度 */
  height: calc(100dvh - 50px);
  box-sizing: border-box;
  padding: 0 16px;
}

.top-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  color: var(--text-color-secondary);
  flex-shrink: 0;
  width: 100%;
  max-width: 320px;
}

.retry-btn {
  background: var(--keypad-bg-default);
  color: var(--text-color-primary);
  border: none;
  border-radius: 16px;
  padding: 6px 12px;
  cursor: pointer;
}

.question-area {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
  width: 100%;
}

.question-text .operator {
  margin: 0 16px;
}
.question-text .answer-placeholder {
  display: inline-block;
  min-width: 100px;
  text-align: center;
  border-bottom: 3px solid var(--answer-underline);
  margin-left: 16px;
  color: var(--answer-underline);
}

.footer-nav {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  max-width: 320px;
}

.nav-btn {
  width: 48%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  color: var(--btn-text-color);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev-btn {
  background-color: var(--btn-bg-prev);
}
.next-btn {
  background-color: var(--btn-bg-next);
}
</style>