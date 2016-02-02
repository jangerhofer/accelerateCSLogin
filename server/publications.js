Meteor.publish("schools", function () {
    return schools.find();
  });

Meteor.publish("combos", function () {
    return combos.find();
  });
