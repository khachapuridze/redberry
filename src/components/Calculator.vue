<template>
  <div class="calculator">
    <div class="calculator__title">Compensation Calculator</div>

    <Input
      inputTitle="Average income"
      inputLabel="€"
      :modelValue="avarageIncome"
      @update:modelValue="avarageIncome = $event"
    />
    <Input
      inputTitle="Days on sick-leave"
      inputLabel="days"
      :modelValue="sickLeaveDays"
      @update:modelValue="sickLeaveDays = $event"
    />
    <div class="error-msg" v-if="sickLeaveDaysError">
      The maximum duration of one insurance event is {{ maxSickLeaveDays }} days
    </div>

    <div class="checkbox">
      <input id="tuber" type="checkbox" v-model="haveTuberculosis" />
      <label for="tuber">I have tubercolosis</label>
    </div>
    <div class="calculator__calculate-btn flex-center pointer" @click="calculate">Calculate</div>
    <div class="calculator__compensate">
      <div class="calculator__compensate-item">
        <div class="calculator__compensate-title">
          The employer compensates <br /><span>{{ compensateByTheCompany.days }} days</span>
        </div>
        <div class="calculator__compensate-value">{{ formatNumber(compensateByTheCompany.money) }}€</div>
        <div class="calculator__compensate-daily">
          Daily allowance <br />
          {{ formatNumber(compensateByTheCompany.daily) }} €
        </div>
      </div>
      <div class="calculator__compensate-item">
        <div class="calculator__compensate-title">
          Health Insurance compensates <br /><span>{{ compensateByTheInsurance.days }} days</span>
        </div>
        <div class="calculator__compensate-value">{{ formatNumber(compensateByTheInsurance.money) }}€</div>
        <div class="calculator__compensate-daily">
          Daily allowance <br />
          {{ formatNumber(compensateByTheInsurance.daily) }} €
        </div>
      </div>
    </div>
    <div class="calculator__compensate-total">
      <div class="calculator__compensate-title">Compensation total for {{ totalCompensate.days }} days (net)</div>
      <div class="calculator__compensate-total-value">{{ formatNumber(totalCompensate.money) }}€</div>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed } from "vue";
  import Input from "./Input.vue";

  const avarageIncome = ref();
  const sickLeaveDays = ref();
  const haveTuberculosis = ref(false);
  const maxSickLeaveDays = computed(() => (haveTuberculosis.value ? 240 : 182));

  //   errors
  const sickLeaveDaysError = ref(false);

  //   compensations values
  const compensateByTheCompany = ref({
    money: 0,
    days: 0,
    daily: 0,
  });
  const compensateByTheInsurance = ref({
    money: 0,
    days: 0,
    daily: 0,
  });
  const totalCompensate = ref({
    days: 0,
    money: 0,
  });

  //   helper functions
  const formatNumber = (num) => {
    return Number(num.toFixed(2)).toLocaleString("en-US");
  };
  const calculateCompensate = (days) => {
    return (avarageIncome.value / 22) * days * 0.7;
  };
  // calculate methods
  const calculateCompensateByTheCompany = () => {
    compensateByTheCompany.value.days = sickLeaveDays.value > 8 ? 8 : sickLeaveDays.value;
    compensateByTheCompany.value.money = calculateCompensate(compensateByTheCompany.value.days);
    compensateByTheCompany.value.daily = compensateByTheCompany.value.money / compensateByTheCompany.value.days;
  };
  const calculateCompensateByTheCInsurance = () => {
    compensateByTheInsurance.value.days = sickLeaveDays.value - compensateByTheCompany.value.days;
    compensateByTheInsurance.value.money = calculateCompensate(compensateByTheInsurance.value.days);
    compensateByTheInsurance.value.daily = compensateByTheInsurance.value.money / compensateByTheInsurance.value.days;
  };

  const clearCompensateValues = () => {
    const clearValues = (obj) => {
      Object.keys(obj).forEach((v) => (obj[v] = 0));
    };

    clearValues(totalCompensate.value);
    clearValues(compensateByTheInsurance.value);
    clearValues(compensateByTheCompany.value);
  };

  const calculate = () => {
    if (!avarageIncome.value || !sickLeaveDays.value) return;
    sickLeaveDaysError.value = sickLeaveDays.value > maxSickLeaveDays.value;
    if (sickLeaveDaysError.value) {
      clearCompensateValues();
      return;
    }
    calculateCompensateByTheCompany();

    if (sickLeaveDays.value > 8) {
      calculateCompensateByTheCInsurance();
    }
    totalCompensate.value.money = compensateByTheInsurance.value.money + compensateByTheCompany.value.money;
    totalCompensate.value.days = sickLeaveDays.value;
  };
</script>
<style lang="scss">
  .calculator {
    color: #111317;
    background-color: #ffffff;
    padding: 80px 20px;
    clip-path: polygon(5% 0%, 95% 0%, 100% 2%, 100% 98%, 95% 100%, 5% 100%, 0% 98%, 0% 2%);
    .input {
      margin-bottom: 20px;
    }
    .error-msg {
      color: #e1261c;
      margin-top: -15px;
      font-size: 11px;
      margin-left: 2px;
    }
    &__title {
      font-weight: 700;
      font-size: 24px;
      line-height: 25px;
      margin-bottom: 20px;
    }
    .checkbox {
      display: flex;
      input {
        width: fit-content;
      }
      label {
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        margin-left: 10px;
      }
    }
    &__calculate-btn {
      background: linear-gradient(90deg, #911812 0%, #e1261c 100%);
      border-radius: 30px;
      width: 169px;
      height: 60px;
      font-weight: 700;
      font-size: 18px;
      line-height: 20px;
      color: #ffffff;
      margin: 20px 0;
      transition: 0.2s ease;
      @media (max-width: 1200px) {
        width: 100%;
      }
      &:hover {
        background: linear-gradient(90deg, #911812 0%, #e1261c 100%);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15), inset 0px -4px 0px rgba(0, 0, 0, 0.25);
      }
    }

    &__compensate {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      padding: 20px 0;
      &::before,
      &::after {
        content: "";
        width: calc(100% + 40px);
        height: 2px;
        background-color: #e9edf4;
        position: absolute;
        left: -20px;
      }
      &::before {
        top: 0;
      }
      &::after {
        bottom: 0;
      }
      &-title {
        font-weight: 400;
        font-size: 14px;
        line-height: 15px;
        margin-bottom: 10px;
        text-align: center;
        span {
          color: #111317;
          font-weight: 700;
        }
      }
      &-value {
        font-weight: 700;
        font-size: 18px;
        line-height: 20px;
        text-align: center;
        margin-bottom: 5px;
      }
      &-daily {
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #7a818e;
        text-align: center;
      }
      &-total {
        margin-top: 20px;
        &-value {
          font-weight: 700;
          font-size: 24px;
          line-height: 30px;
          text-align: center;
        }
      }
    }
  }
</style>
