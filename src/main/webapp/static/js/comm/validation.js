const kcueValidation = {

	checker: function(checkList) {

		for (let i = 0; i < checkList.length; i++) {
			
			let target = checkList[i];
			if( target === undefined ) return false;
			if( target.required == false ) continue;
			
			if( target.required && this.fnRequired(target) == false ){
				console.log(target + " invalidate");
				return false;
			}
			
			if( target.maxLength && this.fnMaxLength(target) == false ){
				console.log(target + " invalidate");
				return false;
			}
			
			if( target.pattern && this.fnPattern(target) == false ){
				console.log(target + " invalidate");
				return false;
			}
		}

		return true;
	},

	fnInputRadioCheck: function(selector) {
		let target = $(selector);

		if ($(selector + ":checked").length == 0) {
			alert($(target[0]).data("msg"));
			$(target[0]).focus();
			return false;
		}
		return true;
	},


	fnInputTextDateCheck: function(selector) {
		let target = $(selector);
		if (target.val() == '') {
			alert("날짜를 선택해 주세요.");
			target.focus();
			return false;
		}

		let date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
		if (!date_pattern.test(target.val())) {
			alert("날짜를 형식이 올바르지 않습니다.");
			return false;
		}
		return true;
	},

	fnInputTextHourCheck: function(selector) {
		let target = $(selector);
		if (target.val() == '') {
			alert($(target[0]).data("msg"));
			target.focus();
			return false;
		}

		if (Number(target.val()) > 23) {
			alert("24시 이상은 입력 할 수 없습니다.");
			target.focus();
			return false;
		}
		return true;
	},

	fnInputTextMinuteCheck: function(selector) {
		let target = $(selector);
		if (target.val() == '') {
			alert($(target[0]).data("msg"));
			target.focus();
			return false;
		}

		if (Number(target.val()) > 59) {
			alert("60분 이상은 입력 할 수 없습니다.");
			target.focus();
			return false;
		}
		return true;
	},

	fnInputTextCheck: function(selector) {
		let target = $(selector);
		let targetNm = $(selector).attr("name");
		let message = i18nMessage("errors.code.invalid-parameter.required", "field."+ targetNm);
		if (target.val() == '') {
			alert(message);
			target.focus();
			return false;
		}

		return true;
	},

	fnSelectBoxCheck: function(selector) {
		
		let targetNm = $(selector).attr("name");
		let message = i18nMessage("errors.code.invalid-parameter.select.required", "field."+ targetNm);
		
		if ($(selector).val() == "") {
			alert(message);
			$(selector).focus();
			return false;
		}
		return true;
	},

	
	fnCheckBoxCheck: function(selector) {
		
		let target = $(selector);
		let targetNm = $(selector).attr("name");
		let message = i18nMessage("errors.code.invalid-parameter.select.required", "field."+ targetNm);
		
		if (!target.is(":checked")) {
			alert(message);
			$(selector).focus();
			return false;
		}
		return true;
	},
	
	fnRequired : function(target){
		let result = true;
		switch ( target.type ) {
			case "text":
			case "number":
			case "password":
			case "textarea":
				result = this.fnInputTextCheck(target);
				break;
				
			case "radio":	
			case "checkbox":
				result = this.fnCheckBoxCheck(target);
				break;
				
			case "select-one":
				result = this.fnSelectBoxCheck(target);
				break;
			
			case "date":
				result = this.fnInputTextDateCheck(target);
				break;
				
			case "hour":
				result = this.fnInputTextHourCheck(target);
				break;
				
			case "minute":
				result = this.fnInputTextMinuteCheck(target);
				break;
				
			case "size":
				if (checkList.size == 0) {
					alert($(checkList.selector).data("sizemsg"));
					result = false;
				}
				break;
			case "img":
				let defaultImage = "/images/creas/admin/common/noImg.jpg";
				let preview = $(checkList.selector);
				let imagePath = preview.css("background-image");

				if (imagePath.indexOf(defaultImage) != -1) {
					alert("이미지를 등록해주세요. ");
					location.href = checkList.selector;
					result = false;
				}
				break;
			case "select-one":
				result = this.fnSelectBoxCheck(target);
				break;
			case "file-name":
				result = this.fnInputTextCheck(target);
				break;	
		}
		return result;
	},
	
	fnMaxLength : function (selector){

		let target = $(selector);
		let targetNm = $(selector).attr("name");
		let maxLength = $(selector).attr("maxLength");
		
		if ( target.val().length > maxLength) {
			
			let message = i18nMessage("errors.code.invalid-parameter.maxlength", "field."+ targetNm, maxLength);
			alert(message);
			$(target[0]).focus();
			return false;
		}
		return true;		
	},
	
	fnPattern : function(selector){
		
		let target = $(selector);
		let type = $(selector).attr("type");
		let targetNm = $(selector).attr("name");
		let pattern = new RegExp($(selector).attr("pattern"));
		
		if ( "password" == type && pattern.test(target.val()) == false ) {
			let message = i18nMessage("errors.code.invalid-parameter.password");
			alert(message);
			return false;
		}
		
		if ( "password" != type && pattern.test(target.val()) == false ) {
			let message = i18nMessage("errors.code.invalid-parameter.pattern", "field."+ targetNm);
			alert(message);
			return false;
		}
		return true;
	}
}
