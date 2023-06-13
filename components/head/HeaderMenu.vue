<template>
  <div class="header-menu">
    <button class="header-menu__button" @click="toggleOpened">
      <burger-opened-icon v-if="isOpened" />
      <burger-closed-icon v-else />
    </button>
    <div v-if="isOpened" class="header-menu__container">
      <button class="header-menu__close-button" @click="close">
        <close-icon />
      </button>

      <ul class="header-menu__items">
        <li
          v-for="(item, index) of items"
          :key="index"
          class="header-menu__item"
        >
          <nuxt-link :to="item.link" class="header-menu__item__link">
            {{ item.title }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CloseIcon from '@/assets/icons/close.svg?inline';
import BurgerClosedIcon from '@/assets/icons/burger-closed.svg?inline';
import BurgerOpenedIcon from '@/assets/icons/burger-opened.svg?inline';

export default Vue.extend({
  components: { CloseIcon, BurgerClosedIcon, BurgerOpenedIcon },

  data() {
    return {
      isOpened: false,
      items: [
        {
          title: 'О ПРОГРАММЕ',
          link: '/program',
        },
        {
          title: 'НОВОСТИ И СОБЫТИЯ',
          link: '/news',
        },
        {
          title: 'ФАКУЛЬТЕТ',
          link: '/faculty',
        },
        {
          title: 'СТИПЕНДИИ',
          link: '/scholarship',
        },
        {
          title: 'ОТЗЫВЫ ВЫПУСКНИКОВ',
          link: '/reviews',
        },
        {
          title: 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ',
          link: '/faq',
        },
      ],
    };
  },

  methods: {
    toggleOpened() {
      this.isOpened = !this.isOpened;
    },

    close() {
      this.isOpened = false;
    },
  }
});
</script>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  grid-gap: 1.25rem;

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--c-white);
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: 20rem;
    height: auto;
    padding: .5rem;
    grid-gap: .5rem;
    background-color: var(--c-white);
  }

  &__close-button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: var(--c-black);
  }

  &__item {
    font-size: .75rem;
    font-weight: 700;
    line-height: 100%;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 14px 1rem;
  }
}
</style>
