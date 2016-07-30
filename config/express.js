module.exports = function(express, app, path) {

  app.use(express.static(path + '/public'));

  app.set('views', path + '/views');
  app.set('view engine', 'jsx');

  app.engine('jsx', require('express-react-views').createEngine());

};
