function encode(){
		var plaintext = document.getElementsByClassName('plaintext')[0].value;
		var arr = document.getElementsByTagName('input');
		var headKey = arr[0].value;
		var endKey = arr[1].value;
		
		var temp = codeBase64.encode(plaintext,headKey,endKey);
		document.getElementsByClassName('ciphertext')[0].value = temp;
	}

	function decode(){
		var ciphertext = document.getElementsByClassName('ciphertext')[0].value;
		var arr = document.getElementsByTagName('input');
		var headKey = arr[2].value;
		var endKey = arr[3].value;

		document.getElementsByClassName('plaintext')[0].value = codeBase64.decode(ciphertext,headKey,endKey);
	}
	
	window.onload = function(){
		var arr = document.getElementsByTagName('input');
		for(var i = 0; i < 4; i++){
			arr[i].value = '';
		}
		var arr2 = document.getElementsByTagName('textarea');
		arr2[0].value = '';
		arr2[1].value = '';
		document.getElementsByClassName('encrypt')[0].onclick = function(){encode();};
		document.getElementsByClassName('decrypt')[0].onclick = function(){decode();};
	}