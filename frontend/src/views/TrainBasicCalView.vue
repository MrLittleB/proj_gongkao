<script setup>
import { ref, computed } from 'vue';
import ConfigForm from '../components/train/basic_cal/ConfigForm.vue';
import PracticeSession from '../components/train/basic_cal/PracticeSession.vue';
import ResultsSummary from '../components/train/basic_cal/ResultsSummary.vue';

const sessionState = ref('configuring');

const config = ref({
  frontDigits: 1, // 默认值改为 1，方便测试
  backDigits: 1,  // 默认值改为 1，方便测试
  selectedOperator: '+',
  questionCount: 20,
});
const questions = ref([]);
const userAnswers = ref([]);
const totalTime = ref(0);

// --- 修改这里的题目生成逻辑 ---
const generateQuestions = (configData) => {
  const generated = [];
  const { frontDigits, backDigits, operator, questionCount } = configData;

  // 辅助函数：根据位数和运算符生成随机数
  const getRandomNumber = (digits, op) => {
    // 如果位数大于1，则按原逻辑生成，允许出现 0
    if (digits > 1) {
      const min = Math.pow(10, digits - 1);
      const max = Math.pow(10, digits) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // 如果位数等于1，则根据运算符应用新规则
    if (digits === 1) {
      if (op === '×') {
        // 乘法规则：范围是 [2, 9]
        // (9 - 2 + 1) = 8个数字
        return Math.floor(Math.random() * 8) + 2;
      } else {
        // 加减法规则：范围是 [1, 9]
        // (9 - 1 + 1) = 9个数字
        return Math.floor(Math.random() * 9) + 1;
      }
    }
    return 0; // 默认返回0以防万一
  };

  for (let i = 0; i < questionCount; i++) {
    // 生成数字时传入运算符，以应用正确的规则
    let num1 = getRandomNumber(frontDigits, operator);
    let num2 = getRandomNumber(backDigits, operator);
    let answer;

    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        if (num1 < num2) {
          [num1, num2] = [num2, num1];
        }
        answer = num1 - num2;
        break;
      case '×':
        answer = num1 * num2;
        break;
    }
    // 答案统一转为字符串，方便后续比较
    generated.push({ num1, num2, operator, answer: String(answer) });
  }
  return generated;
};
// --- 修改结束 ---

const results = computed(() => {
  let correctCount = 0;
  const details = questions.value.map((q, index) => {
    const userAnswer = userAnswers.value[index];
    const isCorrect = userAnswer === q.answer;
    if (isCorrect) {
      correctCount++;
    }
    return {
      question: `${q.num1} ${q.operator} ${q.num2}`,
      userAnswer: userAnswer || '未作答',
      correctAnswer: q.answer,
      isCorrect: userAnswer === '未作答' || userAnswer === '' ? false : isCorrect,
      isAnswered: userAnswer !== '未作答' && userAnswer !== '',
    };
  });
  return {
    correctCount,
    questionCount: questions.value.length,
    totalTime: totalTime.value,
    accuracy: questions.value.length > 0 ? (correctCount / questions.value.length * 100).toFixed(1) : 0,
    details,
  };
});

const handleStartPractice = () => {
  const currentConfig = { ...config.value, operator: config.value.selectedOperator };
  questions.value = generateQuestions(currentConfig);
  userAnswers.value = Array(questions.value.length).fill('');
  totalTime.value = 0;
  sessionState.value = 'practicing';
};

const handleSessionSubmit = (finalTime) => {
  totalTime.value = finalTime;
  sessionState.value = 'results';
};

const handleSessionRetry = () => {
  sessionState.value = 'configuring';
};
</script>

<template>
  <div>
    <ConfigForm 
      v-if="sessionState === 'configuring'" 
      v-model:front-digits="config.frontDigits"
      v-model:back-digits="config.backDigits"
      v-model:selected-operator="config.selectedOperator"
      v-model:question-count="config.questionCount"
      @start-practice="handleStartPractice" 
    />
    
    <PracticeSession 
      v-else-if="sessionState === 'practicing'" 
      :questions="questions"
      :user-answers="userAnswers"
      @update:userAnswers="userAnswers = $event"
      @submit="handleSessionSubmit"
      @retry="handleSessionRetry" 
    />
    
    <ResultsSummary
      v-else-if="sessionState === 'results'"
      :results="results"
      @retry="handleSessionRetry"
    />
  </div>
</template>

<style scoped>
/* 样式无需修改 */
</style>