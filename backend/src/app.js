const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();
var apiRouter = require('./../api/routes/routes');
const userRoutes = require('./routes/user');

// call file Config
var Config = require('./constants/Config');
app.locals.Title = Config.Title;
app.locals.TitleLogin = Config.TitleLogin;
app.locals.LabelUsername = Config.LabelUsername;
app.locals.LabelPassword = Config.LabelPassword;
app.locals.LabelNo = Config.LabelNo;
app.locals.LabelName = Config.LabelName;
app.locals.LabelAge = Config.LabelAge;
app.locals.LabelComment = Config.LabelComment;
app.locals.LabelOption = Config.LabelOption;
app.locals.ButtonAdd = Config.ButtonAdd;
app.locals.ButtonCancel = Config.ButtonCancel;
app.locals.ButtonUpdate = Config.ButtonUpdate;
app.locals.ButtonDelete = Config.ButtonDelete;
app.locals.ButtonBack = Config.ButtonBack;
app.locals.ButtonSearch = Config.ButtonSearch;
app.locals.ButtonLogout = Config.ButtonLogout;
app.locals.ButtonLogin = Config.ButtonLogin;
app.locals.AlertDelete = Config.AlertDelete;
app.locals.AlertLogout = Config.AlertLogout;
app.locals.TitleFormAdd = Config.TitleFormAdd;
app.locals.TitleFormUpdate = Config.TitleFormUpdate;
app.locals.placeholderName = Config.placeholderName;
app.locals.placeholderAge = Config.placeholderAge;
app.locals.placeholderComment = Config.placeholderComment;
app.locals.placeholderSearch = Config.placeholderSearch;
app.locals.placeholderUsername = Config.placeholderUsername;
app.locals.placeholderPassword = Config.placeholderPassword;
app.locals.errorUsername = Config.errorUsername;
app.locals.errorPassword = Config.errorPassword;
app.locals.loginFailed = Config.loginFailed;

var xssFilter = require('x-xss-protection')
app.use(xssFilter());
app.use(xssFilter({ setOnOldIE: true }));
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('X-Frame-Options','DENY');
  res.header('X-Frame-Options','DENY');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});
const helmet = require('helmet')

app.use(helmet.noSniff());

// settings
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/',apiRouter);
app.use('/', userRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
