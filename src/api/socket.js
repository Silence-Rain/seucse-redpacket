let socket = {
	sock_main: null,
	sock_second: null,
	init (handler) {
		if (handler == "main")
			this.sock_main = new WebSocket("wss://myseu.cn/redpack/main")
		else if (handler == "second")
			this.sock_second = new WebSocket("wss://myseu.cn/redpack/second")
	},
	checkSocket (handler) {
		if (handler == "main") {
			setInterval(() => {
				if (this.sock_main.readyState == WebSocket.CLOSED 
					|| this.sock_main.readyState == WebSocket.CLOSING)
					this.sock_main = new WebSocket("wss://myseu.cn/redpack/main")
			}, 100)
		}
		else if (handler == "second") {
			setInterval(() => {
				if (this.sock_second.readyState == WebSocket.CLOSED
					|| this.sock_second.readyState == WebSocket.CLOSING)
					this.sock_second = new WebSocket("wss://myseu.cn/redpack/second")
			}, 100)
		}
	}, 
	close (handler) {
		if (handler == "main")
			this.sock_main.close()
		else if (handler == "second")
			this.sock_second.close()
	}
}

export default socket