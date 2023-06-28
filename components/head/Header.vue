<template>
  <header class="head">
    <div class="head__embleme-wrapper">
      <emblem-thumb class="head__embleme" />
    </div>
    <div class="head__logo-wrapper">
      <logo class="head__logo" />
    </div>
    <div class="head__menu-wrapper">
      <header-menu class="head__menu" />
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderMenu from './HeaderMenu.vue';
import Logo from '@/assets/img/logo.svg?inline';
import EmblemThumb from '@/assets/icons/emblem.svg?inline';

export default Vue.extend({
  components: { HeaderMenu, Logo, EmblemThumb },
});
</script>

<style lang="scss" scoped>
.head {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  height: 5rem;
  padding: 0 1.2rem;
  background-color: var(--c-black);

  &__logo {
    position: sticky;
  }

  &__menu {
    position: fixed;
    z-index: 6;
    top: 1rem;
    right: 1rem;
  }

  &__logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__embleme-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
