Frog.Controller.extend('Frogui.Controllers.Components.Search', {

}, {
    currentSearchTimeout: null,

    init: function() {
        this.options.placeholderText = this.options.placeholderText || 'Search';
        this.options.minimumChar = this.options.minimumChar || 3;
        this.options.searchDelay = this.options.searchDelay || 1000;
        this.options.template = this.options.template || '//frogui/components/search/views/core/search.ejs';

        // Typeahead options error handling
        if (this.options.typeahead) {
            if (Frog.Utilities.toType(this.options.typeahead.source) !== 'array' && Frog.Utilities.toType(this.options.typeahead.source) !== 'function') {
                throw new Error('The "source" option for the typeahead must either be an Array or a function');
            }
        }

        this.render();
    },

    render: function() {
        this.element.html(this.view(this.options.template, this.options));
        if (this.options.typeahead) {
            this.renderTypeahead();
        }
        this.find('input').addIEplaceholders();
    },

    renderTypeahead: function() {
        var self = this,
            typeaheadDefaults = {
                "updater": function(query) {
                    self.find('input').val(query);
                    self.element.trigger('search.query', query);
                    self.showClearBtn();
                    return query;
                }
            }
        $.extend(typeaheadDefaults, this.options.typeahead);

        this.find('input').typeahead(typeaheadDefaults);
    },

    setSearchTimeout: function() {
        var self = this,
            query = this.getQuery();
        window.clearTimeout(this.currentSearchTimeout);

        // Prevent short search terms so we don't fetch huge result sets. Allow empty search to reset to all results
        if (query.length >= this.options.minimumChar || !query) {
            this.currentSearchTimeout = setTimeout(function() {
                self.element.trigger('search.query', query);
            }, this.options.searchDelay);
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
        this.element.trigger('search.query', '');
        this.hideClearBtn();
    },

    "form submit": function(el, ev) {
        // Prevent default form submit behaviour
        return false;
    },

    // NOTE: This event will not trigger if typeahead is used.
    // Bootstrap catches the event and stops the propagation.
    "input keyup": function(el, ev) {
        if (this.getQuery()) {
            this.hideClearBtn();
        } else {
            this.showClearBtn();
        }
        this.setSearchTimeout();
    },

    getQuery: function() {
        return this.find('input').val().replace(/^\s+|\s+$/, '');
    }
});