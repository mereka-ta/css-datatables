$(document).ready(function() {

  var table = $('#datatables').DataTable({
    pagingType: 'full_numbers',
    lengthMenu: [
      [10, 25, 50, -1],
      [10, 25, 50, 'All']
    ],
    responsive: {
        details: {
            type: 'column',
            target: 'td'
        }
    },
    columnDefs: [{
        className: 'dt-details',
        targets: '_all'
    }],
    initCompleteThen: function(dt) {
      console.log('done init');
    },
    drawCallbackThen: function(dt) {
      console.log('redrawn');
    }
  });

});
