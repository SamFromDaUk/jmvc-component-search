Frog.Controller.extend('Frogui.Controllers.Components.Search', {

}, {
    currentSearchTimeout: null,

    init: function() {
        this.options.minimum_char = this.options.minimum_char || 3;
        this.options.search_delay = this.options.search_delay || 1000;
        this.options.template = this.options.template || '//frogui/components/search/views/core/search.ejs';

        // Typeahead options error handling
        if (this.options.typeahead) {
            if (Frog.Utilities.toType(this.options.typeahead.source) !== 'array' && Frog.Utilities.toType(this.options.typeahead.source) !== 'function') {
                throw new Error('The "source" option for the typeahead must either be an Array or a function');
            }
        }

        this.model = new Frogui.Models.Components.Search.Data();
        this.render();
    },

    render: function() {
        this.element.html(this.view(this.options.template, this.options));
        if (this.options.typeahead) {
            this.renderTypeahead();
        }
    },

    renderTypeahead: function() {
        var self = this,
            typeaheadDefaults = {
                "updater": function(needle) {
                    self.model.attr('needle', needle);
                    self.element.trigger('search.find', needle);
                    self.showClearBtn();
                    return needle;
                }
            }
        $.extend(typeaheadDefaults, this.options.typeahead);

        this.find('input').typeahead(typeaheadDefaults);
    },

    setSearchTimeout: function() {
        var self = this
            needle = self.model.attr('needle');
        window.clearTimeout(this.currentSearchTimeout);

        // Prevent short search terms so we don't fetch huge result sets. Allow empty search to reset to all results
        if (needle.length >= this.options.minimum_char || !needle) {
            this.currentSearchTimeout = setTimeout(function() {
                self.element.trigger('search.find', needle);
            }, this.options.search_delay);
        }
    },

    showClearBtn: function() {
        this.find('button.search-btn').addClass('search-btn-clear');
    },

    hideClearBtn: function() {
        this.find('button.search-btn').removeClass('search-btn-clear');
    },

    'button.search-btn-clear {click}': function() {
        this.find('input').val('');
        this.model.attr('needle', '');
        this.element.trigger('search.find', '');
        this.hideClearBtn();
    },

    "form submit": function(el, ev) {
        var needle = this.find('input').val().replace(/^\s+|\s+$/, '');
        this.model.attr('needle', needle);
        this.element.trigger('search.find', needle);

        // Prevent default form submit behaviour
        return false;
    },

    // NOTE: This event will not trigger if typeahead is used.
    // Bootstrap catches the event and stops the propagation.
    "input keyup": function(el, ev) {
        var needle = el.val().replace(/^\s+|\s+$/, '');

        if (needle) {
            this.hideClearBtn();
        } else {
            this.showClearBtn();
        }

        this.model.attr('needle', needle);
        this.setSearchTimeout();
    },

    "search.getNeedle": function(el, ev, callback) {
        callback(this.model.attr('needle'));
    }
});