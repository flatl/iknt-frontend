<template>
  <header class="head">
    <header-menu class="head__menu" />
    <logo class="head__logo" />
    <emblem-thumb class="head__emblem" />
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
}
</style>
