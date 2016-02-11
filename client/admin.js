if (Meteor.isClient) {

  var shakeTween = function(item, repeatCount){
	var max = 5;
	var min = -5;
   TweenMax.to(item,0.1,{repeat:repeatCount-1, x:Math.ceil(Math.random() * (max - min + 1) + min), delay:.1});
   TweenMax.to(item,0.1,{y:0, x:0, delay:(repeatCount+1) * .1});
}
Template.admin.events({

    'submit' : function(eve) {
      eve.preventDefault();
      console.log("submit");

      shakeTween($("#passwordContain"), 10);
      $(" input").val("")


    }
  })

  Template.containsTheDataTable.events({
  'click tbody > tr': function (event) {
    var dataTable = $(event.target).closest('table').DataTable();
    cellIndex = dataTable.cell( event.target ).index()
    //dataTable.cell(cellIndex.row, cellIndex.column).data("Yup!")
  }
});

}
