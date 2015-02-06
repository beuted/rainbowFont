/**
 * rainbowFont  : A fun js lib allowing you to color text based on images
 * Repository : https://github.com/beuted/rainbowFont 
 * Author     : Benoit Jehanno
 */


 //TODO: use prototype for perf
var rainbowFont = {
	color: function(el) {
		// For the moment we use a font where all the char have the same width
		el.css("font-family", "Courier New");

		var width = el.width();
		var height = el.width();
		var lineHeight = el.css('line-height');

		var color = [255, 255, 000];

		// Clone the element and empty the original
        copy = el.clone().insertAfter(el);
        el.empty();

        recurseThroughNodes(el, copy);

	}
};


var recurseThroughNodes = function (currentNode, copyNode) {
    $(copyNode).contents().each(function () {
        var nextCopy,
            currentHeight;
        
        // update the height
        currentHeight = el.height();

        // If this is a text node
        if (this.nodeType === 3) {
            // move it to the original element
            $(this).appendTo(currentNode);
        } else {
            // Make an empty copy and put it in the original,
            // so we can copy text into it
            nextCopy = $(this).clone().empty()
                    .appendTo(currentNode);
            recurseThroughNodes(nextCopy, this);
        }

        // If the height has changed
        if (el.height() !== currentHeight) {
            // insert a line break
            el.css("color", "red");

        }
    });
};
