// ajax 请求模块
import axios from 'axios'
import qs from 'qs'

export default function ajax (url = '', data = {}, type = 'GET') {
  // s1 定义结果接收变量promise
  return new Promise((resolve, reject) => {
    let promise
    // s2 判断请求方式 get or post
    if (type === 'GET') {
      // s3 如果是get方式，需要把请求json参数拼接
      const params = qs.stringify(data)
      if (params !== '') {
        url = url + '?' + params
      }
      promise = axios.get(url)
    } else {
      // s4 如果是post方式，直接传输json参数
      promise = axios.post(url, data)
    }
    // s5 axios调用成功直接渲染数据
    // s6 执行异常返回错误
    promise.then(response => resolve(response.data))
      .catch(error => reject(error))
  })
}
