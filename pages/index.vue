<template>
  <div class="index">
    <iknt-header />
    <iknt-content />
    <iknt-footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import IkntHeader from '@/components/head/Header.vue';
import IkntFooter from '@/components/Footer.vue';
import IkntContent from '@/components/MainPageContent.vue';

export default Vue.extend({
  name: 'IndexPage',
  
  components: { IkntHeader, IkntFooter, IkntContent },

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
