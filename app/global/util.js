var range = function(min, max) {
  var x = [];
  var i = min;
  while (x.push(i++) <  max) {}
  return x;
};

exports.range = range;
