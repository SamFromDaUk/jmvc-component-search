jmvc-component-search
====================

A search component for JMVC 3.2.4.

## API
### Events emitted
- 'search.find'
- 'search.getNeedle'

## Overview
A search component which renders a text input and emits the data entered.

### Key Features
- Ultra Light-weight
- Overridable view template
- Built to complement Event Oriented Architecture
- Event to get the search term from the component

## Getting Started
### Quick-start
    $('#someElement').frogui_components_search()

    'search.find': function(el, ev, data) {
        console.log('user input', data);
    }

### Your own view template
    $('#someElement').frogui_components_search({
        template: '//userApp/views/searchOverride.ejs'
    })

### Getting the search term
    var searchTerm,
        getNeedle = function(needle) {
            searchTerm = needle;
        };
    $('#someElement').trigger('search.getNeedle', getNeedle);

## Additional Info
This component needs tests!

### Suggestions & Questions
chris.saunders@frogtrade.com
ben.rycroft@frogtrade.com