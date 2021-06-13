$(document).ready(function() {
    var file = document.getElementById("uploadFile");
    var canvas = document.getElementById("mainCanvas");
    var context = canvas.getContext("2d");
    var canvasState = [];
    var lastArray;
    context.translate(0, 0);
    var undoNumber = 0;

    $("#uploadFile").change(function(e) {
        e.preventDefault();
        file = document.getElementById("uploadFile");
        canvas = document.getElementById("mainCanvas"); // grabs the canvas element
        canvas.width = 800;
        canvas.height = 800;
        var setImage = document.getElementById("uploadedImage").src = file.files[0].name;
        var getImage = document.getElementById("uploadedImage");



        getImage.onload = function() {

            if (getImage.naturalHeight > getImage.naturalWidth) {
                var ratio = getImage.naturalHeight / getImage.naturalWidth;
            } else if (getImage.naturalHeight < getImage.naturalWidth) {
                var ratio = getImage.naturalWidth / getImage.naturalHeight;

            } else {
                var ratio = 1;
            }
            if (getImage.naturalHeight > 500 || getImage.naturalWidth > 1200) {
                ratio = ratio / 2.5;
            } else if (getImage.naturalHeight > 600 || getImage.naturalWidth > 1300) {
                ratio = ratio / 3.5;
            } else if (getImage.naturalHeight > 700 || getImage.naturalWidth > 1400) {
                ratio = ratio / 4.5;
            } else if (getImage.naturalHeight > 800 || getImage.naturalWidth > 1500) {
                ratio = ratio / 6;
            }

            canvas.width = getImage.naturalWidth * ratio;
            canvas.height = getImage.naturalHeight * ratio;
            context.drawImage(getImage, 0, 0, getImage.naturalWidth * ratio, getImage.naturalHeight * ratio);
        }

    });

    function addText(x, y) {
        var text = window.prompt("Enter Text You Want To Add");
        context.font = "40px Arial";
        if (text != null) {
            context.fillText(text, x, y);

        }
    }

    var action;
    $("#drawButton").on('click', function() {
        action = 'draw';
    });
    $("#brush").on('click', function() {
        action = 'brush';
    });
    $("#crop").on('click', function() {
        action = 'crop';
    });
    $("#select").on('click', function() {
        action = 'select';
    });
    $("#text").on('click', function() {
        action = 'text';
    });

    $("#resize").on('click', function() {
        var resizeScale = window.prompt("Input Resize Scale");
        var tempCanvas = document.createElement("canvas");
        var tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
        canvas.width = tempCanvas.width * resizeScale;
        canvas.height = tempCanvas.height * resizeScale;
        context.drawImage(tempCanvas, 0, 0, tempCanvas.width * resizeScale, tempCanvas.height * resizeScale);

    });
    $("#scissors").on('click', function() {
        if (action == 'crop') {
            var tempCanvas = document.createElement("canvas");
            var tempCtx = tempCanvas.getContext("2d");
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

            canvas.width = cropDimX;
            canvas.height = cropDimY;
            context.drawImage(tempCanvas, cropXInit + 1, cropYInit + 1, cropDimX - 2, cropDimY - 2, 0, 0, cropDimX, cropDimY);

        }
    });
    $("#bucket").on('click', function() {
        if (action == 'crop') {
            context.fillStyle = "#FF0000";
            context.fillRect(cropXInit - 1, cropYInit - 1, cropDimX + 2, cropDimY + 2);

        }
    });
    var change = 0;
    var newX = 0;
    var newY = 0;

    $("#delete").on("click", function() {
        if (action == 'crop') {
            context.clearRect(cropXInit - 1, cropYInit - 1, cropDimX + 2, cropDimY + 2);

        }

    });
    $("#rotateClock").on('click', function() {
        var tempCanvas = document.createElement("canvas");
        var tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = tempCanvas.height;
        canvas.height = tempCanvas.width;
        context.save();

        context.translate(canvas.width / 2, canvas.height / 2);
        context.imageSmoothingEnabled = false;

        context.rotate(-90 * Math.PI / 180);

        context.drawImage(tempCanvas, -canvas.width / 2, -canvas.height / 2);
        context.restore();

        tempCanvas.remove();

    });

    $("#rotateAntiClock").on('click', function() {
        var tempCanvas = document.createElement("canvas");
        var tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = tempCanvas.height;
        canvas.height = tempCanvas.width;
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.imageSmoothingEnabled = false;

        context.rotate(90 * Math.PI / 180);
        context.drawImage(tempCanvas, -canvas.width / 2, -canvas.height / 2);
        context.restore();

        tempCanvas.remove();

    });

    var x = 0;
    var y = 0;
    var cropXInit = 0;
    var cropYInit = 0;
    var cropDimX = 0;
    var cropDimY = 0;
    var isDrawing = false;
    var isBrushing = false;
    canvas.addEventListener("mousedown", e => {

        if (action == 'draw') {
            isDrawing = true;
            x = e.offsetX;
            y = e.offsetY;
        } else if (action == 'brush') {
            isBrushing = 'true';
            x = e.offsetX;
            y = e.offsetY;
        } else if (action == 'crop') {

            x = e.offsetX;
            y = e.offsetY;
        } else if (action == 'text') {

            x = e.offsetX;
            y = e.offsetY;
            addText(x, y);
        }
    });
    canvas.addEventListener("mouseup", e => {

        if (action == 'draw') {
            isDrawing = false;

        } else if (action == 'brush') {
            isBrushing = false;

        } else if (action == 'crop') {
            var tempCanvas = document.createElement("canvas");
            var tempCtx = tempCanvas.getContext("2d");
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);

            context.lineWidth = 1;
            context.strokeRect(x, y, e.offsetX - x, e.offsetY - y);
            cropXInit = x;
            cropYInit = y;
            cropDimX = e.offsetX - cropXInit;
            cropDimY = e.offsetY - cropXInit;

        }


    });
    canvas.addEventListener("mousemove", e => {

        context.translate(0, 0);
        if (isDrawing) {
            context.beginPath();
            context.lineCap = 'round';
            context.moveTo(x, y);
            context.lineTo(e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
            context.lineWidth = 3;
            context.stroke();
            context.closePath();

        } else if (isBrushing) {
            context.beginPath();
            context.lineCap = 'round';
            context.moveTo(x, y);
            context.lineTo(e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
            context.lineWidth = 10;
            context.stroke();

            context.closePath();
        }

    });



    download_img = function(el) {
        var image = canvas.toDataURL("image/jpg");
        el.href = image;
        el.setAttribute('download', 'Export.jpg');

    };
});