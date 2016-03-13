Router.route('/', function () {
  this.render('homePage', {data: {title: 'Accelerate CS Logins'}});
});

Router.route('/admin', function () {
  this.render('adminPage', {data: {title: 'User Administration'}});
});
