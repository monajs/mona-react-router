export default class Url {
  constructor (path) {
    const _def = {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      username: '',
      password: '',
      origin: '',
      pathname: '',
      port: '',
      protocol: '',
      search: ''
    }
    //if(window.hasOwnProperty("URL")){
    //_a = new URL(path,location.href);
    //}else{
    let _a = document.createElement('a')
    _a.href = path
    //}
    for (const i in _def) {
      this[i] = _a[i] ? _a[i] : _def[i]
    }
  }

  toString () {
    return (
      (this.protocol && (this.protocol + '://')) +
      (this.username && (this.useranme + (this.password && (':' + this.password)) + '@')) +
      (this.host) +
      (this.port && (':' + this.port)) +
      (this.path) +
      (this.search) +
      (this.hash)
    )
  }

  static param (data) {
    const _t = []
    Object.keys(data).forEach(function (vi) {
      if (data[vi] !== undefined) {
        _t.push(vi + '=' + data[vi])
      }
    })
    return _t.join('&')
  }

  static parseParam (search) {
    if (search.indexOf('?') === 0) {
      search = search.substring(1)
    }
    const _t = search.split('&')
    const params = {}
    _t.forEach(function (vi) {
      const _p = vi.split('=')
      if (_p.length !== 2) {
        return
      }
      params[_p[0]] = _p[1]
    })
    return params
  }
}

