combos = new Meteor.Collection('combos')
schools = new Meteor.Collection('schools')

UI.registerHelper('schools', function () {
  return schools.find({})
})

if (Meteor.isClient) {

  // Opening animations
  Template.splash.rendered = function () {
      var timeline = new TimelineMax()
      timeline.add( TweenLite.to("#splash", 0.75, {opacity : 1}))
      timeline.add( TweenLite.fromTo("#blockM", 1.25, {y : "-200%"}, {y:"0%", ease:Bounce.easeOut}), "+=0")
      timeline.add( TweenLite.to("#splash", 2, {opacity : 0}))
      timeline.add( TweenLite.to("#content", 2.5, {opacity : 1}))
      timeline.addCallback(function() {
        $(" #splash ").remove()
      }, "-=0.5")
      timeline.addCallback(function() {
        $(" #retrieveContain, :input[name=\"firstName\"] ").focus()
      }, "-=0.25")
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

//https://github.com/mizzao/meteor-autocomplete
  autoFirstName: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [
        {
          collection: combos,
          field: "firstName",
          template: Template.firstNameDropdownPill
        }
      ]
    };
  },
  autoLastName: function() {
    return {
      position: "bottom",
      limit: 5,
      rules: [
        {
          collection: combos,
          field: "lastName",
          template: Template.lastNameDropdownPill
        }
      ]
    };
  },
  })

  Template.retrieveCombo.events({
  "autocompleteselect input": function(event, template, doc) {
    console.log("selected ", doc);
  }
});

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
