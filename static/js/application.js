var sketch;
var viewer;

$(window).on('load', function() {
  var recorder = new Recorder();
  sketch = new Sketch('canvas-sketch', recorder);

  if (!sketch.domElement || !sketch.domElement.getContext) return false;

  sketch.resize();
  sketch.draw();
  eventListeners();
});

function eventListeners() {
  var startX, startY;
  var endX, endY;

  $(sketch.domElement).on('mousedown', function(e) {
    startX = e.pageX - $(this).offset().left;
    startY = e.pageY - $(this).offset().top;
    sketch.points.push([startX*sketch.scale, startY*sketch.scale]);
    sketch.mousedown = true;
  });

  $(sketch.domElement).on('mousemove', function(e) {
    if (!sketch.mousedown) return;
    endX = e.pageX - $(this).offset().left;
    endY = e.pageY - $(this).offset().top;
    sketch.drawLine(startX, startY, endX, endY);
    startX = endX;
    startY = endY;
  });

  $(sketch.domElement).on('mouseup', function(e) {
    sketch.mousedown = false;
    sketch.record();
    sketch.draw();
    sketch.send();
  });

  $(sketch.domElement).on('mouseleave', function(e) {
    if (!sketch.mousedown) return;
    sketch.mousedown = false;
    sketch.record();
    sketch.draw();
    sketch.send();
  });

  $('#clearSketch').on('click', function(e) {
    sketch.clear();
  });
}
