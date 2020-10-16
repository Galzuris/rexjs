## RexJS
Small library for simply use of html5 canvas

#### Usage examples

Init library for canvas:

```javascript
let rex = new RexJS(document.getElementById('rex'));
```

Set color (css style):

```javascript
rex.setColor('blue');
rex.setColor('#F0A');
rex.setColor('#FA00DD');
rex.setColor('RGB(0,200,100)');
```

Draw box in the top left corner of canvas:

```javascript
rex.clear();
rex.setColor('red');
rex.fillRect(0, 0, 40, 40);
...
```

Draw inside paint loop:

```javascript
rex.setUpdateFunction(() => {
    rex.clear();
    rex.setColor('red');
    rex.fillRect(0, 0, 40, 40);
    ...
});
```

Get canvas context:

```javascript
let ctx = rex.getContext();
...
```