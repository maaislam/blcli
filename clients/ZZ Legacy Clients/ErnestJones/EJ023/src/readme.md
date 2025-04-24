NOTE

- Fields that are not hidden but have a faux 'click' triggered on them will be scrolled
to in the browser. Now, we use CSS to display: none; on these fields so this should
not happen - HOWEVER when developing locally it may happen, but that's because the CSS 
loads in after the JS. The platforms should not do this.

- This test is also for HS023 -- so specify --id="HS023" when running gulp command
