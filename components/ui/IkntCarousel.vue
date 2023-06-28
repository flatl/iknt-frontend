<template>
  <div class="iknt-carousel">
    <a :name="hashLink" />
    <div class="iknt-carousel__top">
        <h2 v-if="title" class="iknt-carousel__title title">
          {{ title }}
        </h2>
        <div class="iknt-carousel__buttons">
          <button class="iknt-carousel__button prev" @click="handleMovePrevSlide">
            <arrow-right />
          </button>
          <button class="iknt-carousel__button next" @click="handleMoveNextSlide">
            <arrow-right />
          </button>
        </div>
      </div>
      <div class="iknt-carousel__carousel">
        <ssr-carousel ref="carousel" :slides-per-page="slidesPerPage">
          <slot />
        </ssr-carousel>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArrowRight from '@/assets/icons/arrow-right.svg?inline';

type CarouselComponent = Vue & {
  back: Function;
  next: Function;
};

export default defineComponent({
  components: { ArrowRight },

  props: {
    slideWidth: {
      type: Number,
      default: 1,
    },

    slideGap: {
      type: Number,
      default: 1,
    },

    title: {
      type: String,
      default: '',
    },

    hashLink: {
      type: String,
      default: '',
    },
  },

  data() {
    return { windowWidth: 1920 };
  },

  computed: {
    slidesPerPage() {
      const MAX_CONTAINER_SIZE = 1760;
      
      const windowSize =
        this.windowWidth > MAX_CONTAINER_SIZE ? MAX_CONTAINER_SIZE : this.windowWidth;

      return (windowSize + this.slideGap) / (this.slideWidth + this.slideGap);
    },
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleWindowResize);
  },

  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize);
  },


  methods: {
    handleMovePrevSlide() {
      (this.$refs.carousel as CarouselComponent).back();
    },

    handleMoveNextSlide() {
      (this.$refs.carousel as CarouselComponent).next();
    },

    handleWindowResize() {
      this.windowWidth = window.innerWidth;
    },
  }
});
</script>

<style lang="scss" scoped>
.iknt-carousel {
  display: flex;
  flex-direction: column;
  grid-gap: 2rem;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__buttons {
    display: flex;
    align-items: center;
    grid-gap: 0.5rem;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 36px;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.25);

    &:hover {
      background-color: var(--c-white);

      svg path {
        fill: var(--c-dark-blue);
      }
    }

    &.prev {
      transform: rotate(180deg);
    }

    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  ::v-deep .ssr-carousel-mask {
    overflow: visible;
  }
}

@media (max-width: 600px) {
  .iknt-carousel {
    grid-gap: 0.5rem;

    &__top {
      flex-direction: column;
      grid-gap: 1rem;
    }

    &__title {
      align-self: flex-start;
    }

    &__buttons {
      align-self: flex-end;
    }
  }
}
</style>
