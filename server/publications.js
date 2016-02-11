Meteor.publish("Schools", function () {
    return Schools.find();
  });

Meteor.publish("Combos", function () {
    return Combos.find();
  });
