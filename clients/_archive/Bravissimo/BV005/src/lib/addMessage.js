import { addEventListener } from './winstack';
import { events } from '../../../../../lib/utils';
import addSizeGuide from './addSizeGuide';

const clickEvent = () => {
 // Call addSizeGuide
 addSizeGuide();
};

const addMessage = () => {
  const ref = document.querySelector('#product-description');
  ref.insertAdjacentHTML('beforeend', `
    <div class="BV005-sizeHelp">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKxSURBVGhD7dlLqE1RHMfxi7xKyDNMGCmPlImSmAgppchAJEkZYKK8BhRSClFSYiIxkSiRRwYYGVLKQAh5hDzK+/n9qVu31e86a5/7X+ecW371GdxTe///e9/9WGvttv/xGY01OIU7eIvf+IrnuIH9mI/eaLlMwBn8gBrP8RJb0R9NzzAcxXe4ZnM8xQo0LRNxH665ehxDHzQ0c/EBrqGu0D00CA3JZJQ4iHYX0QtFMxwP4BqItBdFcxyucAmzUSRT8BOuaAl30RPhuQBXsKTFCM04/IIrVst7fEl+y3UJodkAV6gzj7AKQ9AeXZqH8A1uG0cjhcEIy3m4Qs5lDERnmYl3cNs6CxAWnWFXJKU3fc4LbRHc9s4WhCX3/liK3NyE20fqCEKiM+wKpDRUH4DcrIfbT+okQtIPrkDqMapkHtx+UnoJhyXn8fkCVbIQbj+pgwjLM7giHek+GoPc7IDbT2obwnINrkhqO3LSF7lPwtC3u/69rkhKw3sN82tlD9z2zniEZTlcEUeLDDPgohngbuQ+zt8gdG6ia98V6owaPYtlmA4NyTej6tT4NMKjYbUrVtJqhGcXXLFStDIzAuGZBFewlCsolttwRUvQ/VUsWg51RaO9goZGxaJBYZW5RL10PxbPPrjiUTSu02J48YzCJ7gmIhxGw6K5t2uiqzSnGYuGZSS0OuKa6Qpdtg3PJrhm6vUaoSsmudHj8SFcU/VYh6ZlCVxTVd1DUz/F9cB1uOaq0DfFpkcTn89wDeY4gZbJRrgma9EH0aFomWgWdwuu2X8JX22PiD6OVll1LzL7i8pauKZTT9Bxpb7loqfYObjm2+lTwSy0fHSmtXzqDkJ2ottkGjQATA/iKop/eo7OSnQ8CK0s6vN2t8wB6CA+Yqp+6K7RZaT14Dl///qfWmlr+wPByaEqqEhrtgAAAABJRU5ErkJggg==" alt="Location icon"/>
      <p><strong>It looks like you're visiting us from outside the UK</strong></p>
      <p>Click here to see our international sizing guide<p>
      <a href="" id="BV005-open"></a>
    </div>
  `);

  // Attach event
  const newEl = document.querySelector('.BV005-sizeHelp');
  if (newEl) {
    addEventListener(newEl, 'click', (e) => {
      events.send('BV005', 'Click', 'User opened size guide');
      e.preventDefault();
      clickEvent();
    });
  } else {
    console.error('no new size guide element');
  }
};

export default addMessage;