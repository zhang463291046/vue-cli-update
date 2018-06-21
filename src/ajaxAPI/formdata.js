/**
 * 上传方法【excel文件、图片等等】
 * @params { Object } params - { 'myFile': e.target.files[0] }
 */
import { baseUrl } from './index'
const formatParams = params => {
  Object.keys(params).forEach(key => {
    (params[key] === '' || params[key] === undefined) && delete params[key]
  })
  return params
}

export const upload = (url, params) => {
  params = formatParams(params)
  let formData = new FormData();
  for (let [key, value] of Object.entries(params)) {
    formData.append(key, value)
  }
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', baseUrl +'/'+ url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let obj = xhr.response;
          try{
            obj = JSON.parse(obj);
          } catch(err) {
            obj = '';
          }
          resolve(obj);
        } else {
          reject(xhr)
        }
      }
    }
    xhr.send(formData)
  })
}
