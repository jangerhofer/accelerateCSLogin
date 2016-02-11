// REACTIVE TABLE CONFIG
if (Meteor.isClient) {

  var optionsObject = {
    columns: [{
      title: 'First Name',
      data: 'firstName'
    }, {
      title: 'Last Name',
      data: 'lastName'
    }, {
      title: 'School',
      data: 'school',
      render : function(val) {
        return Schools.findOne({_id : val}).shortName
      }
    }, {
      title: 'Username',
      data: 'username'
    }, {
      title: 'Password',
      data: 'password'
    }],
  }

  dataTableData = function() {
    return Combos.find().fetch(); // or .map()
  };

  Template.containsTheDataTable.helpers({
    reactiveDataFunction: function() {
      return dataTableData;
    },
    optionsObject: optionsObject
  });

}
