let socket = {
	sock_main: null,
	sock_second: null,
	init: function (handler) {
		if (handler == "main")
			this.sock_main = new WebSocket("ws://v3.myseu.cn:6280/redpack/main")
		else if (handler == "second")
			this.sock_second = new WebSocket("ws://v3.myseu.cn:6280/redpack/second")
	}
}

export default socket