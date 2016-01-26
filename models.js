combos = new Meteor.Collection('combos')
schools = new Meteor.Collection('schools')

UI.registerHelper('schools', function () {
  return schools.find({})
})

if (Meteor.isClient) {

  // Opening animations
  Template.splash.rendered = function () {
    $('#splash').hide(0).fadeIn(200);
    $('#blockM').hide(0).delay(200).fadeIn(400).addClass('animated bounceInDown');
    $('#splash').addClass('animated fadeOut');
    $('#content').hide(0).fadeIn(2500);
  }

  // Retrieve Combinations
  Template.retrieveCombo.events({
    'submit form' : function (eve, templ) {
      eve.preventDefault();
      firstName = event.target.firstName.value
      lastName = event.target.lastName.value
      school = event.target.school.value
      user = combos.findOne({firstName : firstName, lastName : lastName, school : school})
      if (!user) {
        alert("Not found!")
      }
      else {
        console.log(user);
        alert("Username: " + user.username + "  Password: " + user.password)
      }
    }
  })

  // Save new
  Template.retrieveCombo.helpers({

    settings: function() {
    return {
      position: "top",
      limit: 5,
      rules: [
        {
          collection: combos,
          field: "firstName",
          template: Template.dropDownPill
        }
      ]
    };
  }
  })

  // Save new
  Template.saveNew.helpers({

    'existingUser' : function(arg1) {
      //console.log("EXISTING?  " + arg1);
    }
  })

  Template.saveNew.events({
    'submit form' : function (eve, templ) {
      eve.preventDefault();
      firstName = event.target.firstName.value
      lastName = event.target.lastName.value
      school = event.target.school.value
      console.log(firstName, lastName, school);
      user = combos.findOne({firstName : firstName, lastName : lastName, school : school})
      console.log(user);
      if (!user) {
        pass = event.target.password.value
        username = event.target.username.value
        combos.insert({firstName : firstName, lastName : lastName, school : school, username : username, password: pass})
        alert("Saved!  Thank you.")
      }
      else {
      alert("User already exists!  If you need to change your login, get an admin!")
      }
    }
  })
}
