let instance,
  ws,
  callback = null,
  currentUrl = '',
  onConnect = () => {
    if (callback) callback('ONCONNECT')
  },
  onDisconnect = () => {
    if (callback) callback('ONDISCONNECT')
  },
  onError = () => {
    if (callback) callback('ONERROR')
  },
  onReceive = (o) => {
    // console.log(o.data)
    if (o.data.toString().toUpperCase().indexOf('ECHO') > -1) {
      instance.send('ECHO')
    }
    if (callback) callback(o.data)
  }

class NlChatSocket {
  constructor() {
    if (!instance) {
      instance = this
    }
    return instance
  }

  connect(url) {
    if (ws) {
      ws.removeEventListener('open', onConnect)
      ws.removeEventListener('message', onReceive)
      ws.removeEventListener('close', onDisconnect)
      ws.removeEventListener('error', onError)
      ws.close()
      ws = null
    }
    if(callback) instance.setCallbackHandler(callback)
    currentUrl = url
    ws = new WebSocket(url)
    // console.log(ws, url)
    ws.addEventListener('open', onConnect)
    ws.addEventListener('message', onReceive)
    ws.addEventListener('close', onDisconnect)
    ws.addEventListener('error', onError)
  }

  disconnect() {
    instance.destroy()
  }

  send(d) {
    if (ws) ws.send(d)
  }

  setCallbackHandler(fn) {
    callback = fn
  }

  resetSocket() {
    if (currentUrl == '') {
      if (callback) callback('NOWSS')
      return
    }
    setTimeout(() => {
      instance.connect(currentUrl)
    }, 2000)
  }

  destroy() {
    if (ws) {
      ws.removeEventListener('open', onConnect)
      ws.removeEventListener('message', onReceive)
      ws.removeEventListener('close', onDisconnect)
      ws.removeEventListener('error', onError)
      ws.close()
    }
    ws = null
    callback = null
  }
}
export default new NlChatSocket()
