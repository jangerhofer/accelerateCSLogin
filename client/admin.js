if (Meteor.isClient) {

  var shakeTween = function(item, repeatCount){
	var max = 5;
	var min = -5;
   TweenMax.to(item,0.1,{repeat:repeatCount-1, x:Math.ceil(Math.random() * (max - min + 1) + min), delay:.1});
   TweenMax.to(item,0.1,{y:0, x:0, delay:(repeatCount+1) * .1});
}

  Template.admin.helpers({
    authenticate: function(password){
      Meteor.call('authAdmin', password, function(err, res) {
        return(res);
      })
    },

    sessionIsAuthed : function(){
      console.log("seshIsAuthed: " + Session.get("sessionIsAuthed"));
      if (Session.get("sessionIsAuthed") == true) {
        return true
      }
      else {
        return false
      }
    }
  });

  Template.admin.events({

    'submit' : function(eve) {
      eve.preventDefault();
      console.log("submit");

      shakeTween($("#passwordContain"), 10);
      $(" input").val("")


    }
  })
}
