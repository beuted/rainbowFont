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

        var imageObj = new Image();
        imageObj.src = 'img/mario.png';
        imageObj.onload = function() {
            // Clone the element and empty the original
            copy = el.clone().insertAfter(el);
            //el.css('background-color', 'pink');
            el.empty();

            recurseThroughNodes(el, copy, this);

            // Clear the original
            copy.empty();
        };
	}
};


var recurseThroughNodes = function (currentNode, copyNode, imageObj) {
    // Split the copy node into 1 node by word

    var lines = [];
    var numLine = -1;
    var previousHeight = 0;

    var colorList = ["red","blue","gray","black","yellow","purple","orange","green"];
    var colorId = 0;

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    var imgX = 0;
    var imgY = 0;

    var imgWidth = imageObj.width;
    var imgHeight = imageObj.height;

    context.drawImage(imageObj, imgX, imgY);

    var imageData = context.getImageData(imgX, imgY, imgWidth, imgHeight);

    var data = imageData.data;

    $.each(copyNode.text().split(' '), function(i, text) {
        currentNode.append(text + " ");
        if (currentNode.height() > previousHeight) {
            numLine++;
            lines.push([]);
        }
        lines[numLine].push(text)
        previousHeight = currentNode.height();
    });

    currentNode.empty();

    for (var i = 0; i < lines.length; i++) {
        for (var j = 0; j < lines[i].length; j++) {
            currentNode.append("<span style=\"color: " +
                getColor(data, imgWidth, imgHeight, lines[0].length/*TODO: not lines[] but max(line[x])*/, lines.length, i, j)
                + "\">" + lines[i][j] + "</span> ");
        }
    }
};

var getColor = function (data, imgWidth, imgHeight, textWidth, textHeight, textI, textJ) {
    var blockWidth = Math.round(imgWidth/textWidth);
    var blockHeight = Math.round(imgHeight/textHeight);

    var redMean = 0;
    var greenMean = 0;
    var blueMean = 0;
    var alphaMean = 0;

    // Strategy : Take the mean of the pixel in the rectangle.
    /*for (var i = textI*blockHeight; i < (textI+1)*blockHeight; i++) {
        for (var j = textJ*blockWidth; j < (textJ+1)*blockWidth; j++) {
            redMean += data[((imgWidth * i) + j) * 4];
            greenMean += data[((imgWidth * i) + j) * 4 + 1];
            blueMean += data[((imgWidth * i) + j) * 4 + 2];
            alphaMean += data[((imgWidth * i) + j) * 4 + 3];
        }
    }

    redMean /= blockHeight*blockWidth;
    greenMean /= blockHeight*blockWidth;
    blueMean /= blockHeight*blockWidth;
    alphaMean /= blockHeight*blockWidth;*/

    // Stategy: take pixel at the center
    var middlePixel = (Math.round(imgWidth * (textI+(1/2))*blockHeight)) + Math.round((textJ+(1/2))*blockWidth);

    redMean += data[middlePixel * 4];
    greenMean += data[middlePixel * 4 + 1];
    blueMean += data[middlePixel * 4 + 2];
    alphaMean += data[middlePixel * 4 + 3];

    return "rgba(" + redMean + ", " + greenMean + ", " + blueMean +", " + alphaMean + ")";

}
