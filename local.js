function locals(domListStr, options) {
	this.domList = domListStr.split(',');
	this.options = this.extend({}, options);
	this.weixin = null;
	this.toast = null;
	this.sysType = 'android';
	this.sysSelect();
	this.listen('click');
}

locals.prototype.sysSelect = function () {
	switch (true) {
		case navigator.userAgent.match(/MicroMessenger/ig) != null:
			{
				this.sysType = 'weixin';
			}
			break;
		case navigator.userAgent.match(/android/ig) != null:
			{
				this.sysType = 'android';
			}
			break;
		case navigator.userAgent.match(/iphone|ipod/ig) != null:
			{
				this.sysType = 'ios';
			}
			break;
		case navigator.userAgent.match(/ipad/ig) != null:
			{
				this.sysType = 'ipad';
			}
			break;
	}
};

locals.prototype.extend = function (destination, source) { // 一个静态方法表示继承, 目标对象将拥有源对象的所有属性和方法
	for (var property in source) {
		destination[property] = source[property]; // 利用动态语言的特性, 通过赋值动态添加属性与方法
	}
	return destination; // 返回扩展后的对象
}

locals.prototype.listen = function (type) {
	var self = this;
	this.domList.forEach(function (e, index) {
		var arr = document.querySelectorAll(e);
		if (arr.length == 1) {
			arr[0].addEventListener(type, function () {
				self.go();
			});
		} else {
			for (var i = 0; i < arr.length; i++) {
				arr[i].addEventListener(type, function () {
					self.go();
				});
			}
		}
	});
};

locals.prototype.go = function () {
	var self = this;
	switch (this.sysType) {
		case 'weixin':
			{
				if (self.weixin) {
					self.weixin.style.display = 'block';
				} else {
					var div = document.createElement('div');
					var img = document.createElement('img');
					div.setAttribute('style', 'width:100%;height:100%;z-index:100;position:fixed;top:0;left:0;');
					img.setAttribute('style', 'display:block;width:100%;height:100%;');
					img.src = self.options.wx_img;
					div.appendChild(img);
					self.weixin = div;
					img.addEventListener('click', function () {
						self.weixin.style.display = 'none';
					});
					document.body.appendChild(div);
				}
			}
			break;
		case 'ios':
		case 'ipad':
			{
				if (self.options.ios_dl) {
					window.location.href = self.options.ios_dl;
				} else {
					self.showToast(self.options.ios_txt);
				}
			}
			break;
		case 'android':
			{
				if (self.options.an_dl) {
					window.location.href = self.options.an_dl;
				} else {
					self.showToast(self.options.an_txt);
				}
			}
			break;
		default:
			{
				if (self.options.an_dl) {
					window.location.href = self.options.an_dl;
				} else {
					self.showToast(self.options.an_txt);
				}
			}
	}
};

locals.prototype.showToast = function (txt) {
	var self = this;
	this.toastTimer = null;
	var html = '<span style="background:rgba(0,0,0,.7);color:#fff;padding:10px 15px;border-radius:8px;display:inline-block;font-size:16px;">' + txt + '</span>';
	if (this.toast) {
		this.toast.innerHTML = html;
		this.toast.style.display = 'block';
	} else {
		var div = document.createElement('div');
		div.setAttribute('style', 'width:100%;z-index:1020;position:fixed;top:40%;text-align:center;');
		div.innerHTML = html;
		this.toast = div;
		document.body.appendChild(div);
	}
	this.toastTimer = setTimeout(function () {
		self.toast.style.display = 'none';
		self.toastTimer = null;
	}, 2000);
};

window.locals = locals;
