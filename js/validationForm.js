
/**
 * 
 * Validation Add Product form
 * 
 */
function handleEmptyValue() {
    var Img = document.querySelector('#fileUpload').src;
    var Name = document.querySelector('.add-name').value;
    var Type = document.querySelector('.add-type').value;
    var Price = document.querySelector('.add-price').value;

    var errorMessImg = document.querySelector('.errorImg');
    var errorMessName = document.querySelector('.errorName');
    var errorMessType = document.querySelector('.errorType');
    var errorMessPrice = document.querySelector('.errorPrice');


    if (handleImg.getAttribute('src') == "") {
        errorMessImg.className = ' errorImgShow';
    } else if (handleName = null) {
        errorMessName.className = ' errorNameShow';
    } else if (handleType = null) {
        errorMessType.className = ' errorTypeShow';
    } else if (handlePrice = null) {
        errorMessPrice.className = ' errorPriceShow';
    } else {
        alert('Add Successfull');
    }
}

// errorMessImg.classList.remove('errorImgShow');


function handleAddToggle() {
    handleEmptyValue();
}

// <input
//     class='upload-file'
//     type="file"
//     accept=".jpg, .jpeg, .png"
//     onchange="document.getElementById('fileUpload').src = window.URL.createObjectURL(this.files[0])"
//     required
// />