/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/stackoverflow-light.css'
import hljsVuePlugin from "@highlightjs/vue-plugin";
// Composables
import { createApp } from 'vue'
const app = createApp(App)

registerPlugins(app)


app
    .use(hljsVuePlugin)
    .mount('#app')
