import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { partytownVite } from "@builder.io/partytown/utils";
import { join } from "path";
import articleWatcher from './util/articleWatcher';
import rehypeHighlight from 'rehype-pretty-code';

const options = {
  theme: 'dark-plus',
  
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{type: 'text', value: ' '}];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word'];
  },
};

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity({
        mdx: {
          rehypePlugins:  [[rehypeHighlight, options]]
        }
      }),
      qwikVite(),
      tsconfigPaths(),
      partytownVite({ dest: join(__dirname, "public", "~partytown") }),
      articleWatcher(),
    ]
  };
});


