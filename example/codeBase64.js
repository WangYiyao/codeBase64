var codeBase64 = (function(){
	var _padchar = "=";
	var _alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var addL = "", addR = "";  //Distractor

/**********************input is not valid*********************/
	function _makeDomExeption(){
		try{
			return new DOMException(DOMException.INVALID_CHARACTER_ERR);  
		}catch(e){  //browser incompatibility
			var error = new Error("DOM Exception 5");
			error.code = error.number = 5;
			error.name = error.description = "INVALID_CHARACTER_ERR";
			return error;
		}
	}


/***************************encode sigle char********************************/
function _encode_char(y,c){
	if(c < 0x80){  //0000 0000 - 0000 007f
		y.push(c);
	}
	else if( 0x80 <= c && c < 0x800){  //0000 0080 - 0000 07FF
		y.push(((c >> 6) & 0x1f) + 0xc0);
		y.push((c & 0x3f) + 0x80);
	}
	else{  //0000 0800 - 0000 ffff
		y.push(((c >> 12) & 0x0f) + 0xe0);
		y.push(((c >> 6) & 0x3f) + 0x80);
		y.push((c & 0x3f) + 0x80)
	}
}

/***************************encode********************************/
function _encode(s,leftPara,rightPara){
	if(leftPara == undefined){
		leftPara = "";
	}
	if(rightPara == undefined){
		rightPara = "";
	}
	leftPara = String(leftPara);
	rightPara = String(rightPara);
	s = leftPara + s + rightPara;
	addR = rightPara;
	addL = leftPara;
	var imax = s.length;
	var i, b10, x = [], y = [];
	if(3 < arguments.length || arguments.length == 0){
		throw _makeDomExeption();
	}
	if(imax == 0){
		return s;
	}
	for( i = 0; i < imax ; i++){
		_encode_char(y,s.charCodeAt(i));
		while(3 <= y.length){
			b10 = (y[0] << 16) | (y[1] <<8) | y[2];
			x.push(_alpha.charAt(b10 >> 18));
			x.push(_alpha.charAt((b10 >> 12) & 0x3f));
			x.push(_alpha.charAt((b10 >> 6) & 0x3f));
			x.push(_alpha.charAt(b10 & 0x3f));
			y.splice(0,3);
		}
	}

	if(y.length == 1){
		b10 = y[0] << 16;
		x.push(_alpha.charAt(b10 >> 18));
		x.push(_alpha.charAt((b10 >> 12) & 0x3f));
		x.push(_padchar);
		x.push(_padchar);
	}
	else if(y.length == 2){
		b10 = (y[0] << 16) | (y[1] << 8);
		x.push(_alpha.charAt(b10 >> 18));
		x.push(_alpha.charAt((b10 >> 12) & 0x3f));
		x.push(_alpha.charAt((b10 >> 6) & 0x3f));
		x.push(_padchar);
	}
	return x.join("");
}


/******************get the index of coded ciphertext***********************/
	function _get64Index(str,i){
		var index = _alpha.indexOf(str[i]);
		if(index == -1){
			throw _makeDomExeption();
		}
		return index;
	}
/********************decode sigle char************************/
	function _decode_char(y,x){
		while(0 < y.length){
			var c = y[0];
			if(c < 0x80){  //0xxxxxxx
				c = y.shift();
				x.push(String.fromCharCode(c));
			}
			else if((c & 0xe0) == 0xc0){  //110xxxxx 10xxxxxx
				if(y.length < 2){
					break;
				}
				c = y.shift();
				var c1 = y.shift();
				x.push(String.fromCharCode(((c&0x1f) << 6) + (c1&0x3f)));
			}
			else {  //1110xxxx 10xxxxxx 10xxxxxx
				if(y.length < 3){
					break;
				}
				c = y.shift();
				var c1 = y.shift();
				var c2 = y.shift();
				x.push(String.fromCharCode(((c&0x0f) << 12) + ((c1 & 0x3f) << 6) + (c2 &0x3f)));
			}
		}
	}


/********************decode************************/
	function _decode(s,leftPara,rightPara){
		s = "" + s;
		var pads = 0, imax = s.length;
		var i, b10, x = [], y = [];
		if(imax == 0){
			return s;
		}
		if(imax % 4 != 0){
			throw _makeDomExeption();
		}
		if(s.charAt(imax - 1) == _padchar){
			pads = 1;
			if(s.charAt(imax -2) == _padchar){
				pads = 2;
			}
			imax -= 4;
		}

		for(i = 0; i < imax; i += 4){
			b10 = (_get64Index(s,i) << 18) | (_get64Index(s,i+1) << 12) | (_get64Index(s,i+2) << 6) | (_get64Index(s,i+3));
			y.push(b10 >> 16);
			y.push((b10 >> 8) & 0xff);
			y.push(b10 & 0xff);
			_decode_char(y,x);
		}

		if(pads == 1){
			b10 = (_get64Index(s,i) << 18) | (_get64Index(s,i+1) << 12) | (_get64Index(s,i+2) << 6);
			y.push(b10 >> 16);
			y.push((b10 >> 8) & 0xff);
		}
		else if(pads == 2){
			b10 = (_get64Index(s,i) << 18) | (_get64Index(s,i+1) << 12);
			y.push(b10 >> 16);
		}
		_decode_char(y,x);
		var ret = x.join("");
		if(leftPara == undefined){
			leftPara = addL;
		}
		if(rightPara == undefined){
			rightPara = addR;
		}
		//var leftPara = addL;
		//var rightPara = addR;
		ret = ret.substring(leftPara.length, ret.length - rightPara.length);
		//var a = leftPara.length;
		//var b = ret.length - rightPara.length;
		//ret = ret.slice(a,b);
		return ret;
	}

	return {
		decode: _decode,
		encode:_encode
	};
})();