let BASE_URL = 'http://codercba.com:9002/'
class ZHRequest{
  request(url,method,params){ 
    return new Promise((reslove,reject)=>{
      wx.request({
        url: BASE_URL + url,
        method:method,
        data:params,
        success:function(res){
          reslove(res.data)
        },
        fail:function(res){ 
          reject(res)
        }
      })
    })
  }
  get(url,params){
    return this.request(url,"GET",params)
  }
  post(url,params){
    return this.request(url,"POST",params)
  }
}
let zhRequest = new ZHRequest()
export default zhRequest
