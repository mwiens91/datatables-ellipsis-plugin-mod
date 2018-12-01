# DataTables ellipsis plugin (modified)

The following is a modified version of Allan Jardine's [ellipsis
plugin](https://datatables.net/plug-ins/dataRender/ellipsis) for
[DataTables](https://www.datatables.net/).

Basically the original ellipsis plugin freaks out if the "text" a cell
contains is an HTML hyperlink. This modification changes the plugin so
it won't freak out.

Note that I haven't tested this plugin on anything else but the simple
case of a cell containing something like

```
<a href="mylinkhere">string we want to truncate</a>
```

so I guarantee no robustness beyond my simple use case.
