import axios from "axios";

let instance;

const objToParams = (o) => {
  const params = Object.entries(o)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  return params
}

const defHeader = {
  'Content-Type': 'application/json'
}

class NlHttpSender {
  constructor() {
    if (!instance) {
      instance = this
    }
    return instance
  }

  /**
   * 
   * @param {String} url request URL
   * @param {Object} d parameters
   * @param {Object} head request header if any else set to null
   * @param {Object} body request body if any, else set to null
   * @param {Function} fn return function
   */
  async sendHttpGet(url, d, head, body, fn) {
    const params = d ? '?' + objToParams(d) :'';
    this.sendHttpRaw({
      method: "GET",
      mode: "cors",
      url: url + params,
      headers: head ? head : defHeader,
      body: body ? body : ''
    }, fn);
  }
  /**
   * 
   * @param {Object} data axios parameter. see: https://axios-http.com/docs/req_config
   * @param {Function} fn return function
   */
  async sendHttpRaw(data, fn){
    axios(
      data
    ).then((dat)=>{
      if(fn) fn(dat.data);
    }).catch((err)=>{
      console.log(err);
      if(fn == null) return;
      if(err && err.response && err.response.data){
        fn(err.response.data)
      }else{
        fn({
          "code": 99999,
          "message": "Response error"
        });
      }
    })
  }

  /**
   * 
   * @param {String} url request URL
   * @param {Object} d parameters
   * @param {Object} head request header if any else set to null
   * @param {Object} body request body if any, else set to null
   * @param {Function} fn return function
   */
  async sendHttpPost(url, d, head, body, fn) {
    if(d == null){
      axios.post(url, body, {
        headers:head
      }).then((dat)=>{
        if(fn) fn(dat.data)
      }).catch((err)=>{
        if(err && err.response && err.response.data){
          fn(err.response.data)
        }else{
          fn({
            "code": 99999,
            "message": "Response error"
          });
        }
      })
    }else{
      this.sendHttpRaw({
        method: "POST",
        mode: "cors",
        url: url,
        headers: head ? head : defHeader,
        params: d ? d : '',
      }, fn);
    }
  }
}

export default new NlHttpSender()
