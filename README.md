angularjs-custom-swiping
========================

Swiping effect directive that works on Internet Explorer Mobile.

IE Mobile can give lots of headaches since it knows nothing about touch events, using pointer events instead.

For now, this directive use mouse events to simulate a swipe for IE Mobile and desktop browsers. In IE 10, these events use MS prefix (like MSPointerDown, MSPointerMove etc). IE 11 do not use MS prefix for pointer events and who knows what's going to happen in IE 12 and so on. That's why this directive avoids pointer events at this time and so all conditionals needed to check for these changes.

Dependencies
============
To use this directive in your projects, you must include its dependencies. Asumming you already have angular and jquery libraries included in your project, you're going to need the main directive file: customSwiping.js

Usage
=====
Once you've checked that everything is in place, you can use this directive like so:

<custom-swiping left="swipeLeftCallback" right="swipeRightCallback">
  Content
</custom-swiping>
