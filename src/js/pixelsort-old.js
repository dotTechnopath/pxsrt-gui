/*
 ASDF Pixel Sort
 Kim Asendorf | 2010 | kimasendorf.com
 
 sorting modes
 
 0 = black
 1 = brightness
 2 = white
 
 */

var mode = 2;

// image path is relative to sketch directory
var img;
var imgFileName = "oh";
var fileType = "jpg";

var loops = 3;

// threshold values to determine sorting start and end pixels
var blackValue = -13000000;
var brightnessValue = 60;
var whiteValue = -13000000;

var row = 0;
var column = 0;

var saved = false;

function setup() {

    img = loadImage(imgFileName + "." + fileType);

    // use only numbers (not variables) for the createCanvas() command, Processing 3

    createCanvas(windowWidth, windowHeight);
    // allow recreateCanvas and update surface to image dimensions
    //surface.setResizable(true);
    //surface.setSize(, );

    // load image onto surface - scale to the available width,height for display

}


function draw() {

    image(img, 0, 0);

    //loop through columns
    while (column < img.width - 1) {
        //console.log("Sorting Column " + column);
        img.loadPixels();
        sortColumn();
        column++;
        img.updatePixels();

    }
    // loop through rows
    while (row < img.height - 1) {
        //console.log("Sorting Row " + column);
        img.loadPixels();
        sortRow();
        row++;
        img.updatePixels();
    }

    // load updated image onto surface and scale to fit the display width,height
    image(img, 0, 0);

    // if (!saved && frameCount >= loops) {

    //     // save img
    //     img.save(imgFileName + "_" + mode + ".png");

    //     saved = true;
    //     console.log("Saved " + frameCount + " Frame(s)");

    //     // exiting here can varerrupt file save, wait for user to trigger exit
    //     console.log("Click or press any key to exit...");
    // }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// function keyPressed() {
//     if (saved) {
//         System.exit(0);
//     }
// }

// function mouseClicked() {
//     if (saved) {
//         System.exit(0);
//     }
// }

function sortRow() {
    // current row
    var y = row;

    // where to start sorting
    var x = 0;

    // where to stop sorting
    var xend = 0;

    while (xend < img.width - 1) {
        switch (mode) {
            case 0:
                x = getFirstNotBlackX(x, y);
                xend = getNextBlackX(x, y);
                break;
            case 1:
                x = getFirstBrightX(x, y);
                xend = getNextDarkX(x, y);
                break;
            case 2:
                x = getFirstNotWhiteX(x, y);
                xend = getNextWhiteX(x, y);
                break;
            default:
                break;
        }

        if (x < 0) break;

        var sortLength = xend - x;

        var unsorted = [];
        var sorted = [];

        for (var i = 0; i < sortLength; i++) {
            unsorted[i] = img.pixels[x + i + y * img.width];
        }

        sorted = sort(unsorted);

        for (var i = 0; i < sortLength; i++) {
            img.pixels[x + i + y * img.width] = sorted[i];
        }

        x = xend + 1;
    }
}


function sortColumn() {
    // current column
    var x = column;

    // where to start sorting
    var y = 0;

    // where to stop sorting
    var yend = 0;

    while (yend < img.height - 1) {
        switch (mode) {
            case 0:
                y = getFirstNotBlackY(x, y);
                yend = getNextBlackY(x, y);
                break;
            case 1:
                y = getFirstBrightY(x, y);
                yend = getNextDarkY(x, y);
                break;
            case 2:
                y = getFirstNotWhiteY(x, y);
                yend = getNextWhiteY(x, y);
                break;
            default:
                break;
        }

        if (y < 0) break;

        var sortLength = yend - y;

        var unsorted = [];
        var sorted = [];

        for (var i = 0; i < sortLength; i++) {
            unsorted[i] = img.pixels[x + (y + i) * img.width];
        }

        sorted = sort(unsorted);

        for (var i = 0; i < sortLength; i++) {
            img.pixels[x + (y + i) * img.width] = sorted[i];
        }

        y = yend + 1;
    }
}


// black x
function getFirstNotBlackX(x,
    y) {

    while (img.pixels[x + y * img.width] < blackValue) {
        x++;
        if (x >= img.width)
            return -1;
    }

    return x;
}

function getNextBlackX(x,
    y) {
    x++;

    while (img.pixels[x + y * img.width] > blackValue) {
        x++;
        if (x >= img.width)
            return img.width - 1;
    }

    return x - 1;
}

// brightness x
function getFirstBrightX(x, y) {

    while (brightness(img.pixels[x + y * img.width]) < brightnessValue) {
        x++;
        if (x >= img.width)
            return -1;
    }

    return x;
}

function getNextDarkX(_x,
    _y) {
    var x = _x + 1;
    var y = _y;

    while (brightness(img.pixels[x + y * img.width]) > brightnessValue) {
        x++;
        if (x >= img.width) return img.width - 1;
    }
    return x - 1;
}

// white x
function getFirstNotWhiteX(x, y) {

    while (img.pixels[x + y * img.width] > whiteValue) {
        x++;
        if (x >= img.width)
            return -1;
    }
    return x;
}

function getNextWhiteX(x, y) {
    x++;

    while (img.pixels[x + y * img.width] < whiteValue) {
        x++;
        if (x >= img.width)
            return img.width - 1;
    }
    return x - 1;
}


// black y
function getFirstNotBlackY(x, y) {

    if (y < img.height) {
        while (img.pixels[x + y * img.width] < blackValue) {
            y++;
            if (y >= img.height)
                return -1;
        }
    }

    return y;
}

function getNextBlackY(x, y) {
    y++;

    if (y < img.height) {
        while (img.pixels[x + y * img.width] > blackValue) {
            y++;
            if (y >= img.height)
                return img.height - 1;
        }
    }

    return y - 1;
}

// brightness y
function getFirstBrightY(x, y) {

    if (y < img.height) {
        while (brightness(img.pixels[x + y * img.width]) < brightnessValue) {
            y++;
            if (y >= img.height)
                return -1;
        }
    }

    return y;
}

function getNextDarkY(x, y) {
    y++;

    if (y < img.height) {
        while (brightness(img.pixels[x + y * img.width]) > brightnessValue) {
            y++;
            if (y >= img.height)
                return img.height - 1;
        }
    }
    return y - 1;
}

// white y
function getFirstNotWhiteY(x, y) {

    if (y < img.height) {
        while (img.pixels[x + y * img.width] > whiteValue) {
            y++;
            if (y >= img.height)
                return -1;
        }
    }

    return y;
}

function getNextWhiteY(x, y) {
    y++;

    if (y < img.height) {
        while (img.pixels[x + y * img.width] < whiteValue) {
            y++;
            if (y >= img.height)
                return img.height - 1;
        }
    }

    return y - 1;
}