combos = new Meteor.Collection('combos')
schools = new Meteor.Collection('schools')

UI.registerHelper('schools', function () {
  return schools.find({})
})

if (Meteor.isClient) {

  // Retrieve Combinations
  Template.retrieveCombo.events({
    'submit form' : function (eve, templ) {
      eve.preventDefault();
      firstName = event.target.firstName.value
      lastName = event.target.lastName.value
      school = event.target.school.value
      user = combos.findOne({firstName : firstName, lastName : lastName, school : school})
      //alert("Username: " + user.username + " Password: " + user.password)
      Meteor.call("securityQuestion", firstName)
    }
  })

  // Save new
  Template.saveNew.helpers({
  })

  Template.saveNew.events({
    'submit form' : function (eve, templ) {
      eve.preventDefault();
      firstName = event.target.firstName.value
      lastName = event.target.lastName.value
      school = event.target.school.value
      user = combos.findOne({firstName : firstName, lastName : lastName, school : school})
      //alert("Username: " + user.username + " Password: " + user.password)
      Meteor.call("securityQuestion", firstName)
    }
  })
}

/*
Meteor.methods({
  securityQuestion : function(firstName) {
    console.log(firstName);
    var bcrypt = Meteor.npmRequire('bcrypt')
    var salt = bcrypt.genSaltSync(10);
    var hash1 = bcrypt.hashSync('JD', salt);
    var hash2 = bcrypt.hashSync(firstName, salt);

    console.log(salt, hash1, hash2);
  }
})
*/
