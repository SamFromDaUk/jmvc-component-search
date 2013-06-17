Frog.Controller.extend('Frogui.Controllers.Components.Search', {
    defaults: {
        "placeholderText": "Search",
        "minimumChar": 3,
        "searchDelay": 600,
        "template": '//frogui/components/search/views/core/search.ejs',
        "typeahead": false
    }

}, {
    currentSearchTimeout: null,
    el: null,

    init: function() {
        this.currentSearchTimeout = null;
        this.el = {};


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

        this.el.$input = this.find('input');
        this.el.$searchBtn = this.find('button.search-btn');

        if (this.options.typeahead) {
            this.renderTypeahead();
        }

        this.el.$input.addIEplaceholders();
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
        this.el.$input.typeahead(typeaheadDefaults);
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
        this.el.$searchBtn.addClass('search-btn-clear');
    },

    hideClearBtn: function() {
        this.el.$searchBtn.removeClass('search-btn-clear');
    },

    'button.search-btn-clear {click}': function() {
        window.clearTimeout(this.currentSearchTimeout);
        this.el.$input.val('');
        this.element.trigger('search.query', '');
        this.hideClearBtn();
    },

    "form submit": function(el, ev) {
        // Prevent default form submit behaviour
        return false;
    },

    "input keyup": function(el, ev) {
        this.setSearchTimeout();
        if (this.getQuery()) {
            this.showClearBtn();
        } else {
            this.hideClearBtn();
        }
    },

    getQuery: function() {
        return this.el.$input.val().replace(/^\s+|\s+$/, '');
    }
});