<template>
    <div v-html="renderedMarkdown"></div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import MarkdownIt from 'markdown-it';
  import markdownItKatex from 'markdown-it-katex';
  
  export default defineComponent({
    name: 'MarkdownMath',
    props: {
      markdownContent: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const md = new MarkdownIt();
      md.use(markdownItKatex); // 使用KaTeX支持数学公式
  
      const renderedMarkdown = ref<string>(md.render(props.markdownContent));
  
      return { renderedMarkdown };
    },
  });
  </script>
  