<script setup>
  import Calculator from "../components/Calculator.vue";
</script>

<template>
  <main>
    <div class="home">
      <div class="row">
        <div class="home__title">Quam Tristique Condimentum</div>
        <div class="home__desc">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          <span>Curabitur blandit</span> tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit
          aliquet. Vestibulum id ligula porta felis euismod semper.
        </div>
        <div class="row home__content">
          <div class="flex">
            <div class="home__subtitle">Quam Tristique Condimentum</div>
            <div class="home__desc">
              Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus
              mollis interdum. Aenean lacinia bibendum nulla sed.
            </div>
            <ul>
              <li>Tellus Ullamcorper Inceptos</li>
              <li>Magna Condimentum</li>
            </ul>
          </div>
          <div class="flex">
            <img src="../assets/Image.png" alt="image" />
          </div>
        </div>
      </div>

      <Calculator />
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .home {
    color: #ffffff;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 100px;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    &__title {
      font-weight: 700;
      font-size: 40px;
      line-height: 50px;
      color: #ffffff;
      margin-bottom: 20px;
      @media (max-width: 1200px) {
        font-size: 36px;
      }
    }
    &__desc {
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 40px;
    }
    &__subtitle {
      font-weight: 700;
      font-size: 32px;
      line-height: 35px;
      margin-bottom: 20px;
      @media (max-width: 1200px) {
        font-size: 28px;
      }
    }
    &__content {
      display: flex;
      gap: 40px;
      @media (max-width: 1200px) {
        flex-direction: column;
      }
    }
    ul {
      list-style-type: none;
      li {
        font-weight: 400;
        font-size: 18px;
        line-height: 30px;
        &::before {
          content: "";
          display: block;
          position: absolute;
          left: -25px;
          top: 50%;
          transform: translate(0, -50%);
          width: 16px;
          height: 4px;
          background: linear-gradient(90deg, #911812 0%, #e1261c 100%);
        }
      }
    }
  }
</style>
