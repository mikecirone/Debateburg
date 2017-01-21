const jwt = require('jsonwebtoken');



var token = jwt.sign({_id: '789'}, 'secret').toString();

console.log(token);
