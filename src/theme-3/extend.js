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
    oLanguage: {
        oPaginate: {
          sPrevious: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' 
        },
        sInfo: 'Showing page _PAGE_ of _PAGES_',
        sSearch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
        sSearchPlaceholder: 'Search...',
        sLengthMenu: 'Results :  _MENU_',
    },
    initComplete: dt_extend.loadTheme,
    drawCallback: dt_extend.redraw
});
$(document).on('preInit.dt', function (e, settings) {
    var api = new $.fn.dataTable.Api( settings );
    api.on('responsive-resize', dt_extend.resize);
});

module.exports = dt_extend;
