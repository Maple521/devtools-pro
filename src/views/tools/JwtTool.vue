<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeftIcon,
  ClipboardIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
  KeyIcon,
  BoltIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'
import { jwtDecode } from 'jwt-decode'

const router = useRouter()
const token = ref('')
const error = ref('')
const copied = ref(false)

interface JwtPayload {
  [key: string]: any
}

interface DecodedToken {
  header: any
  payload: JwtPayload
  signature: string
  isValid: boolean
}

const decodedToken = computed<DecodedToken | null>(() => {
  if (!token.value.trim()) return null
  
  try {
    const parts = token.value.split('.')
    if (parts.length !== 3) {
      throw new Error('无效的 JWT 格式')
    }
    
    const header = JSON.parse(atob(parts[0]))
    const payload = (jwtDecode(token.value) as JwtPayload | null) ?? {}
    const signature = parts[2]
    
    const isValid = parts.length === 3 && header && payload
    
    return {
      header,
      payload,
      signature,
      isValid
    }
  } catch (e: any) {
    error.value = e.message || 'JWT 解码失败'
    return null
  }
})

const isTokenExpired = computed(() => {
  if (!decodedToken.value?.payload) return false
  const exp = decodedToken.value.payload.exp
  if (!exp) return false
  return Date.now() >= exp * 1000
})

const formatJson = (obj: any) => {
  return JSON.stringify(obj, null, 2)
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const downloadResult = () => {
  if (!decodedToken.value) return
  const result = {
    header: decodedToken.value.header,
    payload: decodedToken.value.payload,
    signature: decodedToken.value.signature
  }
  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'jwt-decoded.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const clearAll = () => {
  token.value = ''
  error.value = ''
}

const goBack = () => {
  router.push('/')
}

const getAlgorithmColor = (alg: string) => {
  const colors: Record<string, string> = {
    HS256: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    HS384: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    HS512: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    RS256: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    ES256: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  }
  return colors[alg] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
              <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <BoltIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900 dark:text-white">JWT 工具</h1>
                <p class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">解码和验证 JWT Token</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <span v-if="decodedToken?.isValid" class="hidden md:flex items-center px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium">
              <CheckCircleIcon class="w-4 h-4 mr-2" />
              有效 Token
            </span>
            <span v-else-if="error" class="hidden md:flex items-center px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium">
              <ExclamationTriangleIcon class="w-4 h-4 mr-2" />
              无效 Token
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Input Section -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 mb-6 shadow-sm border border-gray-200 dark:border-slate-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900 dark:text-white flex items-center text-base">
            <KeyIcon class="w-5 h-5 mr-2" />
            输入 JWT Token
          </h3>
          <button
            @click="clearAll"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium flex items-center text-sm shadow-md hover:shadow-lg"
          >
            <TrashIcon class="w-4 h-4 mr-2" />
            清空
          </button>
        </div>
        <textarea
          v-model="token"
          placeholder="在此粘贴 JWT Token (例如: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
          class="w-full h-32 p-4 resize-none focus:outline-none bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-gray-100 font-mono text-sm leading-relaxed"
          spellcheck="false"
        ></textarea>
        
        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
          <div class="flex items-start">
            <ExclamationTriangleIcon class="w-6 h-6 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 class="text-base font-semibold text-red-800 dark:text-red-300 mb-1">解码错误</h3>
              <p class="text-sm text-red-700 dark:text-red-400 break-words">{{ error }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Decoded Results -->
      <div v-if="decodedToken" class="space-y-6">
        <!-- Token Status -->
        <div v-if="isTokenExpired" class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-xl">
          <div class="flex items-center">
            <ExclamationTriangleIcon class="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3 flex-shrink-0" />
            <span class="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              ⚠️ 此 Token 已过期
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3">
          <button
            @click="downloadResult"
            class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center shadow-md hover:shadow-lg"
          >
            <ArrowDownTrayIcon class="w-5 h-5 mr-2" />
            下载结果
          </button>
        </div>

        <!-- Header Section -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900 dark:text-white text-base">Header (头部)</h3>
              <span :class="`px-3 py-1.5 rounded-lg text-sm font-medium ${getAlgorithmColor(decodedToken.header.alg)}`">
                {{ decodedToken.header.alg }}
              </span>
            </div>
          </div>
          <div class="p-5">
            <pre class="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl overflow-auto text-sm text-gray-900 dark:text-gray-100 font-mono leading-relaxed"><code>{{ formatJson(decodedToken.header) }}</code></pre>
          </div>
        </div>

        <!-- Payload Section -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <h3 class="font-semibold text-gray-900 dark:text-white text-base">Payload (载荷)</h3>
          </div>
          <div class="p-5">
            <pre class="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl overflow-auto text-sm text-gray-900 dark:text-gray-100 font-mono leading-relaxed"><code>{{ formatJson(decodedToken.payload) }}</code></pre>
            
            <!-- Common Claims -->
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-if="decodedToken.payload.iss" class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">签发者 (iss)</div>
                <div class="text-sm font-medium text-gray-900 dark:text-white break-all">{{ decodedToken.payload.iss }}</div>
              </div>
              <div v-if="decodedToken.payload.sub" class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">主题 (sub)</div>
                <div class="text-sm font-medium text-gray-900 dark:text-white break-all">{{ decodedToken.payload.sub }}</div>
              </div>
              <div v-if="decodedToken.payload.exp" class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">过期时间 (exp)</div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ new Date(decodedToken.payload.exp * 1000).toLocaleString('zh-CN') }}
                </div>
              </div>
              <div v-if="decodedToken.payload.iat" class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">签发时间 (iat)</div>
                <div class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ new Date(decodedToken.payload.iat * 1000).toLocaleString('zh-CN') }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Signature Section -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-gray-900 dark:text-white text-base">Signature (签名)</h3>
              <button
                @click="copyToClipboard(decodedToken.signature)"
                class="px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors text-sm flex items-center shadow-md hover:shadow-lg"
              >
                <ClipboardIcon class="w-4 h-4 mr-1.5" />
                {{ copied ? '已复制!' : '复制' }}
              </button>
            </div>
          </div>
          <div class="p-5">
            <code class="block bg-gray-50 dark:bg-slate-900 p-4 rounded-xl overflow-auto text-sm text-gray-900 dark:text-gray-100 font-mono break-all leading-relaxed">
              {{ decodedToken.signature }}
            </code>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!error" class="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-sm border border-gray-200 dark:border-slate-700">
        <KeyIcon class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">等待输入</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">在上方粘贴 JWT Token 以查看解码结果</p>
      </div>

      <!-- Ad Banner Bottom -->
      <div class="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-dashed border-yellow-300 dark:border-yellow-700 rounded-xl p-8 text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          📢 广告位 - 底部横幅广告 (728x90)
        </p>
      </div>

      <!-- Tips Section -->
      <div class="mt-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
        <div class="flex items-start space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <SparklesIcon class="w-6 h-6 text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">使用技巧</h3>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li class="flex items-start">
                <span class="text-orange-600 dark:text-orange-400 mr-2">•</span>
                <span>自动解析 JWT 的三个部分：Header、Payload、Signature</span>
              </li>
              <li class="flex items-start">
                <span class="text-orange-600 dark:text-orange-400 mr-2">•</span>
                <span>实时检测 Token 是否过期</span>
              </li>
              <li class="flex items-start">
                <span class="text-orange-600 dark:text-orange-400 mr-2">•</span>
                <span>显示常用声明（iss、sub、exp、iat）的友好格式</span>
              </li>
              <li class="flex items-start">
                <span class="text-orange-600 dark:text-orange-400 mr-2">•</span>
                <span>支持复制或下载完整的解码结果</span>
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
