/*! licenses: /vendor.LICENSE.txt */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("vue")) : typeof define === "function" && define.amd ? define(["exports", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["imgix-vue"] = {}, global.Vue));
})(this, function(exports2, vue) {
  "use strict";
  const version = "3.7.3";
  const VERSION$2 = version;
  const _hasatob = typeof atob === "function";
  const _hasbtoa = typeof btoa === "function";
  const _hasBuffer = typeof Buffer === "function";
  const _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
  const _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
  const b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  const b64chs = Array.prototype.slice.call(b64ch);
  const b64tab = ((a) => {
    let tab = {};
    a.forEach((c, i) => tab[c] = i);
    return tab;
  })(b64chs);
  const b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
  const _fromCC = String.fromCharCode.bind(String);
  const _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));
  const _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
  const _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
  const btoaPolyfill = (bin) => {
    let u32, c0, c1, c2, asc = "";
    const pad = bin.length % 3;
    for (let i = 0; i < bin.length; ) {
      if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
        throw new TypeError("invalid character found");
      u32 = c0 << 16 | c1 << 8 | c2;
      asc += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
    }
    return pad ? asc.slice(0, pad - 3) + "===".substring(pad) : asc;
  };
  const _btoa = _hasbtoa ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
  const _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
    const maxargs = 4096;
    let strs = [];
    for (let i = 0, l = u8a.length; i < l; i += maxargs) {
      strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
    }
    return _btoa(strs.join(""));
  };
  const fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
  const cb_utob = (c) => {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    } else {
      var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
      return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
    }
  };
  const re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
  const utob = (u) => u.replace(re_utob, cb_utob);
  const _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
  const encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
  const encodeURI$1 = (src) => encode(src, true);
  const re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
  const cb_btou = (cccc) => {
    switch (cccc.length) {
      case 4:
        var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
        return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
      case 3:
        return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
      default:
        return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
    }
  };
  const btou = (b) => b.replace(re_btou, cb_btou);
  const atobPolyfill = (asc) => {
    asc = asc.replace(/\s+/g, "");
    if (!b64re.test(asc))
      throw new TypeError("malformed base64.");
    asc += "==".slice(2 - (asc.length & 3));
    let u24, bin = "", r1, r2;
    for (let i = 0; i < asc.length; ) {
      u24 = b64tab[asc.charAt(i++)] << 18 | b64tab[asc.charAt(i++)] << 12 | (r1 = b64tab[asc.charAt(i++)]) << 6 | (r2 = b64tab[asc.charAt(i++)]);
      bin += r1 === 64 ? _fromCC(u24 >> 16 & 255) : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255) : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);
    }
    return bin;
  };
  const _atob = _hasatob ? (asc) => atob(_tidyB64(asc)) : _hasBuffer ? (asc) => Buffer.from(asc, "base64").toString("binary") : atobPolyfill;
  const _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a), (c) => c.charCodeAt(0));
  const toUint8Array = (a) => _toUint8Array(_unURI(a));
  const _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
  const _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
  const decode$1 = (src) => _decode(_unURI(src));
  const isValid = (src) => {
    if (typeof src !== "string")
      return false;
    const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
    return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
  };
  const _noEnum = (v) => {
    return {
      value: v,
      enumerable: false,
      writable: true,
      configurable: true
    };
  };
  const extendString = function() {
    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));
    _add("fromBase64", function() {
      return decode$1(this);
    });
    _add("toBase64", function(urlsafe) {
      return encode(this, urlsafe);
    });
    _add("toBase64URI", function() {
      return encode(this, true);
    });
    _add("toBase64URL", function() {
      return encode(this, true);
    });
    _add("toUint8Array", function() {
      return toUint8Array(this);
    });
  };
  const extendUint8Array = function() {
    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));
    _add("toBase64", function(urlsafe) {
      return fromUint8Array(this, urlsafe);
    });
    _add("toBase64URI", function() {
      return fromUint8Array(this, true);
    });
    _add("toBase64URL", function() {
      return fromUint8Array(this, true);
    });
  };
  const extendBuiltins = () => {
    extendString();
    extendUint8Array();
  };
  const gBase64 = {
    version,
    VERSION: VERSION$2,
    atob: _atob,
    atobPolyfill,
    btoa: _btoa,
    btoaPolyfill,
    fromBase64: decode$1,
    toBase64: encode,
    encode,
    encodeURI: encodeURI$1,
    encodeURL: encodeURI$1,
    utob,
    btou,
    decode: decode$1,
    isValid,
    fromUint8Array,
    toUint8Array,
    extendString,
    extendUint8Array,
    extendBuiltins
  };
  var md5$1 = { exports: {} };
  var crypt = { exports: {} };
  (function() {
    var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", crypt$1 = {
      rotl: function(n, b) {
        return n << b | n >>> 32 - b;
      },
      rotr: function(n, b) {
        return n << 32 - b | n >>> b;
      },
      endian: function(n) {
        if (n.constructor == Number) {
          return crypt$1.rotl(n, 8) & 16711935 | crypt$1.rotl(n, 24) & 4278255360;
        }
        for (var i = 0; i < n.length; i++)
          n[i] = crypt$1.endian(n[i]);
        return n;
      },
      randomBytes: function(n) {
        for (var bytes = []; n > 0; n--)
          bytes.push(Math.floor(Math.random() * 256));
        return bytes;
      },
      bytesToWords: function(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
          words[b >>> 5] |= bytes[i] << 24 - b % 32;
        return words;
      },
      wordsToBytes: function(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8)
          bytes.push(words[b >>> 5] >>> 24 - b % 32 & 255);
        return bytes;
      },
      bytesToHex: function(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 15).toString(16));
        }
        return hex.join("");
      },
      hexToBytes: function(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
          bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
      },
      bytesToBase64: function(bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0; j < 4; j++)
            if (i * 8 + j * 6 <= bytes.length * 8)
              base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 63));
            else
              base64.push("=");
        }
        return base64.join("");
      },
      base64ToBytes: function(base64) {
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");
        for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0)
            continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }
        return bytes;
      }
    };
    crypt.exports = crypt$1;
  })();
  var charenc = {
    utf8: {
      stringToBytes: function(str) {
        return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
      },
      bytesToString: function(bytes) {
        return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
      }
    },
    bin: {
      stringToBytes: function(str) {
        for (var bytes = [], i = 0; i < str.length; i++)
          bytes.push(str.charCodeAt(i) & 255);
        return bytes;
      },
      bytesToString: function(bytes) {
        for (var str = [], i = 0; i < bytes.length; i++)
          str.push(String.fromCharCode(bytes[i]));
        return str.join("");
      }
    }
  };
  var charenc_1 = charenc;
  var isBuffer_1 = function(obj) {
    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
  };
  function isBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  }
  function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isBuffer(obj.slice(0, 0));
  }
  (function() {
    var crypt$1 = crypt.exports, utf8 = charenc_1.utf8, isBuffer2 = isBuffer_1, bin = charenc_1.bin, md52 = function(message, options) {
      if (message.constructor == String)
        if (options && options.encoding === "binary")
          message = bin.stringToBytes(message);
        else
          message = utf8.stringToBytes(message);
      else if (isBuffer2(message))
        message = Array.prototype.slice.call(message, 0);
      else if (!Array.isArray(message) && message.constructor !== Uint8Array)
        message = message.toString();
      var m = crypt$1.bytesToWords(message), l = message.length * 8, a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
      for (var i = 0; i < m.length; i++) {
        m[i] = (m[i] << 8 | m[i] >>> 24) & 16711935 | (m[i] << 24 | m[i] >>> 8) & 4278255360;
      }
      m[l >>> 5] |= 128 << l % 32;
      m[(l + 64 >>> 9 << 4) + 14] = l;
      var FF = md52._ff, GG = md52._gg, HH = md52._hh, II = md52._ii;
      for (var i = 0; i < m.length; i += 16) {
        var aa = a, bb = b, cc = c, dd = d;
        a = FF(a, b, c, d, m[i + 0], 7, -680876936);
        d = FF(d, a, b, c, m[i + 1], 12, -389564586);
        c = FF(c, d, a, b, m[i + 2], 17, 606105819);
        b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i + 4], 7, -176418897);
        d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
        c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i + 7], 22, -45705983);
        a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
        d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i + 10], 17, -42063);
        b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
        a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
        d = FF(d, a, b, c, m[i + 13], 12, -40341101);
        c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
        b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
        a = GG(a, b, c, d, m[i + 1], 5, -165796510);
        d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
        c = GG(c, d, a, b, m[i + 11], 14, 643717713);
        b = GG(b, c, d, a, m[i + 0], 20, -373897302);
        a = GG(a, b, c, d, m[i + 5], 5, -701558691);
        d = GG(d, a, b, c, m[i + 10], 9, 38016083);
        c = GG(c, d, a, b, m[i + 15], 14, -660478335);
        b = GG(b, c, d, a, m[i + 4], 20, -405537848);
        a = GG(a, b, c, d, m[i + 9], 5, 568446438);
        d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
        c = GG(c, d, a, b, m[i + 3], 14, -187363961);
        b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
        a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
        d = GG(d, a, b, c, m[i + 2], 9, -51403784);
        c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
        b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
        a = HH(a, b, c, d, m[i + 5], 4, -378558);
        d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
        b = HH(b, c, d, a, m[i + 14], 23, -35309556);
        a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
        d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
        c = HH(c, d, a, b, m[i + 7], 16, -155497632);
        b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
        a = HH(a, b, c, d, m[i + 13], 4, 681279174);
        d = HH(d, a, b, c, m[i + 0], 11, -358537222);
        c = HH(c, d, a, b, m[i + 3], 16, -722521979);
        b = HH(b, c, d, a, m[i + 6], 23, 76029189);
        a = HH(a, b, c, d, m[i + 9], 4, -640364487);
        d = HH(d, a, b, c, m[i + 12], 11, -421815835);
        c = HH(c, d, a, b, m[i + 15], 16, 530742520);
        b = HH(b, c, d, a, m[i + 2], 23, -995338651);
        a = II(a, b, c, d, m[i + 0], 6, -198630844);
        d = II(d, a, b, c, m[i + 7], 10, 1126891415);
        c = II(c, d, a, b, m[i + 14], 15, -1416354905);
        b = II(b, c, d, a, m[i + 5], 21, -57434055);
        a = II(a, b, c, d, m[i + 12], 6, 1700485571);
        d = II(d, a, b, c, m[i + 3], 10, -1894986606);
        c = II(c, d, a, b, m[i + 10], 15, -1051523);
        b = II(b, c, d, a, m[i + 1], 21, -2054922799);
        a = II(a, b, c, d, m[i + 8], 6, 1873313359);
        d = II(d, a, b, c, m[i + 15], 10, -30611744);
        c = II(c, d, a, b, m[i + 6], 15, -1560198380);
        b = II(b, c, d, a, m[i + 13], 21, 1309151649);
        a = II(a, b, c, d, m[i + 4], 6, -145523070);
        d = II(d, a, b, c, m[i + 11], 10, -1120210379);
        c = II(c, d, a, b, m[i + 2], 15, 718787259);
        b = II(b, c, d, a, m[i + 9], 21, -343485551);
        a = a + aa >>> 0;
        b = b + bb >>> 0;
        c = c + cc >>> 0;
        d = d + dd >>> 0;
      }
      return crypt$1.endian([a, b, c, d]);
    };
    md52._ff = function(a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md52._gg = function(a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md52._hh = function(a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md52._ii = function(a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md52._blocksize = 16;
    md52._digestsize = 16;
    md5$1.exports = function(message, options) {
      if (message === void 0 || message === null)
        throw new Error("Illegal argument " + message);
      var digestbytes = crypt$1.wordsToBytes(md52(message, options));
      return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt$1.bytesToHex(digestbytes);
    };
  })();
  var md5 = md5$1.exports;
  const PLUS_RE = /\+/g;
  function decode(text = "") {
    try {
      return decodeURIComponent("" + text);
    } catch (_err) {
      return "" + text;
    }
  }
  function decodeQueryValue(text) {
    return decode(text.replace(PLUS_RE, " "));
  }
  function parseQuery(paramsStr = "") {
    const obj = {};
    if (paramsStr[0] === "?") {
      paramsStr = paramsStr.substr(1);
    }
    for (const param of paramsStr.split("&")) {
      const s = param.match(/([^=]+)=?(.*)/) || [];
      if (s.length < 2) {
        continue;
      }
      const key = decode(s[1]);
      if (key === "__proto__" || key === "constructor") {
        continue;
      }
      const value = decodeQueryValue(s[2] || "");
      if (obj[key]) {
        if (Array.isArray(obj[key])) {
          obj[key].push(value);
        } else {
          obj[key] = [obj[key], value];
        }
      } else {
        obj[key] = value;
      }
    }
    return obj;
  }
  const PROTOCOL_REGEX = /^\w+:(\/\/)?/;
  const PROTOCOL_RELATIVE_REGEX = /^\/\/[^/]+/;
  function hasProtocol(inputStr, acceptProtocolRelative = false) {
    return PROTOCOL_REGEX.test(inputStr) || acceptProtocolRelative && PROTOCOL_RELATIVE_REGEX.test(inputStr);
  }
  function getQuery(input) {
    return parseQuery(parseURL(input).search);
  }
  function parseURL(input = "", defaultProto) {
    if (!hasProtocol(input, true)) {
      return defaultProto ? parseURL(defaultProto + input) : parsePath(input);
    }
    const [protocol = "", auth, hostAndPath = ""] = (input.replace(/\\/g, "/").match(/([^:/]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1);
    const [host = "", path = ""] = (hostAndPath.match(/([^/?#]*)(.*)?/) || []).splice(1);
    const { pathname, search, hash } = parsePath(path);
    return {
      protocol,
      auth: auth ? auth.substr(0, auth.length - 1) : "",
      host,
      pathname,
      search,
      hash
    };
  }
  function parsePath(input = "") {
    const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
    return {
      pathname,
      search,
      hash
    };
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
      return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr))
      return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
      return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null)
      return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i)
          break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null)
          _i["return"]();
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o)
      return;
    if (typeof o === "string")
      return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
      n = o.constructor.name;
    if (n === "Map" || n === "Set")
      return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
      len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++)
      arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var VERSION$1 = "3.7.0";
  var DOMAIN_REGEX = /^(?:[a-z\d\-_]{1,62}\.){0,125}(?:[a-z\d](?:\-(?=\-*[a-z\d])|[a-z]|\d){0,62}\.)[a-z\d]{1,63}$/i;
  var MIN_SRCSET_WIDTH = 100;
  var MAX_SRCSET_WIDTH = 8192;
  var DEFAULT_SRCSET_WIDTH_TOLERANCE = 0.08;
  var DPR_QUALITIES = {
    1: 75,
    2: 50,
    3: 35,
    4: 23,
    5: 20
  };
  var DEFAULT_DPR = [1, 2, 3, 4, 5];
  var DEFAULT_OPTIONS = {
    domain: null,
    useHTTPS: true,
    includeLibraryParam: true,
    urlPrefix: "https://",
    secureURLToken: null
  };
  function extractUrl(_ref) {
    var _ref$url = _ref.url, url = _ref$url === void 0 ? "" : _ref$url, _ref$useHttps = _ref.useHttps, useHttps = _ref$useHttps === void 0 ? false : _ref$useHttps;
    var defaultProto = useHttps ? "https://" : "http://";
    if (!hasProtocol(url, true)) {
      return extractUrl({
        url: defaultProto + url
      });
    }
    return parseURL(url);
  }
  function validateAndDestructureOptions(options) {
    var widthTolerance;
    if (options.widthTolerance !== void 0) {
      validateWidthTolerance(options.widthTolerance);
      widthTolerance = options.widthTolerance;
    } else {
      widthTolerance = DEFAULT_SRCSET_WIDTH_TOLERANCE;
    }
    var minWidth = options.minWidth === void 0 ? MIN_SRCSET_WIDTH : options.minWidth;
    var maxWidth = options.maxWidth === void 0 ? MAX_SRCSET_WIDTH : options.maxWidth;
    if (minWidth != MIN_SRCSET_WIDTH || maxWidth != MAX_SRCSET_WIDTH) {
      validateRange(minWidth, maxWidth);
    }
    return [widthTolerance, minWidth, maxWidth];
  }
  function validateRange(min, max) {
    if (!(Number.isInteger(min) && Number.isInteger(max)) || min <= 0 || max <= 0 || min > max) {
      throw new Error("The min and max srcset widths can only be passed positive Number values, and min must be less than max. Found min: ".concat(min, " and max: ").concat(max, "."));
    }
  }
  function validateWidthTolerance(widthTolerance) {
    if (typeof widthTolerance != "number" || widthTolerance < 0.01) {
      throw new Error("The srcset widthTolerance must be a number greater than or equal to 0.01");
    }
  }
  function validateWidths(customWidths) {
    if (!Array.isArray(customWidths) || !customWidths.length) {
      throw new Error("The widths argument can only be passed a valid non-empty array of integers");
    } else {
      var allPositiveIntegers = customWidths.every(function(width) {
        return Number.isInteger(width) && width > 0;
      });
      if (!allPositiveIntegers) {
        throw new Error("A custom widths argument can only contain positive integer values");
      }
    }
  }
  function validateVariableQuality(disableVariableQuality) {
    if (typeof disableVariableQuality != "boolean") {
      throw new Error("The disableVariableQuality argument can only be passed a Boolean value");
    }
  }
  function validateDevicePixelRatios(devicePixelRatios) {
    if (!Array.isArray(devicePixelRatios) || !devicePixelRatios.length) {
      throw new Error("The devicePixelRatios argument can only be passed a valid non-empty array of integers");
    } else {
      var allValidDPR = devicePixelRatios.every(function(dpr) {
        return typeof dpr === "number" && dpr >= 1 && dpr <= 5;
      });
      if (!allValidDPR) {
        throw new Error("The devicePixelRatios argument can only contain positive integer values between 1 and 5");
      }
    }
  }
  function validateVariableQualities(variableQualities) {
    if (_typeof(variableQualities) !== "object") {
      throw new Error("The variableQualities argument can only be an object");
    }
  }
  var ImgixClient = /* @__PURE__ */ function() {
    function ImgixClient2() {
      var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _classCallCheck(this, ImgixClient2);
      this.settings = _objectSpread2(_objectSpread2({}, DEFAULT_OPTIONS), opts);
      this.targetWidthsCache = {};
      if (typeof this.settings.domain != "string") {
        throw new Error("ImgixClient must be passed a valid string domain");
      }
      if (DOMAIN_REGEX.exec(this.settings.domain) == null) {
        throw new Error('Domain must be passed in as fully-qualified domain name and should not include a protocol or any path element, i.e. "example.imgix.net".');
      }
      if (this.settings.includeLibraryParam) {
        this.settings.libraryParam = "js-" + ImgixClient2.version();
      }
      this.settings.urlPrefix = this.settings.useHTTPS ? "https://" : "http://";
    }
    _createClass(ImgixClient2, [{
      key: "buildURL",
      value: function buildURL() {
        var rawPath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var path = this._sanitizePath(rawPath, options);
        var finalParams = this._buildParams(params, options);
        if (!!this.settings.secureURLToken) {
          finalParams = this._signParams(path, finalParams);
        }
        return this.settings.urlPrefix + this.settings.domain + path + finalParams;
      }
    }, {
      key: "_buildParams",
      value: function _buildParams() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var encode2 = options.encoder || encodeURIComponent;
        var queryParams = [].concat(_toConsumableArray(this.settings.libraryParam ? ["ixlib=".concat(this.settings.libraryParam)] : []), _toConsumableArray(Object.entries(params).reduce(function(prev, _ref) {
          var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
          if (value == null) {
            return prev;
          }
          var encodedKey = encode2(key);
          var encodedValue = key.substr(-2) === "64" ? gBase64.encodeURI(value) : encode2(value);
          prev.push("".concat(encodedKey, "=").concat(encodedValue));
          return prev;
        }, [])));
        return "".concat(queryParams.length > 0 ? "?" : "").concat(queryParams.join("&"));
      }
    }, {
      key: "_signParams",
      value: function _signParams(path, queryParams) {
        var signatureBase = this.settings.secureURLToken + path + queryParams;
        var signature = md5(signatureBase);
        return queryParams.length > 0 ? queryParams + "&s=" + signature : "?s=" + signature;
      }
    }, {
      key: "_sanitizePath",
      value: function _sanitizePath(path) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var _path = path.replace(/^\//, "");
        if (options.disablePathEncoding) {
          return "/" + _path;
        }
        if (options.encoder) {
          _path = options.encoder(_path);
        } else if (/^https?:\/\//.test(_path)) {
          _path = encodeURIComponent(_path);
        } else {
          _path = encodeURI(_path).replace(/[#?:+]/g, encodeURIComponent);
        }
        return "/" + _path;
      }
    }, {
      key: "buildSrcSet",
      value: function buildSrcSet2(path) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var w = params.w, h = params.h;
        if (w || h) {
          return this._buildDPRSrcSet(path, params, options);
        } else {
          return this._buildSrcSetPairs(path, params, options);
        }
      }
    }, {
      key: "_buildSrcSetPairs",
      value: function _buildSrcSetPairs(path) {
        var _this = this;
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var _validateAndDestructu = validateAndDestructureOptions(options), _validateAndDestructu2 = _slicedToArray(_validateAndDestructu, 3), widthTolerance = _validateAndDestructu2[0], minWidth = _validateAndDestructu2[1], maxWidth = _validateAndDestructu2[2];
        var targetWidthValues;
        if (options.widths) {
          validateWidths(options.widths);
          targetWidthValues = _toConsumableArray(options.widths);
        } else {
          targetWidthValues = ImgixClient2.targetWidths(minWidth, maxWidth, widthTolerance, this.targetWidthsCache);
        }
        var srcset = targetWidthValues.map(function(w) {
          return "".concat(_this.buildURL(path, _objectSpread2(_objectSpread2({}, params), {}, {
            w
          }), options), " ").concat(w, "w");
        });
        return srcset.join(",\n");
      }
    }, {
      key: "_buildDPRSrcSet",
      value: function _buildDPRSrcSet(path) {
        var _this2 = this;
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (options.devicePixelRatios) {
          validateDevicePixelRatios(options.devicePixelRatios);
        }
        var targetRatios = options.devicePixelRatios || DEFAULT_DPR;
        var disableVariableQuality = options.disableVariableQuality || false;
        if (!disableVariableQuality) {
          validateVariableQuality(disableVariableQuality);
        }
        if (options.variableQualities) {
          validateVariableQualities(options.variableQualities);
        }
        var qualities = _objectSpread2(_objectSpread2({}, DPR_QUALITIES), options.variableQualities);
        var withQuality = function withQuality2(path2, params2, dpr) {
          return "".concat(_this2.buildURL(path2, _objectSpread2(_objectSpread2({}, params2), {}, {
            dpr,
            q: params2.q || qualities[dpr] || qualities[Math.floor(dpr)]
          }), options), " ").concat(dpr, "x");
        };
        var srcset = disableVariableQuality ? targetRatios.map(function(dpr) {
          return "".concat(_this2.buildURL(path, _objectSpread2(_objectSpread2({}, params), {}, {
            dpr
          }), options), " ").concat(dpr, "x");
        }) : targetRatios.map(function(dpr) {
          return withQuality(path, params, dpr);
        });
        return srcset.join(",\n");
      }
    }], [{
      key: "version",
      value: function version2() {
        return VERSION$1;
      }
    }, {
      key: "_buildURL",
      value: function _buildURL(url) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        if (url == null) {
          return "";
        }
        var _extractUrl = extractUrl({
          url,
          useHTTPS: options.useHTTPS
        }), host = _extractUrl.host, pathname = _extractUrl.pathname, search = _extractUrl.search;
        var combinedParams = _objectSpread2(_objectSpread2({}, getQuery(search)), params);
        if (!host.length || !pathname.length) {
          throw new Error("_buildURL: URL must match {host}/{pathname}?{query}");
        }
        var client = new ImgixClient2(_objectSpread2({
          domain: host
        }, options));
        return client.buildURL(pathname, combinedParams);
      }
    }, {
      key: "_buildSrcSet",
      value: function _buildSrcSet(url) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var srcsetModifiers = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var clientOptions = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        if (url == null) {
          return "";
        }
        var _extractUrl2 = extractUrl({
          url,
          useHTTPS: clientOptions.useHTTPS
        }), host = _extractUrl2.host, pathname = _extractUrl2.pathname, search = _extractUrl2.search;
        var combinedParams = _objectSpread2(_objectSpread2({}, getQuery(search)), params);
        if (!host.length || !pathname.length) {
          throw new Error("_buildOneStepURL: URL must match {host}/{pathname}?{query}");
        }
        var client = new ImgixClient2(_objectSpread2({
          domain: host
        }, clientOptions));
        return client.buildSrcSet(pathname, combinedParams, srcsetModifiers);
      }
    }, {
      key: "targetWidths",
      value: function targetWidths() {
        var minWidth = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 100;
        var maxWidth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 8192;
        var widthTolerance = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.08;
        var cache = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        var minW = Math.floor(minWidth);
        var maxW = Math.floor(maxWidth);
        validateRange(minWidth, maxWidth);
        validateWidthTolerance(widthTolerance);
        var cacheKey = widthTolerance + "/" + minW + "/" + maxW;
        if (cacheKey in cache) {
          return cache[cacheKey];
        }
        if (minW === maxW) {
          return [minW];
        }
        var resolutions = [];
        var currentWidth = minW;
        while (currentWidth < maxW) {
          resolutions.push(Math.round(currentWidth));
          currentWidth *= 1 + widthTolerance * 2;
        }
        if (resolutions[resolutions.length - 1] < maxW) {
          resolutions.push(maxW);
        }
        cache[cacheKey] = resolutions;
        return resolutions;
      }
    }]);
    return ImgixClient2;
  }();
  const IxImgProps = {
    src: {
      type: String,
      required: true
    },
    fixed: Boolean,
    imgixParams: Object,
    width: [String, Number],
    height: [String, Number],
    attributeConfig: Object,
    disableVariableQuality: Boolean,
    sizes: [String]
  };
  const defaultAttributeMap$1 = {
    src: "src",
    srcset: "srcset"
  };
  const IxImg = vue.defineComponent({
    props: IxImgProps,
    setup(props, { attrs }) {
      const vueImgixSingleton = ensureVueImgixClientSingleton();
      const imgixParamsFromImgAttributes = {
        ...props.fixed && {
          ...props.width != null ? { w: props.width } : {},
          ...props.height != null ? { h: props.height } : {}
        }
      };
      const { src, srcset } = vueImgixSingleton.buildUrlObject(
        props.src,
        {
          ...imgixParamsFromImgAttributes,
          ...props.imgixParams
        },
        {
          disableVariableQuality: Boolean(props.disableVariableQuality)
        }
      );
      const attributeConfig = {
        ...defaultAttributeMap$1,
        ...props.attributeConfig
      };
      return () => vue.h("img", {
        [attributeConfig.src]: src,
        [attributeConfig.srcset]: srcset,
        width: props.width,
        height: props.height,
        sizes: props.sizes,
        ["data-testid"]: attrs["data-testid"] || void 0
      });
    }
  });
  const VERSION = "3.1.1";
  const clientOptionDefaults = {
    includeLibraryParam: true
  };
  class VueImgixClient {
    constructor(options) {
      this.buildIxParams = (ixParams) => {
        return {
          ...this.options.defaultIxParams,
          ...ixParams
        };
      };
      this.buildUrlObject = (url, ixParams, options2 = {}) => {
        const {
          widths,
          widthTolerance,
          minWidth,
          maxWidth,
          ...sharedOptions
        } = options2;
        const src = this._buildUrl(url, ixParams);
        const srcset = this._buildSrcSet(url, ixParams, {
          widths,
          widthTolerance,
          minWidth,
          maxWidth,
          ...sharedOptions
        });
        return { src, srcset };
      };
      this.buildUrl = (url, ixParams) => {
        return this.client.buildURL(url, this.buildIxParams(ixParams));
      };
      this._buildUrl = (url, ixParams) => {
        if (!url.includes("://")) {
          return this.client.buildURL(url, this.buildIxParams(ixParams));
        } else {
          return ImgixClient._buildURL(url, this.buildIxParams(ixParams));
        }
      };
      this.buildSrcSet = (url, ixParams, options2) => {
        return this.client.buildSrcSet(url, this.buildIxParams(ixParams), options2);
      };
      this._buildSrcSet = (url, ixParams, options2) => {
        if (!url.includes("://")) {
          return this.client.buildSrcSet(
            url,
            this.buildIxParams(ixParams),
            options2
          );
        } else {
          return ImgixClient._buildSrcSet(
            url,
            this.buildIxParams(ixParams),
            options2
          );
        }
      };
      this.options = { ...clientOptionDefaults, ...options };
      this.client = new ImgixClient({
        domain: this.options.domain,
        includeLibraryParam: false
      });
      if (this.options.includeLibraryParam) {
        this.client.settings.libraryParam = `vue-${VERSION}`;
      }
    }
  }
  const buildImgixClient = (options) => {
    const client = new VueImgixClient({
      ...options
    });
    return client;
  };
  let vueImgixClientSingleton = void 0;
  const initVueImgix = (options) => {
    vueImgixClientSingleton = new VueImgixClient(options);
  };
  const ensureVueImgixClientSingleton = () => {
    if (vueImgixClientSingleton == null) {
      throw new Error(
        "[@imgix/vue] Vue.use(VueImgix, {}) must be called before using exported methods. This is usually done in App.vue :)"
      );
    }
    return vueImgixClientSingleton;
  };
  const buildUrlObject = (...args) => {
    const client = ensureVueImgixClientSingleton();
    return client.buildUrlObject(...args);
  };
  const buildUrl = (...args) => {
    const client = ensureVueImgixClientSingleton();
    return client._buildUrl(...args);
  };
  const buildSrcSet = (...args) => {
    const client = ensureVueImgixClientSingleton();
    return client._buildSrcSet(...args);
  };
  const IxPictureProps = vue.defineComponent({
    props: {}
  });
  const IxPicture = vue.defineComponent({
    mixins: [IxPictureProps],
    setup(_, { slots }) {
      ensureVueImgixClientSingleton();
      const defaultSlots = slots && slots.default && slots.default();
      return () => {
        return vue.h("picture", defaultSlots);
      };
    }
  });
  const defaultAttributeMap = {
    src: "src",
    srcset: "srcset"
  };
  const IxSource = vue.defineComponent({
    props: {
      src: {
        type: String,
        required: true
      },
      imgixParams: Object,
      attributeConfig: Object
    },
    setup(props) {
      const vueImgixSingleton = ensureVueImgixClientSingleton();
      const imgixParamsFromAttributes = {};
      const { srcset } = vueImgixSingleton.buildUrlObject(props.src, {
        ...imgixParamsFromAttributes,
        ...props.imgixParams
      });
      const attributeConfig = {
        ...defaultAttributeMap,
        ...props.attributeConfig
      };
      const childAttrs = {
        [attributeConfig.srcset]: srcset
      };
      return () => vue.h("source", childAttrs);
    }
  });
  function install(_app, options) {
    if (install.installed)
      return;
    install.installed = true;
    initVueImgix(options);
    _app.component("ix-img", IxImg);
    _app.component("ix-picture", IxPicture);
    _app.component("ix-source", IxSource);
  }
  install.installed = false;
  const plugin = {
    install
  };
  exports2.IxImg = IxImg;
  exports2.buildImgixClient = buildImgixClient;
  exports2.buildSrcSet = buildSrcSet;
  exports2.buildUrl = buildUrl;
  exports2.buildUrlObject = buildUrlObject;
  exports2["default"] = plugin;
  exports2.ensureVueImgixClientSingleton = ensureVueImgixClientSingleton;
  exports2.initVueImgix = initVueImgix;
  exports2.install = install;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
