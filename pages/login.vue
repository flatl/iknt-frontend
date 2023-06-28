<template>
  <div class="login">
    <login-form class="login__form" />
    <iknt-animation class="login__animation" />
    <button class="login__button" @click="$router.push('/')">
      <close-icon />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IkntAnimation from '@/components/ui/IkntAnimation.vue';
import LoginForm from '@/components/admin/LoginForm.vue';
import CloseIcon from '@/assets/icons/close.svg?inline';
// import { ApiController } from '@/lib/api';

export default defineComponent({
  components: { IkntAnimation, LoginForm, CloseIcon },

  head() {
    return {
      title: 'Институт Компьютерных Наук и Технологий Пермского Университета',
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/regl@1.3.1/dist/regl.min.js',
          defer: true,
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  &__animation {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &__form {
    position: relative;
    z-index: 3;
  }

  &__button {
    position: fixed;
    z-index: 3;
    top: 1rem;
    right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--c-black);
  }
}
</style>
