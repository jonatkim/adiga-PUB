
let fn_axios = {
	
	axios_defaults : {
	  	method : 'get'
	  	, responseType: 'json'
	  	, timeout : 10000
	  	, responseEncoding :'uft8'
	  	, maxRedirects : 0
	  	, data : ''
	  	, headers : {'X-Requested-With': 'XMLHttpRequest'}
	  	, showLoading : false
  	},

	config_Defaults : function(method, options){
		
		options = options || {};
		
		defaults = fn_axios.axios_defaults;
		defaults.method = method;
		
	  	for (let prop in defaults)  {
	    	options[prop] = typeof options[prop] !== 'undefined' ? options[prop] : defaults[prop];
	  	}
	  
	 	return options;
	},
	
	get : function getApi(url, callBackFunc, options) {
		
		config = fn_axios.config_Defaults('get', options);
		if(config.showLoading) $(window).block();
		
		axios.get(url, config)
		.then(function (response) {
			if(response.data.error){
				fn_axios.fn_error(response.data.error);
				return;
			} 
			
			if(callBackFunc) callBackFunc(response.data);
		})
		.catch(function(error) {
			console.log(error.config);
		})
		.finally(function() {
			// 항상 실행되는 영역(로딩바 제거?)
			if(config.showLoading) $(window).unblock();
		});
	},

	post : function postApi(url, data, callBackFunc, options) {
		
		config = fn_axios.config_Defaults('post', options);
		if(config.showLoading) $(window).block();
		
		axios.post(url, data, config)
		.then(function (response) {
			if(response.data.error){
				fn_axios.fn_error(response.data.error);
				return;
			} 
			
			if(callBackFunc) callBackFunc(response.data);
		})
		.catch(function (error) {
			console.log(error.config);
		})
		.finally(function() {	
			// 항상 실행되는 영역(로딩바 제거?)
			if(config.showLoading) $(window).unblock();
		});
	},
	
	file : function fileApi(url, data, callBackFunc, options) {
		
		config = fn_axios.config_Defaults('post', options);
		config.headers = {"Content-Type": "multipart/form-data"};
		if(config.showLoading) $(window).block();
		
		axios.post(url, data, config)
		.then(function (response) {
			
			if(response.data.error){
				fn_axios.fn_error(response.data.error);
				return;
			} 
			
			if(callBackFunc) callBackFunc(response.data);
		})
		.catch(function (error) {
			console.log(error.config);
		})
		.finally(function() {	
			// 항상 실행되는 영역(로딩바 제거?)
			if(config.showLoading) $(window).unblock();
		});
	},
	
	fn_error : function (error){
		console.log("error>>: ", error);
		
		switch(error.code) {
		  case '030':
			  
			alert('로그인이 필요한 서비스 입니다.\n로그인페이지로 이동합니다.')
			let preUrl = "preUrl="+encodeURI(window.location.href);
			location.href = "/mbs/ath/mbsAthLoginView.do?"+preUrl;
	    	break;
		
		  case '041':
			  
			alert(error.message);
			$('#' + error.field).focus();
	    	break;
		
		  default:
			
			alert('알수없는 오류가 발생했습니다.\n관리자에게 문의하세요.');
		    break;
		}
	}
}
