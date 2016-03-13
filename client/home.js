UI.registerHelper('Schools', function () {
  return Schools.find({})
})

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
    school = Schools.findOne({shortName: event.target.school.value})._id
    user = Combos.findOne({firstName : firstName, lastName : lastName, school : school})
    if (!user) {
      alert("Not found. :(  Try again or ask a teacher for help!")
    }
    else {
      Session.set("username", user.username)
      Session.set("password", user.password)
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
        collection: Combos,
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
        collection: Combos,
        field: "lastName",
        template: Template.lastNameDropdownPill
      }
    ]
  };
},
})

Template.retrieveCombo.events({
"autocompleteselect input": function(event, template, doc) {
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
    school = Schools.findOne({shortName : event.target.school.value})._id
    user = Combos.findOne({firstName : firstName, lastName : lastName, _id : school})
    if (!user) {
      Meteor.call("saveNew", {username : event.target.username.value, password : event.target.password.value, firstName : firstName, lastName : lastName, school : school}, function(err, res){
        if (err) {
          alert("There was a problem.  Please let a teacher know!")
        }
        else if(res == true) {
          alert("Success!  You saved your login.")
          eve.target.reset()
        }
        else {
          alert("Make sure you entered all of your information!  Try again and let a teacher know if it doesn't work on the second try!")
        }
      })

    }
    else {
    alert("You've already saved your login!  If you need to change your login, get an admin!")
    }
  }
})

Template.infoArea.helpers ({
  loginCombo : function() {
    if (Session.get("username") && Session.get("password")) {
      return {username: Session.get("username"), password : Session.get("password")}
    }
  }
})
