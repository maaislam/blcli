/* eslint-disable */
/*
 * A modified version of the menuAim plugin that includes an
 * option to deactivate the entire menu on mouse out
 *
 * Original
 * url: https://github.com/kamens/jQuery-menu-aim
 * author: kamens
 * 
 * Modified
 * url: https://gist.github.com/klittle32/7451598
 * author: klittle32
 */
export default () => {
  if (window.jQuery && !window.jQuery.menuAim) {
    !function(e){e.fn.menuAim=function(t){return this.each(function(){(function(t){var n=e(this),i=null,u=[],o=null,r=null,c=e.extend({rowSelector:"> li",submenuSelector:"*",submenuDirection:"right",tolerance:75,enter:e.noop,exit:e.noop,activate:e.noop,deactivate:e.noop,exitMenu:e.noop,exitOnMouseOut:!1},t),l=function(e){e!=i&&(i&&c.deactivate(i),c.activate(e),i=e)},f=function(e){var t=a();t?r=setTimeout(function(){f(e)},t):l(e)},a=function(){if(!i||!e(i).is(c.submenuSelector))return 0;var t=n.offset(),r={x:t.left,y:t.top-c.tolerance},l={x:t.left+n.outerWidth(),y:r.y},f={x:t.left,y:t.top+n.outerHeight()+c.tolerance},a={x:t.left+n.outerWidth(),y:f.y},s=u[u.length-1],x=u[0];if(!s)return 0;if(x||(x=s),x.x<t.left||x.x>a.x||x.y<t.top||x.y>a.y)return 0;if(o&&s.x==o.x&&s.y==o.y)return 0;function h(e,t){return(t.y-e.y)/(t.x-e.x)}var m=l,y=a;"left"==c.submenuDirection?(m=f,y=r):"below"==c.submenuDirection?(m=a,y=f):"above"==c.submenuDirection&&(m=r,y=l);var v=h(s,m),p=h(s,y),b=h(x,m),d=h(x,y);return v<b&&p>d?(o=s,300):(o=null,0)};n.mouseleave(function(){r&&clearTimeout(r);(c.exitMenu(this)||c.exitOnMouseOut)&&(i&&c.deactivate(i),i=null)}).find(c.rowSelector).mouseenter(function(){r&&clearTimeout(r);c.enter(this),f(this)}).mouseleave(function(){c.exit(this)}).click(function(){l(this)}),e(document).mousemove(function(e){u.push({x:e.pageX,y:e.pageY}),u.length>3&&u.shift()})}).call(this,t)}),this}}(window.jQuery);
  }
};