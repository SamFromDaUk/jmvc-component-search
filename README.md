jmvc-component-search
====================

A search component for JMVC 3.2.4.

## API
### Events emitted
- 'search.query' (On "keyup", or on the selection of a typeahead option if typeahead is used)

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


## Options
- minimumChar (default 3)
- searchDelay (default 1000)
- placeholderText (default 'Search')
- template (.ejs file to overwrite the default)
- typeahead (Bootstrap Typeahead options)



## Additional Info
This component needs tests!

### Suggestions & Questions
chris.saunders@frogtrade.com
ben.rycroft@frogtrade.com