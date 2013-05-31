Frog.Controller.extend('Frogui.Controllers.Components.Search', {
    /* @Static */
    listensTo: [],

}, {
    search: null,

    init: function() {
        this.model = new Frogui.Models.Components.Search.Data();
        this.render();
    },

    render: function() {
        this.minimum_char = this.options.minimum_char || 0;
        this.options.template = this.options.template || '//frogui/components/search/views/core/search.ejs';
        this.search_delay = this.options.search_delay || 1000;
        this.element.html(this.view(this.options.template, this.options));
    },

    "input keyup": function(el, ev) {
        var self = this;
        this.model.attr('needle', el.val().replace(/^\s+|\s+$/, ''));

        //Get rid of any previous timeouts.
        window.clearTimeout(this.search);

        if (this.model.attr('needle').length > this.minimum_char) {
            //Setup a delay of 1000ms so that a user can type without loading on every keyup
            this.search = setTimeout(function() {
                self.element.trigger('search.find', self.model.attr('needle'));
            }, 1000);
        }
    },
    "search.getNeedle": function(el, ev, callback) {
        callback(this.model.attr('needle'));
    }

});