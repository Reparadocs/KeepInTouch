var range = function(min, max) {
  var x = [];
  var i = min;
  while (x.push(i++) <  max) {}
  return x;
};

var getContactName = function(contact) {
  return contact.givenName + ' ' + contact.familyName;
};

exports.range = range;
exports.getContactName = getContactName;
