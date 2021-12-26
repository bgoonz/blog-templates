/*!
 * LESS - Leaner CSS v1.5.1
 * http://lesscss.org
 *
 * Copyright (c) 2009-2013, Alexis Sellier <self@cloudhead.net>
 * Licensed under the Apache v2 License.
 *
 * @licence
 */

!(function (a, b) {
  function c(b) {
    return a.less[b.split("/")[1]];
  }
  function d(a, b) {
    "development" == w.env &&
      "undefined" != typeof console &&
      w.logLevel >= b &&
      console.log("less: " + a);
  }
  function e(a) {
    return a
      .replace(/^[a-z-]+:\/+?[^\/]+/, "")
      .replace(/^\//, "")
      .replace(/\.[a-zA-Z]+$/, "")
      .replace(/[^\.\w-]+/g, "-")
      .replace(/\./g, ":");
  }
  function f(a, c) {
    var e = "{line} {content}",
      f = a.filename || c,
      g = [],
      h =
        (a.type || "Syntax") +
        "Error: " +
        (a.message || "There is an error in your .less file") +
        " in " +
        f +
        " ",
      i = function (a, c, d) {
        a.extract[c] !== b &&
          g.push(
            e
              .replace(/\{line\}/, (parseInt(a.line, 10) || 0) + (c - 1))
              .replace(/\{class\}/, d)
              .replace(/\{content\}/, a.extract[c])
          );
      };
    a.extract
      ? (i(a, 0, ""),
        i(a, 1, "line"),
        i(a, 2, ""),
        (h +=
          "on line " +
          a.line +
          ", column " +
          (a.column + 1) +
          ":\n" +
          g.join("\n")))
      : a.stack && (h += a.stack),
      d(h, z.errors);
  }
  function g(a, b, c) {
    var f = b.href || "",
      g = "less:" + (b.title || e(f)),
      h = document.getElementById(g),
      i = !1,
      j = document.createElement("style");
    if (
      (j.setAttribute("type", "text/css"),
      b.media && j.setAttribute("media", b.media),
      (j.id = g),
      j.styleSheet)
    )
      try {
        j.styleSheet.cssText = a;
      } catch (k) {
        throw new Error("Couldn't reassign styleSheet.cssText.");
      }
    else
      j.appendChild(document.createTextNode(a)),
        (i =
          null !== h &&
          h.childNodes.length > 0 &&
          j.childNodes.length > 0 &&
          h.firstChild.nodeValue === j.firstChild.nodeValue);
    var l = document.getElementsByTagName("head")[0];
    if (null === h || i === !1) {
      var m = (b && b.nextSibling) || null;
      m ? m.parentNode.insertBefore(j, m) : l.appendChild(j);
    }
    if ((h && i === !1 && h.parentNode.removeChild(h), c && D)) {
      d("saving " + f + " to cache.", z.info);
      try {
        D.setItem(f, a), D.setItem(f + ":timestamp", c);
      } catch (k) {
        d("failed to save", z.errors);
      }
    }
  }
  function h(a, c) {
    var d,
      f,
      h = "less-error-message:" + e(c || ""),
      i = '<li><label>{line}</label><pre class="{class}">{content}</pre></li>',
      j = document.createElement("div"),
      k = [],
      l = a.filename || c,
      m = l.match(/([^\/]+(\?.*)?)$/)[1];
    (j.id = h),
      (j.className = "less-error-message"),
      (f =
        "<h3>" +
        (a.type || "Syntax") +
        "Error: " +
        (a.message || "There is an error in your .less file") +
        '</h3><p>in <a href="' +
        l +
        '">' +
        m +
        "</a> ");
    var n = function (a, c, d) {
      a.extract[c] !== b &&
        k.push(
          i
            .replace(/\{line\}/, (parseInt(a.line, 10) || 0) + (c - 1))
            .replace(/\{class\}/, d)
            .replace(/\{content\}/, a.extract[c])
        );
    };
    a.extract
      ? (n(a, 0, ""),
        n(a, 1, "line"),
        n(a, 2, ""),
        (f +=
          "on line " +
          a.line +
          ", column " +
          (a.column + 1) +
          ":</p><ul>" +
          k.join("") +
          "</ul>"))
      : a.stack && (f += "<br/>" + a.stack.split("\n").slice(1).join("<br/>")),
      (j.innerHTML = f),
      g(
        [
          ".less-error-message ul, .less-error-message li {",
          "list-style-type: none;",
          "margin-right: 15px;",
          "padding: 4px 0;",
          "margin: 0;",
          "}",
          ".less-error-message label {",
          "font-size: 12px;",
          "margin-right: 15px;",
          "padding: 4px 0;",
          "color: #cc7777;",
          "}",
          ".less-error-message pre {",
          "color: #dd6666;",
          "padding: 4px 0;",
          "margin: 0;",
          "display: inline-block;",
          "}",
          ".less-error-message pre.line {",
          "color: #ff0000;",
          "}",
          ".less-error-message h3 {",
          "font-size: 20px;",
          "font-weight: bold;",
          "padding: 15px 0 5px 0;",
          "margin: 0;",
          "}",
          ".less-error-message a {",
          "color: #10a",
          "}",
          ".less-error-message .error {",
          "color: red;",
          "font-weight: bold;",
          "padding-bottom: 2px;",
          "border-bottom: 1px dashed red;",
          "}",
        ].join("\n"),
        { title: "error-message" }
      ),
      (j.style.cssText = [
        "font-family: Arial, sans-serif",
        "border: 1px solid #e00",
        "background-color: #eee",
        "border-radius: 5px",
        "-webkit-border-radius: 5px",
        "-moz-border-radius: 5px",
        "color: #e00",
        "padding: 15px",
        "margin-bottom: 15px",
      ].join(";")),
      "development" == w.env &&
        (d = setInterval(function () {
          document.body &&
            (document.getElementById(h)
              ? document.body.replaceChild(j, document.getElementById(h))
              : document.body.insertBefore(j, document.body.firstChild),
            clearInterval(d));
        }, 10));
  }
  function i(a, b) {
    w.errorReporting && "html" !== w.errorReporting
      ? "console" === w.errorReporting
        ? f(a, b)
        : "function" == typeof w.errorReporting && w.errorReporting("add", a, b)
      : h(a, b);
  }
  function j(a) {
    var b = document.getElementById("less-error-message:" + e(a));
    b && b.parentNode.removeChild(b);
  }
  function k() {}
  function l(a) {
    w.errorReporting && "html" !== w.errorReporting
      ? "console" === w.errorReporting
        ? k(a)
        : "function" == typeof w.errorReporting && w.errorReporting("remove", a)
      : j(a);
  }
  function m(a) {
    for (
      var b, c = document.getElementsByTagName("style"), d = 0;
      d < c.length;
      d++
    )
      if (((b = c[d]), b.type.match(C))) {
        var e = new w.tree.parseEnv(w),
          f = b.innerHTML || "";
        (e.filename = document.location.href.replace(/#.*$/, "")),
          (a || F) &&
            ((e.useFileCache = !0), (f = F + f), a && (f += "\n" + a));
        var g = (function (a) {
          return function (b, c) {
            if (b) return i(b, "inline");
            var d = c.toCSS(w);
            (a.type = "text/css"),
              a.styleSheet ? (a.styleSheet.cssText = d) : (a.innerHTML = d);
          };
        })(b);
        new w.Parser(e).parse(f, g);
      }
  }
  function n(a, b) {
    var c,
      d,
      e =
        /^((?:[a-z-]+:)?\/+?(?:[^\/\?#]*\/)|([\/\\]))?((?:[^\/\\\?#]*[\/\\])*)([^\/\\\?#]*)([#\?].*)?$/i,
      f = a.match(e),
      g = {},
      h = [];
    if (!f) throw new Error("Could not parse sheet href - '" + a + "'");
    if (!f[1] || f[2]) {
      if (((d = b.match(e)), !d))
        throw new Error("Could not parse page url - '" + b + "'");
      (f[1] = f[1] || d[1] || ""), f[2] || (f[3] = d[3] + f[3]);
    }
    if (f[3]) {
      for (h = f[3].replace(/\\/g, "/").split("/"), c = 0; c < h.length; c++)
        "." === h[c] && (h.splice(c, 1), (c -= 1));
      for (c = 0; c < h.length; c++)
        ".." === h[c] && c > 0 && (h.splice(c - 1, 2), (c -= 2));
    }
    return (
      (g.hostPart = f[1]),
      (g.directories = h),
      (g.path = f[1] + h.join("/")),
      (g.fileUrl = g.path + (f[4] || "")),
      (g.url = g.fileUrl + (f[5] || "")),
      g
    );
  }
  function o(a, b) {
    var c,
      d,
      e,
      f,
      g = n(a),
      h = n(b),
      i = "";
    if (g.hostPart !== h.hostPart) return "";
    for (
      d = Math.max(h.directories.length, g.directories.length), c = 0;
      d > c && h.directories[c] === g.directories[c];
      c++
    );
    for (
      f = h.directories.slice(c), e = g.directories.slice(c), c = 0;
      c < f.length - 1;
      c++
    )
      i += "../";
    for (c = 0; c < e.length - 1; c++) i += e[c] + "/";
    return i;
  }
  function p() {
    if (a.XMLHttpRequest) return new XMLHttpRequest();
    try {
      return new ActiveXObject("MSXML2.XMLHTTP.3.0");
    } catch (b) {
      return d("browser doesn't support AJAX.", z.errors), null;
    }
  }
  function q(a, b, c, e) {
    function f(b, c, d) {
      b.status >= 200 && b.status < 300
        ? c(b.responseText, b.getResponseHeader("Last-Modified"))
        : "function" == typeof d && d(b.status, a);
    }
    var g = p(),
      h = y ? w.fileAsync : w.async;
    "function" == typeof g.overrideMimeType && g.overrideMimeType("text/css"),
      d("XHR: Getting '" + a + "'", z.info),
      g.open("GET", a, h),
      g.setRequestHeader(
        "Accept",
        b || "text/x-less, text/css; q=0.9, */*; q=0.5"
      ),
      g.send(null),
      y && !w.fileAsync
        ? 0 === g.status || (g.status >= 200 && g.status < 300)
          ? c(g.responseText)
          : e(g.status, a)
        : h
        ? (g.onreadystatechange = function () {
            4 == g.readyState && f(g, c, e);
          })
        : f(g, c, e);
  }
  function r(b, c, d, e, f) {
    c &&
      c.currentDirectory &&
      !/^([a-z-]+:)?\//.test(b) &&
      (b = c.currentDirectory + b);
    var g = n(b, a.location.href),
      h = g.url,
      i = { currentDirectory: g.path, filename: h };
    if (
      (c
        ? ((i.entryPath = c.entryPath),
          (i.rootpath = c.rootpath),
          (i.rootFilename = c.rootFilename),
          (i.relativeUrls = c.relativeUrls))
        : ((i.entryPath = g.path),
          (i.rootpath = w.rootpath || g.path),
          (i.rootFilename = h),
          (i.relativeUrls = e.relativeUrls)),
      i.relativeUrls &&
        (i.rootpath = e.rootpath
          ? n(e.rootpath + o(g.path, i.entryPath)).path
          : g.path),
      e.useFileCache && E[h])
    )
      try {
        var j = E[h];
        f && (j += "\n" + f), d(null, j, h, i, { lastModified: new Date() });
      } catch (k) {
        d(k, null, h);
      }
    else
      q(
        h,
        e.mime,
        function (a, b) {
          (a = F + a), (E[h] = a);
          try {
            d(null, a, h, i, { lastModified: b });
          } catch (c) {
            d(c, null, h);
          }
        },
        function (a, b) {
          d(
            { type: "File", message: "'" + b + "' wasn't found (" + a + ")" },
            null,
            h
          );
        }
      );
  }
  function s(a, b, c, d, e) {
    var f = new w.tree.parseEnv(w);
    (f.mime = a.type),
      (e || F) && (f.useFileCache = !0),
      r(
        a.href,
        null,
        function (e, h, i, j, k) {
          if (k) {
            k.remaining = d;
            var m = D && D.getItem(i),
              n = D && D.getItem(i + ":timestamp");
            if (
              !c &&
              n &&
              k.lastModified &&
              new Date(k.lastModified).valueOf() === new Date(n).valueOf()
            )
              return g(m, a), (k.local = !0), b(null, null, h, a, k, i), void 0;
          }
          l(i),
            h
              ? ((f.currentFileInfo = j),
                new w.Parser(f).parse(h, function (c, d) {
                  if (c) return b(c, null, null, a);
                  try {
                    b(c, d, h, a, k, i);
                  } catch (c) {
                    b(c, null, null, a);
                  }
                }))
              : b(e, null, null, a, k, i);
        },
        f,
        e
      );
  }
  function t(a, b, c) {
    for (var d = 0; d < w.sheets.length; d++)
      s(w.sheets[d], a, b, w.sheets.length - (d + 1), c);
  }
  function u() {
    "development" === w.env
      ? ((w.optimization = 0),
        (w.watchTimer = setInterval(function () {
          w.watchMode &&
            t(function (a, b, c, d, e) {
              a ? i(a, d.href) : b && g(b.toCSS(w), d, e.lastModified);
            });
        }, w.poll)))
      : (w.optimization = 3);
  }
  function v(a) {
    var b = "";
    for (var c in a)
      b +=
        ("@" === c.slice(0, 1) ? "" : "@") +
        c +
        ": " +
        (";" === a[c].slice(-1) ? a[c] : a[c] + ";");
    return b;
  }
  ("undefined" == typeof a.less || "undefined" != typeof a.less.nodeType) &&
    (a.less = {}),
    (w = a.less),
    (x = a.less.tree = {}),
    (w.mode = "browser");
  var w, x;
  w === b && ((w = exports), (x = c("./tree")), (w.mode = "node")),
    (w.Parser = function (a) {
      function d() {
        (t = y[s]), (u = r), (z = r);
      }
      function e() {
        (y[s] = t), (r = u), (z = r);
      }
      function f() {
        r > z && ((y[s] = y[s].slice(r - z)), (z = r));
      }
      function g(a) {
        var b = a.charCodeAt(0);
        return 32 === b || 10 === b || 9 === b;
      }
      function h(a) {
        var b, c;
        if (a instanceof Function) return a.call(A.parsers);
        if ("string" == typeof a)
          (b = q.charAt(r) === a ? a : null), (c = 1), f();
        else {
          if ((f(), !(b = a.exec(y[s])))) return null;
          c = b[0].length;
        }
        return b
          ? (i(c), "string" == typeof b ? b : 1 === b.length ? b[0] : b)
          : void 0;
      }
      function i(a) {
        for (
          var b = r, c = s, d = r + y[s].length, e = (r += a);
          d > r && g(q.charAt(r));

        )
          r++;
        return (
          (y[s] = y[s].slice(a + (r - e))),
          (z = r),
          0 === y[s].length && s < y.length - 1 && s++,
          b !== r || c !== s
        );
      }
      function j(a, b) {
        var c = h(a);
        return c
          ? c
          : (k(
              b ||
                ("string" == typeof a
                  ? "expected '" + a + "' got '" + q.charAt(r) + "'"
                  : "unexpected token")
            ),
            void 0);
      }
      function k(a, b) {
        var c = new Error(a);
        throw ((c.index = r), (c.type = b || "Syntax"), c);
      }
      function l(a) {
        return "string" == typeof a ? q.charAt(r) === a : a.test(y[s]);
      }
      function m(a, b) {
        return a.filename &&
          b.currentFileInfo.filename &&
          a.filename !== b.currentFileInfo.filename
          ? A.imports.contents[a.filename]
          : q;
      }
      function n(a, b) {
        for (
          var c = a + 1, d = null, e = -1;
          --c >= 0 && "\n" !== b.charAt(c);

        )
          e++;
        return (
          "number" == typeof a &&
            (d = (b.slice(0, a).match(/\n/g) || "").length),
          { line: d, column: e }
        );
      }
      function o(a, b, d) {
        var e = d.currentFileInfo.filename;
        return (
          "browser" !== w.mode &&
            "rhino" !== w.mode &&
            (e = c("path").resolve(e)),
          { lineNumber: n(a, b).line + 1, fileName: e }
        );
      }
      function p(a, b) {
        var c = m(a, b),
          d = n(a.index, c),
          e = d.line,
          f = d.column,
          g = a.call && n(a.call, c).line,
          h = c.split("\n");
        (this.type = a.type || "Syntax"),
          (this.message = a.message),
          (this.filename = a.filename || b.currentFileInfo.filename),
          (this.index = a.index),
          (this.line = "number" == typeof e ? e + 1 : null),
          (this.callLine = g + 1),
          (this.callExtract = h[g]),
          (this.stack = a.stack),
          (this.column = f),
          (this.extract = [h[e - 1], h[e], h[e + 1]]);
      }
      var q,
        r,
        s,
        t,
        u,
        v,
        y,
        z,
        A,
        B = a && a.filename;
      a instanceof x.parseEnv || (a = new x.parseEnv(a));
      var C = (this.imports = {
        paths: a.paths || [],
        queue: [],
        files: a.files,
        contents: a.contents,
        mime: a.mime,
        error: null,
        push: function (b, c, d, e) {
          var f = this;
          this.queue.push(b);
          var g = function (a, c, d) {
            f.queue.splice(f.queue.indexOf(b), 1);
            var g = d in f.files || d === B;
            (f.files[d] = c), a && !f.error && (f.error = a), e(a, c, g, d);
          };
          w.Parser.importer
            ? w.Parser.importer(b, c, g, a)
            : w.Parser.fileLoader(
                b,
                c,
                function (b, e, f, h) {
                  if (b) return g(b), void 0;
                  var i = new x.parseEnv(a);
                  (i.currentFileInfo = h),
                    (i.processImports = !1),
                    (i.contents[f] = e),
                    (c.reference || d.reference) && (h.reference = !0),
                    d.inline
                      ? g(null, e, f)
                      : new w.Parser(i).parse(e, function (a, b) {
                          g(a, b, f);
                        });
                },
                a
              );
        },
      });
      return (
        (p.prototype = new Error()),
        (p.prototype.constructor = p),
        (this.env = a = a || {}),
        (this.optimization =
          "optimization" in this.env ? this.env.optimization : 1),
        (A = {
          imports: C,
          parse: function (b, d) {
            var e,
              f,
              g,
              i = null;
            if (
              ((r = s = z = v = 0),
              (q = b.replace(/\r\n/g, "\n")),
              (q = q.replace(/^\uFEFF/, "")),
              (A.imports.contents[a.currentFileInfo.filename] = q),
              (y = (function (b) {
                for (
                  var c,
                    d,
                    e,
                    f,
                    g = 0,
                    h = /(?:@\{[\w-]+\}|[^"'`\{\}\/\(\)\\])+/g,
                    j = /\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g,
                    k =
                      /"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'|`((?:[^`]|\\.)*)`/g,
                    l = 0,
                    m = b[0],
                    n = 0;
                  n < q.length;

                )
                  if (
                    ((h.lastIndex = n),
                    (c = h.exec(q)) &&
                      c.index === n &&
                      ((n += c[0].length), m.push(c[0])),
                    (e = q.charAt(n)),
                    (j.lastIndex = k.lastIndex = n),
                    (c = k.exec(q)) && c.index === n)
                  )
                    (n += c[0].length), m.push(c[0]);
                  else if (
                    d ||
                    "/" !== e ||
                    ((f = q.charAt(n + 1)),
                    ("/" !== f && "*" !== f) ||
                      !(c = j.exec(q)) ||
                      c.index !== n)
                  ) {
                    switch (e) {
                      case "{":
                        if (!d) {
                          l++, m.push(e);
                          break;
                        }
                      case "}":
                        if (!d) {
                          l--, m.push(e), (b[++g] = m = []);
                          break;
                        }
                      case "(":
                        if (!d) {
                          (d = !0), m.push(e);
                          break;
                        }
                      case ")":
                        if (d) {
                          (d = !1), m.push(e);
                          break;
                        }
                      default:
                        m.push(e);
                    }
                    n++;
                  } else (n += c[0].length), m.push(c[0]);
                return (
                  0 !== l &&
                    (i = new p(
                      {
                        index: n - 1,
                        type: "Parse",
                        message:
                          l > 0 ? "missing closing `}`" : "missing opening `{`",
                        filename: a.currentFileInfo.filename,
                      },
                      a
                    )),
                  b.map(function (a) {
                    return a.join("");
                  })
                );
              })([[]])),
              i)
            )
              return d(new p(i, a));
            try {
              (e = new x.Ruleset([], h(this.parsers.primary))),
                (e.root = !0),
                (e.firstRoot = !0);
            } catch (j) {
              return d(new p(j, a));
            }
            if (
              ((e.toCSS = (function (b) {
                return function (d, e) {
                  d = d || {};
                  var f,
                    g,
                    h = new x.evalEnv(d);
                  "object" != typeof e ||
                    Array.isArray(e) ||
                    ((e = Object.keys(e).map(function (a) {
                      var b = e[a];
                      return (
                        b instanceof x.Value ||
                          (b instanceof x.Expression ||
                            (b = new x.Expression([b])),
                          (b = new x.Value([b]))),
                        new x.Rule("@" + a, b, !1, null, 0)
                      );
                    })),
                    (h.frames = [new x.Ruleset(null, e)]));
                  try {
                    (f = b.call(this, h)),
                      new x.joinSelectorVisitor().run(f),
                      new x.processExtendsVisitor().run(f),
                      new x.toCSSVisitor({ compress: Boolean(d.compress) }).run(
                        f
                      ),
                      d.sourceMap &&
                        (f = new x.sourceMapOutput({
                          writeSourceMap: d.writeSourceMap,
                          rootNode: f,
                          contentsMap: A.imports.contents,
                          sourceMapFilename: d.sourceMapFilename,
                          sourceMapURL: d.sourceMapURL,
                          outputFilename: d.sourceMapOutputFilename,
                          sourceMapBasepath: d.sourceMapBasepath,
                          sourceMapRootpath: d.sourceMapRootpath,
                          outputSourceFiles: d.outputSourceFiles,
                          sourceMapGenerator: d.sourceMapGenerator,
                        })),
                      (g = f.toCSS({
                        compress: Boolean(d.compress),
                        dumpLineNumbers: a.dumpLineNumbers,
                        strictUnits: Boolean(d.strictUnits),
                      }));
                  } catch (i) {
                    throw new p(i, a);
                  }
                  if (d.cleancss && "node" === w.mode) {
                    var j = c("clean-css");
                    return new j({
                      keepSpecialComments: "*",
                      processImport: !1,
                      noRebase: !0,
                      noAdvanced: !0,
                    }).minify(g);
                  }
                  return d.compress ? g.replace(/(^(\s)+)|((\s)+$)/g, "") : g;
                };
              })(e.eval)),
              r < q.length - 1)
            ) {
              r = v;
              var k = n(r, q);
              (g = q.split("\n")),
                (f = k.line + 1),
                (i = {
                  type: "Parse",
                  message: "Unrecognised input",
                  index: r,
                  filename: a.currentFileInfo.filename,
                  line: f,
                  column: k.column,
                  extract: [g[f - 2], g[f - 1], g[f]],
                });
            }
            var l = function (b) {
              return (
                (b = i || b || A.imports.error),
                b ? (b instanceof p || (b = new p(b, a)), d(b)) : d(null, e)
              );
            };
            return a.processImports === !1
              ? l()
              : (new x.importVisitor(this.imports, l).run(e), void 0);
          },
          parsers: {
            primary: function () {
              for (
                var a, b = [];
                (a =
                  h(this.extendRule) ||
                  h(this.mixin.definition) ||
                  h(this.rule) ||
                  h(this.ruleset) ||
                  h(this.mixin.call) ||
                  h(this.comment) ||
                  h(this.directive)) ||
                h(/^[\s\n]+/) ||
                h(/^;+/);

              )
                a && b.push(a);
              return b;
            },
            comment: function () {
              var b;
              if ("/" === q.charAt(r))
                return "/" === q.charAt(r + 1)
                  ? new x.Comment(h(/^\/\/.*/), !0, r, a.currentFileInfo)
                  : (b = h(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/))
                  ? new x.Comment(b, !1, r, a.currentFileInfo)
                  : void 0;
            },
            comments: function () {
              for (var a, b = []; (a = h(this.comment)); ) b.push(a);
              return b;
            },
            entities: {
              quoted: function () {
                var b,
                  c,
                  d = r,
                  e = r;
                return (
                  "~" === q.charAt(d) && (d++, (c = !0)),
                  '"' === q.charAt(d) || "'" === q.charAt(d)
                    ? (c && h("~"),
                      (b = h(
                        /^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/
                      ))
                        ? new x.Quoted(
                            b[0],
                            b[1] || b[2],
                            c,
                            e,
                            a.currentFileInfo
                          )
                        : void 0)
                    : void 0
                );
              },
              keyword: function () {
                var a;
                if ((a = h(/^[_A-Za-z-][_A-Za-z0-9-]*/))) {
                  var b = x.Color.fromKeyword(a);
                  return b ? b : new x.Keyword(a);
                }
              },
              call: function () {
                var b,
                  c,
                  d,
                  e,
                  f = r;
                if ((b = /^([\w-]+|%|progid:[\w\.]+)\(/.exec(y[s]))) {
                  if (((b = b[1]), (c = b.toLowerCase()), "url" === c))
                    return null;
                  if (
                    ((r += b.length),
                    "alpha" === c &&
                      ((e = h(this.alpha)), "undefined" != typeof e))
                  )
                    return e;
                  if ((h("("), (d = h(this.entities.arguments)), h(")")))
                    return b ? new x.Call(b, d, f, a.currentFileInfo) : void 0;
                }
              },
              arguments: function () {
                for (
                  var a, b = [];
                  (a = h(this.entities.assignment) || h(this.expression)) &&
                  (b.push(a), h(","));

                );
                return b;
              },
              literal: function () {
                return (
                  h(this.entities.dimension) ||
                  h(this.entities.color) ||
                  h(this.entities.quoted) ||
                  h(this.entities.unicodeDescriptor)
                );
              },
              assignment: function () {
                var a, b;
                return (a = h(/^\w+(?=\s?=)/i)) &&
                  h("=") &&
                  (b = h(this.entity))
                  ? new x.Assignment(a, b)
                  : void 0;
              },
              url: function () {
                var b;
                if ("u" === q.charAt(r) && h(/^url\(/))
                  return (
                    (b =
                      h(this.entities.quoted) ||
                      h(this.entities.variable) ||
                      h(/^(?:(?:\\[\(\)'"])|[^\(\)'"])+/) ||
                      ""),
                    j(")"),
                    new x.URL(
                      null != b.value || b instanceof x.Variable
                        ? b
                        : new x.Anonymous(b),
                      a.currentFileInfo
                    )
                  );
              },
              variable: function () {
                var b,
                  c = r;
                return "@" === q.charAt(r) && (b = h(/^@@?[\w-]+/))
                  ? new x.Variable(b, c, a.currentFileInfo)
                  : void 0;
              },
              variableCurly: function () {
                var b,
                  c = r;
                return "@" === q.charAt(r) && (b = h(/^@\{([\w-]+)\}/))
                  ? new x.Variable("@" + b[1], c, a.currentFileInfo)
                  : void 0;
              },
              color: function () {
                var a;
                return "#" === q.charAt(r) &&
                  (a = h(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/))
                  ? new x.Color(a[1])
                  : void 0;
              },
              dimension: function () {
                var a,
                  b = q.charCodeAt(r);
                if (!(b > 57 || 43 > b || 47 === b || 44 == b))
                  return (a = h(/^([+-]?\d*\.?\d+)(%|[a-z]+)?/))
                    ? new x.Dimension(a[1], a[2])
                    : void 0;
              },
              unicodeDescriptor: function () {
                var a;
                return (a = h(/^U\+[0-9a-fA-F?]+(\-[0-9a-fA-F?]+)?/))
                  ? new x.UnicodeDescriptor(a[0])
                  : void 0;
              },
              javascript: function () {
                var c,
                  d,
                  e = r;
                return (
                  "~" === q.charAt(e) && (e++, (d = !0)),
                  "`" === q.charAt(e)
                    ? (a.javascriptEnabled === b ||
                        a.javascriptEnabled ||
                        k("You are using JavaScript, which has been disabled."),
                      d && h("~"),
                      (c = h(/^`([^`]*)`/))
                        ? new x.JavaScript(c[1], r, d)
                        : void 0)
                    : void 0
                );
              },
            },
            variable: function () {
              var a;
              return "@" === q.charAt(r) && (a = h(/^(@[\w-]+)\s*:/))
                ? a[1]
                : void 0;
            },
            extend: function (a) {
              var b,
                c,
                d,
                e = r,
                f = [];
              if (h(a ? /^&:extend\(/ : /^:extend\(/)) {
                do {
                  for (d = null, b = []; ; ) {
                    if ((d = h(/^(all)(?=\s*(\)|,))/))) break;
                    if (((c = h(this.element)), !c)) break;
                    b.push(c);
                  }
                  (d = d && d[1]),
                    f.push(new x.Extend(new x.Selector(b), d, e));
                } while (h(","));
                return j(/^\)/), a && j(/^;/), f;
              }
            },
            extendRule: function () {
              return this.extend(!0);
            },
            mixin: {
              call: function () {
                var b,
                  c,
                  f,
                  g = [],
                  i = r,
                  k = q.charAt(r),
                  m = !1;
                if ("." === k || "#" === k) {
                  for (
                    d();
                    (b = h(
                      /^[#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/
                    ));

                  )
                    g.push(new x.Element(c, b, r, a.currentFileInfo)),
                      (c = h(">"));
                  return (
                    h("(") &&
                      ((f = this.mixin.args.call(this, !0).args), j(")")),
                    (f = f || []),
                    h(this.important) && (m = !0),
                    g.length > 0 && (h(";") || l("}"))
                      ? new x.mixin.Call(g, f, i, a.currentFileInfo, m)
                      : (e(), void 0)
                  );
                }
              },
              args: function (a) {
                for (
                  var b,
                    c,
                    d,
                    e,
                    f,
                    g,
                    i = [],
                    l = [],
                    m = [],
                    n = { args: null, variadic: !1 };
                  ;

                ) {
                  if (a) g = h(this.expression);
                  else {
                    if (
                      (h(this.comments), "." === q.charAt(r) && h(/^\.{3}/))
                    ) {
                      (n.variadic = !0),
                        h(";") && !b && (b = !0),
                        (b ? l : m).push({ variadic: !0 });
                      break;
                    }
                    g =
                      h(this.entities.variable) ||
                      h(this.entities.literal) ||
                      h(this.entities.keyword);
                  }
                  if (!g) break;
                  (e = null),
                    g.throwAwayComments && g.throwAwayComments(),
                    (f = g);
                  var o = null;
                  if (
                    (a ? 1 == g.value.length && (o = g.value[0]) : (o = g),
                    o && o instanceof x.Variable)
                  )
                    if (h(":"))
                      i.length > 0 &&
                        (b && k("Cannot mix ; and , as delimiter types"),
                        (c = !0)),
                        (f = j(this.expression)),
                        (e = d = o.name);
                    else {
                      if (!a && h(/^\.{3}/)) {
                        (n.variadic = !0),
                          h(";") && !b && (b = !0),
                          (b ? l : m).push({ name: g.name, variadic: !0 });
                        break;
                      }
                      a || ((d = e = o.name), (f = null));
                    }
                  f && i.push(f),
                    m.push({ name: e, value: f }),
                    h(",") ||
                      ((h(";") || b) &&
                        (c && k("Cannot mix ; and , as delimiter types"),
                        (b = !0),
                        i.length > 1 && (f = new x.Value(i)),
                        l.push({ name: d, value: f }),
                        (d = null),
                        (i = []),
                        (c = !1)));
                }
                return (n.args = b ? l : m), n;
              },
              definition: function () {
                var a,
                  b,
                  c,
                  f,
                  g = [],
                  i = !1;
                if (
                  !(
                    ("." !== q.charAt(r) && "#" !== q.charAt(r)) ||
                    l(/^[^{]*\}/)
                  ) &&
                  (d(),
                  (b = h(
                    /^([#.](?:[\w-]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+)\s*\(/
                  )))
                ) {
                  a = b[1];
                  var k = this.mixin.args.call(this, !1);
                  if (
                    ((g = k.args),
                    (i = k.variadic),
                    h(")") || ((v = r), e()),
                    h(this.comments),
                    h(/^when/) &&
                      (f = j(this.conditions, "expected condition")),
                    (c = h(this.block)))
                  )
                    return new x.mixin.Definition(a, g, c, f, i);
                  e();
                }
              },
            },
            entity: function () {
              return (
                h(this.entities.literal) ||
                h(this.entities.variable) ||
                h(this.entities.url) ||
                h(this.entities.call) ||
                h(this.entities.keyword) ||
                h(this.entities.javascript) ||
                h(this.comment)
              );
            },
            end: function () {
              return h(";") || l("}");
            },
            alpha: function () {
              var a;
              if (h(/^\(opacity=/i))
                return (a = h(/^\d+/) || h(this.entities.variable))
                  ? (j(")"), new x.Alpha(a))
                  : void 0;
            },
            element: function () {
              var b, c, d;
              return (
                (c = h(this.combinator)),
                (b =
                  h(/^(?:\d+\.\d+|\d+)%/) ||
                  h(
                    /^(?:[.#]?|:*)(?:[\w-]|[^\x00-\x9f]|\\(?:[A-Fa-f0-9]{1,6} ?|[^A-Fa-f0-9]))+/
                  ) ||
                  h("*") ||
                  h("&") ||
                  h(this.attribute) ||
                  h(/^\([^()@]+\)/) ||
                  h(/^[\.#](?=@)/) ||
                  h(this.entities.variableCurly)),
                b ||
                  (h("(") &&
                    (d = h(this.selector)) &&
                    h(")") &&
                    (b = new x.Paren(d))),
                b ? new x.Element(c, b, r, a.currentFileInfo) : void 0
              );
            },
            combinator: function () {
              var a = q.charAt(r);
              if (">" === a || "+" === a || "~" === a || "|" === a) {
                for (r++; q.charAt(r).match(/\s/); ) r++;
                return new x.Combinator(a);
              }
              return q.charAt(r - 1).match(/\s/)
                ? new x.Combinator(" ")
                : new x.Combinator(null);
            },
            lessSelector: function () {
              return this.selector(!0);
            },
            selector: function (b) {
              for (
                var c, d, e, f, g, i = [], l = [];
                ((b && (e = h(this.extend))) ||
                  (b && (f = h(/^when/))) ||
                  (c = h(this.element))) &&
                (f
                  ? (g = j(this.conditions, "expected condition"))
                  : g
                  ? k("CSS guard can only be used at the end of selector")
                  : e
                  ? l.push.apply(l, e)
                  : (l.length &&
                      k("Extend can only be used at the end of selector"),
                    (d = q.charAt(r)),
                    i.push(c),
                    (c = null)),
                "{" !== d && "}" !== d && ";" !== d && "," !== d && ")" !== d);

              );
              return i.length > 0
                ? new x.Selector(i, l, g, r, a.currentFileInfo)
                : (l.length &&
                    k(
                      "Extend must be used to extend a selector, it cannot be used on its own"
                    ),
                  void 0);
            },
            attribute: function () {
              var a, b, c;
              if (h("["))
                return (
                  (a = h(this.entities.variableCurly)) ||
                    (a = j(/^(?:[_A-Za-z0-9-\*]*\|)?(?:[_A-Za-z0-9-]|\\.)+/)),
                  (c = h(/^[|~*$^]?=/)) &&
                    (b =
                      h(this.entities.quoted) ||
                      h(/^[0-9]+%/) ||
                      h(/^[\w-]+/) ||
                      h(this.entities.variableCurly)),
                  j("]"),
                  new x.Attribute(a, c, b)
                );
            },
            block: function () {
              var a;
              return h("{") && (a = h(this.primary)) && h("}") ? a : void 0;
            },
            ruleset: function () {
              var b,
                c,
                f,
                g = [];
              for (
                d(), a.dumpLineNumbers && (f = o(r, q, a));
                (b = h(this.lessSelector)) &&
                (g.push(b), h(this.comments), h(","));

              )
                b.condition &&
                  k("Guards are only currently allowed on a single selector."),
                  h(this.comments);
              if (g.length > 0 && (c = h(this.block))) {
                var i = new x.Ruleset(g, c, a.strictImports);
                return a.dumpLineNumbers && (i.debugInfo = f), i;
              }
              (v = r), e();
            },
            rule: function (b) {
              var c,
                f,
                g,
                i = q.charAt(r),
                j = !1;
              if (
                (d(),
                "." !== i &&
                  "#" !== i &&
                  "&" !== i &&
                  (c = h(this.variable) || h(this.ruleProperty)))
              ) {
                if (
                  ((f =
                    b || (!a.compress && "@" !== c.charAt(0))
                      ? h(this.anonymousValue) || h(this.value)
                      : h(this.value) || h(this.anonymousValue)),
                  (g = h(this.important)),
                  "+" === c[c.length - 1] &&
                    ((j = !0), (c = c.substr(0, c.length - 1))),
                  f && h(this.end))
                )
                  return new x.Rule(c, f, g, j, u, a.currentFileInfo);
                if (((v = r), e(), f && !b)) return this.rule(!0);
              }
            },
            anonymousValue: function () {
              var a;
              return (a = /^([^@+\/'"*`(;{}-]*);/.exec(y[s]))
                ? ((r += a[0].length - 1), new x.Anonymous(a[1]))
                : void 0;
            },
            import: function () {
              var b,
                c,
                f = r;
              d();
              var g = h(/^@import?\s+/),
                i = (g ? h(this.importOptions) : null) || {};
              return g &&
                (b = h(this.entities.quoted) || h(this.entities.url)) &&
                ((c = h(this.mediaFeatures)), h(";"))
                ? ((c = c && new x.Value(c)),
                  new x.Import(b, c, i, f, a.currentFileInfo))
                : (e(), void 0);
            },
            importOptions: function () {
              var a,
                b,
                c,
                d = {};
              if (!h("(")) return null;
              do
                if ((a = h(this.importOption))) {
                  switch (((b = a), (c = !0), b)) {
                    case "css":
                      (b = "less"), (c = !1);
                      break;
                    case "once":
                      (b = "multiple"), (c = !1);
                  }
                  if (((d[b] = c), !h(","))) break;
                }
              while (a);
              return j(")"), d;
            },
            importOption: function () {
              var a = h(/^(less|css|multiple|once|inline|reference)/);
              return a ? a[1] : void 0;
            },
            mediaFeature: function () {
              var b,
                c,
                d = [];
              do
                if ((b = h(this.entities.keyword) || h(this.entities.variable)))
                  d.push(b);
                else if (h("(")) {
                  if (((c = h(this.property)), (b = h(this.value)), !h(")")))
                    return null;
                  if (c && b)
                    d.push(
                      new x.Paren(
                        new x.Rule(c, b, null, null, r, a.currentFileInfo, !0)
                      )
                    );
                  else {
                    if (!b) return null;
                    d.push(new x.Paren(b));
                  }
                }
              while (b);
              return d.length > 0 ? new x.Expression(d) : void 0;
            },
            mediaFeatures: function () {
              var a,
                b = [];
              do
                if ((a = h(this.mediaFeature))) {
                  if ((b.push(a), !h(","))) break;
                } else if (
                  (a = h(this.entities.variable)) &&
                  (b.push(a), !h(","))
                )
                  break;
              while (a);
              return b.length > 0 ? b : null;
            },
            media: function () {
              var b, c, d, e;
              return (
                a.dumpLineNumbers && (e = o(r, q, a)),
                h(/^@media/) &&
                ((b = h(this.mediaFeatures)), (c = h(this.block)))
                  ? ((d = new x.Media(c, b, r, a.currentFileInfo)),
                    a.dumpLineNumbers && (d.debugInfo = e),
                    d)
                  : void 0
              );
            },
            directive: function () {
              var b, c, f, g, i, j, k, l;
              if ("@" === q.charAt(r)) {
                if ((c = h(this["import"]) || h(this.media))) return c;
                if ((d(), (b = h(/^@[a-z-]+/)))) {
                  switch (
                    ((g = b),
                    "-" == b.charAt(1) &&
                      b.indexOf("-", 2) > 0 &&
                      (g = "@" + b.slice(b.indexOf("-", 2) + 1)),
                    g)
                  ) {
                    case "@font-face":
                      i = !0;
                      break;
                    case "@viewport":
                    case "@top-left":
                    case "@top-left-corner":
                    case "@top-center":
                    case "@top-right":
                    case "@top-right-corner":
                    case "@bottom-left":
                    case "@bottom-left-corner":
                    case "@bottom-center":
                    case "@bottom-right":
                    case "@bottom-right-corner":
                    case "@left-top":
                    case "@left-middle":
                    case "@left-bottom":
                    case "@right-top":
                    case "@right-middle":
                    case "@right-bottom":
                      i = !0;
                      break;
                    case "@host":
                    case "@page":
                    case "@document":
                    case "@supports":
                    case "@keyframes":
                      (i = !0), (j = !0);
                      break;
                    case "@namespace":
                      k = !0;
                  }
                  if (
                    (j &&
                      ((l = (h(/^[^{]+/) || "").trim()), l && (b += " " + l)),
                    i)
                  ) {
                    if ((f = h(this.block)))
                      return new x.Directive(b, f, r, a.currentFileInfo);
                  } else if (
                    (c = k ? h(this.expression) : h(this.entity)) &&
                    h(";")
                  ) {
                    var m = new x.Directive(b, c, r, a.currentFileInfo);
                    return a.dumpLineNumbers && (m.debugInfo = o(r, q, a)), m;
                  }
                  e();
                }
              }
            },
            value: function () {
              for (
                var a, b = [];
                (a = h(this.expression)) && (b.push(a), h(","));

              );
              return b.length > 0 ? new x.Value(b) : void 0;
            },
            important: function () {
              return "!" === q.charAt(r) ? h(/^! *important/) : void 0;
            },
            sub: function () {
              var a, b;
              return h("(") && (a = h(this.addition))
                ? ((b = new x.Expression([a])), j(")"), (b.parens = !0), b)
                : void 0;
            },
            multiplication: function () {
              var a, b, c, d, e;
              if ((a = h(this.operand))) {
                for (
                  e = g(q.charAt(r - 1));
                  !l(/^\/[*\/]/) &&
                  (c = h("/") || h("*")) &&
                  (b = h(this.operand));

                )
                  (a.parensInOp = !0),
                    (b.parensInOp = !0),
                    (d = new x.Operation(c, [d || a, b], e)),
                    (e = g(q.charAt(r - 1)));
                return d || a;
              }
            },
            addition: function () {
              var a, b, c, d, e;
              if ((a = h(this.multiplication))) {
                for (
                  e = g(q.charAt(r - 1));
                  (c = h(/^[-+]\s+/) || (!e && (h("+") || h("-")))) &&
                  (b = h(this.multiplication));

                )
                  (a.parensInOp = !0),
                    (b.parensInOp = !0),
                    (d = new x.Operation(c, [d || a, b], e)),
                    (e = g(q.charAt(r - 1)));
                return d || a;
              }
            },
            conditions: function () {
              var a,
                b,
                c,
                d = r;
              if ((a = h(this.condition))) {
                for (
                  ;
                  l(/^,\s*(not\s*)?\(/) && h(",") && (b = h(this.condition));

                )
                  c = new x.Condition("or", c || a, b, d);
                return c || a;
              }
            },
            condition: function () {
              var a,
                b,
                c,
                d,
                e = r,
                f = !1;
              return (
                h(/^not/) && (f = !0),
                j("("),
                (a =
                  h(this.addition) ||
                  h(this.entities.keyword) ||
                  h(this.entities.quoted))
                  ? ((d = h(/^(?:>=|<=|=<|[<=>])/))
                      ? (b =
                          h(this.addition) ||
                          h(this.entities.keyword) ||
                          h(this.entities.quoted))
                        ? (c = new x.Condition(d, a, b, e, f))
                        : k("expected expression")
                      : (c = new x.Condition(
                          "=",
                          a,
                          new x.Keyword("true"),
                          e,
                          f
                        )),
                    j(")"),
                    h(/^and/)
                      ? new x.Condition("and", c, h(this.condition))
                      : c)
                  : void 0
              );
            },
            operand: function () {
              var a,
                b = q.charAt(r + 1);
              "-" !== q.charAt(r) || ("@" !== b && "(" !== b) || (a = h("-"));
              var c =
                h(this.sub) ||
                h(this.entities.dimension) ||
                h(this.entities.color) ||
                h(this.entities.variable) ||
                h(this.entities.call);
              return a && ((c.parensInOp = !0), (c = new x.Negative(c))), c;
            },
            expression: function () {
              for (var a, b, c = []; (a = h(this.addition) || h(this.entity)); )
                c.push(a),
                  !l(/^\/[\/*]/) && (b = h("/")) && c.push(new x.Anonymous(b));
              return c.length > 0 ? new x.Expression(c) : void 0;
            },
            property: function () {
              var a;
              return (a = h(/^(\*?-?[_a-zA-Z0-9-]+)\s*:/)) ? a[1] : void 0;
            },
            ruleProperty: function () {
              var a;
              return (a = h(/^(\*?-?[_a-zA-Z0-9-]+)\s*(\+?)\s*:/))
                ? a[1] + (a[2] || "")
                : void 0;
            },
          },
        })
      );
    }),
    (function (d) {
      function e(a) {
        return d.functions.hsla(a.h, a.s, a.l, a.a);
      }
      function f(a, b) {
        return a instanceof d.Dimension && a.unit.is("%")
          ? parseFloat((a.value * b) / 100)
          : g(a);
      }
      function g(a) {
        if (a instanceof d.Dimension)
          return parseFloat(a.unit.is("%") ? a.value / 100 : a.value);
        if ("number" == typeof a) return a;
        throw {
          error: "RuntimeError",
          message: "color functions take numbers as parameters",
        };
      }
      function h(a) {
        return Math.min(1, Math.max(0, a));
      }
      (d.functions = {
        rgb: function (a, b, c) {
          return this.rgba(a, b, c, 1);
        },
        rgba: function (a, b, c, e) {
          var h = [a, b, c].map(function (a) {
            return f(a, 256);
          });
          return (e = g(e)), new d.Color(h, e);
        },
        hsl: function (a, b, c) {
          return this.hsla(a, b, c, 1);
        },
        hsla: function (a, b, c, d) {
          function e(a) {
            return (
              (a = 0 > a ? a + 1 : a > 1 ? a - 1 : a),
              1 > 6 * a
                ? i + (f - i) * a * 6
                : 1 > 2 * a
                ? f
                : 2 > 3 * a
                ? i + (f - i) * (2 / 3 - a) * 6
                : i
            );
          }
          (a = (g(a) % 360) / 360), (b = h(g(b))), (c = h(g(c))), (d = h(g(d)));
          var f = 0.5 >= c ? c * (b + 1) : c + b - c * b,
            i = 2 * c - f;
          return this.rgba(
            255 * e(a + 1 / 3),
            255 * e(a),
            255 * e(a - 1 / 3),
            d
          );
        },
        hsv: function (a, b, c) {
          return this.hsva(a, b, c, 1);
        },
        hsva: function (a, b, c, d) {
          (a = ((g(a) % 360) / 360) * 360), (b = g(b)), (c = g(c)), (d = g(d));
          var e, f;
          (e = Math.floor((a / 60) % 6)), (f = a / 60 - e);
          var h = [c, c * (1 - b), c * (1 - f * b), c * (1 - (1 - f) * b)],
            i = [
              [0, 3, 1],
              [2, 0, 1],
              [1, 0, 3],
              [1, 2, 0],
              [3, 1, 0],
              [0, 1, 2],
            ];
          return this.rgba(
            255 * h[i[e][0]],
            255 * h[i[e][1]],
            255 * h[i[e][2]],
            d
          );
        },
        hue: function (a) {
          return new d.Dimension(Math.round(a.toHSL().h));
        },
        saturation: function (a) {
          return new d.Dimension(Math.round(100 * a.toHSL().s), "%");
        },
        lightness: function (a) {
          return new d.Dimension(Math.round(100 * a.toHSL().l), "%");
        },
        hsvhue: function (a) {
          return new d.Dimension(Math.round(a.toHSV().h));
        },
        hsvsaturation: function (a) {
          return new d.Dimension(Math.round(100 * a.toHSV().s), "%");
        },
        hsvvalue: function (a) {
          return new d.Dimension(Math.round(100 * a.toHSV().v), "%");
        },
        red: function (a) {
          return new d.Dimension(a.rgb[0]);
        },
        green: function (a) {
          return new d.Dimension(a.rgb[1]);
        },
        blue: function (a) {
          return new d.Dimension(a.rgb[2]);
        },
        alpha: function (a) {
          return new d.Dimension(a.toHSL().a);
        },
        luma: function (a) {
          return new d.Dimension(Math.round(a.luma() * a.alpha * 100), "%");
        },
        saturate: function (a, b) {
          if (!a.rgb) return null;
          var c = a.toHSL();
          return (c.s += b.value / 100), (c.s = h(c.s)), e(c);
        },
        desaturate: function (a, b) {
          var c = a.toHSL();
          return (c.s -= b.value / 100), (c.s = h(c.s)), e(c);
        },
        lighten: function (a, b) {
          var c = a.toHSL();
          return (c.l += b.value / 100), (c.l = h(c.l)), e(c);
        },
        darken: function (a, b) {
          var c = a.toHSL();
          return (c.l -= b.value / 100), (c.l = h(c.l)), e(c);
        },
        fadein: function (a, b) {
          var c = a.toHSL();
          return (c.a += b.value / 100), (c.a = h(c.a)), e(c);
        },
        fadeout: function (a, b) {
          var c = a.toHSL();
          return (c.a -= b.value / 100), (c.a = h(c.a)), e(c);
        },
        fade: function (a, b) {
          var c = a.toHSL();
          return (c.a = b.value / 100), (c.a = h(c.a)), e(c);
        },
        spin: function (a, b) {
          var c = a.toHSL(),
            d = (c.h + b.value) % 360;
          return (c.h = 0 > d ? 360 + d : d), e(c);
        },
        mix: function (a, b, c) {
          c || (c = new d.Dimension(50));
          var e = c.value / 100,
            f = 2 * e - 1,
            g = a.toHSL().a - b.toHSL().a,
            h = ((f * g == -1 ? f : (f + g) / (1 + f * g)) + 1) / 2,
            i = 1 - h,
            j = [
              a.rgb[0] * h + b.rgb[0] * i,
              a.rgb[1] * h + b.rgb[1] * i,
              a.rgb[2] * h + b.rgb[2] * i,
            ],
            k = a.alpha * e + b.alpha * (1 - e);
          return new d.Color(j, k);
        },
        greyscale: function (a) {
          return this.desaturate(a, new d.Dimension(100));
        },
        contrast: function (a, b, c, d) {
          if (!a.rgb) return null;
          if (
            ("undefined" == typeof c && (c = this.rgba(255, 255, 255, 1)),
            "undefined" == typeof b && (b = this.rgba(0, 0, 0, 1)),
            b.luma() > c.luma())
          ) {
            var e = c;
            (c = b), (b = e);
          }
          return (
            (d = "undefined" == typeof d ? 0.43 : g(d)),
            a.luma() * a.alpha < d ? c : b
          );
        },
        e: function (a) {
          return new d.Anonymous(a instanceof d.JavaScript ? a.evaluated : a);
        },
        escape: function (a) {
          return new d.Anonymous(
            encodeURI(a.value)
              .replace(/=/g, "%3D")
              .replace(/:/g, "%3A")
              .replace(/#/g, "%23")
              .replace(/;/g, "%3B")
              .replace(/\(/g, "%28")
              .replace(/\)/g, "%29")
          );
        },
        "%": function (a) {
          for (
            var b = Array.prototype.slice.call(arguments, 1),
              c = a.value,
              e = 0;
            e < b.length;
            e++
          )
            c = c.replace(/%[sda]/i, function (a) {
              var c = a.match(/s/i) ? b[e].value : b[e].toCSS();
              return a.match(/[A-Z]$/) ? encodeURIComponent(c) : c;
            });
          return (c = c.replace(/%%/g, "%")), new d.Quoted('"' + c + '"', c);
        },
        unit: function (a, b) {
          if (!(a instanceof d.Dimension))
            throw {
              type: "Argument",
              message:
                "the first argument to unit must be a number" +
                (a instanceof d.Operation
                  ? ". Have you forgotten parenthesis?"
                  : ""),
            };
          return new d.Dimension(a.value, b ? b.toCSS() : "");
        },
        convert: function (a, b) {
          return a.convertTo(b.value);
        },
        round: function (a, b) {
          var c = "undefined" == typeof b ? 0 : b.value;
          return this._math(
            function (a) {
              return a.toFixed(c);
            },
            null,
            a
          );
        },
        pi: function () {
          return new d.Dimension(Math.PI);
        },
        mod: function (a, b) {
          return new d.Dimension(a.value % b.value, a.unit);
        },
        pow: function (a, b) {
          if ("number" == typeof a && "number" == typeof b)
            (a = new d.Dimension(a)), (b = new d.Dimension(b));
          else if (!(a instanceof d.Dimension && b instanceof d.Dimension))
            throw { type: "Argument", message: "arguments must be numbers" };
          return new d.Dimension(Math.pow(a.value, b.value), a.unit);
        },
        _math: function (a, b, c) {
          if (c instanceof d.Dimension)
            return new d.Dimension(
              a(parseFloat(c.value)),
              null == b ? c.unit : b
            );
          if ("number" == typeof c) return a(c);
          throw { type: "Argument", message: "argument must be a number" };
        },
        _minmax: function (a, c) {
          switch (((c = Array.prototype.slice.call(c)), c.length)) {
            case 0:
              throw {
                type: "Argument",
                message: "one or more arguments required",
              };
            case 1:
              return c[0];
          }
          var e,
            f,
            g,
            h,
            i,
            j,
            k = [],
            l = {};
          for (e = 0; e < c.length; e++)
            (g = c[e]),
              g instanceof d.Dimension
                ? ((h = g.unify()),
                  (j = h.unit.toString()),
                  (f = l[j]),
                  f !== b
                    ? ((i = k[f].unify()),
                      ((a && h.value < i.value) || (!a && h.value > i.value)) &&
                        (k[f] = g))
                    : ((l[j] = k.length), k.push(g)))
                : k.push(g);
          return 1 == k.length
            ? k[0]
            : ((c = k
                .map(function (a) {
                  return a.toCSS(this.env);
                })
                .join(this.env.compress ? "," : ", ")),
              new d.Anonymous((a ? "min" : "max") + "(" + c + ")"));
        },
        min: function () {
          return this._minmax(!0, arguments);
        },
        max: function () {
          return this._minmax(!1, arguments);
        },
        argb: function (a) {
          return new d.Anonymous(a.toARGB());
        },
        percentage: function (a) {
          return new d.Dimension(100 * a.value, "%");
        },
        color: function (a) {
          if (a instanceof d.Quoted) {
            var b,
              c = a.value;
            if ((b = d.Color.fromKeyword(c))) return b;
            if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/.test(c))
              return new d.Color(c.slice(1));
            throw {
              type: "Argument",
              message:
                "argument must be a color keyword or 3/6 digit hex e.g. #FFF",
            };
          }
          throw { type: "Argument", message: "argument must be a string" };
        },
        iscolor: function (a) {
          return this._isa(a, d.Color);
        },
        isnumber: function (a) {
          return this._isa(a, d.Dimension);
        },
        isstring: function (a) {
          return this._isa(a, d.Quoted);
        },
        iskeyword: function (a) {
          return this._isa(a, d.Keyword);
        },
        isurl: function (a) {
          return this._isa(a, d.URL);
        },
        ispixel: function (a) {
          return this.isunit(a, "px");
        },
        ispercentage: function (a) {
          return this.isunit(a, "%");
        },
        isem: function (a) {
          return this.isunit(a, "em");
        },
        isunit: function (a, b) {
          return a instanceof d.Dimension && a.unit.is(b.value || b)
            ? d.True
            : d.False;
        },
        _isa: function (a, b) {
          return a instanceof b ? d.True : d.False;
        },
        multiply: function (a, b) {
          var c = (a.rgb[0] * b.rgb[0]) / 255,
            d = (a.rgb[1] * b.rgb[1]) / 255,
            e = (a.rgb[2] * b.rgb[2]) / 255;
          return this.rgb(c, d, e);
        },
        screen: function (a, b) {
          var c = 255 - ((255 - a.rgb[0]) * (255 - b.rgb[0])) / 255,
            d = 255 - ((255 - a.rgb[1]) * (255 - b.rgb[1])) / 255,
            e = 255 - ((255 - a.rgb[2]) * (255 - b.rgb[2])) / 255;
          return this.rgb(c, d, e);
        },
        overlay: function (a, b) {
          var c =
              a.rgb[0] < 128
                ? (2 * a.rgb[0] * b.rgb[0]) / 255
                : 255 - (2 * (255 - a.rgb[0]) * (255 - b.rgb[0])) / 255,
            d =
              a.rgb[1] < 128
                ? (2 * a.rgb[1] * b.rgb[1]) / 255
                : 255 - (2 * (255 - a.rgb[1]) * (255 - b.rgb[1])) / 255,
            e =
              a.rgb[2] < 128
                ? (2 * a.rgb[2] * b.rgb[2]) / 255
                : 255 - (2 * (255 - a.rgb[2]) * (255 - b.rgb[2])) / 255;
          return this.rgb(c, d, e);
        },
        softlight: function (a, b) {
          var c = (b.rgb[0] * a.rgb[0]) / 255,
            d =
              c +
              (a.rgb[0] *
                (255 - ((255 - a.rgb[0]) * (255 - b.rgb[0])) / 255 - c)) /
                255;
          c = (b.rgb[1] * a.rgb[1]) / 255;
          var e =
            c +
            (a.rgb[1] *
              (255 - ((255 - a.rgb[1]) * (255 - b.rgb[1])) / 255 - c)) /
              255;
          c = (b.rgb[2] * a.rgb[2]) / 255;
          var f =
            c +
            (a.rgb[2] *
              (255 - ((255 - a.rgb[2]) * (255 - b.rgb[2])) / 255 - c)) /
              255;
          return this.rgb(d, e, f);
        },
        hardlight: function (a, b) {
          var c =
              b.rgb[0] < 128
                ? (2 * b.rgb[0] * a.rgb[0]) / 255
                : 255 - (2 * (255 - b.rgb[0]) * (255 - a.rgb[0])) / 255,
            d =
              b.rgb[1] < 128
                ? (2 * b.rgb[1] * a.rgb[1]) / 255
                : 255 - (2 * (255 - b.rgb[1]) * (255 - a.rgb[1])) / 255,
            e =
              b.rgb[2] < 128
                ? (2 * b.rgb[2] * a.rgb[2]) / 255
                : 255 - (2 * (255 - b.rgb[2]) * (255 - a.rgb[2])) / 255;
          return this.rgb(c, d, e);
        },
        difference: function (a, b) {
          var c = Math.abs(a.rgb[0] - b.rgb[0]),
            d = Math.abs(a.rgb[1] - b.rgb[1]),
            e = Math.abs(a.rgb[2] - b.rgb[2]);
          return this.rgb(c, d, e);
        },
        exclusion: function (a, b) {
          var c = a.rgb[0] + (b.rgb[0] * (255 - a.rgb[0] - a.rgb[0])) / 255,
            d = a.rgb[1] + (b.rgb[1] * (255 - a.rgb[1] - a.rgb[1])) / 255,
            e = a.rgb[2] + (b.rgb[2] * (255 - a.rgb[2] - a.rgb[2])) / 255;
          return this.rgb(c, d, e);
        },
        average: function (a, b) {
          var c = (a.rgb[0] + b.rgb[0]) / 2,
            d = (a.rgb[1] + b.rgb[1]) / 2,
            e = (a.rgb[2] + b.rgb[2]) / 2;
          return this.rgb(c, d, e);
        },
        negation: function (a, b) {
          var c = 255 - Math.abs(255 - b.rgb[0] - a.rgb[0]),
            d = 255 - Math.abs(255 - b.rgb[1] - a.rgb[1]),
            e = 255 - Math.abs(255 - b.rgb[2] - a.rgb[2]);
          return this.rgb(c, d, e);
        },
        tint: function (a, b) {
          return this.mix(this.rgb(255, 255, 255), a, b);
        },
        shade: function (a, b) {
          return this.mix(this.rgb(0, 0, 0), a, b);
        },
        extract: function (a, b) {
          return (
            (b = b.value - 1), Array.isArray(a.value) ? a.value[b] : Array(a)[b]
          );
        },
        length: function (a) {
          var b = Array.isArray(a.value) ? a.value.length : 1;
          return new d.Dimension(b);
        },
        "data-uri": function (b, e) {
          if ("undefined" != typeof a)
            return new d.URL(e || b, this.currentFileInfo).eval(this.env);
          var f = b.value,
            g = e && e.value,
            h = c("fs"),
            i = c("path"),
            j = !1;
          if (
            (arguments.length < 2 && (g = f),
            this.env.isPathRelative(g) &&
              (g = this.currentFileInfo.relativeUrls
                ? i.join(this.currentFileInfo.currentDirectory, g)
                : i.join(this.currentFileInfo.entryPath, g)),
            arguments.length < 2)
          ) {
            var k;
            try {
              k = c("mime");
            } catch (l) {
              k = d._mime;
            }
            f = k.lookup(g);
            var m = k.charsets.lookup(f);
            (j = ["US-ASCII", "UTF-8"].indexOf(m) < 0), j && (f += ";base64");
          } else j = /;base64$/.test(f);
          var n = h.readFileSync(g),
            o = 32,
            p = parseInt(n.length / 1024, 10);
          if (p >= o && this.env.ieCompat !== !1)
            return (
              this.env.silent ||
                console.warn(
                  "Skipped data-uri embedding of %s because its size (%dKB) exceeds IE8-safe %dKB!",
                  g,
                  p,
                  o
                ),
              new d.URL(e || b, this.currentFileInfo).eval(this.env)
            );
          n = j ? n.toString("base64") : encodeURIComponent(n);
          var q = "'data:" + f + "," + n + "'";
          return new d.URL(new d.Anonymous(q));
        },
        "svg-gradient": function (a) {
          function c() {
            throw {
              type: "Argument",
              message:
                "svg-gradient expects direction, start_color [start_position], [color position,]..., end_color [end_position]",
            };
          }
          arguments.length < 3 && c();
          var e,
            f,
            g,
            h,
            i,
            j,
            k,
            l = Array.prototype.slice.call(arguments, 1),
            m = "linear",
            n = 'x="0" y="0" width="1" height="1"',
            o = !0,
            p = { compress: !1 },
            q = a.toCSS(p);
          switch (q) {
            case "to bottom":
              e = 'x1="0%" y1="0%" x2="0%" y2="100%"';
              break;
            case "to right":
              e = 'x1="0%" y1="0%" x2="100%" y2="0%"';
              break;
            case "to bottom right":
              e = 'x1="0%" y1="0%" x2="100%" y2="100%"';
              break;
            case "to top right":
              e = 'x1="0%" y1="100%" x2="100%" y2="0%"';
              break;
            case "ellipse":
            case "ellipse at center":
              (m = "radial"),
                (e = 'cx="50%" cy="50%" r="75%"'),
                (n = 'x="-50" y="-50" width="101" height="101"');
              break;
            default:
              throw {
                type: "Argument",
                message:
                  "svg-gradient direction must be 'to bottom', 'to right', 'to bottom right', 'to top right' or 'ellipse at center'",
              };
          }
          for (
            f =
              '<?xml version="1.0" ?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%" viewBox="0 0 1 1" preserveAspectRatio="none"><' +
              m +
              'Gradient id="gradient" gradientUnits="userSpaceOnUse" ' +
              e +
              ">",
              g = 0;
            g < l.length;
            g += 1
          )
            l[g].value
              ? ((h = l[g].value[0]), (i = l[g].value[1]))
              : ((h = l[g]), (i = b)),
              (h instanceof d.Color &&
                (((0 === g || g + 1 === l.length) && i === b) ||
                  i instanceof d.Dimension)) ||
                c(),
              (j = i ? i.toCSS(p) : 0 === g ? "0%" : "100%"),
              (k = h.alpha),
              (f +=
                '<stop offset="' +
                j +
                '" stop-color="' +
                h.toRGB() +
                '"' +
                (1 > k ? ' stop-opacity="' + k + '"' : "") +
                "/>");
          if (
            ((f +=
              "</" +
              m +
              "Gradient><rect " +
              n +
              ' fill="url(#gradient)" /></svg>'),
            o)
          )
            try {
              f = new Buffer(f).toString("base64");
            } catch (r) {
              o = !1;
            }
          return (
            (f = "'data:image/svg+xml" + (o ? ";base64" : "") + "," + f + "'"),
            new d.URL(new d.Anonymous(f))
          );
        },
      }),
        (d._mime = {
          _types: {
            ".htm": "text/html",
            ".html": "text/html",
            ".gif": "image/gif",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
          },
          lookup: function (a) {
            var e = c("path").extname(a),
              f = d._mime._types[e];
            if (f === b)
              throw new Error(
                'Optional dependency "mime" is required for ' + e
              );
            return f;
          },
          charsets: {
            lookup: function (a) {
              return a && /^text\//.test(a) ? "UTF-8" : "";
            },
          },
        });
      for (
        var i = [
            { name: "ceil" },
            { name: "floor" },
            { name: "sqrt" },
            { name: "abs" },
            { name: "tan", unit: "" },
            { name: "sin", unit: "" },
            { name: "cos", unit: "" },
            { name: "atan", unit: "rad" },
            { name: "asin", unit: "rad" },
            { name: "acos", unit: "rad" },
          ],
          j = function (a, b) {
            return function (c) {
              return null != b && (c = c.unify()), this._math(Math[a], b, c);
            };
          },
          k = 0;
        k < i.length;
        k++
      )
        d.functions[i[k].name] = j(i[k].name, i[k].unit);
      (d.functionCall = function (a, b) {
        (this.env = a), (this.currentFileInfo = b);
      }),
        (d.functionCall.prototype = d.functions);
    })(c("./tree")),
    (function (a) {
      a.colors = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        grey: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
      };
    })(c("./tree")),
    (function (a) {
      (a.debugInfo = function (b, c, d) {
        var e = "";
        if (b.dumpLineNumbers && !b.compress)
          switch (b.dumpLineNumbers) {
            case "comments":
              e = a.debugInfo.asComment(c);
              break;
            case "mediaquery":
              e = a.debugInfo.asMediaQuery(c);
              break;
            case "all":
              e =
                a.debugInfo.asComment(c) +
                (d || "") +
                a.debugInfo.asMediaQuery(c);
          }
        return e;
      }),
        (a.debugInfo.asComment = function (a) {
          return (
            "/* line " +
            a.debugInfo.lineNumber +
            ", " +
            a.debugInfo.fileName +
            " */\n"
          );
        }),
        (a.debugInfo.asMediaQuery = function (a) {
          return (
            "@media -sass-debug-info{filename{font-family:" +
            ("file://" + a.debugInfo.fileName).replace(
              /([.:/\\])/g,
              function (a) {
                return "\\" == a && (a = "/"), "\\" + a;
              }
            ) +
            "}line{font-family:\\00003" +
            a.debugInfo.lineNumber +
            "}}\n"
          );
        }),
        (a.find = function (a, b) {
          for (var c, d = 0; d < a.length; d++)
            if ((c = b.call(a, a[d]))) return c;
          return null;
        }),
        (a.jsify = function (a) {
          return Array.isArray(a.value) && a.value.length > 1
            ? "[" +
                a.value
                  .map(function (a) {
                    return a.toCSS(!1);
                  })
                  .join(", ") +
                "]"
            : a.toCSS(!1);
        }),
        (a.toCSS = function (a) {
          var b = [];
          return (
            this.genCSS(a, {
              add: function (a) {
                b.push(a);
              },
              isEmpty: function () {
                return 0 === b.length;
              },
            }),
            b.join("")
          );
        }),
        (a.outputRuleset = function (a, b, c) {
          b.add(a.compress ? "{" : " {\n"),
            (a.tabLevel = (a.tabLevel || 0) + 1);
          for (
            var d = a.compress ? "" : Array(a.tabLevel + 1).join("  "),
              e = a.compress ? "" : Array(a.tabLevel).join("  "),
              f = 0;
            f < c.length;
            f++
          )
            b.add(d), c[f].genCSS(a, b), b.add(a.compress ? "" : "\n");
          a.tabLevel--, b.add(e + "}");
        });
    })(c("./tree")),
    (function (a) {
      (a.Alpha = function (a) {
        this.value = a;
      }),
        (a.Alpha.prototype = {
          type: "Alpha",
          accept: function (a) {
            this.value = a.visit(this.value);
          },
          eval: function (b) {
            return this.value.eval ? new a.Alpha(this.value.eval(b)) : this;
          },
          genCSS: function (a, b) {
            b.add("alpha(opacity="),
              this.value.genCSS ? this.value.genCSS(a, b) : b.add(this.value),
              b.add(")");
          },
          toCSS: a.toCSS,
        });
    })(c("../tree")),
    (function (a) {
      (a.Anonymous = function (a, b, c, d) {
        (this.value = a.value || a),
          (this.index = b),
          (this.mapLines = d),
          (this.currentFileInfo = c);
      }),
        (a.Anonymous.prototype = {
          type: "Anonymous",
          eval: function () {
            return this;
          },
          compare: function (a) {
            if (!a.toCSS) return -1;
            var b = this.toCSS(),
              c = a.toCSS();
            return b === c ? 0 : c > b ? -1 : 1;
          },
          genCSS: function (a, b) {
            b.add(this.value, this.currentFileInfo, this.index, this.mapLines);
          },
          toCSS: a.toCSS,
        });
    })(c("../tree")),
    (function (a) {
      (a.Assignment = function (a, b) {
        (this.key = a), (this.value = b);
      }),
        (a.Assignment.prototype = {
          type: "Assignment",
          accept: function (a) {
            this.value = a.visit(this.value);
          },
          eval: function (b) {
            return this.value.eval
              ? new a.Assignment(this.key, this.value.eval(b))
              : this;
          },
          genCSS: function (a, b) {
            b.add(this.key + "="),
              this.value.genCSS ? this.value.genCSS(a, b) : b.add(this.value);
          },
          toCSS: a.toCSS,
        });
    })(c("../tree")),
    (function (a) {
      (a.Call = function (a, b, c, d) {
        (this.name = a),
          (this.args = b),
          (this.index = c),
          (this.currentFileInfo = d);
      }),
        (a.Call.prototype = {
          type: "Call",
          accept: function (a) {
            this.args = a.visit(this.args);
          },
          eval: function (b) {
            var c,
              d,
              e = this.args.map(function (a) {
                return a.eval(b);
              }),
              f = this.name.toLowerCase();
            if (f in a.functions)
              try {
                if (
                  ((d = new a.functionCall(b, this.currentFileInfo)),
                  (c = d[f].apply(d, e)),
                  null != c)
                )
                  return c;
              } catch (g) {
                throw {
                  type: g.type || "Runtime",
                  message:
                    "error evaluating function `" +
                    this.name +
                    "`" +
                    (g.message ? ": " + g.message : ""),
                  index: this.index,
                  filename: this.currentFileInfo.filename,
                };
              }
            return new a.Call(this.name, e, this.index, this.currentFileInfo);
          },
          genCSS: function (a, b) {
            b.add(this.name + "(", this.currentFileInfo, this.index);
            for (var c = 0; c < this.args.length; c++)
              this.args[c].genCSS(a, b),
                c + 1 < this.args.length && b.add(", ");
            b.add(")");
          },
          toCSS: a.toCSS,
        });
    })(c("../tree")),
    (function (a) {
      a.Color = function (a, b) {
        (this.rgb = Array.isArray(a)
          ? a
          : 6 == a.length
          ? a.match(/.{2}/g).map(function (a) {
              return parseInt(a, 16);
            })
          : a.split("").map(function (a) {
              return parseInt(a + a, 16);
            })),
          (this.alpha = "number" == typeof b ? b : 1);
      };
      var b = "transparent";
      (a.Color.prototype = {
        type: "Color",
        eval: function () {
          return this;
        },
        luma: function () {
          return (
            (0.2126 * this.rgb[0]) / 255 +
            (0.7152 * this.rgb[1]) / 255 +
            (0.0722 * this.rgb[2]) / 255
          );
        },
        genCSS: function (a, b) {
          b.add(this.toCSS(a));
        },
        toCSS: function (a, c) {
          var d = a && a.compress && !c;
          if (this.alpha < 1)
            return 0 === this.alpha && this.isTransparentKeyword
              ? b
              : "rgba(" +
                  this.rgb
                    .map(function (a) {
                      return Math.round(a);
                    })
                    .concat(this.alpha)
                    .join("," + (d ? "" : " ")) +
                  ")";
          var e = this.toRGB();
          if (d) {
            var f = e.split("");
            f[1] === f[2] &&
              f[3] === f[4] &&
              f[5] === f[6] &&
              (e = "#" + f[1] + f[3] + f[5]);
          }
          return e;
        },
        operate: function (b, c, d) {
          var e = [];
          d instanceof a.Color || (d = d.toColor());
          for (var f = 0; 3 > f; f++)
            e[f] = a.operate(b, c, this.rgb[f], d.rgb[f]);
          return new a.Color(e, this.alpha + d.alpha);
        },
        toRGB: function () {
          return (
            "#" +
            this.rgb
              .map(function (a) {
                return (
                  (a = Math.round(a)),
                  (a = (a > 255 ? 255 : 0 > a ? 0 : a).toString(16)),
                  1 === a.length ? "0" + a : a
                );
              })
              .join("")
          );
        },
        toHSL: function () {
          var a,
            b,
            c = this.rgb[0] / 255,
            d = this.rgb[1] / 255,
            e = this.rgb[2] / 255,
            f = this.alpha,
            g = Math.max(c, d, e),
            h = Math.min(c, d, e),
            i = (g + h) / 2,
            j = g - h;
          if (g === h) a = b = 0;
          else {
            switch (((b = i > 0.5 ? j / (2 - g - h) : j / (g + h)), g)) {
              case c:
                a = (d - e) / j + (e > d ? 6 : 0);
                break;
              case d:
                a = (e - c) / j + 2;
                break;
              case e:
                a = (c - d) / j + 4;
            }
            a /= 6;
          }
          return { h: 360 * a, s: b, l: i, a: f };
        },
        toHSV: function () {
          var a,
            b,
            c = this.rgb[0] / 255,
            d = this.rgb[1] / 255,
            e = this.rgb[2] / 255,
            f = this.alpha,
            g = Math.max(c, d, e),
            h = Math.min(c, d, e),
            i = g,
            j = g - h;
          if (((b = 0 === g ? 0 : j / g), g === h)) a = 0;
          else {
            switch (g) {
              case c:
                a = (d - e) / j + (e > d ? 6 : 0);
                break;
              case d:
                a = (e - c) / j + 2;
                break;
              case e:
                a = (c - d) / j + 4;
            }
            a /= 6;
          }
          return { h: 360 * a, s: b, v: i, a: f };
        },
        toARGB: function () {
          var a = [Math.round(255 * this.alpha)].concat(this.rgb);
          return (
            "#" +
            a
              .map(function (a) {
                return (
                  (a = Math.round(a)),
                  (a = (a > 255 ? 255 : 0 > a ? 0 : a).toString(16)),
                  1 === a.length ? "0" + a : a
                );
              })
              .join("")
          );
        },
        compare: function (a) {
          return a.rgb
            ? a.rgb[0] === this.rgb[0] &&
              a.rgb[1] === this.rgb[1] &&
              a.rgb[2] === this.rgb[2] &&
              a.alpha === this.alpha
              ? 0
              : -1
            : -1;
        },
      }),
        (a.Color.fromKeyword = function (c) {
          if (a.colors.hasOwnProperty(c))
            return new a.Color(a.colors[c].slice(1));
          if (c === b) {
            var d = new a.Color([0, 0, 0], 0);
            return (d.isTransparentKeyword = !0), d;
          }
        });
    })(c("../tree")),
    (function (a) {
      (a.Comment = function (a, b, c, d) {
        (this.value = a), (this.silent = !!b), (this.currentFileInfo = d);
      }),
        (a.Comment.prototype = {
          type: "Comment",
          genCSS: function (b, c) {
            this.debugInfo &&
              c.add(a.debugInfo(b, this), this.currentFileInfo, this.index),
              c.add(this.value.trim());
          },
          toCSS: a.toCSS,
          isSilent: function (a) {
            var b =
                this.currentFileInfo &&
                this.currentFileInfo.reference &&
                !this.isReferenced,
              c = a.compress && !this.value.match(/^\/\*!/);
            return this.silent || b || c;
          },
          eval: function () {
            return this;
          },
          markReferenced: function () {
            this.isReferenced = !0;
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Condition = function (a, b, c, d, e) {
        (this.op = a.trim()),
          (this.lvalue = b),
          (this.rvalue = c),
          (this.index = d),
          (this.negate = e);
      }),
        (a.Condition.prototype = {
          type: "Condition",
          accept: function (a) {
            (this.lvalue = a.visit(this.lvalue)),
              (this.rvalue = a.visit(this.rvalue));
          },
          eval: function (a) {
            var b,
              c = this.lvalue.eval(a),
              d = this.rvalue.eval(a),
              e = this.index;
            return (
              (b = (function (a) {
                switch (a) {
                  case "and":
                    return c && d;
                  case "or":
                    return c || d;
                  default:
                    if (c.compare) b = c.compare(d);
                    else {
                      if (!d.compare)
                        throw {
                          type: "Type",
                          message: "Unable to perform comparison",
                          index: e,
                        };
                      b = d.compare(c);
                    }
                    switch (b) {
                      case -1:
                        return "<" === a || "=<" === a || "<=" === a;
                      case 0:
                        return (
                          "=" === a || ">=" === a || "=<" === a || "<=" === a
                        );
                      case 1:
                        return ">" === a || ">=" === a;
                    }
                }
              })(this.op)),
              this.negate ? !b : b
            );
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Dimension = function (c, d) {
        (this.value = parseFloat(c)),
          (this.unit = d && d instanceof a.Unit ? d : new a.Unit(d ? [d] : b));
      }),
        (a.Dimension.prototype = {
          type: "Dimension",
          accept: function (a) {
            this.unit = a.visit(this.unit);
          },
          eval: function () {
            return this;
          },
          toColor: function () {
            return new a.Color([this.value, this.value, this.value]);
          },
          genCSS: function (a, b) {
            if (a && a.strictUnits && !this.unit.isSingular())
              throw new Error(
                "Multiple units in dimension. Correct the units or use the unit function. Bad unit: " +
                  this.unit.toString()
              );
            var c = this.value,
              d = String(c);
            if (
              (0 !== c &&
                1e-6 > c &&
                c > -1e-6 &&
                (d = c.toFixed(20).replace(/0+$/, "")),
              a && a.compress)
            ) {
              if (0 === c && this.unit.isLength()) return b.add(d), void 0;
              c > 0 && 1 > c && (d = d.substr(1));
            }
            b.add(d), this.unit.genCSS(a, b);
          },
          toCSS: a.toCSS,
          operate: function (b, c, d) {
            var e = a.operate(b, c, this.value, d.value),
              f = this.unit.clone();
            if ("+" === c || "-" === c)
              if (0 === f.numerator.length && 0 === f.denominator.length)
                (f.numerator = d.unit.numerator.slice(0)),
                  (f.denominator = d.unit.denominator.slice(0));
              else if (
                0 === d.unit.numerator.length &&
                0 === f.denominator.length
              );
              else {
                if (
                  ((d = d.convertTo(this.unit.usedUnits())),
                  b.strictUnits && d.unit.toString() !== f.toString())
                )
                  throw new Error(
                    "Incompatible units. Change the units or use the unit function. Bad units: '" +
                      f.toString() +
                      "' and '" +
                      d.unit.toString() +
                      "'."
                  );
                e = a.operate(b, c, this.value, d.value);
              }
            else
              "*" === c
                ? ((f.numerator = f.numerator.concat(d.unit.numerator).sort()),
                  (f.denominator = f.denominator
                    .concat(d.unit.denominator)
                    .sort()),
                  f.cancel())
                : "/" === c &&
                  ((f.numerator = f.numerator
                    .concat(d.unit.denominator)
                    .sort()),
                  (f.denominator = f.denominator
                    .concat(d.unit.numerator)
                    .sort()),
                  f.cancel());
            return new a.Dimension(e, f);
          },
          compare: function (b) {
            if (b instanceof a.Dimension) {
              var c = this.unify(),
                d = b.unify(),
                e = c.value,
                f = d.value;
              return f > e
                ? -1
                : e > f
                ? 1
                : d.unit.isEmpty() || 0 === c.unit.compare(d.unit)
                ? 0
                : -1;
            }
            return -1;
          },
          unify: function () {
            return this.convertTo({ length: "m", duration: "s", angle: "rad" });
          },
          convertTo: function (b) {
            var c,
              d,
              e,
              f,
              g,
              h = this.value,
              i = this.unit.clone(),
              j = {};
            if ("string" == typeof b) {
              for (c in a.UnitConversions)
                a.UnitConversions[c].hasOwnProperty(b) &&
                  ((j = {}), (j[c] = b));
              b = j;
            }
            g = function (a, b) {
              return e.hasOwnProperty(a)
                ? (b ? (h /= e[a] / e[f]) : (h *= e[a] / e[f]), f)
                : a;
            };
            for (d in b)
              b.hasOwnProperty(d) &&
                ((f = b[d]), (e = a.UnitConversions[d]), i.map(g));
            return i.cancel(), new a.Dimension(h, i);
          },
        }),
        (a.UnitConversions = {
          length: {
            m: 1,
            cm: 0.01,
            mm: 0.001,
            in: 0.0254,
            pt: 0.0254 / 72,
            pc: (0.0254 / 72) * 12,
          },
          duration: { s: 1, ms: 0.001 },
          angle: {
            rad: 1 / (2 * Math.PI),
            deg: 1 / 360,
            grad: 0.0025,
            turn: 1,
          },
        }),
        (a.Unit = function (a, b, c) {
          (this.numerator = a ? a.slice(0).sort() : []),
            (this.denominator = b ? b.slice(0).sort() : []),
            (this.backupUnit = c);
        }),
        (a.Unit.prototype = {
          type: "Unit",
          clone: function () {
            return new a.Unit(
              this.numerator.slice(0),
              this.denominator.slice(0),
              this.backupUnit
            );
          },
          genCSS: function (a, b) {
            this.numerator.length >= 1
              ? b.add(this.numerator[0])
              : this.denominator.length >= 1
              ? b.add(this.denominator[0])
              : (a && a.strictUnits) ||
                !this.backupUnit ||
                b.add(this.backupUnit);
          },
          toCSS: a.toCSS,
          toString: function () {
            var a,
              b = this.numerator.join("*");
            for (a = 0; a < this.denominator.length; a++)
              b += "/" + this.denominator[a];
            return b;
          },
          compare: function (a) {
            return this.is(a.toString()) ? 0 : -1;
          },
          is: function (a) {
            return this.toString() === a;
          },
          isLength: function () {
            return Boolean(this.toCSS().match(/px|em|%|in|cm|mm|pc|pt|ex/));
          },
          isEmpty: function () {
            return 0 === this.numerator.length && 0 === this.denominator.length;
          },
          isSingular: function () {
            return this.numerator.length <= 1 && 0 === this.denominator.length;
          },
          map: function (a) {
            var b;
            for (b = 0; b < this.numerator.length; b++)
              this.numerator[b] = a(this.numerator[b], !1);
            for (b = 0; b < this.denominator.length; b++)
              this.denominator[b] = a(this.denominator[b], !0);
          },
          usedUnits: function () {
            var b,
              c,
              d = {};
            c = function (a) {
              return b.hasOwnProperty(a) && !d[e] && (d[e] = a), a;
            };
            for (var e in a.UnitConversions)
              a.UnitConversions.hasOwnProperty(e) &&
                ((b = a.UnitConversions[e]), this.map(c));
            return d;
          },
          cancel: function () {
            var a,
              b,
              c,
              d = {};
            for (b = 0; b < this.numerator.length; b++)
              (a = this.numerator[b]), c || (c = a), (d[a] = (d[a] || 0) + 1);
            for (b = 0; b < this.denominator.length; b++)
              (a = this.denominator[b]), c || (c = a), (d[a] = (d[a] || 0) - 1);
            (this.numerator = []), (this.denominator = []);
            for (a in d)
              if (d.hasOwnProperty(a)) {
                var e = d[a];
                if (e > 0) for (b = 0; e > b; b++) this.numerator.push(a);
                else if (0 > e)
                  for (b = 0; -e > b; b++) this.denominator.push(a);
              }
            0 === this.numerator.length &&
              0 === this.denominator.length &&
              c &&
              (this.backupUnit = c),
              this.numerator.sort(),
              this.denominator.sort();
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Directive = function (b, c, d, e) {
        (this.name = b),
          Array.isArray(c)
            ? ((this.rules = [new a.Ruleset([], c)]),
              (this.rules[0].allowImports = !0))
            : (this.value = c),
          (this.currentFileInfo = e);
      }),
        (a.Directive.prototype = {
          type: "Directive",
          accept: function (a) {
            (this.rules = a.visit(this.rules)),
              (this.value = a.visit(this.value));
          },
          genCSS: function (b, c) {
            c.add(this.name, this.currentFileInfo, this.index),
              this.rules
                ? a.outputRuleset(b, c, this.rules)
                : (c.add(" "), this.value.genCSS(b, c), c.add(";"));
          },
          toCSS: a.toCSS,
          eval: function (b) {
            var c = this;
            return (
              this.rules &&
                (b.frames.unshift(this),
                (c = new a.Directive(
                  this.name,
                  null,
                  this.index,
                  this.currentFileInfo
                )),
                (c.rules = [this.rules[0].eval(b)]),
                (c.rules[0].root = !0),
                b.frames.shift()),
              c
            );
          },
          variable: function (b) {
            return a.Ruleset.prototype.variable.call(this.rules[0], b);
          },
          find: function () {
            return a.Ruleset.prototype.find.apply(this.rules[0], arguments);
          },
          rulesets: function () {
            return a.Ruleset.prototype.rulesets.apply(this.rules[0]);
          },
          markReferenced: function () {
            var a, b;
            if (((this.isReferenced = !0), this.rules))
              for (b = this.rules[0].rules, a = 0; a < b.length; a++)
                b[a].markReferenced && b[a].markReferenced();
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Element = function (b, c, d, e) {
        (this.combinator = b instanceof a.Combinator ? b : new a.Combinator(b)),
          (this.value = "string" == typeof c ? c.trim() : c ? c : ""),
          (this.index = d),
          (this.currentFileInfo = e);
      }),
        (a.Element.prototype = {
          type: "Element",
          accept: function (a) {
            (this.combinator = a.visit(this.combinator)),
              (this.value = a.visit(this.value));
          },
          eval: function (b) {
            return new a.Element(
              this.combinator,
              this.value.eval ? this.value.eval(b) : this.value,
              this.index,
              this.currentFileInfo
            );
          },
          genCSS: function (a, b) {
            b.add(this.toCSS(a), this.currentFileInfo, this.index);
          },
          toCSS: function (a) {
            var b = this.value.toCSS ? this.value.toCSS(a) : this.value;
            return "" === b && "&" === this.combinator.value.charAt(0)
              ? ""
              : this.combinator.toCSS(a || {}) + b;
          },
        }),
        (a.Attribute = function (a, b, c) {
          (this.key = a), (this.op = b), (this.value = c);
        }),
        (a.Attribute.prototype = {
          type: "Attribute",
          accept: function (a) {
            this.value = a.visit(this.value);
          },
          eval: function (b) {
            return new a.Attribute(
              this.key.eval ? this.key.eval(b) : this.key,
              this.op,
              this.value && this.value.eval ? this.value.eval(b) : this.value
            );
          },
          genCSS: function (a, b) {
            b.add(this.toCSS(a));
          },
          toCSS: function (a) {
            var b = this.key.toCSS ? this.key.toCSS(a) : this.key;
            return (
              this.op &&
                ((b += this.op),
                (b += this.value.toCSS ? this.value.toCSS(a) : this.value)),
              "[" + b + "]"
            );
          },
        }),
        (a.Combinator = function (a) {
          this.value = " " === a ? " " : a ? a.trim() : "";
        }),
        (a.Combinator.prototype = {
          type: "Combinator",
          _outputMap: {
            "": "",
            " ": " ",
            ":": " :",
            "+": " + ",
            "~": " ~ ",
            ">": " > ",
            "|": "|",
          },
          _outputMapCompressed: {
            "": "",
            " ": " ",
            ":": " :",
            "+": "+",
            "~": "~",
            ">": ">",
            "|": "|",
          },
          genCSS: function (a, b) {
            b.add(
              (a.compress ? this._outputMapCompressed : this._outputMap)[
                this.value
              ]
            );
          },
          toCSS: a.toCSS,
        });
    })(c("../tree")),
    (function (a) {
      (a.Expression = function (a) {
        this.value = a;
      }),
        (a.Expression.prototype = {
          type: "Expression",
          accept: function (a) {
            this.value = a.visit(this.value);
          },
          eval: function (b) {
            var c,
              d = this.parens && !this.parensInOp,
              e = !1;
            return (
              d && b.inParenthesis(),
              this.value.length > 1
                ? (c = new a.Expression(
                    this.value.map(function (a) {
                      return a.eval(b);
                    })
                  ))
                : 1 === this.value.length
                ? (this.value[0].parens &&
                    !this.value[0].parensInOp &&
                    (e = !0),
                  (c = this.value[0].eval(b)))
                : (c = this),
              d && b.outOfParenthesis(),
              this.parens &&
                this.parensInOp &&
                !b.isMathOn() &&
                !e &&
                (c = new a.Paren(c)),
              c
            );
          },
          genCSS: function (a, b) {
            for (var c = 0; c < this.value.length; c++)
              this.value[c].genCSS(a, b),
                c + 1 < this.value.length && b.add(" ");
          },
          toCSS: a.toCSS,
          throwAwayComments: function () {
            this.value = this.value.filter(function (b) {
              return !(b instanceof a.Comment);
            });
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Extend = function (a, b, c) {
        switch (((this.selector = a), (this.option = b), (this.index = c), b)) {
          case "all":
            (this.allowBefore = !0), (this.allowAfter = !0);
            break;
          default:
            (this.allowBefore = !1), (this.allowAfter = !1);
        }
      }),
        (a.Extend.prototype = {
          type: "Extend",
          accept: function (a) {
            this.selector = a.visit(this.selector);
          },
          eval: function (b) {
            return new a.Extend(this.selector.eval(b), this.option, this.index);
          },
          clone: function () {
            return new a.Extend(this.selector, this.option, this.index);
          },
          findSelfSelectors: function (a) {
            var b,
              c,
              d = [];
            for (b = 0; b < a.length; b++)
              (c = a[b].elements),
                b > 0 &&
                  c.length &&
                  "" === c[0].combinator.value &&
                  (c[0].combinator.value = " "),
                (d = d.concat(a[b].elements));
            this.selfSelectors = [{ elements: d }];
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Import = function (a, c, d, e, f) {
        if (
          ((this.options = d),
          (this.index = e),
          (this.path = a),
          (this.features = c),
          (this.currentFileInfo = f),
          this.options.less !== b || this.options.inline)
        )
          this.css = !this.options.less || this.options.inline;
        else {
          var g = this.getPath();
          g && /css([\?;].*)?$/.test(g) && (this.css = !0);
        }
      }),
        (a.Import.prototype = {
          type: "Import",
          accept: function (a) {
            (this.features = a.visit(this.features)),
              (this.path = a.visit(this.path)),
              this.options.inline || (this.root = a.visit(this.root));
          },
          genCSS: function (a, b) {
            this.css &&
              (b.add("@import ", this.currentFileInfo, this.index),
              this.path.genCSS(a, b),
              this.features && (b.add(" "), this.features.genCSS(a, b)),
              b.add(";"));
          },
          toCSS: a.toCSS,
          getPath: function () {
            if (this.path instanceof a.Quoted) {
              var c = this.path.value;
              return this.css !== b || /(\.[a-z]*$)|([\?;].*)$/.test(c)
                ? c
                : c + ".less";
            }
            return this.path instanceof a.URL ? this.path.value.value : null;
          },
          evalForImport: function (b) {
            return new a.Import(
              this.path.eval(b),
              this.features,
              this.options,
              this.index,
              this.currentFileInfo
            );
          },
          evalPath: function (b) {
            var c = this.path.eval(b),
              d = this.currentFileInfo && this.currentFileInfo.rootpath;
            if (!(c instanceof a.URL)) {
              if (d) {
                var e = c.value;
                e && b.isPathRelative(e) && (c.value = d + e);
              }
              c.value = b.normalizePath(c.value);
            }
            return c;
          },
          eval: function (b) {
            var c,
              d = this.features && this.features.eval(b);
            if (this.skip) return [];
            if (this.options.inline) {
              var e = new a.Anonymous(
                this.root,
                0,
                { filename: this.importedFilename },
                !0
              );
              return this.features
                ? new a.Media([e], this.features.value)
                : [e];
            }
            if (this.css) {
              var f = new a.Import(
                this.evalPath(b),
                d,
                this.options,
                this.index
              );
              if (!f.css && this.error) throw this.error;
              return f;
            }
            return (
              (c = new a.Ruleset([], this.root.rules.slice(0))),
              c.evalImports(b),
              this.features
                ? new a.Media(c.rules, this.features.value)
                : c.rules
            );
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.JavaScript = function (a, b, c) {
        (this.escaped = c), (this.expression = a), (this.index = b);
      }),
        (a.JavaScript.prototype = {
          type: "JavaScript",
          eval: function (b) {
            var c,
              d = this,
              e = {},
              f = this.expression.replace(/@\{([\w-]+)\}/g, function (c, e) {
                return a.jsify(new a.Variable("@" + e, d.index).eval(b));
              });
            try {
              f = new Function("return (" + f + ")");
            } catch (g) {
              throw {
                message:
                  "JavaScript evaluation error: " +
                  g.message +
                  " from `" +
                  f +
                  "`",
                index: this.index,
              };
            }
            for (var h in b.frames[0].variables())
              e[h.slice(1)] = {
                value: b.frames[0].variables()[h].value,
                toJS: function () {
                  return this.value.eval(b).toCSS();
                },
              };
            try {
              c = f.call(e);
            } catch (g) {
              throw {
                message:
                  "JavaScript evaluation error: '" +
                  g.name +
                  ": " +
                  g.message +
                  "'",
                index: this.index,
              };
            }
            return "string" == typeof c
              ? new a.Quoted('"' + c + '"', c, this.escaped, this.index)
              : Array.isArray(c)
              ? new a.Anonymous(c.join(", "))
              : new a.Anonymous(c);
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Keyword = function (a) {
        this.value = a;
      }),
        (a.Keyword.prototype = {
          type: "Keyword",
          eval: function () {
            return this;
          },
          genCSS: function (a, b) {
            b.add(this.value);
          },
          toCSS: a.toCSS,
          compare: function (b) {
            return b instanceof a.Keyword
              ? b.value === this.value
                ? 0
                : 1
              : -1;
          },
        }),
        (a.True = new a.Keyword("true")),
        (a.False = new a.Keyword("false"));
    })(c("../tree")),
    (function (a) {
      (a.Media = function (b, c, d, e) {
        (this.index = d), (this.currentFileInfo = e);
        var f = this.emptySelectors();
        (this.features = new a.Value(c)),
          (this.rules = [new a.Ruleset(f, b)]),
          (this.rules[0].allowImports = !0);
      }),
        (a.Media.prototype = {
          type: "Media",
          accept: function (a) {
            (this.features = a.visit(this.features)),
              (this.rules = a.visit(this.rules));
          },
          genCSS: function (b, c) {
            c.add("@media ", this.currentFileInfo, this.index),
              this.features.genCSS(b, c),
              a.outputRuleset(b, c, this.rules);
          },
          toCSS: a.toCSS,
          eval: function (b) {
            b.mediaBlocks || ((b.mediaBlocks = []), (b.mediaPath = []));
            var c = new a.Media([], [], this.index, this.currentFileInfo);
            this.debugInfo &&
              ((this.rules[0].debugInfo = this.debugInfo),
              (c.debugInfo = this.debugInfo));
            var d = !1;
            b.strictMath || ((d = !0), (b.strictMath = !0));
            try {
              c.features = this.features.eval(b);
            } finally {
              d && (b.strictMath = !1);
            }
            return (
              b.mediaPath.push(c),
              b.mediaBlocks.push(c),
              b.frames.unshift(this.rules[0]),
              (c.rules = [this.rules[0].eval(b)]),
              b.frames.shift(),
              b.mediaPath.pop(),
              0 === b.mediaPath.length ? c.evalTop(b) : c.evalNested(b)
            );
          },
          variable: function (b) {
            return a.Ruleset.prototype.variable.call(this.rules[0], b);
          },
          find: function () {
            return a.Ruleset.prototype.find.apply(this.rules[0], arguments);
          },
          rulesets: function () {
            return a.Ruleset.prototype.rulesets.apply(this.rules[0]);
          },
          emptySelectors: function () {
            var b = new a.Element("", "&", this.index, this.currentFileInfo);
            return [
              new a.Selector([b], null, null, this.index, this.currentFileInfo),
            ];
          },
          markReferenced: function () {
            var a,
              b = this.rules[0].rules;
            for (this.isReferenced = !0, a = 0; a < b.length; a++)
              b[a].markReferenced && b[a].markReferenced();
          },
          evalTop: function (b) {
            var c = this;
            if (b.mediaBlocks.length > 1) {
              var d = this.emptySelectors();
              (c = new a.Ruleset(d, b.mediaBlocks)), (c.multiMedia = !0);
            }
            return delete b.mediaBlocks, delete b.mediaPath, c;
          },
          evalNested: function (b) {
            var c,
              d,
              e = b.mediaPath.concat([this]);
            for (c = 0; c < e.length; c++)
              (d =
                e[c].features instanceof a.Value
                  ? e[c].features.value
                  : e[c].features),
                (e[c] = Array.isArray(d) ? d : [d]);
            return (
              (this.features = new a.Value(
                this.permute(e).map(function (b) {
                  for (
                    b = b.map(function (b) {
                      return b.toCSS ? b : new a.Anonymous(b);
                    }),
                      c = b.length - 1;
                    c > 0;
                    c--
                  )
                    b.splice(c, 0, new a.Anonymous("and"));
                  return new a.Expression(b);
                })
              )),
              new a.Ruleset([], [])
            );
          },
          permute: function (a) {
            if (0 === a.length) return [];
            if (1 === a.length) return a[0];
            for (
              var b = [], c = this.permute(a.slice(1)), d = 0;
              d < c.length;
              d++
            )
              for (var e = 0; e < a[0].length; e++)
                b.push([a[0][e]].concat(c[d]));
            return b;
          },
          bubbleSelectors: function (b) {
            this.rules = [new a.Ruleset(b.slice(0), [this.rules[0]])];
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.mixin = {}),
        (a.mixin.Call = function (b, c, d, e, f) {
          (this.selector = new a.Selector(b)),
            (this.arguments = c),
            (this.index = d),
            (this.currentFileInfo = e),
            (this.important = f);
        }),
        (a.mixin.Call.prototype = {
          type: "MixinCall",
          accept: function (a) {
            (this.selector = a.visit(this.selector)),
              (this.arguments = a.visit(this.arguments));
          },
          eval: function (b) {
            var c,
              d,
              e,
              f,
              g,
              h,
              i,
              j,
              k,
              l = [],
              m = !1;
            for (
              e =
                this.arguments &&
                this.arguments.map(function (a) {
                  return { name: a.name, value: a.value.eval(b) };
                }),
                f = 0;
              f < b.frames.length;
              f++
            )
              if ((c = b.frames[f].find(this.selector)).length > 0) {
                for (j = !0, g = 0; g < c.length; g++) {
                  for (d = c[g], i = !1, h = 0; h < b.frames.length; h++)
                    if (
                      !(d instanceof a.mixin.Definition) &&
                      d === (b.frames[h].originalRuleset || b.frames[h])
                    ) {
                      i = !0;
                      break;
                    }
                  if (!i && d.matchArgs(e, b)) {
                    if (!d.matchCondition || d.matchCondition(e, b))
                      try {
                        d instanceof a.mixin.Definition ||
                          ((d = new a.mixin.Definition(
                            "",
                            [],
                            d.rules,
                            null,
                            !1
                          )),
                          (d.originalRuleset = c[g].originalRuleset || c[g])),
                          Array.prototype.push.apply(
                            l,
                            d.eval(b, e, this.important).rules
                          );
                      } catch (n) {
                        throw {
                          message: n.message,
                          index: this.index,
                          filename: this.currentFileInfo.filename,
                          stack: n.stack,
                        };
                      }
                    m = !0;
                  }
                }
                if (m) {
                  if (!this.currentFileInfo || !this.currentFileInfo.reference)
                    for (f = 0; f < l.length; f++)
                      (k = l[f]), k.markReferenced && k.markReferenced();
                  return l;
                }
              }
            throw j
              ? {
                  type: "Runtime",
                  message:
                    "No matching definition was found for `" +
                    this.selector.toCSS().trim() +
                    "(" +
                    (e
                      ? e
                          .map(function (a) {
                            var b = "";
                            return (
                              a.name && (b += a.name + ":"),
                              (b += a.value.toCSS ? a.value.toCSS() : "???")
                            );
                          })
                          .join(", ")
                      : "") +
                    ")`",
                  index: this.index,
                  filename: this.currentFileInfo.filename,
                }
              : {
                  type: "Name",
                  message: this.selector.toCSS().trim() + " is undefined",
                  index: this.index,
                  filename: this.currentFileInfo.filename,
                };
          },
        }),
        (a.mixin.Definition = function (b, c, d, e, f) {
          (this.name = b),
            (this.selectors = [
              new a.Selector([
                new a.Element(null, b, this.index, this.currentFileInfo),
              ]),
            ]),
            (this.params = c),
            (this.condition = e),
            (this.variadic = f),
            (this.arity = c.length),
            (this.rules = d),
            (this._lookups = {}),
            (this.required = c.reduce(function (a, b) {
              return !b.name || (b.name && !b.value) ? a + 1 : a;
            }, 0)),
            (this.parent = a.Ruleset.prototype),
            (this.frames = []);
        }),
        (a.mixin.Definition.prototype = {
          type: "MixinDefinition",
          accept: function (a) {
            (this.params = a.visit(this.params)),
              (this.rules = a.visit(this.rules)),
              (this.condition = a.visit(this.condition));
          },
          variable: function (a) {
            return this.parent.variable.call(this, a);
          },
          variables: function () {
            return this.parent.variables.call(this);
          },
          find: function () {
            return this.parent.find.apply(this, arguments);
          },
          rulesets: function () {
            return this.parent.rulesets.apply(this);
          },
          evalParams: function (b, c, d, e) {
            var f,
              g,
              h,
              i,
              j,
              k,
              l,
              m,
              n = new a.Ruleset(null, []),
              o = this.params.slice(0);
            if (((c = new a.evalEnv(c, [n].concat(c.frames))), d))
              for (d = d.slice(0), h = 0; h < d.length; h++)
                if (((g = d[h]), (k = g && g.name))) {
                  for (l = !1, i = 0; i < o.length; i++)
                    if (!e[i] && k === o[i].name) {
                      (e[i] = g.value.eval(b)),
                        n.rules.unshift(new a.Rule(k, g.value.eval(b))),
                        (l = !0);
                      break;
                    }
                  if (l) {
                    d.splice(h, 1), h--;
                    continue;
                  }
                  throw {
                    type: "Runtime",
                    message:
                      "Named argument for " +
                      this.name +
                      " " +
                      d[h].name +
                      " not found",
                  };
                }
            for (m = 0, h = 0; h < o.length; h++)
              if (!e[h]) {
                if (((g = d && d[m]), (k = o[h].name)))
                  if (o[h].variadic && d) {
                    for (f = [], i = m; i < d.length; i++)
                      f.push(d[i].value.eval(b));
                    n.rules.unshift(new a.Rule(k, new a.Expression(f).eval(b)));
                  } else {
                    if ((j = g && g.value)) j = j.eval(b);
                    else {
                      if (!o[h].value)
                        throw {
                          type: "Runtime",
                          message:
                            "wrong number of arguments for " +
                            this.name +
                            " (" +
                            d.length +
                            " for " +
                            this.arity +
                            ")",
                        };
                      (j = o[h].value.eval(c)), n.resetCache();
                    }
                    n.rules.unshift(new a.Rule(k, j)), (e[h] = j);
                  }
                if (o[h].variadic && d)
                  for (i = m; i < d.length; i++) e[i] = d[i].value.eval(b);
                m++;
              }
            return n;
          },
          eval: function (b, c, d) {
            var e,
              f,
              g = [],
              h = this.frames.concat(b.frames),
              i = this.evalParams(b, new a.evalEnv(b, h), c, g);
            return (
              i.rules.unshift(
                new a.Rule("@arguments", new a.Expression(g).eval(b))
              ),
              (e = this.rules.slice(0)),
              (f = new a.Ruleset(null, e)),
              (f.originalRuleset = this),
              (f = f.eval(new a.evalEnv(b, [this, i].concat(h)))),
              d && (f = this.parent.makeImportant.apply(f)),
              f
            );
          },
          matchCondition: function (b, c) {
            return this.condition &&
              !this.condition.eval(
                new a.evalEnv(
                  c,
                  [
                    this.evalParams(
                      c,
                      new a.evalEnv(c, this.frames.concat(c.frames)),
                      b,
                      []
                    ),
                  ]
                    .concat(this.frames)
                    .concat(c.frames)
                )
              )
              ? !1
              : !0;
          },
          matchArgs: function (a, b) {
            var c,
              d = (a && a.length) || 0;
            if (this.variadic) {
              if (d < this.required - 1) return !1;
            } else {
              if (d < this.required) return !1;
              if (d > this.params.length) return !1;
            }
            c = Math.min(d, this.arity);
            for (var e = 0; c > e; e++)
              if (
                !this.params[e].name &&
                !this.params[e].variadic &&
                a[e].value.eval(b).toCSS() !=
                  this.params[e].value.eval(b).toCSS()
              )
                return !1;
            return !0;
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Negative = function (a) {
        this.value = a;
      }),
        (a.Negative.prototype = {
          type: "Negative",
          accept: function (a) {
            this.value = a.visit(this.value);
          },
          genCSS: function (a, b) {
            b.add("-"), this.value.genCSS(a, b);
          },
          toCSS: a.toCSS,
          eval: function (b) {
            return b.isMathOn()
              ? new a.Operation("*", [new a.Dimension(-1), this.value]).eval(b)
              : new a.Negative(this.value.eval(b));
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Operation = function (a, b, c) {
        (this.op = a.trim()), (this.operands = b), (this.isSpaced = c);
      }),
        (a.Operation.prototype = {
          type: "Operation",
          accept: function (a) {
            this.operands = a.visit(this.operands);
          },
          eval: function (b) {
            var c,
              d = this.operands[0].eval(b),
              e = this.operands[1].eval(b);
            if (b.isMathOn()) {
              if (d instanceof a.Dimension && e instanceof a.Color) {
                if ("*" !== this.op && "+" !== this.op)
                  throw {
                    type: "Operation",
                    message: "Can't substract or divide a color from a number",
                  };
                (c = e), (e = d), (d = c);
              }
              if (!d.operate)
                throw {
                  type: "Operation",
                  message: "Operation on an invalid type",
                };
              return d.operate(b, this.op, e);
            }
            return new a.Operation(this.op, [d, e], this.isSpaced);
          },
          genCSS: function (a, b) {
            this.operands[0].genCSS(a, b),
              this.isSpaced && b.add(" "),
              b.add(this.op),
              this.isSpaced && b.add(" "),
              this.operands[1].genCSS(a, b);
          },
          toCSS: a.toCSS,
        }),
        (a.operate = function (a, b, c, d) {
          switch (b) {
            case "+":
              return c + d;
            case "-":
              return c - d;
            case "*":
              return c * d;
            case "/":
              return c / d;
          }
        });
    })(c("../tree")),
    (function (a) {
      (a.Paren = function (a) {
        this.value = a;
      }),
        (a.Paren.prototype = {
          type: "Paren",
          accept: function (a) {
            this.value = a.visit(this.value);
          },
          genCSS: function (a, b) {
            b.add("("), this.value.genCSS(a, b), b.add(")");
          },
          toCSS: a.toCSS,
          eval: function (b) {
            return new a.Paren(this.value.eval(b));
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Quoted = function (a, b, c, d, e) {
        (this.escaped = c),
          (this.value = b || ""),
          (this.quote = a.charAt(0)),
          (this.index = d),
          (this.currentFileInfo = e);
      }),
        (a.Quoted.prototype = {
          type: "Quoted",
          genCSS: function (a, b) {
            this.escaped || b.add(this.quote, this.currentFileInfo, this.index),
              b.add(this.value),
              this.escaped || b.add(this.quote);
          },
          toCSS: a.toCSS,
          eval: function (b) {
            var c = this,
              d = this.value
                .replace(/`([^`]+)`/g, function (d, e) {
                  return new a.JavaScript(e, c.index, !0).eval(b).value;
                })
                .replace(/@\{([\w-]+)\}/g, function (d, e) {
                  var f = new a.Variable(
                    "@" + e,
                    c.index,
                    c.currentFileInfo
                  ).eval(b, !0);
                  return f instanceof a.Quoted ? f.value : f.toCSS();
                });
            return new a.Quoted(
              this.quote + d + this.quote,
              d,
              this.escaped,
              this.index,
              this.currentFileInfo
            );
          },
          compare: function (a) {
            if (!a.toCSS) return -1;
            var b = this.toCSS(),
              c = a.toCSS();
            return b === c ? 0 : c > b ? -1 : 1;
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Rule = function (b, c, d, e, f, g, h) {
        (this.name = b),
          (this.value = c instanceof a.Value ? c : new a.Value([c])),
          (this.important = d ? " " + d.trim() : ""),
          (this.merge = e),
          (this.index = f),
          (this.currentFileInfo = g),
          (this.inline = h || !1),
          (this.variable = "@" === b.charAt(0));
      }),
        (a.Rule.prototype = {
          type: "Rule",
          accept: function (a) {
            this.value = a.visit(this.value);
          },
          genCSS: function (a, b) {
            b.add(
              this.name + (a.compress ? ":" : ": "),
              this.currentFileInfo,
              this.index
            );
            try {
              this.value.genCSS(a, b);
            } catch (c) {
              throw (
                ((c.index = this.index),
                (c.filename = this.currentFileInfo.filename),
                c)
              );
            }
            b.add(
              this.important +
                (this.inline || (a.lastRule && a.compress) ? "" : ";"),
              this.currentFileInfo,
              this.index
            );
          },
          toCSS: a.toCSS,
          eval: function (b) {
            var c = !1;
            "font" !== this.name ||
              b.strictMath ||
              ((c = !0), (b.strictMath = !0));
            try {
              return new a.Rule(
                this.name,
                this.value.eval(b),
                this.important,
                this.merge,
                this.index,
                this.currentFileInfo,
                this.inline
              );
            } finally {
              c && (b.strictMath = !1);
            }
          },
          makeImportant: function () {
            return new a.Rule(
              this.name,
              this.value,
              "!important",
              this.merge,
              this.index,
              this.currentFileInfo,
              this.inline
            );
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Ruleset = function (a, b, c) {
        (this.selectors = a),
          (this.rules = b),
          (this._lookups = {}),
          (this.strictImports = c);
      }),
        (a.Ruleset.prototype = {
          type: "Ruleset",
          accept: function (a) {
            if (this.paths)
              for (var b = 0; b < this.paths.length; b++)
                this.paths[b] = a.visit(this.paths[b]);
            else this.selectors = a.visit(this.selectors);
            this.rules = a.visit(this.rules);
          },
          eval: function (b) {
            var c,
              d,
              e,
              f =
                this.selectors &&
                this.selectors.map(function (a) {
                  return a.eval(b);
                }),
              g = new a.Ruleset(f, this.rules.slice(0), this.strictImports);
            for (
              g.originalRuleset = this,
                g.root = this.root,
                g.firstRoot = this.firstRoot,
                g.allowImports = this.allowImports,
                this.debugInfo && (g.debugInfo = this.debugInfo),
                b.frames.unshift(g),
                b.selectors || (b.selectors = []),
                b.selectors.unshift(this.selectors),
                (g.root || g.allowImports || !g.strictImports) &&
                  g.evalImports(b),
                e = 0;
              e < g.rules.length;
              e++
            )
              g.rules[e] instanceof a.mixin.Definition &&
                (g.rules[e].frames = b.frames.slice(0));
            var h = (b.mediaBlocks && b.mediaBlocks.length) || 0;
            for (e = 0; e < g.rules.length; e++)
              g.rules[e] instanceof a.mixin.Call &&
                ((c = g.rules[e].eval(b).filter(function (b) {
                  return b instanceof a.Rule && b.variable
                    ? !g.variable(b.name)
                    : !0;
                })),
                g.rules.splice.apply(g.rules, [e, 1].concat(c)),
                (e += c.length - 1),
                g.resetCache());
            for (e = 0; e < g.rules.length; e++)
              (d = g.rules[e]),
                d instanceof a.mixin.Definition ||
                  (g.rules[e] = d.eval ? d.eval(b) : d);
            if ((b.frames.shift(), b.selectors.shift(), b.mediaBlocks))
              for (e = h; e < b.mediaBlocks.length; e++)
                b.mediaBlocks[e].bubbleSelectors(f);
            return g;
          },
          evalImports: function (b) {
            var c, d;
            for (c = 0; c < this.rules.length; c++)
              this.rules[c] instanceof a.Import &&
                ((d = this.rules[c].eval(b)),
                "number" == typeof d.length
                  ? (this.rules.splice.apply(this.rules, [c, 1].concat(d)),
                    (c += d.length - 1))
                  : this.rules.splice(c, 1, d),
                this.resetCache());
          },
          makeImportant: function () {
            return new a.Ruleset(
              this.selectors,
              this.rules.map(function (a) {
                return a.makeImportant ? a.makeImportant() : a;
              }),
              this.strictImports
            );
          },
          matchArgs: function (a) {
            return !a || 0 === a.length;
          },
          matchCondition: function (b, c) {
            var d = this.selectors[this.selectors.length - 1];
            return d.condition && !d.condition.eval(new a.evalEnv(c, c.frames))
              ? !1
              : !0;
          },
          resetCache: function () {
            (this._rulesets = null),
              (this._variables = null),
              (this._lookups = {});
          },
          variables: function () {
            return this._variables
              ? this._variables
              : (this._variables = this.rules.reduce(function (b, c) {
                  return (
                    c instanceof a.Rule && c.variable === !0 && (b[c.name] = c),
                    b
                  );
                }, {}));
          },
          variable: function (a) {
            return this.variables()[a];
          },
          rulesets: function () {
            return this.rules.filter(function (b) {
              return b instanceof a.Ruleset || b instanceof a.mixin.Definition;
            });
          },
          find: function (b, c) {
            c = c || this;
            var d,
              e = [],
              f = b.toCSS();
            return f in this._lookups
              ? this._lookups[f]
              : (this.rulesets().forEach(function (f) {
                  if (f !== c)
                    for (var g = 0; g < f.selectors.length; g++)
                      if ((d = b.match(f.selectors[g]))) {
                        b.elements.length > d
                          ? Array.prototype.push.apply(
                              e,
                              f.find(new a.Selector(b.elements.slice(d)), c)
                            )
                          : e.push(f);
                        break;
                      }
                }),
                (this._lookups[f] = e));
          },
          genCSS: function (b, c) {
            var d,
              e,
              f,
              g,
              h,
              i = [],
              j = [],
              k = !0;
            (b.tabLevel = b.tabLevel || 0), this.root || b.tabLevel++;
            var l = b.compress ? "" : Array(b.tabLevel + 1).join("  "),
              m = b.compress ? "" : Array(b.tabLevel).join("  ");
            for (d = 0; d < this.rules.length; d++)
              (g = this.rules[d]),
                g.rules ||
                g instanceof a.Media ||
                g instanceof a.Directive ||
                (this.root && g instanceof a.Comment)
                  ? j.push(g)
                  : i.push(g);
            if (!this.root) {
              for (
                f = a.debugInfo(b, this, m), f && (c.add(f), c.add(m)), d = 0;
                d < this.paths.length;
                d++
              ) {
                for (
                  h = this.paths[d], b.firstSelector = !0, e = 0;
                  e < h.length;
                  e++
                )
                  h[e].genCSS(b, c), (b.firstSelector = !1);
                d + 1 < this.paths.length &&
                  c.add(b.compress ? "," : ",\n" + m);
              }
              c.add((b.compress ? "{" : " {\n") + l);
            }
            for (d = 0; d < i.length; d++)
              (g = i[d]),
                d + 1 !== i.length ||
                  (this.root && 0 !== j.length && !this.firstRoot) ||
                  (b.lastRule = !0),
                g.genCSS
                  ? g.genCSS(b, c)
                  : g.value && c.add(g.value.toString()),
                b.lastRule
                  ? (b.lastRule = !1)
                  : c.add(b.compress ? "" : "\n" + l);
            for (
              this.root ||
                (c.add(b.compress ? "}" : "\n" + m + "}"), b.tabLevel--),
                d = 0;
              d < j.length;
              d++
            )
              i.length &&
                k &&
                c.add((b.compress ? "" : "\n") + (this.root ? l : m)),
                k || c.add((b.compress ? "" : "\n") + (this.root ? l : m)),
                (k = !1),
                j[d].genCSS(b, c);
            c.isEmpty() || b.compress || !this.firstRoot || c.add("\n");
          },
          toCSS: a.toCSS,
          markReferenced: function () {
            for (var a = 0; a < this.selectors.length; a++)
              this.selectors[a].markReferenced();
          },
          joinSelectors: function (a, b, c) {
            for (var d = 0; d < c.length; d++) this.joinSelector(a, b, c[d]);
          },
          joinSelector: function (b, c, d) {
            var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s;
            for (e = 0; e < d.elements.length; e++)
              (j = d.elements[e]), "&" === j.value && (h = !0);
            if (h) {
              for (r = [], i = [[]], e = 0; e < d.elements.length; e++)
                if (((j = d.elements[e]), "&" !== j.value)) r.push(j);
                else {
                  for (
                    s = [],
                      r.length > 0 && this.mergeElementsOnToSelectors(r, i),
                      f = 0;
                    f < i.length;
                    f++
                  )
                    if (((k = i[f]), 0 === c.length))
                      k.length > 0 &&
                        ((k[0].elements = k[0].elements.slice(0)),
                        k[0].elements.push(
                          new a.Element(
                            j.combinator,
                            "",
                            0,
                            j.index,
                            j.currentFileInfo
                          )
                        )),
                        s.push(k);
                    else
                      for (g = 0; g < c.length; g++)
                        (l = c[g]),
                          (m = []),
                          (n = []),
                          (p = !0),
                          k.length > 0
                            ? ((m = k.slice(0)),
                              (q = m.pop()),
                              (o = d.createDerived(q.elements.slice(0))),
                              (p = !1))
                            : (o = d.createDerived([])),
                          l.length > 1 && (n = n.concat(l.slice(1))),
                          l.length > 0 &&
                            ((p = !1),
                            o.elements.push(
                              new a.Element(
                                j.combinator,
                                l[0].elements[0].value,
                                j.index,
                                j.currentFileInfo
                              )
                            ),
                            (o.elements = o.elements.concat(
                              l[0].elements.slice(1)
                            ))),
                          p || m.push(o),
                          (m = m.concat(n)),
                          s.push(m);
                  (i = s), (r = []);
                }
              for (
                r.length > 0 && this.mergeElementsOnToSelectors(r, i), e = 0;
                e < i.length;
                e++
              )
                i[e].length > 0 && b.push(i[e]);
            } else if (c.length > 0)
              for (e = 0; e < c.length; e++) b.push(c[e].concat(d));
            else b.push([d]);
          },
          mergeElementsOnToSelectors: function (b, c) {
            var d, e;
            if (0 === c.length) return c.push([new a.Selector(b)]), void 0;
            for (d = 0; d < c.length; d++)
              (e = c[d]),
                e.length > 0
                  ? (e[e.length - 1] = e[e.length - 1].createDerived(
                      e[e.length - 1].elements.concat(b)
                    ))
                  : e.push(new a.Selector(b));
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Selector = function (a, b, c, d, e, f) {
        (this.elements = a),
          (this.extendList = b || []),
          (this.condition = c),
          (this.currentFileInfo = e || {}),
          (this.isReferenced = f),
          c || (this.evaldCondition = !0);
      }),
        (a.Selector.prototype = {
          type: "Selector",
          accept: function (a) {
            (this.elements = a.visit(this.elements)),
              (this.extendList = a.visit(this.extendList)),
              (this.condition = a.visit(this.condition));
          },
          createDerived: function (b, c, d) {
            d = null != d ? d : this.evaldCondition;
            var e = new a.Selector(
              b,
              c || this.extendList,
              this.condition,
              this.index,
              this.currentFileInfo,
              this.isReferenced
            );
            return (e.evaldCondition = d), e;
          },
          match: function (a) {
            var b,
              c,
              d,
              e,
              f = this.elements,
              g = f.length;
            if (
              ((b = a.elements.slice(
                a.elements.length && "&" === a.elements[0].value ? 1 : 0
              )),
              (c = b.length),
              (d = Math.min(g, c)),
              0 === c || c > g)
            )
              return 0;
            for (e = 0; d > e; e++) if (f[e].value !== b[e].value) return 0;
            return d;
          },
          eval: function (a) {
            var b = this.condition && this.condition.eval(a);
            return this.createDerived(
              this.elements.map(function (b) {
                return b.eval(a);
              }),
              this.extendList.map(function (b) {
                return b.eval(a);
              }),
              b
            );
          },
          genCSS: function (a, b) {
            var c, d;
            if (
              ((a && a.firstSelector) ||
                "" !== this.elements[0].combinator.value ||
                b.add(" ", this.currentFileInfo, this.index),
              !this._css)
            )
              for (c = 0; c < this.elements.length; c++)
                (d = this.elements[c]), d.genCSS(a, b);
          },
          toCSS: a.toCSS,
          markReferenced: function () {
            this.isReferenced = !0;
          },
          getIsReferenced: function () {
            return !this.currentFileInfo.reference || this.isReferenced;
          },
          getIsOutput: function () {
            return this.evaldCondition;
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.UnicodeDescriptor = function (a) {
        this.value = a;
      }),
        (a.UnicodeDescriptor.prototype = {
          type: "UnicodeDescriptor",
          genCSS: function (a, b) {
            b.add(this.value);
          },
          toCSS: a.toCSS,
          eval: function () {
            return this;
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.URL = function (a, b) {
        (this.value = a), (this.currentFileInfo = b);
      }),
        (a.URL.prototype = {
          type: "Url",
          accept: function (a) {
            this.value = a.visit(this.value);
          },
          genCSS: function (a, b) {
            b.add("url("), this.value.genCSS(a, b), b.add(")");
          },
          toCSS: a.toCSS,
          eval: function (b) {
            var c,
              d = this.value.eval(b);
            return (
              (c = this.currentFileInfo && this.currentFileInfo.rootpath),
              c &&
                "string" == typeof d.value &&
                b.isPathRelative(d.value) &&
                (d.quote ||
                  (c = c.replace(/[\(\)'"\s]/g, function (a) {
                    return "\\" + a;
                  })),
                (d.value = c + d.value)),
              (d.value = b.normalizePath(d.value)),
              new a.URL(d, null)
            );
          },
        });
    })(c("../tree")),
    (function (a) {
      (a.Value = function (a) {
        this.value = a;
      }),
        (a.Value.prototype = {
          type: "Value",
          accept: function (a) {
            this.value = a.visit(this.value);
          },
          eval: function (b) {
            return 1 === this.value.length
              ? this.value[0].eval(b)
              : new a.Value(
                  this.value.map(function (a) {
                    return a.eval(b);
                  })
                );
          },
          genCSS: function (a, b) {
            var c;
            for (c = 0; c < this.value.length; c++)
              this.value[c].genCSS(a, b),
                c + 1 < this.value.length &&
                  b.add(a && a.compress ? "," : ", ");
          },
          toCSS: a.toCSS,
        });
    })(c("../tree")),
    (function (a) {
      (a.Variable = function (a, b, c) {
        (this.name = a), (this.index = b), (this.currentFileInfo = c);
      }),
        (a.Variable.prototype = {
          type: "Variable",
          eval: function (b) {
            var c,
              d,
              e = this.name;
            if (
              (0 === e.indexOf("@@") &&
                (e = "@" + new a.Variable(e.slice(1)).eval(b).value),
              this.evaluating)
            )
              throw {
                type: "Name",
                message: "Recursive variable definition for " + e,
                filename: this.currentFileInfo.file,
                index: this.index,
              };
            if (
              ((this.evaluating = !0),
              (c = a.find(b.frames, function (a) {
                return (d = a.variable(e)) ? d.value.eval(b) : void 0;
              })))
            )
              return (this.evaluating = !1), c;
            throw {
              type: "Name",
              message: "variable " + e + " is undefined",
              filename: this.currentFileInfo.filename,
              index: this.index,
            };
          },
        });
    })(c("../tree")),
    (function (a) {
      var b = [
        "paths",
        "optimization",
        "files",
        "contents",
        "relativeUrls",
        "rootpath",
        "strictImports",
        "insecure",
        "dumpLineNumbers",
        "compress",
        "processImports",
        "syncImport",
        "javascriptEnabled",
        "mime",
        "useFileCache",
        "currentFileInfo",
      ];
      a.parseEnv = function (a) {
        if (
          (d(a, this, b),
          this.contents || (this.contents = {}),
          this.files || (this.files = {}),
          !this.currentFileInfo)
        ) {
          var c = (a && a.filename) || "input",
            e = c.replace(/[^\/\\]*$/, "");
          a && (a.filename = null),
            (this.currentFileInfo = {
              filename: c,
              relativeUrls: this.relativeUrls,
              rootpath: (a && a.rootpath) || "",
              currentDirectory: e,
              entryPath: e,
              rootFilename: c,
            });
        }
      };
      var c = [
        "silent",
        "verbose",
        "compress",
        "yuicompress",
        "ieCompat",
        "strictMath",
        "strictUnits",
        "cleancss",
        "sourceMap",
        "importMultiple",
      ];
      (a.evalEnv = function (a, b) {
        d(a, this, c), (this.frames = b || []);
      }),
        (a.evalEnv.prototype.inParenthesis = function () {
          this.parensStack || (this.parensStack = []),
            this.parensStack.push(!0);
        }),
        (a.evalEnv.prototype.outOfParenthesis = function () {
          this.parensStack.pop();
        }),
        (a.evalEnv.prototype.isMathOn = function () {
          return this.strictMath
            ? this.parensStack && this.parensStack.length
            : !0;
        }),
        (a.evalEnv.prototype.isPathRelative = function (a) {
          return !/^(?:[a-z-]+:|\/)/.test(a);
        }),
        (a.evalEnv.prototype.normalizePath = function (a) {
          var b,
            c = a.split("/").reverse();
          for (a = []; 0 !== c.length; )
            switch ((b = c.pop())) {
              case ".":
                break;
              case "..":
                0 === a.length || ".." === a[a.length - 1]
                  ? a.push(b)
                  : a.pop();
                break;
              default:
                a.push(b);
            }
          return a.join("/");
        });
      var d = function (a, b, c) {
        if (a)
          for (var d = 0; d < c.length; d++)
            a.hasOwnProperty(c[d]) && (b[c[d]] = a[c[d]]);
      };
    })(c("./tree")),
    (function (a) {
      (a.visitor = function (a) {
        this._implementation = a;
      }),
        (a.visitor.prototype = {
          visit: function (a) {
            if (a instanceof Array) return this.visitArray(a);
            if (!a || !a.type) return a;
            var b,
              c,
              d = "visit" + a.type,
              e = this._implementation[d];
            return (
              e &&
                ((b = { visitDeeper: !0 }),
                (c = e.call(this._implementation, a, b)),
                this._implementation.isReplacing && (a = c)),
              (!b || b.visitDeeper) && a && a.accept && a.accept(this),
              (d += "Out"),
              this._implementation[d] && this._implementation[d](a),
              a
            );
          },
          visitArray: function (a) {
            var b,
              c = [];
            for (b = 0; b < a.length; b++) {
              var d = this.visit(a[b]);
              d instanceof Array
                ? ((d = this.flatten(d)), (c = c.concat(d)))
                : c.push(d);
            }
            return this._implementation.isReplacing ? c : a;
          },
          doAccept: function (a) {
            a.accept(this);
          },
          flatten: function (a, b) {
            return a.reduce(this.flattenReduce.bind(this), b || []);
          },
          flattenReduce: function (a, b) {
            return b instanceof Array ? (a = this.flatten(b, a)) : a.push(b), a;
          },
        });
    })(c("./tree")),
    (function (a) {
      (a.importVisitor = function (b, c, d) {
        (this._visitor = new a.visitor(this)),
          (this._importer = b),
          (this._finish = c),
          (this.env = d || new a.evalEnv()),
          (this.importCount = 0);
      }),
        (a.importVisitor.prototype = {
          isReplacing: !0,
          run: function (a) {
            var b;
            try {
              this._visitor.visit(a);
            } catch (c) {
              b = c;
            }
            (this.isFinished = !0), 0 === this.importCount && this._finish(b);
          },
          visitImport: function (b, c) {
            var d,
              e = this,
              f = b.options.inline;
            if (!b.css || f) {
              try {
                d = b.evalForImport(this.env);
              } catch (g) {
                g.filename ||
                  ((g.index = b.index),
                  (g.filename = b.currentFileInfo.filename)),
                  (b.css = !0),
                  (b.error = g);
              }
              if (d && (!d.css || f)) {
                (b = d), this.importCount++;
                var h = new a.evalEnv(this.env, this.env.frames.slice(0));
                b.options.multiple && (h.importMultiple = !0),
                  this._importer.push(
                    b.getPath(),
                    b.currentFileInfo,
                    b.options,
                    function (c, d, g, i) {
                      c &&
                        !c.filename &&
                        ((c.index = b.index),
                        (c.filename = b.currentFileInfo.filename)),
                        g && !h.importMultiple && (b.skip = g);
                      var j = function (a) {
                        e.importCount--,
                          0 === e.importCount && e.isFinished && e._finish(a);
                      };
                      return !d ||
                        ((b.root = d), (b.importedFilename = i), f || b.skip)
                        ? (j(), void 0)
                        : (new a.importVisitor(e._importer, j, h).run(d),
                          void 0);
                    }
                  );
              }
            }
            return (c.visitDeeper = !1), b;
          },
          visitRule: function (a, b) {
            return (b.visitDeeper = !1), a;
          },
          visitDirective: function (a) {
            return this.env.frames.unshift(a), a;
          },
          visitDirectiveOut: function () {
            this.env.frames.shift();
          },
          visitMixinDefinition: function (a) {
            return this.env.frames.unshift(a), a;
          },
          visitMixinDefinitionOut: function () {
            this.env.frames.shift();
          },
          visitRuleset: function (a) {
            return this.env.frames.unshift(a), a;
          },
          visitRulesetOut: function () {
            this.env.frames.shift();
          },
          visitMedia: function (a) {
            return this.env.frames.unshift(a.ruleset), a;
          },
          visitMediaOut: function () {
            this.env.frames.shift();
          },
        });
    })(c("./tree")),
    (function (a) {
      (a.joinSelectorVisitor = function () {
        (this.contexts = [[]]), (this._visitor = new a.visitor(this));
      }),
        (a.joinSelectorVisitor.prototype = {
          run: function (a) {
            return this._visitor.visit(a);
          },
          visitRule: function (a, b) {
            b.visitDeeper = !1;
          },
          visitMixinDefinition: function (a, b) {
            b.visitDeeper = !1;
          },
          visitRuleset: function (a) {
            var b = this.contexts[this.contexts.length - 1],
              c = [];
            this.contexts.push(c),
              a.root ||
                ((a.selectors = a.selectors.filter(function (a) {
                  return a.getIsOutput();
                })),
                0 === a.selectors.length && (a.rules.length = 0),
                a.joinSelectors(c, b, a.selectors),
                (a.paths = c));
          },
          visitRulesetOut: function () {
            this.contexts.length = this.contexts.length - 1;
          },
          visitMedia: function (a) {
            var b = this.contexts[this.contexts.length - 1];
            a.rules[0].root = 0 === b.length || b[0].multiMedia;
          },
        });
    })(c("./tree")),
    (function (a) {
      (a.toCSSVisitor = function (b) {
        (this._visitor = new a.visitor(this)), (this._env = b);
      }),
        (a.toCSSVisitor.prototype = {
          isReplacing: !0,
          run: function (a) {
            return this._visitor.visit(a);
          },
          visitRule: function (a) {
            return a.variable ? [] : a;
          },
          visitMixinDefinition: function () {
            return [];
          },
          visitExtend: function () {
            return [];
          },
          visitComment: function (a) {
            return a.isSilent(this._env) ? [] : a;
          },
          visitMedia: function (a, b) {
            return (
              a.accept(this._visitor),
              (b.visitDeeper = !1),
              a.rules.length ? a : []
            );
          },
          visitDirective: function (b) {
            if (b.currentFileInfo.reference && !b.isReferenced) return [];
            if ("@charset" === b.name) {
              if (this.charset) {
                if (b.debugInfo) {
                  var c = new a.Comment(
                    "/* " + b.toCSS(this._env).replace(/\n/g, "") + " */\n"
                  );
                  return (c.debugInfo = b.debugInfo), this._visitor.visit(c);
                }
                return [];
              }
              this.charset = !0;
            }
            return b;
          },
          checkPropertiesInRoot: function (b) {
            for (var c, d = 0; d < b.length; d++)
              if (((c = b[d]), c instanceof a.Rule && !c.variable))
                throw {
                  message:
                    "properties must be inside selector blocks, they cannot be in the root.",
                  index: c.index,
                  filename: c.currentFileInfo
                    ? c.currentFileInfo.filename
                    : null,
                };
          },
          visitRuleset: function (b, c) {
            var d,
              e = [];
            if ((b.firstRoot && this.checkPropertiesInRoot(b.rules), b.root))
              b.accept(this._visitor),
                (c.visitDeeper = !1),
                (b.firstRoot || b.rules.length > 0) && e.splice(0, 0, b);
            else {
              b.paths = b.paths.filter(function (b) {
                var c;
                for (
                  " " === b[0].elements[0].combinator.value &&
                    (b[0].elements[0].combinator = new a.Combinator("")),
                    c = 0;
                  c < b.length;
                  c++
                )
                  return b[c].getIsReferenced() && b[c].getIsOutput() ? !0 : !1;
              });
              for (var f = 0; f < b.rules.length; f++)
                (d = b.rules[f]),
                  d.rules &&
                    (e.push(this._visitor.visit(d)), b.rules.splice(f, 1), f--);
              b.rules.length > 0 && b.accept(this._visitor),
                (c.visitDeeper = !1),
                this._mergeRules(b.rules),
                this._removeDuplicateRules(b.rules),
                b.rules.length > 0 && b.paths.length > 0 && e.splice(0, 0, b);
            }
            return 1 === e.length ? e[0] : e;
          },
          _removeDuplicateRules: function (b) {
            var c,
              d,
              e,
              f = {};
            for (e = b.length - 1; e >= 0; e--)
              if (((d = b[e]), d instanceof a.Rule))
                if (f[d.name]) {
                  (c = f[d.name]),
                    c instanceof a.Rule &&
                      (c = f[d.name] = [f[d.name].toCSS(this._env)]);
                  var g = d.toCSS(this._env);
                  -1 !== c.indexOf(g) ? b.splice(e, 1) : c.push(g);
                } else f[d.name] = d;
          },
          _mergeRules: function (b) {
            for (var c, d, e, f = {}, g = 0; g < b.length; g++)
              (d = b[g]),
                d instanceof a.Rule &&
                  d.merge &&
                  ((e = [d.name, d.important ? "!" : ""].join(",")),
                  f[e] ? b.splice(g--, 1) : (c = f[e] = []),
                  c.push(d));
            Object.keys(f).map(function (b) {
              (c = f[b]),
                c.length > 1 &&
                  ((d = c[0]),
                  (d.value = new a.Value(
                    c.map(function (a) {
                      return a.value;
                    })
                  )));
            });
          },
        });
    })(c("./tree")),
    (function (a) {
      (a.extendFinderVisitor = function () {
        (this._visitor = new a.visitor(this)),
          (this.contexts = []),
          (this.allExtendsStack = [[]]);
      }),
        (a.extendFinderVisitor.prototype = {
          run: function (a) {
            return (
              (a = this._visitor.visit(a)),
              (a.allExtends = this.allExtendsStack[0]),
              a
            );
          },
          visitRule: function (a, b) {
            b.visitDeeper = !1;
          },
          visitMixinDefinition: function (a, b) {
            b.visitDeeper = !1;
          },
          visitRuleset: function (b) {
            if (!b.root) {
              var c,
                d,
                e,
                f,
                g = [];
              for (c = 0; c < b.rules.length; c++)
                b.rules[c] instanceof a.Extend &&
                  (g.push(b.rules[c]), (b.extendOnEveryPath = !0));
              for (c = 0; c < b.paths.length; c++) {
                var h = b.paths[c],
                  i = h[h.length - 1];
                for (
                  f = i.extendList
                    .slice(0)
                    .concat(g)
                    .map(function (a) {
                      return a.clone();
                    }),
                    d = 0;
                  d < f.length;
                  d++
                )
                  (this.foundExtends = !0),
                    (e = f[d]),
                    e.findSelfSelectors(h),
                    (e.ruleset = b),
                    0 === d && (e.firstExtendOnThisSelectorPath = !0),
                    this.allExtendsStack[this.allExtendsStack.length - 1].push(
                      e
                    );
              }
              this.contexts.push(b.selectors);
            }
          },
          visitRulesetOut: function (a) {
            a.root || (this.contexts.length = this.contexts.length - 1);
          },
          visitMedia: function (a) {
            (a.allExtends = []), this.allExtendsStack.push(a.allExtends);
          },
          visitMediaOut: function () {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
          },
          visitDirective: function (a) {
            (a.allExtends = []), this.allExtendsStack.push(a.allExtends);
          },
          visitDirectiveOut: function () {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
          },
        }),
        (a.processExtendsVisitor = function () {
          this._visitor = new a.visitor(this);
        }),
        (a.processExtendsVisitor.prototype = {
          run: function (b) {
            var c = new a.extendFinderVisitor();
            return (
              c.run(b),
              c.foundExtends
                ? ((b.allExtends = b.allExtends.concat(
                    this.doExtendChaining(b.allExtends, b.allExtends)
                  )),
                  (this.allExtendsStack = [b.allExtends]),
                  this._visitor.visit(b))
                : b
            );
          },
          doExtendChaining: function (b, c, d) {
            var e,
              f,
              g,
              h,
              i,
              j,
              k,
              l,
              m = [],
              n = this;
            for (d = d || 0, e = 0; e < b.length; e++)
              for (f = 0; f < c.length; f++)
                (j = b[e]),
                  (k = c[f]),
                  this.inInheritanceChain(k, j) ||
                    ((i = [k.selfSelectors[0]]),
                    (g = n.findMatch(j, i)),
                    g.length &&
                      j.selfSelectors.forEach(function (b) {
                        (h = n.extendSelector(g, i, b)),
                          (l = new a.Extend(k.selector, k.option, 0)),
                          (l.selfSelectors = h),
                          (h[h.length - 1].extendList = [l]),
                          m.push(l),
                          (l.ruleset = k.ruleset),
                          (l.parents = [k, j]),
                          k.firstExtendOnThisSelectorPath &&
                            ((l.firstExtendOnThisSelectorPath = !0),
                            k.ruleset.paths.push(h));
                      }));
            if (m.length) {
              if ((this.extendChainCount++, d > 100)) {
                var o = "{unable to calculate}",
                  p = "{unable to calculate}";
                try {
                  (o = m[0].selfSelectors[0].toCSS()),
                    (p = m[0].selector.toCSS());
                } catch (q) {}
                throw {
                  message:
                    "extend circular reference detected. One of the circular extends is currently:" +
                    o +
                    ":extend(" +
                    p +
                    ")",
                };
              }
              return m.concat(n.doExtendChaining(m, c, d + 1));
            }
            return m;
          },
          inInheritanceChain: function (a, b) {
            if (a === b) return !0;
            if (b.parents) {
              if (this.inInheritanceChain(a, b.parents[0])) return !0;
              if (this.inInheritanceChain(a, b.parents[1])) return !0;
            }
            return !1;
          },
          visitRule: function (a, b) {
            b.visitDeeper = !1;
          },
          visitMixinDefinition: function (a, b) {
            b.visitDeeper = !1;
          },
          visitSelector: function (a, b) {
            b.visitDeeper = !1;
          },
          visitRuleset: function (a) {
            if (!a.root) {
              var b,
                c,
                d,
                e,
                f = this.allExtendsStack[this.allExtendsStack.length - 1],
                g = [],
                h = this;
              for (d = 0; d < f.length; d++)
                for (c = 0; c < a.paths.length; c++)
                  (e = a.paths[c]),
                    a.extendOnEveryPath ||
                      e[e.length - 1].extendList.length ||
                      ((b = this.findMatch(f[d], e)),
                      b.length &&
                        f[d].selfSelectors.forEach(function (a) {
                          g.push(h.extendSelector(b, e, a));
                        }));
              a.paths = a.paths.concat(g);
            }
          },
          findMatch: function (a, b) {
            var c,
              d,
              e,
              f,
              g,
              h,
              i,
              j = this,
              k = a.selector.elements,
              l = [],
              m = [];
            for (c = 0; c < b.length; c++)
              for (d = b[c], e = 0; e < d.elements.length; e++)
                for (
                  f = d.elements[e],
                    (a.allowBefore || (0 === c && 0 === e)) &&
                      l.push({
                        pathIndex: c,
                        index: e,
                        matched: 0,
                        initialCombinator: f.combinator,
                      }),
                    h = 0;
                  h < l.length;
                  h++
                )
                  (i = l[h]),
                    (g = f.combinator.value),
                    "" === g && 0 === e && (g = " "),
                    !j.isElementValuesEqual(k[i.matched].value, f.value) ||
                    (i.matched > 0 && k[i.matched].combinator.value !== g)
                      ? (i = null)
                      : i.matched++,
                    i &&
                      ((i.finished = i.matched === k.length),
                      i.finished &&
                        !a.allowAfter &&
                        (e + 1 < d.elements.length || c + 1 < b.length) &&
                        (i = null)),
                    i
                      ? i.finished &&
                        ((i.length = k.length),
                        (i.endPathIndex = c),
                        (i.endPathElementIndex = e + 1),
                        (l.length = 0),
                        m.push(i))
                      : (l.splice(h, 1), h--);
            return m;
          },
          isElementValuesEqual: function (b, c) {
            if ("string" == typeof b || "string" == typeof c) return b === c;
            if (b instanceof a.Attribute)
              return b.op !== c.op || b.key !== c.key
                ? !1
                : b.value && c.value
                ? ((b = b.value.value || b.value),
                  (c = c.value.value || c.value),
                  b === c)
                : b.value || c.value
                ? !1
                : !0;
            if (((b = b.value), (c = c.value), b instanceof a.Selector)) {
              if (
                !(c instanceof a.Selector) ||
                b.elements.length !== c.elements.length
              )
                return !1;
              for (var d = 0; d < b.elements.length; d++) {
                if (
                  b.elements[d].combinator.value !==
                    c.elements[d].combinator.value &&
                  (0 !== d ||
                    (b.elements[d].combinator.value || " ") !==
                      (c.elements[d].combinator.value || " "))
                )
                  return !1;
                if (
                  !this.isElementValuesEqual(
                    b.elements[d].value,
                    c.elements[d].value
                  )
                )
                  return !1;
              }
              return !0;
            }
            return !1;
          },
          extendSelector: function (b, c, d) {
            var e,
              f,
              g,
              h,
              i,
              j = 0,
              k = 0,
              l = [];
            for (e = 0; e < b.length; e++)
              (h = b[e]),
                (f = c[h.pathIndex]),
                (g = new a.Element(
                  h.initialCombinator,
                  d.elements[0].value,
                  d.elements[0].index,
                  d.elements[0].currentFileInfo
                )),
                h.pathIndex > j &&
                  k > 0 &&
                  ((l[l.length - 1].elements = l[l.length - 1].elements.concat(
                    c[j].elements.slice(k)
                  )),
                  (k = 0),
                  j++),
                (i = f.elements
                  .slice(k, h.index)
                  .concat([g])
                  .concat(d.elements.slice(1))),
                j === h.pathIndex && e > 0
                  ? (l[l.length - 1].elements =
                      l[l.length - 1].elements.concat(i))
                  : ((l = l.concat(c.slice(j, h.pathIndex))),
                    l.push(new a.Selector(i))),
                (j = h.endPathIndex),
                (k = h.endPathElementIndex),
                k >= c[j].elements.length && ((k = 0), j++);
            return (
              j < c.length &&
                k > 0 &&
                ((l[l.length - 1].elements = l[l.length - 1].elements.concat(
                  c[j].elements.slice(k)
                )),
                j++),
              (l = l.concat(c.slice(j, c.length)))
            );
          },
          visitRulesetOut: function () {},
          visitMedia: function (a) {
            var b = a.allExtends.concat(
              this.allExtendsStack[this.allExtendsStack.length - 1]
            );
            (b = b.concat(this.doExtendChaining(b, a.allExtends))),
              this.allExtendsStack.push(b);
          },
          visitMediaOut: function () {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
          },
          visitDirective: function (a) {
            var b = a.allExtends.concat(
              this.allExtendsStack[this.allExtendsStack.length - 1]
            );
            (b = b.concat(this.doExtendChaining(b, a.allExtends))),
              this.allExtendsStack.push(b);
          },
          visitDirectiveOut: function () {
            this.allExtendsStack.length = this.allExtendsStack.length - 1;
          },
        });
    })(c("./tree")),
    (function (a) {
      (a.sourceMapOutput = function (a) {
        (this._css = []),
          (this._rootNode = a.rootNode),
          (this._writeSourceMap = a.writeSourceMap),
          (this._contentsMap = a.contentsMap),
          (this._sourceMapFilename = a.sourceMapFilename),
          (this._outputFilename = a.outputFilename),
          (this._sourceMapURL = a.sourceMapURL),
          (this._sourceMapBasepath = a.sourceMapBasepath),
          (this._sourceMapRootpath = a.sourceMapRootpath),
          (this._outputSourceFiles = a.outputSourceFiles),
          (this._sourceMapGeneratorConstructor =
            a.sourceMapGenerator || c("source-map").SourceMapGenerator),
          this._sourceMapRootpath &&
            "/" !==
              this._sourceMapRootpath.charAt(
                this._sourceMapRootpath.length - 1
              ) &&
            (this._sourceMapRootpath += "/"),
          (this._lineNumber = 0),
          (this._column = 0);
      }),
        (a.sourceMapOutput.prototype.normalizeFilename = function (a) {
          return (
            this._sourceMapBasepath &&
              0 === a.indexOf(this._sourceMapBasepath) &&
              ((a = a.substring(this._sourceMapBasepath.length)),
              ("\\" === a.charAt(0) || "/" === a.charAt(0)) &&
                (a = a.substring(1))),
            (this._sourceMapRootpath || "") + a.replace(/\\/g, "/")
          );
        }),
        (a.sourceMapOutput.prototype.add = function (a, b, c, d) {
          if (a) {
            var e, f, g, h, i;
            if (b) {
              var j = this._contentsMap[b.filename].substring(0, c);
              (f = j.split("\n")), (h = f[f.length - 1]);
            }
            if (((e = a.split("\n")), (g = e[e.length - 1]), b))
              if (d)
                for (i = 0; i < e.length; i++)
                  this._sourceMapGenerator.addMapping({
                    generated: {
                      line: this._lineNumber + i + 1,
                      column: 0 === i ? this._column : 0,
                    },
                    original: {
                      line: f.length + i,
                      column: 0 === i ? h.length : 0,
                    },
                    source: this.normalizeFilename(b.filename),
                  });
              else
                this._sourceMapGenerator.addMapping({
                  generated: {
                    line: this._lineNumber + 1,
                    column: this._column,
                  },
                  original: { line: f.length, column: h.length },
                  source: this.normalizeFilename(b.filename),
                });
            1 === e.length
              ? (this._column += g.length)
              : ((this._lineNumber += e.length - 1), (this._column = g.length)),
              this._css.push(a);
          }
        }),
        (a.sourceMapOutput.prototype.isEmpty = function () {
          return 0 === this._css.length;
        }),
        (a.sourceMapOutput.prototype.toCSS = function (a) {
          if (
            ((this._sourceMapGenerator =
              new this._sourceMapGeneratorConstructor({
                file: this._outputFilename,
                sourceRoot: null,
              })),
            this._outputSourceFiles)
          )
            for (var b in this._contentsMap)
              this._sourceMapGenerator.setSourceContent(
                this.normalizeFilename(b),
                this._contentsMap[b]
              );
          if ((this._rootNode.genCSS(a, this), this._css.length > 0)) {
            var c,
              d = JSON.stringify(this._sourceMapGenerator.toJSON());
            this._sourceMapURL
              ? (c = this._sourceMapURL)
              : this._sourceMapFilename &&
                (c = this.normalizeFilename(this._sourceMapFilename)),
              this._writeSourceMap
                ? this._writeSourceMap(d)
                : (c = "data:application/json," + encodeURIComponent(d)),
              c && this._css.push("/*# sourceMappingURL=" + c + " */");
          }
          return this._css.join("");
        });
    })(c("./tree"));
  var y = /^(file|chrome(-extension)?|resource|qrc|app):/.test(
    location.protocol
  );
  w.env =
    w.env ||
    ("127.0.0.1" == location.hostname ||
    "0.0.0.0" == location.hostname ||
    "localhost" == location.hostname ||
    (location.port && location.port.length > 0) ||
    y
      ? "development"
      : "production");
  var z = { info: 2, errors: 1, none: 0 };
  if (
    ((w.logLevel = "undefined" != typeof w.logLevel ? w.logLevel : z.info),
    (w.async = w.async || !1),
    (w.fileAsync = w.fileAsync || !1),
    (w.poll = w.poll || (y ? 1e3 : 1500)),
    w.functions)
  )
    for (var A in w.functions) w.tree.functions[A] = w.functions[A];
  var B = /!dumpLineNumbers:(comments|mediaquery|all)/.exec(location.hash);
  B && (w.dumpLineNumbers = B[1]);
  var C = /^text\/(x-)?less$/,
    D = null,
    E = {},
    F = "";
  if (
    ((w.watch = function () {
      return (
        w.watchMode || ((w.env = "development"), u()), (this.watchMode = !0)
      );
    }),
    (w.unwatch = function () {
      return clearInterval(w.watchTimer), (this.watchMode = !1);
    }),
    /!watch/.test(location.hash) && w.watch(),
    "development" != w.env)
  )
    try {
      D = "undefined" == typeof a.localStorage ? null : a.localStorage;
    } catch (G) {}
  var H = document.getElementsByTagName("link");
  w.sheets = [];
  for (var I = 0; I < H.length; I++)
    ("stylesheet/less" === H[I].rel ||
      (H[I].rel.match(/stylesheet/) && H[I].type.match(C))) &&
      w.sheets.push(H[I]);
  (w.modifyVars = function (a) {
    w.refresh(!1, v(a));
  }),
    (w.refresh = function (a, b) {
      var c, e;
      (c = e = new Date()),
        t(
          function (a, b, f, h, j) {
            return a
              ? i(a, h.href)
              : (j.local
                  ? d("loading " + h.href + " from cache.", z.info)
                  : (d("parsed " + h.href + " successfully.", z.info),
                    g(b.toCSS(w), h, j.lastModified)),
                d(
                  "css for " +
                    h.href +
                    " generated in " +
                    (new Date() - e) +
                    "ms",
                  z.info
                ),
                0 === j.remaining &&
                  d("css generated in " + (new Date() - c) + "ms", z.info),
                (e = new Date()),
                void 0);
          },
          a,
          b
        ),
        m(b);
    }),
    w.globalVars && (F = v(w.globalVars) + "\n"),
    (w.refreshStyles = m),
    (w.Parser.fileLoader = r),
    w.refresh("development" === w.env),
    "function" == typeof define &&
      define.amd &&
      define(function () {
        return w;
      });
})(window);
