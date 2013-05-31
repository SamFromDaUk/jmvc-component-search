Frog.Controller.extend('Frogui.Controllers.Components.Search', {

}, {
    currentSearchTimeout: null,

    init: function() {
        this.options.minimum_char = this.options.minimum_char || 3;
        this.options.search_delay = this.options.search_delay || 1000;
        this.options.template = this.options.template || '//frogui/components/search/views/core/search.ejs';
        this.model = new Frogui.Models.Components.Search.Data();
        this.render();
    },

    render: function() {
        this.element.html(this.view(this.options.template, this.options));
    },
    
    setSearchTimeout: function() {
        var self = this,
            needle = this.model.attr('needle');
        
        window.clearTimeout(this.currentSearchTimeout);

        // Prevent short search terms so we don't fetch huge result sets. Allow empty search to reset to all results
        if (needle.length >= this.options.minimum_char || !needle) {
            this.currentSearchTimeout = setTimeout(function() {
                self.element.trigger('search.find', needle);
            }, this.options.search_delay);
        }
    },

    "form submit": function(el, ev) {
        // Prevent default form submit behaviour
        return false;
    },

    "input keyup": function(el, ev) {
        this.model.attr('needle', el.val().replace(/^\s+|\s+$/, ''));
        this.setSearchTimeout();
    },

    "search.getNeedle": function(el, ev, callback) {
        callback(this.model.attr('needle'));
    }
});