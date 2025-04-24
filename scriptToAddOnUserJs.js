(function () {
  // -------------------------------------
  // Experiment ID
  // -------------------------------------
  var experimentID = 'HC129B';
  var port = 3000;

  var forceRefresh = true;
  // -------------------------------------
  // Forces script refresh if set to true
  // Set to false if you want to use debugging breakpoints
  // -------------------------------------
  var UCGULPFLOW = (function (ID) {
    var randNum = 'UCTEST' + (forceRefresh ? Math.floor(Math.random() * 20341) : '');

    var body = document.body;
    body.className = body.className + ' ' + randNum;
    function loadScript(location, callback) {
      var fileRef = document.createElement('script');
      fileRef.setAttribute('type', 'text/javascript');
      if (callback) {
        if (fileRef.readyState) {
          fileRef.onreadystatechange = function () {
            if (fileRef.readyState == 'loaded' || fileRef.readyState == 'complete') {
              fileRef.onreadystatechange = null;
              callback();
            }
          };
        } else {
          fileRef.onload = function () {
            callback();
          };
        }
      }
      fileRef.setAttribute('src', location);
      document.head.appendChild(fileRef);
    }
    loadScript(`http://localhost:${port}/${ID}.js?q=${randNum}`);
    var linkPathDefault = `http://localhost:${port}/${ID}.css`;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'uctest-stylesheet';
    link.href = linkPathDefault + '?q=' + randNum;
    document.head.appendChild(link);
    function array_filter(arr, func) {
      var retObj = {};
      for (var k in arr) {
        if (func(arr[k])) {
          retObj[k] = arr[k];
        }
      }
      return retObj;
    }
    function reloadCss(mtime) {
      document.getElementById('uctest-stylesheet').href = linkPathDefault + '?q=' + mtime;
    }
    var lastModified = null,
      format = !0;
    function refreshCss() {
      var req = new XMLHttpRequest();
      try {
        req.open('HEAD', linkPathDefault, !1);
        req.send(null);
        if (req.readyState < 3) {
          return !1;
        }
        tmp = req.getAllResponseHeaders();
        if (req.status === 404) {
          console.log(
            `%cExperiment "${ID}"" is turned on in User JS but The dist file is not available in the "server-dist" folder. You need to build the experiment!`,
            `font-size:26px; color:red;background:black;`
          );
        }
        tmp = tmp.split('\n');
        tmp = array_filter(tmp, function (value) {
          return value.toString().substring(1) !== '';
        });
        headers = format ? {} : [];
        for (var i in tmp) {
          if (format) {
            pair = tmp[i].toString().split(':');
            headers[pair.splice(0, 1)] = pair.join(':').substring(1);
          } else {
            headers[j++] = tmp[i];
          }
        }
        if (headers && headers['last-modified']) {
          var mtime = (headers && headers['last-modified'] && Date.parse(headers['last-modified']) / 1000) || !1;
          if (lastModified != mtime) {
            reloadCss(mtime);
            lastModified = mtime;
            console.log('CSS Modified, mtime = ' + mtime);
          }
        }
      } catch (err) {
        console.log(
          `%cExperiment "${ID}"" is turned on in User JS but The local server is not initiated. Run "gulp run-server" command to initiate the server!`,
          `font-size:26px; color:red;background:black;`
        );
      }
      setTimeout(refreshCss, 1000);
    }

    refreshCss();
  })(experimentID);
})();
