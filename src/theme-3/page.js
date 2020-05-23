$(document).ready(function() {

  var table = $('#datatables').DataTable({
    pagingType: 'full_numbers',
    lengthMenu: [
      [10, 25, 50, -1],
      [10, 25, 50, 'All']
    ],
    initCompleteThen: function(dt) {
      console.log('done init');
    },
    drawCallbackThen: function(dt) {
      console.log('redrawn');
    }
  });

});
