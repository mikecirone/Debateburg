var writeFile = require('write');

var body = 'foo';

  console.log(body);
  writeFile('foo.txt', body, function(err) {
    if (err) console.log(err);
  });
