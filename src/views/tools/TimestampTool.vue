<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ArrowLeftIcon,
  ClipboardIcon,
  SparklesIcon,
  ClockIcon,
  CalendarIcon,
  BoltIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const router = useRouter()
const currentTimestamp = ref(Date.now())
const inputTimestamp = ref('')
const selectedDate = ref(dayjs().format('YYYY-MM-DD'))
const selectedTime = ref(dayjs().format('HH:mm:ss'))
const copied = ref(false)

let intervalId: number | null = null

onMounted(() => {
  intervalId = window.setInterval(() => {
    currentTimestamp.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})

// Convert timestamp to date
const convertedDate = computed(() => {
  if (!inputTimestamp.value.trim()) return null
  const ts = parseInt(inputTimestamp.value)
  if (isNaN(ts)) return { error: '无效的时间戳' }
  
  const isSeconds = ts.toString().length === 10
  const date = dayjs(isSeconds ? ts * 1000 : ts)
  
  if (!date.isValid()) return { error: '无效的日期' }
  
  const dateWithRelativeTime = date as typeof date & { fromNow: () => string }

  return {
    formatted: date.format('YYYY-MM-DD HH:mm:ss'),
    utc: date.utc().format('YYYY-MM-DD HH:mm:ss'),
    relative: dateWithRelativeTime.fromNow(),
    isSeconds
  }
})

// Convert date to timestamp
const convertedTimestamp = computed(() => {
  if (!selectedDate.value || !selectedTime.value) return null
  
  const dateTimeStr = `${selectedDate.value} ${selectedTime.value}`
  const date = dayjs(dateTimeStr)
  
  if (!date.isValid()) return { error: '无效的日期时间' }
  
  return {
    milliseconds: date.valueOf(),
    seconds: Math.floor(date.valueOf() / 1000),
    iso: date.toISOString(),
    formatted: date.format('YYYY-MM-DD HH:mm:ss')
  }
})

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
  const result = {
    currentTimestamp: currentTimestamp.value,
    currentDate: dayjs(currentTimestamp.value).format('YYYY-MM-DD HH:mm:ss'),
    utcDate: dayjs(currentTimestamp.value).utc().format('YYYY-MM-DD HH:mm:ss')
  }
  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'current-timestamp.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const setCurrentTimestamp = () => {
  inputTimestamp.value = currentTimestamp.value.toString()
}

const setNow = () => {
  const now = dayjs()
  selectedDate.value = now.format('YYYY-MM-DD')
  selectedTime.value = now.format('HH:mm:ss')
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <BoltIcon class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900 dark:text-white">时间戳工具</h1>
                <p class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">时间戳转换和日期格式化</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Current Timestamp Display -->
      <div class="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 md:p-8 mb-8 text-white shadow-xl relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div class="relative">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <ClockIcon class="w-8 h-8" />
              <h2 class="text-2xl font-bold">当前时间戳</h2>
            </div>
            <div class="flex gap-2">
              <button
                @click="downloadResult"
                class="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors flex items-center text-sm"
              >
                <ArrowDownTrayIcon class="w-4 h-4 mr-2" />
                下载
              </button>
              <button
                @click="copyToClipboard(currentTimestamp.toString())"
                class="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors flex items-center text-sm"
              >
                <ClipboardIcon class="w-4 h-4 mr-2" />
                {{ copied ? '已复制!' : '复制' }}
              </button>
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-4xl md:text-5xl font-mono font-bold break-all">{{ currentTimestamp }}</div>
            <div class="text-lg opacity-90">{{ dayjs(currentTimestamp).format('YYYY-MM-DD HH:mm:ss') }}</div>
            <div class="text-sm opacity-75">UTC: {{ dayjs(currentTimestamp).utc().format('YYYY-MM-DD HH:mm:ss') }}</div>
          </div>
        </div>
      </div>

      <!-- Conversion Tools -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Timestamp to Date -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
            <h3 class="font-semibold text-gray-900 dark:text-white flex items-center text-base">
              <CalendarIcon class="w-5 h-5 mr-2" />
              时间戳 → 日期
            </h3>
          </div>
          <div class="p-5 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                输入时间戳
              </label>
              <div class="flex space-x-2">
                <input
                  v-model="inputTimestamp"
                  type="text"
                  placeholder="例如: 1234567890"
                  class="flex-1 px-4 py-2.5 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
                <button
                  @click="setCurrentTimestamp"
                  class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm whitespace-nowrap shadow-md hover:shadow-lg"
                >
                  当前
                </button>
              </div>
              <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                支持秒级 (10位) 和毫秒级 (13位) 时间戳
              </p>
            </div>

            <!-- Result -->
            <div v-if="convertedDate" class="space-y-3">
              <div v-if="'error' in convertedDate" class="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
                <p class="text-sm text-red-700 dark:text-red-400">{{ convertedDate.error }}</p>
              </div>
              <div v-else class="space-y-3">
                <div class="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">本地时间</div>
                  <div class="text-sm font-mono text-gray-900 dark:text-white">{{ convertedDate.formatted }}</div>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">UTC 时间</div>
                  <div class="text-sm font-mono text-gray-900 dark:text-white">{{ convertedDate.utc }}</div>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">相对时间</div>
                  <div class="text-sm text-gray-900 dark:text-white">{{ convertedDate.relative }}</div>
                </div>
                <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">类型</div>
                  <div class="text-sm text-gray-900 dark:text-white">
                    {{ convertedDate.isSeconds ? '秒级时间戳' : '毫秒级时间戳' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Date to Timestamp -->
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <h3 class="font-semibold text-gray-900 dark:text-white flex items-center text-base">
              <CalendarIcon class="w-5 h-5 mr-2" />
              日期 → 时间戳
            </h3>
          </div>
          <div class="p-5 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                选择日期和时间
              </label>
              <div class="space-y-3">
                <input
                  v-model="selectedDate"
                  type="date"
                  class="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <input
                  v-model="selectedTime"
                  type="time"
                  step="1"
                  class="w-full px-4 py-2.5 border-2 border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <button
                  @click="setNow"
                  class="w-full px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors text-sm shadow-md hover:shadow-lg"
                >
                  设置为当前时间
                </button>
              </div>
            </div>

            <!-- Result -->
            <div v-if="convertedTimestamp" class="space-y-3">
              <div v-if="'error' in convertedTimestamp" class="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
                <p class="text-sm text-red-700 dark:text-red-400">{{ convertedTimestamp.error }}</p>
              </div>
              <div v-else class="space-y-3">
                <div class="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">毫秒级时间戳</div>
                  <div class="text-sm font-mono text-gray-900 dark:text-white">{{ convertedTimestamp.milliseconds }}</div>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">秒级时间戳</div>
                  <div class="text-sm font-mono text-gray-900 dark:text-white">{{ convertedTimestamp.seconds }}</div>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">ISO 8601</div>
                  <div class="text-sm font-mono text-gray-900 dark:text-white">{{ convertedTimestamp.iso }}</div>
                </div>
                <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">格式化</div>
                  <div class="text-sm text-gray-900 dark:text-white">{{ convertedTimestamp.formatted }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Common Timezones Reference -->
      <div class="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-200 dark:border-slate-700">
          <h3 class="font-semibold text-gray-900 dark:text-white text-base">常用时区参考</h3>
        </div>
        <div class="p-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">北京时间 (CST)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">UTC+8</div>
              <div class="text-sm font-mono mt-2 text-gray-900 dark:text-white">
                {{ dayjs().tz('Asia/Shanghai').format('HH:mm:ss') }}
              </div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">东京时间 (JST)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">UTC+9</div>
              <div class="text-sm font-mono mt-2 text-gray-900 dark:text-white">
                {{ dayjs().tz('Asia/Tokyo').format('HH:mm:ss') }}
              </div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">纽约时间 (EST)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">UTC-5</div>
              <div class="text-sm font-mono mt-2 text-gray-900 dark:text-white">
                {{ dayjs().tz('America/New_York').format('HH:mm:ss') }}
              </div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">伦敦时间 (GMT)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">UTC+0</div>
              <div class="text-sm font-mono mt-2 text-gray-900 dark:text-white">
                {{ dayjs().tz('Europe/London').format('HH:mm:ss') }}
              </div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">洛杉矶时间 (PST)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">UTC-8</div>
              <div class="text-sm font-mono mt-2 text-gray-900 dark:text-white">
                {{ dayjs().tz('America/Los_Angeles').format('HH:mm:ss') }}
              </div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
              <div class="text-sm font-medium text-gray-900 dark:text-white mb-1">悉尼时间 (AEST)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400">UTC+10</div>
              <div class="text-sm font-mono mt-2 text-gray-900 dark:text-white">
                {{ dayjs().tz('Australia/Sydney').format('HH:mm:ss') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ad Banner Bottom -->
      <div class="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-dashed border-yellow-300 dark:border-yellow-700 rounded-xl p-8 text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
           广告位 - 底部横幅广告 (728x90)
        </p>
      </div>

      <!-- Tips Section -->
      <div class="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
        <div class="flex items-start space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <SparklesIcon class="w-6 h-6 text-white" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">使用技巧</h3>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li class="flex items-start">
                <span class="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                <span>实时显示当前时间戳，每秒自动更新</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                <span>支持秒级和毫秒级时间戳的智能识别</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                <span>双向转换：时间戳 ↔ 日期时间</span>
              </li>
              <li class="flex items-start">
                <span class="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                <span>提供全球主要城市的时区参考时间</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
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
