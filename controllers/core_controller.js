Frog.Controller.extend('Frogui.Controllers.Components.Search', {
    /* @Static */
    listensTo: [],

}, {

    init: function() {
        this.render();
    },

    render: function() {
        this.options.template = this.options.template || '//frogui/components/search/views/core/search.ejs';
        this.element.html(this.view(this.options.template, this.options));
    },

    "input[name=needle]": function() {
        //this.trigger('')
    }

});
