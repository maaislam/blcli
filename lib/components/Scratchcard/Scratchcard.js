/**
 * Modified from Codepen:
 * https://codepen.io/kairyou/pen/wcIlt
 */

const scratchcard = (cvs, completeThreshold = 0.9, fillStyle = '#09c', completeCallback, observers = {}, lineWidth = 45) => {

  var doc = document;
  var mouseDown = false;

  const debug = (msg) => {
      var obj = doc.getElementById('debug');
      obj.innerHTML += msg + '<br>';
  };

  const getLocalCoords = (elem, ev) => {
      var ox = 0, oy = 0;
      var first;
      var pageX, pageY;
      // currentTarget element.
      while (elem != null) {
          ox += elem.offsetLeft;
          oy += elem.offsetTop;
          elem = elem.offsetParent;
      }
      // fix,<=IE8
      if ("changedTouches" in ev) {
          first = ev.changedTouches[0];
          pageX = first.pageX;
          pageY = first.pageY;
      } else {
          pageX = ev.pageX;
          pageY = ev.pageY;
      }
      return { 'x': pageX - ox, 'y': pageY - oy };
  };

  const diffTransSize = (ctx, threshold, callback) => {
      threshold = threshold || 0.5;
      if (threshold >1 || threshold < 0) threshold = 1;
      var imageData = ctx.getImageData(0, 0, cvs.width, cvs.height),
          pix = imageData.data,
          pixLength = pix.length,
          pixelSize = pixLength*0.25;
      var i = 1, k, l=0;
      for (; i <= pixelSize; i++) { // 3, 7, 11 -> 4n-1
          if (0 === pix[4*i-1]) l++;
      };
      if (l>pixelSize * threshold) {
          callback.apply(ctx, [l]);
      };
  };

  const scratchLine = (cvs, x, y, fresh) => {
      const ctx = cvs.getContext('2d');
      fillCanvas();
      // sumsung Android 4.1.2, 4.2.2 default browser does not render, https://goo.gl/H5lwgo
      ctx.globalCompositeOperation = 'destination-out'; 

      ctx.lineWidth = lineWidth;
      ctx.lineCap = ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(0,0,0,1)'; //'#000';
      // if (fresh) {
      ctx.beginPath();
      // bug WebKit/Opera/IE9: +0.01
      ctx.moveTo(x+0.1, y);
     // }

      ctx.lineTo(x, y);
      ctx.stroke();

      // fix sumsung bug
      var style = cvs.style; // cursor/lineHeight
      style.lineHeight = style.lineHeight == '1' ? '1.1' : '1';

      if(typeof observers.scratchedLine === 'function') {
        observers.scratchedLine(x, y);
      }

      if(typeof completeCallback === 'function') {
        diffTransSize(ctx, completeThreshold, completeCallback);
      }
  };

  const on = (E, N, FN) => {
      E.addEventListener ? E.addEventListener(N, FN, !1) : E.attachEvent('on' + N, FN);
  };

  const fillCanvas = () => {
    var ctx = cvs.getContext("2d");

    ctx.globalCompositeOperation = 'source-over';
  
    // add mask
    ctx.clearRect(0,0,cvs.width, cvs.height);

    if(fillStyle.nodeName && fillStyle.nodeName.toLowerCase() === 'img') {
      const pattern = ctx.createPattern(fillStyle, 'repeat');
      ctx.fillStyle = pattern;
    } else {
      ctx.fillStyle = fillStyle;
    }

    ctx.fillRect(0, 0, cvs.width, cvs.height);
  };

  const setupCanvases = () => {
      var ctx = cvs.getContext("2d");
      fillCanvas();
      // On mouse down
      var mousedown_handler = function(e) {
          var local = getLocalCoords(cvs, e);
          mouseDown = true;
          scratchLine(cvs, local.x, local.y, true);
          // debug('touchstart')
          if (e.cancelable) { e.preventDefault(); }
          return false;
      };

      // On mouse move
      var mousemove_handler = function(e) {
          // debug('touchmove')
          if (!mouseDown) { return true; }
          var local = getLocalCoords(cvs, e);
          // debug(local.x + ',' + local.y);
          scratchLine(cvs, local.x, local.y, false);

          if (e.cancelable) { e.preventDefault(); }
          return false;
      };

      // On mouseup
      var mouseup_handler = function(e) {
          // debug('touchend')
          if (mouseDown) {
              mouseDown = false;
              if (e.cancelable) { e.preventDefault(); }
              return false;
          }
          return true;
      };

      on(cvs, 'mousedown', mousedown_handler);
      on(cvs, 'touchstart', mousedown_handler);
      on(window, 'mousemove', mousemove_handler);
      on(window, 'touchmove', mousemove_handler);
      on(window, 'mouseup', mouseup_handler);
      on(window, 'touchend', mouseup_handler);
  };

  setupCanvases();

};

export {scratchcard};
