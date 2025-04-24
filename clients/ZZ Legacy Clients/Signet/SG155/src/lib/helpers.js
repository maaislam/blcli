export const loadScript = (source, beforeEl, async = true, defer = true) => {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      const prior = beforeEl || document.getElementsByTagName('script')[0];
  
      script.async = async;
      script.defer = defer;
  
      function onloadHander(_, isAbort) {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
          script.onload = null;
          script.onreadystatechange = null;
          script = undefined;
  
          if (isAbort) { reject(); } else { resolve(); }
        }
      }
  
      script.onload = onloadHander;
      script.onreadystatechange = onloadHander;
  
      script.src = source;
      prior.parentNode.insertBefore(script, prior);
    });
  }