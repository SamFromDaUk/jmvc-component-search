jmvc-component-search
====================

A search component for JMVC 3.2.4.

## API
### Events emitted
- 'search.find'

## Overview
A search component which renders a text input and emits the data entered.

### Key Features
- Ultra Light-weight
- Overridable view template
- Built to complement Event Oriented Architecture

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

## Additional Info
This component needs tests!

### Suggestions & Questions
chris.saunders@frogtrade.com
