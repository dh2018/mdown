# mdown v1.0
可实现移动不同终端的对应地址适配，可自定义参数。1.0版本暂不支持回调。


## 兼容性
- Ios4+
- Andriod2.3+（未全部覆盖）


## 快速上手
### HTML
	<div class="download">立即下载</div>
	
### js
几行代码即可完成，如此简单：

	var dl = new locals('.download', {
	an_dl: 'http://apk4.anfan.com/21054_1452-rwu',
	ios_dl: 'https://itunes.apple.com/cn/app/id1230908670',
	wx_img: 'http://tcnd.vaf.cn/common/wx_tips1.png'})


## 文档
API

	var dl = new locals('选择器(可以为多个选择器,逗号隔开)', {
	an_dl: '安卓下载地址',
	an_txt: '无下载地址提示文本',
	ios_dl: 'iOS下载地址',
	ios_txt: '无下载地址提示文本',
	wx_img: '微信不支持下载自定义远程图片'})

demo[预览](https://dh2018.github.io/mdown/demo/)