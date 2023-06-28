<template>
  <div class="content-editor">
    <el-tiptap
      v-model="content"
      :extensions="tiptapExtensions"
      class="content-editor__tiptap special-symbol"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
} from 'element-tiptap';

export default defineComponent({
  props: {
    model: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      tiptapExtensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading(),
        new Bold(),
        new Underline(),
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image(),
      ],
    };
  },

  computed: {
    content: {
      get() {
        return this.model;
      },

      set(value: string) {
        this.$emit('change', value);
      },
    }
  }
});
</script>

<style lang="scss" scoped>
.content-editor {
  width: 100%;
  // min-height: 50rem;

  &__tiptap {
    width: 100%;
    height: 100%;
    
    ::v-deep .ProseMirror * {
      font-family: Arial,
        "Helvetica Neue",
        Helvetica,
        sans-serif;
    }

    ::v-deep .el-tiptap-editor__content {
      min-height: 25rem;
    }
  }
}
</style>
