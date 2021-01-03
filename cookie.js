let express = require('express');
let app = express();
let cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, res) => {
  // if(req.cookies !== undefined){

  // }
  console.log(req.cookies);
  // res.cookie('yummy_cookie', 'choco');
  // res.cookie('tasty_cookie', 'strawberry');
  res.send('Cookie!!');
});

app.listen(3000);
