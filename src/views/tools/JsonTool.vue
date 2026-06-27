<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeftIcon,
  ClipboardIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  BoltIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const input = ref('')
const output = ref('')
const error = ref('')
const indentSize = ref(2)
const copied = ref(false)

const isValidJson = computed(() => {
  if (!input.value.trim()) return null
  try {
    JSON.parse(input.value)
    return true
  } catch {
    return false
  }
})

const formatJson = () => {
  error.value = ''
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, indentSize.value)
  } catch (e: any) {
    error.value = e.message
    output.value = ''
  }
}

const minifyJson = () => {
  error.value = ''
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed)
  } catch (e: any) {
    error.value = e.message
    output.value = ''
  }
}

const copyToClipboard = async () => {
  if (!output.value) return
  try {
    await navigator.clipboard.writeText(output.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const downloadJson = () => {
  if (!output.value) return
  const blob = new Blob([output.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'formatted.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const clearAll = () => {
  input.value = ''
  output.value = ''
  error.value = ''
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- Header -->
    <header class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-slate-700/50 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <button
              @click="goBack"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <ArrowLeftIcon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <BoltIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900 dark:text-white">JSON 工具</h1>
                <p class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">格式化、压缩、验证 JSON 数据</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <span v-if="isValidJson === true" class="hidden md:flex items-center px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium">
              <CheckCircleIcon class="w-4 h-4 mr-2" />
              有效 JSON
            </span>
            <span v-else-if="isValidJson === false" class="hidden md:flex items-center px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium">
              <ExclamationTriangleIcon class="w-4 h-4 mr-2" />
              无效 JSON
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Toolbar -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-6 shadow-sm border border-gray-200 dark:border-slate-700">
        <div class="flex flex-wrap gap-3 items-center justify-between">
          <div class="flex flex-wrap gap-3">
            <button
              @click="formatJson"
              class="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center"
            >
              <SparklesIcon class="w-5 h-5 mr-2" />
              格式化
            </button>
            <button
              @click="minifyJson"
              class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl transition-all duration-200 font-medium shadow-md hover:shadow-lg flex items-center"
            >
              <DocumentDuplicateIcon class="w-5 h-5 mr-2" />
              压缩
            </button>
            <button
              @click="copyToClipboard"
              :disabled="!output"
              class="px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-md hover:shadow-lg"
            >
              <ClipboardIcon class="w-5 h-5 mr-2" />
              {{ copied ? '已复制!' : '复制结果' }}
            </button>
            <button
              @click="downloadJson"
              :disabled="!output"
              class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-md hover:shadow-lg"
            >
              <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
              下载
            </button>
            <button
              @click="clearAll"
              class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center shadow-md hover:shadow-lg"
            >
              <TrashIcon class="w-5 h-5 mr-2" />
              清空
            </button>
          </div>
          
          <div class="flex items-center space-x-3">
            <label class="text-sm text-gray-600 dark:text-gray-400 font-medium">缩进:</label>
            <select
              v-model="indentSize"
              class="px-4 py-2.5 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium transition-all"
            >
              <option :value="2">2 空格</option>
              <option :value="4">4 空格</option>
              <option :value="8">8 空格</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
        <div class="flex items-start">
          <ExclamationTriangleIcon class="w-6 h-6 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 class="text-base font-semibold text-red-800 dark:text-red-300 mb-1">JSON 解析错误</h3>
            <p class="text-sm text-red-700 dark:text-red-400 break-words">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Input/Output Area -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Input -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="px-5 py-3 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700/50 dark:to-slate-700/30 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full bg-red-500"></div>
              <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div class="w-2 h-2 rounded-full bg-green-500"></div>
              <h3 class="ml-3 font-semibold text-gray-900 dark:text-white">输入 JSON</h3>
            </div>
            <span v-if="input" class="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-slate-600 px-2 py-1 rounded">
              {{ input.length }} 字符
            </span>
          </div>
          <textarea
            v-model="input"
            placeholder='在此粘贴或输入 JSON 数据...&#10;&#10;例如：&#10;{&#10;  "name": "DevTools",&#10;  "version": "1.0"&#10;}'
            class="w-full h-[500px] p-5 resize-none focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 font-mono text-sm leading-relaxed"
            spellcheck="false"
          ></textarea>
        </div>

        <!-- Output -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="px-5 py-3 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700/50 dark:to-slate-700/30 flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full bg-blue-500"></div>
              <div class="w-2 h-2 rounded-full bg-purple-500"></div>
              <div class="w-2 h-2 rounded-full bg-pink-500"></div>
              <h3 class="ml-3 font-semibold text-gray-900 dark:text-white">输出结果</h3>
            </div>
            <span v-if="output" class="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-slate-600 px-2 py-1 rounded">
              {{ output.length }} 字符
            </span>
          </div>
          <pre
            v-if="output"
            class="w-full h-[500px] p-5 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 text-gray-900 dark:text-gray-100 font-mono text-sm leading-relaxed"
          ><code>{{ output }}</code></pre>
          <div
            v-else
            class="w-full h-[500px] p-5 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500"
          >
            <SparklesIcon class="w-16 h-16 mb-4 opacity-20" />
            <p class="text-sm">点击"格式化"或"压缩"查看结果</p>
          </div>
        </div>
      </div>

      <!-- Ad Banner Bottom -->
      <div class="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-dashed border-yellow-300 dark:border-yellow-700 rounded-xl p-8 text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          📢 广告位 - 底部横幅广告 (728x90)
        </p>
      </div>

      <!-- Tips Section -->
      <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div class="flex items-start space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <SparklesIcon class="w-6 h-6 text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">使用技巧</h3>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li class="flex items-start">
                <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>支持粘贴完整的 JSON 数据进行快速格式化</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>自动检测 JSON 格式是否正确，实时显示验证状态</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>可选择不同的缩进大小（2/4/8 空格）</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <span>一键复制或下载格式化后的结果</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Custom scrollbar */
textarea::-webkit-scrollbar,
pre::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

textarea::-webkit-scrollbar-track,
pre::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb,
pre::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.dark textarea::-webkit-scrollbar-thumb,
.dark pre::-webkit-scrollbar-thumb {
  background: #475569;
}

textarea::-webkit-scrollbar-thumb:hover,
pre::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.dark textarea::-webkit-scrollbar-thumb:hover,
.dark pre::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
