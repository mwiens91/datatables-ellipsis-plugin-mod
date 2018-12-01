/**
 * Note that this is a modified version of the ellipsis plugin. See
 * here https://github.com/mwiens91/datatables-ellipsis-plugin-mod for
 * details. What follows is the original module description:
 *
 * This data rendering helper method can be useful for cases where you have
 * potentially large data strings to be shown in a column that is restricted by
 * width. The data for the column is still fully searchable and sortable, but if
 * it is longer than a give number of characters, it will be truncated and
 * shown with ellipsis. A browser provided tooltip will show the full string
 * to the end user on mouse hover of the cell.
 *
 * This function should be used with the `dt-init columns.render` configuration
 * option of DataTables.
 *
 * It accepts three parameters:
 *
 * 1. `-type integer` - The number of characters to restrict the displayed data
 *    to.
 * 2. `-type boolean` (optional - default `false`) - Indicate if the truncation
 *    of the string should not occur in the middle of a word (`true`) or if it
 *    can (`false`). This can allow the display of strings to look nicer, at the
 *    expense of showing less characters.
 * 2. `-type boolean` (optional - default `false`) - Escape HTML entities
 *    (`true`) or not (`false` - default).
 *
 *  @name ellipsis
 *  @summary Restrict output data to a particular length, showing anything
 *      longer with ellipsis and a browser provided tooltip on hover.
 *  @author [Allan Jardine](http://datatables.net)
 *  @requires DataTables 1.10+
 *
 * @returns {Number} Calculated average
 *
 *  @example
 *    // Restrict a column to 17 characters, don't split words
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 1,
 *        render: $.fn.dataTable.render.ellipsis( 17, true )
 *      } ]
 *    } );
 *
 *  @example
 *    // Restrict a column to 10 characters, do split words
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 2,
 *        render: $.fn.dataTable.render.ellipsis( 10 )
 *      } ]
 *    } );
 */

jQuery.fn.dataTable.render.ellipsis = function ( cutoff, wordbreak, escapeHtml ) {
  var esc = function ( t ) {
    return t
      .replace( /&/g, '&amp;' )
      .replace( /</g, '&lt;' )
      .replace( />/g, '&gt;' )
      .replace( /"/g, '&quot;' );
  };

  var shorten_text = function( text ) {
      // Don't do anything if the text doesn't need shortening
      if ( text.length <= cutoff ) {
        return text;
      }

      var shortened = text.substr(0, cutoff - 1);

      // Find the last white space character in the string
      if ( wordbreak ) {
        shortened = shortened.replace(/\s([^\s]*)$/, '');
      }

      // Protect against uncontrolled HTML input
      if ( escapeHtml ) {
        shortened = esc( shortened );
      }

      return shortened + '…';
  }

  return function ( d, type, row ) {
    // Order, search and type get the original data
    if ( type !== 'display' ) {
      return d;
    }

    if ( typeof d !== 'number' && typeof d !== 'string' ) {
      return d;
    }

    d = d.toString(); // cast numbers

    // This will return undefined if the text in d isn't a string
    var shortened_text = $( d ).text(function( index, text ) {
      return shorten_text( text );
    })[0];

    // Test against undefined here
    if ( typeof shortened_text === 'undefined' ) {
      shortened_text = shorten_text( d );
      full_text = d;
    } else {
      // shortened_text isn't undefined: it's an element. Grab the
      // relevant HTML.
      shortened_text = shortened_text.outerHTML;
      full_text = $( d ).text();
    }

    return '<span class="ellipsis" title="' + esc( full_text ) +'">' + shortened_text + '</span>';
  };
};
