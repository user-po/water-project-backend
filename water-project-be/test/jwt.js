var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

console.log(token)

jwt.verify(token,'shhhhh',(err,payload)=>{
    console.log(payload)
})
//head
//算法
//jwt

//payload
//参数

//signature