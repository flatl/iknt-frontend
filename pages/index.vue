<template>
  <div class="index">
    <iknt-header />
    <iknt-content />
    <iknt-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IkntHeader from '@/components/head/Header.vue';
import IkntFooter from '@/components/Footer.vue';
import IkntContent from '@/components/MainPageContent.vue';

export default defineComponent({
  name: 'IndexPage',
  
  components: { IkntHeader, IkntFooter, IkntContent },

  async fetch() {
    const limit = 10;
    const response = await this.$api.getArticles(limit);
    if (response.success) {
      this.$store.dispatch('news/setNews', response.data);
    }
  },

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
.index {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--c-black);
}
</style>
