const dt_extend = {
    hideDetailsIcon: false,

    toggleDetails: function() {
        if ($(window).width() > 767) {
            $('td.icon-details').addClass('hidden');
            dt_extend.hideDetailsIcon = true;
        }
    },

    loadTheme: function(opt=false, obj=false) {
        dt_extend.toggleDetails();
        $('.dataTables_paginate').parent().parent().addClass('dataTables_footer_parent');
        $('.dataTables_length').parent().parent().addClass('dataTables_control_parent');
        $('.dataTables_length').parent().addClass('dataTables_length_parent');
        $('.dataTables_filter').parent().addClass('dataTables_filter_parent');
        if( typeof opt.oInstance.api().init().initCompleteThen !== 'undefined' ) 
            opt.oInstance.api().init().initCompleteThen( opt.oInstance.api() );
    },

    redraw: function(opt=false) {
        dt_extend.resize(false, opt.oInstance.api(), [dt_extend.hideDetailsIcon]);
        if( typeof opt.oInstance.api().init().drawCallbackThen !== 'undefined' ) 
            opt.oInstance.api().init().drawCallbackThen( opt.oInstance.api() );
    },

    resize: function(e, dt, cols) {
        if (
            cols.every(function (v) {
                return v;
            })
        ) {
            $('.dataTable tr > td.icon-details').addClass('hidden');
            dt_extend.hideDetailsIcon = true;
        } else {
            $('.dataTable tr > td.icon-details').removeClass('hidden');
            dt_extend.hideDetailsIcon = false;
        }
        if( typeof dt.init().onResponsive !== 'undefined' ) 
            dt.init().onResponsive( dt );
    }
};

// override all datatables initialization
$.extend(true, $.fn.dataTable.defaults, {
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
    initComplete: dt_extend.loadTheme,
    drawCallback: dt_extend.redraw
});
$(document).on('preInit.dt', function (e, settings) {
    var api = new $.fn.dataTable.Api( settings );
    api.on('responsive-resize', dt_extend.resize);
});

module.exports = dt_extend;
