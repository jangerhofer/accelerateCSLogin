// run this when the meteor app is started
/*
Meteor.startup(function() {

    // create sample polls
    var samplePolls = [
      {
        question: 'Is Meteor awesome?',
        choices: [
          { text: 'Of course!', votes: 0 },
          { text: 'Eh', votes: 0 },
          { text: 'No. I like plain JS', votes: 0 }
        ]
      },
      {
        question: 'Is CSS3 Flexbox the greatest thing since array_slice(bread)?',
        choices: [
          { text: '100% yes', votes: 0 },
          { text: '200% yes', votes: 0 },
          { text: '300% yes', votes: 0 }
        ]
      },
      {
        question: 'Is YADAHYADAH Flexbox the greatest thing since array_slice(bread)?',
        choices: [
          { text: '100% yes', votes: 0 },
          { text: '200% yes', votes: 0 },
          { text: '300% yes', votes: 0 }
        ]
      }
    ];

    // loop over each sample poll and insert into database
    _.each(samplePolls, function(poll) {
      pollRec = Polls.find(poll)
      console.log(pollRec);
      //Polls.insert(poll);
    });

});

*/

// REACTIVE TABLE CONFIG

if (Meteor.isClient) {

  var optionsObject = {
      columns: [{
          title: 'First Name',
          data: 'firstName'
      },
      {
          title: 'Last Name',
          data: 'lastName'
      },{
          title: 'School',
          data: 'school'
      },{
          title: 'Username',
          data: 'username'
      },{
          title: 'Password',
          data: 'password'
      }],
  }
  
  dataTableData = function () {
      return combos.find().fetch(); // or .map()
  };

  Template.containsTheDataTable.helpers({
      reactiveDataFunction: function () {
          return dataTableData;
      },
      optionsObject: optionsObject // see below
  });

}
