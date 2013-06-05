Frog.Model.extend('Frogui.Models.Components.Search.Data',
{
    attributes: {
        needle: 'string'
    }
}, {
    setup: function() {
        var defaults = {
            'needle': ''
        }
        this._super(defaults);
    }
});