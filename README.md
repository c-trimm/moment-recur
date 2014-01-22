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

### Bower
moment-recur is a register bower component.
```
bower install moment-recur
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
You can create a recurrence from an instance of moment or from the constructor a few different ways.  
From an instance:
```js
// Create a reccurence using today as the start date.
moment().recur();

// Create a recurrence while passing the start and end dates to the recur function.
// Note: passing a start date does not require an end date, but an end date does require a start date.
moment().recur( start, end );

// You may pass a start date to the moment, or use an exisiting moment, to set the start date.
// In this case, passing a date to the recur function sets and end date.
moment(start).recur( end );

// Finally, you can create a recurrence and pass in an entire set of options.
moment().recur({
    start: "01/01/2014",
    end: "01/01/2015",
    startOfWeek: 1
});
```