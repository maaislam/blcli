# agencyTemplate function

-> Too many parameters
--> Makes it difficult to reuse the function / remember order of parameters to pass
--> If any of the variables are not needed, we still have to pass something, otherwise
the variable will be undefined. Also you can do this in ES6:

function agency(name = '', jobTypes = '', ...) {}

to give defaults (otherwise it will just print out "undefined" when used in a string).

But even still if this were a reusable function we could have odd looking function calls in code:

agency('Name', null, null, null, 'Burnley', null, null, element, ...);
agency('Name', 'Engineer', null, null, 'Manchester', null, null, element, ...);

Use a data object for this type of thing I think:

```
  export default (target, data) => {
    ...
      ${data.officeLocations}

      ${data.jobTypes ? '<h3>' + data.jobTypes + '</h3>' : ''}
    ...
  }

  agency(element, dataObject);
``` 

----

# cache

consider a reusable component rather than binding cache in the experiment

```
  lib/cache.js

  class Cache {
    constructor() {
      this.cache = new Map();
    }
    
    set(key, value) {
      this.cache.set(key, value);
    }
    
    remove(key) {
      this.cache.delete(key);
    }
    
    get(key) {
      return this.cache.get(key);
    }
  }

  const cacheObject = new Cache();

  export default cacheObject; // Reusable cache instance 
```

then in any file you can do... 

```
  import cache from './lib/cache';
  cache.get('searchResults').querySelector... 
``` 

- mainly it's cleaner, also it's reusable across files
- can make changes to storage without having to update all references to cache, e.g.

```
  constructor() {
    this.cache = window.AC030_cache = new Map();
  }
```

----

# checkOverflow

This could be its own module and you wouldn't need to hold a reference to firstLoop in the cache, since
that variable seems to only be used in the context of the checkOverflow function

lib/checkOverflow.js

```
  const firstLoop = true;

  export default () => {
    if(!firstLoop) {
      return;
    }

    // Do overflow stuff 
    
    firstLoop = false;
  }
```

----

# contractType 

Refactoring the if/else into more concise / easier to maintain structure. Perhaps something like

```
  const keywords = {
    'temporary': 'Temp',
    'permanent': 'Temp to perm',
    'contract': 'Contract'
  };

  let string = '<h4>Contract types:</h4><div class="AC030_checkwrap clearfix">';
  for(var k in keywords) {
    const extraClasses = arr.indexOf(k) > -1 ? 'AC030_tick' : '';
    string += `<div class="AC030_contracts ${extraClasses}">${keywords[k]}</div>`;
  }
```

----

# services

I would probably move some of the functions on components to services or other namespace
E.g. salaryBinding may exist on something like Experiment.events.salaryBinding()

----

# init / contentBuilder

- Would rename contentBuilder() to buildTemplate()
- Only have in this function the stuff that pertains to building the agency template - grab vars and call function only
- The following lines could just be put in init() to be run after components.contentBuilder()

```
init() {
  components.contentBuilder();
  Exp.cache.newAgencies = Exp.cache.bodyVar.querySelectorAll('.AC030_result');
  Exp.cache.newResults.classList.add('AC030_loaded');
  Exp.services.hideFlicker();
}

```

----

# Use of jQuery slideUp()

Would probably use CSS animation (animate on max-height where heights not known) w/ onanimationend

Not a big deal but it would remove jQuery as a dependency in the project.
