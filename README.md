moment-recur
=====
moment-recur is a recurring date plugin for [momentjs](http://momentjs.com/).

```js
var startDate = moment( "01/01/2014" ); // Wednesday, January 1, 2014

// Intervals - every 2 days
var rInterval = startDate.recur().every(2).days();
rInterval.matches( "01/02/2014" ); // false
rInterval.matches( "01/03/2014" ); // true

// Day Names - every Friday
var rDay = startDate.recur().every( "Friday" );
rDay.matches( "01/03/2014" ); // true

// Fixed Dates - every third day of the month
var rDate = startDate.recur().every(3).dayOfMonth();
rDate.matches( "01/03/2014" ); // true

// Arrays - first and third week of the month
var multiRDates = startDate.recur().every( [1, 3] ).weekOfMonth();
rDate.matches( "01/03/2014" ); // true
```

Getting Started
---------------
### Browser
Simply include the momentjs script, then the momment-recur script.
```html
<script src="moment.min.js"></script>
<script src="moment-recur.js"></script>
```

### Browser with RequireJS
moment-recur also works with RequireJS. Include it just like any other script.
```js
define(["moment", "moment-recur"], function(moment){
    //you probably wont' need a reference to mocur itself, so include it last.
});
```

### node.js
moment-recur can be installed with npm and required into a script.
```
npm install moment-recur
```

```js
var moment = require('moment');
require('moment-recur');
```

Creating a Recurrence
---------------------
-- coming very soon --