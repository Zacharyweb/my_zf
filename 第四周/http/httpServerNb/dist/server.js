"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _util = _interopRequireDefault(require("util"));

var _mime = _interopRequireDefault(require("mime"));

var _url = _interopRequireDefault(require("url"));

var _path = _interopRequireDefault(require("path"));

var _ejs = _interopRequireDefault(require("ejs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _zlib = _interopRequireDefault(require("zlib"));

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let stat = _util.default.promisify(_fs.default.stat);

let readdir = _util.default.promisify(_fs.default.readdir);

let template = _fs.default.readFileSync(_path.default.join(__dirname, '../template.html'), 'utf-8');

class Server {
  constructor(options) {
    this.port = options.port;
  }

  handlerRequest(req, res) {
    let {
      pathname
    } = _url.default.parse(req.url);

    pathname = decodeURIComponent(pathname);
    this.sendFile(pathname, req, res);
  }

  async sendFile(pathname, req, res) {
    let filePath = _path.default.join(process.cwd(), pathname);

    try {
      let statObj = await stat(filePath);

      if (statObj.isDirectory()) {
        try {
          let dirs = await readdir(filePath);

          let result = _ejs.default.render(template, {
            dirs,
            path: pathname == '/' ? '' : pathname
          }); // res.setHeader('Cache-Control','max-age=10');


          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html;charset=utf-8');
          res.end(result);
        } catch (error) {
          this.sendError(error, req, res);
        }
      } else {
        let type = _mime.default.getType(filePath);

        res.setHeader('Content-Type', type + ';charset=utf-8');
        let cache = this.cache(filePath, req, res, statObj);

        if (cache) {
          res.statusCode = 304;
          return res.end();
        }

        res.statusCode = 200;
        let flag = this.gzip(filePath, req, res);

        if (flag) {
          _fs.default.createReadStream(filePath).pipe(flag).pipe(res);
        } else {
          _fs.default.createReadStream(filePath).pipe(res);
        }
      }
    } catch (error) {
      this.sendError(error, req, res);
    }
  }

  gzip(filePath, req, res) {
    let type = req.headers['accept-encoding'];
    if (!type) return false;

    if (type.match(/gzip/)) {
      res.setHeader('Content-Encoding', 'gzip');
      return _zlib.default.createGzip();
    } else if (type.match(/deflate/)) {
      res.setHeader('Content-Encoding', 'deflate');
      return _zlib.default.createDeflate();
    }

    return false;
  }

  cache(filePath, req, res, statObj) {
    // 强缓存
    res.setHeader('Cache-Control', 'max-age=10'); // 新的都这么用
    // res.setHeader('Expires',new Date(+new Date()+10*1000).toGMTString()); // 老的这么写 这个为兼容老的浏览器
    // res.setHeader('Cache-Control','no-cache'); // 每次都访问服务器 但是缓存 适用于走协商缓存
    // res.setHeader('Cache-Control','no-store'); // 不走缓存 而且缓存里没有

    let Etag = _crypto.default.createHash('md5').update(_fs.default.readFileSync(filePath)).digest('base64');

    res.setHeader('Etag', Etag);
    let ifNoneMatch = req.headers['if-none-match'];
    console.log(Etag);
    console.log(ifNoneMatch);

    if (ifNoneMatch === Etag) {
      return true;
    }

    let lastModified = statObj.ctime.toGMTString();
    res.setHeader('Last-Modified', lastModified);
    let ifModifiedSince = req.headers['if-modified-since'];
    console.log(lastModified);
    console.log(ifModifiedSince);

    if (ifModifiedSince === lastModified) {
      return true;
    }

    ;
    return false;
  }

  sendError(err, req, res) {
    res.statusCode = 404;
    res.end('Not Found');
  }

  start() {
    let server = _http.default.createServer(this.handlerRequest.bind(this));

    server.listen(this.port, () => {
      console.log(`server in running at port ${_chalk.default.yellow(this.port)}`);
    });
  }

}

var _default = Server;
exports.default = _default;