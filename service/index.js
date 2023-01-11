const BASE_URL = "http://localhost:8080"
const TIME_OUT = 10000

class DxRequest {
	request(url,method,data){
		return new Promise((resolve,reject) => {
			uni.request({
				url:BASE_URL + url,
				timeout:TIME_OUT,
				method:method || "GET",
				data:data,
				success: res =>{
					resolve(res.data)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
	
	get(url,params){
		return this.request(url,"GET",params)
	}
	
	post(url, data) {
	  return this.request(url, "POST", data)
	}
}

export default new DxRequest()