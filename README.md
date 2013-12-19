# XHR Layout Switcher

Creates a connect/express middleware for dynamically swithcing out the view
layout when the request is made via AJAX.

```javascript
  // Setup express/connect app
  var createSwitcher = require('xhr-layout-switcher');
  var layoutSwitcher = createSwitcher({
    ajaxLayout: 'ajax'
  });

  app.use(layoutSwitcher);
```
