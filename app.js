let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');


//引入模块
let db = require('./DB/project_DB/index');
let app = express();
let bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({extented:false});

// 引入路由模块
let projectRouter = require('./routes/PM_Router');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// 打开数据连接
db.connect();
//当程序关闭的时候 关闭数据库连接
app.on('close', function(err){
  console.error(err);
  db.disconnect();
});

//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 跨域
// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8081");
//   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Credentials", true);
//   if(req.method=="OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
//   else  next();
// });
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/projectApi', projectRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
