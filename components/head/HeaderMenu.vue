<template>
  <div :class="['header-menu', { opened: isOpened }]">
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
          <a :href="item.link" class="header-menu__item__link">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </div>
    <button
      :class="[
        'header-menu__button',
        { 'enter-animation': enableEnterButtonAnimation },
        { 'leave-animation': enableLeaveButtonAnimation }
      ]"
      @click="toggleOpened"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- <burger-opened-icon v-show="showOpenedIcon" /> -->
      <burger-closed-icon class="header-menu__button__thumb" />
    </button>
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
      enableEnterButtonAnimation: false,
      enableLeaveButtonAnimation: false,
      items: [
        {
          title: 'О ПРОГРАММЕ',
          link: '#program',
        },
        {
          title: 'НОВОСТИ И СОБЫТИЯ',
          link: '#news',
        },
        {
          title: 'ФАКУЛЬТЕТ',
          link: '#faculty',
        },
        {
          title: 'СТИПЕНДИИ',
          link: '#scholarship',
        },
        {
          title: 'ОТЗЫВЫ ВЫПУСКНИКОВ',
          link: '#reviews',
        },
        {
          title: 'ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ',
          link: '#faq',
        },
      ],
    };
  },

  methods: {
    toggleOpened() {
      this.isOpened = !this.isOpened;
    },

    handleMouseEnter() {
      this.enableEnterButtonAnimation = true;
      this.enableLeaveButtonAnimation = false;
    },

    handleMouseLeave() {
      if (!this.isOpened) {
        this.enableEnterButtonAnimation = false;
        this.enableLeaveButtonAnimation = true;
      }
    },

    close() {
      this.isOpened = false;
      this.enableEnterButtonAnimation = false;
      this.enableLeaveButtonAnimation = true;
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

    &__thumb {
      transition: transform .15s linear;
    }

    &.enter-animation {
      .header-menu__button__thumb {
        transform: rotateZ(45deg);

        path {
          fill: var(--c-dark-blue);
        }
      }
    }

    &.leave-animation {
      .header-menu__button__thumb {
        transform: rotateZ(0);

        path {
          fill: var(--c-black);
          animation: fill-anim .15s 1;
        }
      }
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: 20rem;
    height: auto;
    padding: .5rem;
    grid-gap: .5rem;
    border-radius: 1.5rem;
    background-color: var(--c-white);
  }

  &__close-button {
    align-self: flex-end;
    display: flex;
    justify-content: center;
    align-items: center;
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

    &__link {
      display: inline-block;
      width: 100%;
      height: 100%;
      padding: 14px 1rem;
      color: var(--c-black)
    }
  }
}

@keyframes fill-anim {
  0% {
    fill: var(--c-dark-blue);
  }

  90% {
    fill: var(--c-dark-blue);
  }

  100% {
    fill: var(--c-black);
  }
}

@media (max-width: 600px) {
  .header-menu {
    &.opened {
      position: static;

      .header-menu__container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        border-radius: 0;
        z-index: 6;
      }
    }
  }
}
</style>
