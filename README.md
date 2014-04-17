angularjs-custom-swiping
========================

Swiping effect directive that works on Internet Explorer Mobile.

IE Mobile can give lots of headaches since it knows nothing about touch events, using pointer events instead.

For now, this directive use mouse events to simulate a swipe for IE Mobile and desktop browsers. In IE Mobile, pointer events can be used to simulate a swipe effect. Touch events are not supported.

Pointer events use MS prefixes in IE 10 (MSPointerDown, MSPointerMove etc) but in IE 11 this prefix has been removed. Who knows what's going to happen in IE 12 and so on.

That's why this directive avoids pointer events at this time and all conditionals needed to check for them.

Dependencies
============
To use this directive in your projects, you must include its dependencies. Asumming you already have angular and jquery libraries included in your project, you're going to need the main directive file: customSwiping.js

Usage
=====
Once you've checked that everything is in place, you can use this directive like so:

```html
<custom-swiping left="swipeLeftCallback" right="swipeRightCallback">
  Content
</custom-swiping>
```

or

```html
<custom-swiping left="swipeLeftCallback">
  Content
</custom-swiping>
```

or 

```html
<custom-swiping right="swipeRightCallback">
  Content
</custom-swiping>
```

Demo
====

http://embed.plnkr.co/CnxLCNyquBsEDeqn7Dbz/preview

http://plnkr.co/edit/CnxLCNyquBsEDeqn7Dbz?p=info
