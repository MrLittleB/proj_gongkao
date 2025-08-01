<script setup>
// 子组件只定义 props 来接收数据，和 emits 来发送事件
// 它不再拥有自己的 ref 数据状态

defineProps({
  frontDigits: Number,
  backDigits: Number,
  selectedOperator: String,
  questionCount: Number,
});

const emit = defineEmits([
  'update:frontDigits',
  'update:backDigits',
  'update:selectedOperator',
  'update:questionCount',
  'start-practice'
]);

// 当表单提交时，只负责告诉父组件“该开始了”
const handleSubmit = () => {
  emit('start-practice');
};

// 每当输入框内容改变时，立即将新值发送给父组件
const onInput = (event, field) => {
  // 对数字输入进行处理
  const value = event.target.valueAsNumber || Number(event.target.value);
  emit(`update:${field}`, value);
};

const onRadioChange = (event) => {
  emit('update:selectedOperator', event.target.value);
};
</script>

<template>
  <div class="config-form-container">
    <form @submit.prevent="handleSubmit">
      <h2>练习设置</h2>
      
      <div class="form-group">
        <label for="front-digits">第一个数字的位数：</label>
        <input 
          id="front-digits" 
          type="number" 
          :value="frontDigits"
          @input="onInput($event, 'frontDigits')"
          min="1" max="5" required
        >
      </div>
      
      <div class="form-group">
        <label for="back-digits">第二个数字的位数：</label>
        <input 
          id="back-digits" 
          type="number" 
          :value="backDigits"
          @input="onInput($event, 'backDigits')"
          min="1" max="5" required
        >
      </div>
      
      <div class="form-group">
        <label>选择运算符：</label>
        <div class="operators">
          <label>
            <input type="radio" name="operator" value="+" :checked="selectedOperator === '+'" @change="onRadioChange">
            <span>加 (+)</span>
          </label>
          <label>
            <input type="radio" name="operator" value="-" :checked="selectedOperator === '-'" @change="onRadioChange">
            <span>减 (-)</span>
          </label>
          <label>
            <input type="radio" name="operator" value="×" :checked="selectedOperator === '×'" @change="onRadioChange">
            <span>乘 (×)</span>
          </label>
        </div>
      </div>
      
      <div class="form-group">
        <label for="question-count">题目数量：</label>
        <input 
          id="question-count" 
          type="number" 
          :value="questionCount"
          @input="onInput($event, 'questionCount')"
          min="1" max="100" required
        >
      </div>
      
      <button type="submit" class="submit-btn">完成配置，开始刷题</button>
    </form>
  </div>
</template>

<style scoped>
/* 样式无需改变 */
/* ... (请保留您之前的 <style scoped> 内容) ... */
.config-form-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group > label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input[type="number"] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 16px;
}

.operators {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 6px;
  overflow: hidden;
}

.operators label {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  cursor: pointer;
  background-color: #f8f9fa;
  color: #333;
  transition: background-color 0.2s;
  border-left: 1px solid #ccc;
  position: relative;
}

.operators label:first-child {
  border-left: none;
}

.operators input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.operators label:has(input[type="radio"]:checked) {
  background-color: #1a73e8;
  color: white;
  border-color: #1a73e8;
}

.operators label:not(:has(input[type="radio"]:checked)):hover {
  background-color: #e9ecef;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 24px;
}

.submit-btn:hover {
  background-color: #1558b8;
}
</style>