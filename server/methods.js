Meteor.methods({
  "authAdmin" : function(pass) {
    Session.set("isAuthed", true)
    return true
  },

  "saveNew" : function(userObj) {
    if (userObj.firstName && userObj.lastName && userObj.username && userObj.password && userObj.school) {
      Combos.insert(userObj)
      return true
    }
    else {
      return false
    }
  }
})
