<template>
  <form class="form" @submit.prevent>
    <div class="form__logo">
      <emblem class="form__logo__embleme" />
      <logo class="form__logo__logo" />
      <logo-text class="form__logo__logo-text" />
    </div>
    <div class="form__container">
      <div class="form__login-container">
        <input
          v-model="email"
          id="login"
          type="email"
          placeholder="Логин или Email"
          autocomplete="off"
          :class="['form__login', { incorrect: $v.email.$anyError }]"
        />
        <p v-if="$v.email.$anyError" class="form__input-errors">
          <span v-if="!$v.email.required" class="form__input-error">
            не должно быть пустым
          </span>
          <span v-if="!$v.email.email" class="form__input-error">
            недопустимый формат
          </span>
        </p>
      </div>
      <div class="form__password-container">
        <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Пароль"
          :class="['form__password special-symbol', { incorrect: $v.password.$anyError }]"
        />
        <p v-if="$v.password.$anyError" class="form__input-errors">
          <span v-if="!$v.password.required" class="form__input-error">
            не должно быть пустым
          </span>
        </p>
      </div>
      <input type="submit" value="Войти" class="form__submit" @click="handleSubmit" />
    </div>
  </form>  
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Vuelidate from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import Emblem from '@/assets/icons/emblem.svg?inline';
import Logo from '@/assets/img/logo.svg?inline';
import LogoText from '@/assets/icons/logo-text.svg?inline';

export default defineComponent({
  components: { Emblem, Logo, LogoText },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  // @ts-ignore
  validations: {
    email: { email, required },
    password: { required },
  },

  methods: {
    async handleSubmit() {
      this.$v.$touch();
      if (this.$v.$error) return;

      const response = await this.$api.auth({ email: this.email, password: this.password });

      if (response.success) {
        this.$store.dispatch('auth/authenticate', response);
        this.$router.push('/admin');
      } else {
        console.warn('error');
      }
    },
  }
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 360px;
  max-width: 100%;
  padding: 2.5rem;
  grid-gap: 2.5rem;
  border-radius: 0.75rem;
  background-color: var(--c-white);

  &__logo {
    display: flex;
    align-items: center;
    grid-gap: .5rem;

    svg {
      path,
      rect {
        fill: var(--c-black);
      }
    }

    &__embleme {
      width: 2rem;
      height: 2rem;
    }

    &__logo {
      width: 6rem;
      height: 2rem;
    }

    &__logo-text {
      width: 8rem;
      height: 2rem;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;
  }

  &__login-container,
  &__password-container {
    display: flex;
    flex-direction: column;
  }

  &__login,
  &__password {
    &.incorrect {
      border-color: var(--c-red);
    }
  }

  &__input-errors {
    display: flex;
    flex-direction: column;
  }

  &__input-error {
    color: var(--c-red);
  }

  &__submit {
    font-size: .75rem;
    font-weight: 700;
    line-height: 100%;
    letter-spacing: 0.6px;
    color: var(--c-white);
    text-transform: uppercase;
    width: 100%;
    height: 2.5rem;
    margin-top: 1.5rem;
    border: none;
    border-radius: 100px;
    outline: none;
    background-color: var(--c-black);
    cursor: pointer;
  }
}
</style>
