Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'UMich Accelerate CS'}});
});

Router.route('/admin', function () {
  // render the Home template with a custom data context
  this.render('admin', {data: {title: 'User Administration'}});
});
