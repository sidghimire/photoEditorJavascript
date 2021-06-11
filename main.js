$(document).ready(function() {
    var file = document.getElementById("uploadFile");
    var canvas = document.getElementById("mainCanvas");
    var context = canvas.getContext("2d");

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

    download_img = function(el) {
        var image = canvas.toDataURL("image/jpg");
        console.log(image);
        el.href = image;
        el.setAttribute('download', 'Export.jpg');

    };
});