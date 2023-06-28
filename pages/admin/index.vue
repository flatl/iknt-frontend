<template>
  <main class="admin">
    <h1 class="admin__title title">
      Панель управления
    </h1>
    <div class="admin__news">
      <div class="container-row">
        <h2 class="admin__news__title title">
          Новости и события
        </h2>
        <button class="admin__add-button" @click="$router.push('/admin/article/create')">
          <span class="admin__add-button__text small-text">
            Добавить
          </span>
          <span class="admin__add-button__inner small-text">
            Добавить
          </span>
        </button>
      </div>
      <div class="admin__news__list">
        <div
          v-for="article of news"
          :key="article.id"
          class="admin__news__article"
        >
          <div class="admin__news__article__top">
            <span class="admin__news__article__date small-text">
              {{ humanizeDate(article.datetime) }}
            </span>
            <span class="admin__news__article__ellipse"/>
            <span class="admin__news__article__author small-text">
              {{ article.author }}
            </span>
          </div>
          <nuxt-link
            :to="`/admin/article/${article.id}`"
            class="admin__news__article__title subtitle"
          >
            {{ article.title }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { humanizeDate } from '@/lib/helpers';

export default defineComponent({

  // @ts-ignore  
  async validate({ store, $api, redirect }) {
    if (!store.getters['auth/isAuthed']) {
      const isAuthed = await $api.isAuthed();
      if (isAuthed) return true;

      redirect('/login');
      return false;
    }

    return true;
  },

  async fetch() {
    const limit = 10;
    const response = await this.$api.getArticles(limit);

    if (response.success) {
      this.news = response.data;
    }
  },

  data(): any {
    return { news: [] };
  },

  methods: {
    humanizeDate,
  }
});
</script>

<style lang="scss" scoped>
.admin {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  grid-gap: 4rem;
  padding: 2rem;
  background-color: var(--c-black);

  .container-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 600px;
    max-width: 100%;
  }

  &__add-button {
    position: relative;
    overflow: hidden;
    width: 180px;
    height: 2.5rem;
    border-radius: 100px;
    background-color: var(--c-white);
    transition: background-color .15s linear;

    &:hover {
      background-color: var(--c-green);

      .admin__add-button__text {
        transform: translateY(-2.5rem);
      }

      .admin__add-button__inner {
        transform: translateY(0);
      }
    }

    &__text,
    &__inner {
      font-weight: 700;
      text-transform: uppercase;
      color: var(--c-green);
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform .15s ease-out;
      z-index: 1;
    }

    &__inner {
      color: var(--c-white);
      transform: translateY(2.5rem);
    }
  }


  &__news {
    display: flex;
    flex-direction: column;
    grid-gap: 2.5rem;

    &__title {
      font-size: 28px;
    }

    &__list {
      display: flex;
      flex-direction: column;
      grid-gap: 2.5rem;
    }

    &__article {
      display: flex;
      flex-direction: column;
      width: 600px;
      max-width: 100%;
      grid-gap: 1rem;
      padding-bottom: .5rem;
      border-bottom: 1px solid rgba(255, 255, 255, .2);

      &__top {
        display: flex;
        flex-direction: row;
        align-items: center;
        grid-gap: .5rem;
      }

      &__date,
      &__author {
        color: rgba(255, 255, 255, .5);
      }

      &__ellipse {
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, .5);
      }

      &__title {
        &:hover {
          color: var(--c-dark-blue);
        }
      }
    }
  }
}
</style>
