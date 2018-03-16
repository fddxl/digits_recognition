function drawLine(ctx, startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

function drawRect(ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
  ctx.strokeRect(x, y, width, height);
}

function parseQuery(text, sep, eq, isDecode) {
  text = text || location.search.substr(1);
  sep = sep || '&';
  eq = eq || '=';
  var decode = (isDecode) ? decodeURIComponent : function(a) { return a; };
  return text.split(sep).reduce(function(obj, v) {
    var pair = v.split(eq);
    obj[pair[0]] = decode(pair[1]);
    return obj;
  }, {});
}
