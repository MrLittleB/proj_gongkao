<script setup>
// 定义组件可以发出的所有事件
const emit = defineEmits(['key-press', 'backspace', 'clear', 'toggle-sign']);

// 使用一个二维数组来定义键盘布局，方便模板渲染
const keypadLayout = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'backspace']
];

// 根据按键类型发出不同的事件
const handleSpecialKey = (key) => {
  if (key === 'C') emit('clear');
  if (key === '+/-') emit('toggle-sign');
};
</script>

<template>
  <div class="keypad-container">
    <div class="keypad-row special-keys">
      <button @click="handleSpecialKey('+/-')" class="keypad-btn function-btn">+/-</button>
      <button @click="handleSpecialKey('C')" class="keypad-btn function-btn">C</button>
    </div>

    <div class="keypad-grid">
      <template v-for="row in keypadLayout" :key="row[0]">
        <button 
          v-for="key in row" 
          :key="key" 
          @click="key === 'backspace' ? emit('backspace') : emit('key-press', key)"
          class="keypad-btn"
        >
          <svg v-if="key === 'backspace'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
          <span v-else>{{ key }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.keypad-container {
  width: 100%;
  max-width: 320px;
  box-sizing: border-box;
}

.keypad-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.special-keys .keypad-btn {
  flex: 1; /* 平分宽度 */
  background-color: var(--keypad-bg-special, #ffc107);
  color: var(--keypad-text-special, #1f2329);
}

.keypad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.keypad-btn {
  height: 60px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  
  background-color: var(--keypad-bg-default, #fff);
  color: var(--text-color-primary, #000);
  
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s;
}

.keypad-btn:active {
  background-color: #d1d1d1; /* 一个通用的按压效果 */
}
</style>