var Sketch = function (elementId, recorder) {
  this.recorder = recorder;
  this.points = [];
  this.strokeStyle = '#000000';
  this.lineWidth = 24;
  this.drawMode = 'outline';
  this.mousedown = false;
  this.container = document.getElementById(elementId);
  this.domElement = document.createElement('canvas');
  this.width = this.domElement.width;
  this.scale = 1. / this.width;
  this.container.appendChild(this.domElement);
};

Sketch.prototype.resize = function () {
  this.domElement.width = this.container.clientWidth;
  this.domElement.height = this.container.clientHeight;
  this.width = this.container.clientWidth;
  this.scale = 1. / this.width;
};

Sketch.prototype.draw = function () {
  var ctx = this.ctx = this.domElement.getContext('2d');
  ctx.lineCap = 'round';
  ctx.clearRect(0, 0, this.domElement.width, this.domElement.height);
  this.recorder.draw(ctx, this.width);
  ctx.lineWidth = this.lineWidth;
  ctx.strokeStyle = this.strokeStyle;
};

Sketch.prototype.drawLine = function (startX, startY, endX, endY) {
  var ctx = this.ctx;
  drawLine(ctx, startX, startY, endX, endY);
  this.points.push([endX*this.scale, endY*this.scale]);
};

Sketch.prototype.record = function () {
  var stroke = this.points;
  var color = this.strokeStyle;
  var width = this.lineWidth*this.scale;
  var mode = this.drawMode;
  this.recorder.save(stroke, color, width, mode);
  this.points = [];
};

Sketch.prototype.clear = function () {
  var ctx = this.ctx;
  ctx.clearRect(0, 0, this.domElement.width, this.domElement.height);
  this.recorder.reset();
};

Sketch.prototype.send = function () {
  var scope = this;
  $.ajax({
    method: 'POST',
    url: '/predict',
    dataType: 'text',
    data: { image:JSON.stringify(scope.recorder.getData()), }
  }).done(function (res) {
    console.log(res);
  });
};

Sketch.prototype.setLineWidth = function (width) {
  this.lineWidth = width;
  this.draw();
};
