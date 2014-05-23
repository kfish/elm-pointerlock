Elm.Native.PointerLock = {}
Elm.Native.PointerLock.make = function(elm) {

  elm.Native = elm.Native || {};
  elm.Native.PointerLock = elm.Native.PointerLock || {};
  if (elm.Native.PointerLock.values) return elm.Native.PointerLock.values;

  var Signal = Elm.Signal.make(elm);
  var Utils = Elm.Native.Utils.make(elm);

  var movement = Signal.constant(Utils.Tuple2(0,0));
  movement.defaultNumberOfKids = 2;

  // do not move dx and dy into Elm. By setting their default number
  // of kids, it is possible to detach the mouse listeners if
  // they are not needed.
  var dx = A2( Signal.lift, function(p){return p._0}, movement);
  dx.defaultNumberOfKids = 0;
  var dy = A2( Signal.lift, function(p){return p._1}, movement);
  dy.defaultNumberOfKids = 0;

  var isLocked = Signal.constant(false);

  var node = elm.display === ElmRuntime.Display.FULLSCREEN ? document : elm.node;

  var requestPointerLock = node.requestPointerLock || node.mozRequestPointerLock || node.webkitRequestPointerLock;
  var exitPointerLock = node.exitPointerLock || node.mozExitPointerLock || node.webkitExitPointerLock;

  function move(e) {
    var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0,
        movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
    elm.notify(movement.id, (movementX, movementY));
  }

  function change() {
    if (document.pointerLockElement == node ||
        document.mozPointerLockElement == node ||
        document.webkitPointerLockElement == node) {
      // Pointer was just locked
      // Enable the mousemove listener
      node.addListener('mousemove', move);
      elm.notify(isLocked, true);
    } else {
      node.removeListener('mousemove', move);
      elm.notify(isLocked, false);
    }
  }

  elm.addListener([isLocked.id], node, 'pointerlockchange', change);
  elm.addListener([isLocked.id], node, 'mozpointerlockchange', change);
  elm.addListener([isLocked.id], node, 'webkitpointerlockchange', change);

  elm.addListener([movement.id], node, 'mousemove', function move(e) {
    elm.notify(movement.id, Utils.getXY(e));
  });

  return elm.Native.PointerLock.values = {
    requestPointerLock: requestPointerLock,
    exitPointerLock: exitPointerLock,

    movement:movement,
    dx:dx,
    dy:dy,
    isLocked: isLocked
  };
};
