import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import JsonTool from '../views/tools/JsonTool.vue'
import XmlTool from '../views/tools/XmlTool.vue'
import Base64Tool from '../views/tools/Base64Tool.vue'
import JwtTool from '../views/tools/JwtTool.vue'
import TimestampTool from '../views/tools/TimestampTool.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/json',
      name: 'json',
      component: JsonTool,
    },
    {
      path: '/xml',
      name: 'xml',
      component: XmlTool,
    },
    {
      path: '/base64',
      name: 'base64',
      component: Base64Tool,
    },
    {
      path: '/jwt',
      name: 'jwt',
      component: JwtTool,
    },
    {
      path: '/timestamp',
      name: 'timestamp',
      component: TimestampTool,
    },
  ],
})

export default router
