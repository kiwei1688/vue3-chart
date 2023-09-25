import Mocks from 'mockjs'

const tokenData = {
  success: true,
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmViMDdlZmY4M2YzNGQ1ZDYwMjE1NyIsIm5hbWUiOiJ3dWhhaXlhbmciLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzFjYjRlMDRlZjlmN2QzNjhhM2QwYjljMzAxZTUwYzk4P3M9MjAwJnI9cGcmZD1tbSIsImlkZW50aXR5IjoibWFuYWdlciIsImlhdCI6MTY5NTQ1NjU2MSwiZXhwIjoxNjk1NDYwMTYxfQ.8Cbrb7ztd5UQRSWyYzl9RintczUTnXwPB9QzJPpsnDg'
}

// login
const login = Mocks.mock('/api/login', 'post', (parm: any) => {
  console.log('api222222222222 ~~~~~', parm)

  if(parm.email === '27732357@qq.com' && parm.password === '321321') {
    return tokenData
  }
})

export default {
  login
}