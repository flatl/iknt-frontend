<template>
  <main class="admin-article">
    <div v-if="article" class="admin-article__container">
      <h1 class="admin-article__title title">
        Статья
        <span class="special-symbol">"</span>{{ article.title }}<span class="special-symbol">"</span>
      </h1>
      <div class="admin-article__controls">
        <button class="admin-article__button save" @click="handleSave">
          <span class="admin-article__button__text small-text">
            Сохранить
          </span>
          <span class="admin-article__button__inner small-text">
            Сохранить
          </span>
        </button>
        <button class="admin-article__button remove" @click="handleDelete">
          <span class="admin-article__button__text small-text">
            Удалить
          </span>
          <span class="admin-article__button__inner small-text">
            Удалить
          </span>
        </button>
      </div>
      <div class="admin-article__edit">
        <div class="admin-article__edit__block row">
          <span class="admin-article__date text">
            {{ humanizeDate(article.datetime) }}
          </span>
          <span class="ellipse" />
          <span class="admin-article__author text">
            {{ article.author }}
          </span>
        </div>
        <div class="admin-article__edit__block">
          <label for="title" class="admin-article__label subtitle">
            Заголовок статьи
          </label>
          <textarea
            v-model="article.title"
            id="title"
            type="text"
            placeholder="Заголовок статьи"
            class="admin-article__input"
          />
        </div>
        <div class="admin-article__edit__block">
          <label for="content" class="admin-article__label subtitle">
            Содержание статьи
          </label>
          <article-content-editor
            :model="article.content"
            class="admin-article__content"
            @change="handleChangeContent"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { humanizeDate } from '@/lib/helpers';
import ArticleContentEditor from '@/components/admin/ArticleContentEditor.vue';
import { Article } from '@/lib/api';

export default defineComponent({
  components: { ArticleContentEditor },

  // @ts-ignore  
  async validate({ store, $api, redirect }) {
    if (!store.getters['auth/isAuthed']) {
      const { success } = await $api.isAuthed();
      if (success) return true;

      redirect('/login');
      return false;
    }

    return true;
  },

  async fetch() {
    const response = await this.$api.getArticle(+this.$route.params.id);
    if (response.success) {
      this.article = response.data;
    }
  },

  data(): { article: Article | null } {
    return {
      article: null,
    };
  },

  methods: {
    humanizeDate,

    async handleSave() {
      if (!this.article) return;

      await this.replaceAllContentImages();

      const response = await this.$api.updateArticle(
        this.article.id,
        this.article
      );

      if (response.success) {
        this.$toast.success('Статья успешно обновлена', { duration: 2e3 });
      } else {
        this.$toast.error(response.message, { duration: 3e3 });
      }
    },

    async handleDelete() {
      const sure = confirm('Вы уверены что хотите удалить статью?');

      if (sure && this.article) {
        const response = await this.$api.deleteArticle(this.article.id);

        if (response.success) {
          this.$toast.success('Статья успешно удалена', { duration: 2e3 });
          this.$router.push('/admin');
        } else {
          this.$toast.error(response.message);
        }
      }
    },

    handleChangeContent(value: string) {
      if (!this.article) return;

      this.article.content = value;
    },

    /*
      Перед отправкой контента на сервер загружаем на него все новые изображения
    */
    async replaceAllContentImages() {
      if (!this.article) return;

      const parser = new DOMParser();
      const dom = parser.parseFromString(this.article.content, 'text/html');

      const images = dom.querySelectorAll('img');
      const imagesArray = Array.from(images);

      for await (const image of imagesArray) {
        const base64Regexp = /^data:image.*base64,/;
        const absPathRegexp = /^https:\/\//;
        const imagesUrlRegexp = new RegExp(`^${process.env.imagesUrl}`);

        if (base64Regexp.test(image.src)) {
          const fd = new FormData();
          fd.append('images', this.dataURLtoBlob(image.src));
          const response = await this.$api.addImages(fd);
          if (response.success) {
            console.warn(response)
            const filename = response.data[0];
            image.src = `${process.env.imagesUrl}/${filename}`;
          }
        }
      }

      this.article.content = dom.body.innerHTML;
    },

    dataURLtoBlob(dataurl: string) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)![1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    }
  },
});
</script>

<style lang="scss" scoped>
.admin-article {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--c-black);

  .ellipse {
    background-color: rgba(255, 255, 255, 0.5);
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 70rem;
    grid-gap: 4rem;
  }

  &__controls {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    grid-gap: 1rem;
  }

  &__button {
    position: relative;
    overflow: hidden;
    width: 180px;
    height: 2.5rem;
    border-radius: 100px;
    background-color: var(--c-white);
    transition: background-color .15s linear;

    &:hover {
      background-color: var(--c-dark-blue);

      .admin-article__button__text {
        transform: translateY(-2.5rem);
      }

      .admin-article__button__inner {
        transform: translateY(0);
      }
    }

    &.remove {
      &:hover {
        background-color: var(--c-red);
      }

      .admin-article__button__text {
        color: var(--c-red);
      }
    }

    &.save {
      &:hover {
        background-color: var(--c-green);
      }

      .admin-article__button__text {
        color: var(--c-green);
      }
    }

    &__text,
    &__inner {
      font-weight: 700;
      text-transform: uppercase;
      color: var(--c-black);
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

  &__author,
  &__date {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
  }

  &__edit {
    display: flex;
    flex-direction: column;
    grid-gap: 2.5rem;

    &__block {
      display: flex;
      flex-direction: column;
      grid-gap: 1rem;

      &.row {
        flex-direction: row;
        align-items: center;
      }
    }
  }
}
</style>
