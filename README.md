# codeBase64
A  JavaScript plug-in can be encoded and decoded with Base64.<br>

###Illustration
This plug-in can used for characters which UNICODE is between 0000 0000 and 0000 FFFF.<br>
Include Number, English, Chinese, Korean and so on.<br>
And you can set the Secret Key by your own situation.

###Example
I write a simple demo for example.[Online Demo](https://wangyiyao.github.io/codeBase64/)<br>
If you do not fill Secret Key, the default is null. Result is encode or decode your input directly.

###Usage
To use codeBase64, the following files should always be included.<br>
```html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<script type="text/javascript" src="codeBase64.js"></script>
```
Suppose we want to encode a string, then decode it. If you do not fill Secret Key, the default is null. Result is encode or decode your input directly. CodeBase64 makes it as simple as:<br>
```javascript
var result = codeBase64.encode('hello'[,headKey,endKey]);
var str = codeBase64.decode(result[,headKey,endKey]);
```
If you have any questions, you can refer to the source of this demo or Issues here.

###License
The MIT License (MIT)<br>
<br>
Copyright (c) 2016 Yiyao Wang<br>
<br>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:<br>
<br>
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br>
<br>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

