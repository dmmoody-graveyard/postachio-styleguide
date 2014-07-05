/**
 * Docs js
 */



$(document).ready(function() {
  var $content = $('.styleguide-content');

  // Create on-the-fly example code samples
  $content.find('.code-chunk').each(function(i, el) {
    var $el = $(el);
    var $exampleBlock;
    var exampleHtml;
    var nodes = [];

    // Create a new element, then wrap the code chunk in <pre> and <code> tags
    $exampleBlock = $el.wrap('<code></code>').parent();
    exampleHtml = $exampleBlock.children().html();

    htmlChunks = exampleHtml.split('\n');
    htmlChunks.shift();
    htmlChunks.pop();
    $.each(htmlChunks, function(i, el) {
      nodes.push(el.replace('  ',''))
    });

    // Insert the text of .code-chunk into the pre block
    $exampleBlock.text(nodes.join('\n'));

    // Highlight the code block appropriately
    hljs.configure({ languages: ['html', 'css'] });
    hljs.highlightBlock($exampleBlock.get()[0]);

    $exampleBlock = $exampleBlock.wrap('<pre class="example"></pre>').parent();

    // Insert the code block after the .code-chunk
    $el.insertBefore($exampleBlock);
  });

  // Create on-the-fly single-block example code samples
  $content.find('.code-chunk-single').each(function(i, el) {
    var $el = $(el);
    var $exampleBlock;
    var exampleHtml;
    var nodes = [];

    // Create a new element, then wrap the code chunk in <pre> and <code> tags
    $exampleBlock = $el.wrap('<code></code>').parent();

    // Insert the text of .code-chunk into the pre block
    exampleHtml = $exampleBlock.children().html();
    htmlChunks = exampleHtml.split('\n');
    htmlChunks.shift();
    htmlChunks.pop();
    $.each(htmlChunks, function(i, el) {
      nodes.push(el.replace('    ',''));
    });

    // Insert the text of .code-chunk into the pre block
    $exampleBlock.text(nodes.join('\n'));
    // $exampleBlock.text(exampleHtml);

    // Highlight the code block appropriately
    hljs.configure({ languages: ['html', 'css'] });
    hljs.highlightBlock($exampleBlock.get()[0]);

    $exampleBlock = $exampleBlock.wrap('<pre class="example example-single"></pre>').parent();

    // Insert the code block after the .code-chunk
    $el.html($exampleBlock.html());
  });

  /*
   * Check for browser support
   */
  if('SpeechRecognition' in window) {
    // Supported
  } else {
    $('#speech').remove()
  }

  $('#range, #number_input').on('change', function(e) {
    var $this = $(this);
    $this.next().text($this.val());
  })
})
