let AppBaseUrl = 'http://localhost:6791/server/';
//let AppBaseUrl = 'https://egogo.hk';
let baseUrl = '';
let newBaseUrl = 'http://localhost:6791/server/';
var http={
	request:function(obj){
		obj.url = AppBaseUrl + obj.url
		if(obj.method=="POST"){
			// obj.header["Content-Type"]='application/x-www-form-urlencoded';					
		}
		return uni.request(obj);
	}
}

export default http;
