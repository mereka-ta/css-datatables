var dt_no_details = false;
function dt_load_theme(opt=false, obj=false) {
    $(".dataTables_paginate").parent().parent().addClass("dataTables_footer_parent");
    $(".dataTables_length").parent().parent().addClass("dataTables_control_parent");
    $(".dataTables_length").parent().addClass("dataTables_length_parent");
    $(".dataTables_filter").parent().addClass("dataTables_filter_parent");
}
function dt_responsive_resize(e, dt, cols) {
    if (
        cols.every(function (v) {
            return v;
        })
    ) {
        $(".dataTable tr > td.icon-details").addClass("hidden");
        dt_no_details = true;
    } else {
        $(".dataTable tr > td.icon-details").removeClass("hidden");
        dt_no_details = false;
    }
}
function dt_redraw(opt=false) {
    dt_responsive_resize(false, false, [dt_no_details]);
}
function dt_toggle_details() {
    if ($(window).width() > 767) {
        $("td.icon-details").addClass("hidden");
        dt_no_details = true;
    }
}

$(document).ready(function() {

  dt_toggle_details();
  var table = $('#datatables').DataTable({
    'pagingType': 'full_numbers',
    'lengthMenu': [
      [10, 25, 50, -1],
      [10, 25, 50, 'All']
    ],
    // responsive: true,
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
    language: {
      search: '_INPUT_',
      searchPlaceholder: 'Search records',
    },
    drawCallback: dt_redraw,
    initComplete: dt_load_theme
  }).on('responsive-resize', dt_responsive_resize);

});