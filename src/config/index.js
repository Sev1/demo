const $ = require('jquery');
const baseURL = "http://192.168.×.×××:80";
const urls = {
  getMessage:'/api/×××'
}

const post = function(url,data){
  return new Promise((resolve,reject)=>{
    $.ajax({
      method:'post',
      url:url,
      data:data,
      contentType:'application/json; charset=UTF-8',
      success:function(res){
        resolve({data:res})
      },
      error:function(error){
        reject(error)
      }
    })
  })
}

module.exports = {
  baseURL,
  urls,
  post
}