<template>
  <div class="input">
    <div class="input__title">{{ inputTitle }}</div>
    <div class="input__container">
      <input type="number" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
      <div class="input__label">{{ inputLabel }}</div>
    </div>
  </div>
</template>

<script setup>
  import { defineEmits } from "vue";

  const emit = defineEmits(["update:modelValue"]);
  defineProps({
    modelValue: {
      type: [String, Number],
      default: "",
    },
    inputTitle: {
      type: String,
      default: "",
    },
    inputLabel: {
      type: [String, Number],
      default: "",
    },
  });
</script>
<style lang="scss" scoped>
  .input {
    input {
      height: 50px;
      padding: 10px;
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
    &__title {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #111317;
      margin-bottom: 5px;
    }
    &__label {
      position: absolute;
      top: 50%;
      transform: translate(0%, -50%);
      right: 10px;
      color: #111317;
      font-weight: 700;
      font-size: 18px;
    }
  }
</style>
