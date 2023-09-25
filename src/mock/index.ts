// 引入Mock
import Mock from 'mockjs'

// 匯入模擬api接口 (user - api模組)
import './user'

// 设置拦截Ajax请求的响应时间，模拟网络延迟
Mock.setup({
  timeout: '200-600'
})

export default Mock