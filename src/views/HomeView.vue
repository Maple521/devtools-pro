<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  CodeBracketIcon, 
  DocumentTextIcon, 
  LockClosedIcon, 
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BoltIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const isDark = ref(false)

const tools = [
  {
    name: 'JSON 工具',
    description: '格式化、压缩、验证 JSON 数据',
    icon: CodeBracketIcon,
    path: '/json',
    color: 'from-blue-500 to-cyan-500',
    badge: '热门'
  },
  {
    name: 'XML 工具',
    description: '格式化、压缩、验证 XML 文档',
    icon: DocumentTextIcon,
    path: '/xml',
    color: 'from-purple-500 to-pink-500',
    badge: 'NEW'
  },
  {
    name: 'Base64 工具',
    description: '编码和解码 Base64 字符串',
    icon: LockClosedIcon,
    path: '/base64',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'JWT 工具',
    description: '解码和验证 JWT Token',
    icon: ShieldCheckIcon,
    path: '/jwt',
    color: 'from-orange-500 to-red-500'
  },
  {
    name: '时间戳工具',
    description: '时间戳转换和日期格式化',
    icon: ClockIcon,
    path: '/timestamp',
    color: 'from-indigo-500 to-blue-500'
  }
]

const features = [
  {
    title: '隐私保护',
    description: '所有数据处理均在本地浏览器完成，不会上传到服务器',
    icon: ShieldCheckIcon
  },
  {
    title: '极致体验',
    description: '简洁优雅的界面设计，流畅的交互体验',
    icon: SparklesIcon
  },
  {
    title: '高效快速',
    description: '基于现代技术栈构建，响应迅速',
    icon: BoltIcon
  },
  {
    title: '多端适配',
    description: '完美支持桌面端、平板和移动设备',
    icon: DevicePhoneMobileIcon
  },
  {
    title: '免费使用',
    description: '核心功能完全免费，无使用次数限制',
    icon: GlobeAltIcon
  },
  {
    title: '持续更新',
    description: '不断添加新工具，满足开发需求',
    icon: ChartBarIcon
  }
]

const navigateToTool = (path: string) => {
  router.push(path)
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- Header -->
    <header class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-slate-700/50 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BoltIcon class="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DevTools Pro
              </h1>
              <p class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">开发者在线工具箱</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <button
              @click="toggleTheme"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
              title="切换主题"
            >
              {{ isDark ? '☀️' : '🌙' }}
            </button>
            <a
              href="#"
              class="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium"
            >
              <span>专业版</span>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div class="text-center max-w-4xl mx-auto">
          <div class="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <SparklesIcon class="w-4 h-4 mr-2" />
            <span>免费在线开发者工具</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            提升开发效率的
            <span class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              在线工具箱
            </span>
          </h2>
          
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            免费、安全、高效的开发者工具集合。所有数据处理均在本地完成，保护您的隐私安全。
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              @click="navigateToTool('/json')"
              class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center"
            >
              <BoltIcon class="w-5 h-5 mr-2" />
              立即使用
            </button>
            <button class="px-8 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200">
              了解更多
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Ad Banner Top -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-dashed border-yellow-300 dark:border-yellow-700 rounded-xl p-8 text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          📢 广告位 - 横幅广告 (728x90)
        </p>
      </div>
    </section>

    <!-- Tools Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">常用工具</h3>
          <p class="text-gray-600 dark:text-gray-400">选择你需要的工具，开始使用</p>
        </div>
        <div class="hidden sm:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">全部免费</span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="tool in tools"
          :key="tool.name"
          @click="navigateToTool(tool.path)"
          class="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1"
        >
          <!-- Badge -->
          <div v-if="tool.badge" class="absolute -top-3 -right-3">
            <span class="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
              {{ tool.badge }}
            </span>
          </div>
          
          <!-- Icon -->
          <div :class="`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg mb-4`">
            <component :is="tool.icon" class="w-7 h-7 text-white" />
          </div>
          
          <!-- Content -->
          <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {{ tool.name }}
          </h4>
          <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{{ tool.description }}</p>
          
          <!-- Arrow -->
          <div class="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <span>立即使用</span>
            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </section>

    <!-- Ad Banner Middle -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl p-8 text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          📢 广告位 - 内容广告 (自适应)
        </p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">为什么选择我们？</h3>
          <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">我们致力于提供最好的在线开发工具体验</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
          >
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <component :is="feature.icon" class="w-8 h-8 text-white" />
            </div>
            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h4>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div class="relative">
          <h3 class="text-2xl md:text-3xl font-bold mb-4">准备好提升工作效率了吗？</h3>
          <p class="text-lg mb-6 opacity-90">立即使用我们的免费在线工具，让开发更高效</p>
          <button
            @click="navigateToTool('/json')"
            class="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 inline-flex items-center"
          >
            <BoltIcon class="w-5 h-5 mr-2" />
            免费开始使用
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="md:col-span-2">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <BoltIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 class="text-lg font-bold text-gray-900 dark:text-white">DevTools Pro</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">开发者在线工具箱</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              为开发者打造的免费在线工具集合，安全、高效、易用。所有数据处理均在本地完成，保护您的隐私。
            </p>
            <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <ShieldCheckIcon class="w-4 h-4" />
              <span>🔒 数据安全 · 隐私保护</span>
            </div>
          </div>
          
          <div>
            <h5 class="font-semibold text-gray-900 dark:text-white mb-4">工具列表</h5>
            <ul class="space-y-2">
              <li><a href="/json" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">JSON 工具</a></li>
              <li><a href="/xml" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">XML 工具</a></li>
              <li><a href="/base64" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Base64 工具</a></li>
              <li><a href="/jwt" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">JWT 工具</a></li>
              <li><a href="/timestamp" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">时间戳工具</a></li>
            </ul>
          </div>
          
          <div>
            <h5 class="font-semibold text-gray-900 dark:text-white mb-4">关于我们</h5>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">关于</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">隐私政策</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">使用条款</a></li>
              <li><a href="#" class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">联系我们</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-200 dark:border-slate-700 pt-8 text-center">
          <p class="text-gray-600 dark:text-gray-400 mb-2">
            © 2026 DevTools Pro. All rights reserved.
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-500">
            Made with ❤️ for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
