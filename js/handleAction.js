/**
 * 
 * @param Handle change select (Add - Minus) Product by id 
 *               then update the price.
 */

// When user Click on button Add
function SelectAddCart(id) {
    var currentTotal = parseInt(getCurrentTotal(id));
    currentTotal += 1;
    var total = document.querySelector('.total-' + id);
    total.setAttribute('value', currentTotal);

    // 150
    var price = getCurrentPrice(id);
    var priceDOM = document.querySelector('.price-' + id);

    priceDOM.innerHTML = parseInt(priceDOM.textContent) + price + "$";
}

// When user Click on button minus
function SelectMinusCart(id) {
    var currentTotal = parseInt(getCurrentTotal(id));
    currentTotal -= 1;

    if (currentTotal <= 1) {
        currentTotal = 1;
    }

    var total = document.querySelector('.total-' + id);
    total.setAttribute('value', currentTotal);

    var price = getCurrentPrice(id);
    var priceDOM = document.querySelector('.price-' + id);

    (parseInt(priceDOM.textContent) === price) ?
        (priceDOM.innerHTML = parseInt(priceDOM.textContent) + "$") :
        (priceDOM.innerHTML = parseInt(priceDOM.textContent) - price + "$")


}

// Get price of Product
function getCurrentPrice(id) {
    var price = document.querySelector('.fakePrice-' + id).value;
    console.log("Price : " + price);
    return parseInt(price);
}

// get total of product user selected
function getCurrentTotal(id) {
    var total = document.querySelector('.total-' + id).value;
    return total;
}



/**
 *   Click Add Product
 */


//Render random photo from Picsums
const getRandomImageUrl = () => {
    const randomId = Math.trunc(Math.random() * 2000);
    var srcLink = `https://picsum.photos/id/${randomId}/150/150`;
    document.querySelector("#fileUpload").src = srcLink;
    return srcLink;
}

const handleRandomPhotoClick = async () => {
    if (onImageUrlChange) {
        const randomImageUrl = getRandomImageUrl();
        onImageUrlChange(randomImageUrl)
    }
}

document.querySelector(".addmore").addEventListener("click", onClickAddProduct);

//Click add product button
function onClickAddProduct() {
    var addmore = document.querySelector(".addmore");

    if (addmore === null) {
        addmore = document.querySelector('.toggleAdd')
    } else {
        // if (addmore) {
        addmore.innerHTML = `
            <div class="add__product">
                <div class="add__product__img">
                    <span class="label labelImg">Random Images</span>
                    <img 
                        id="fileUpload" 
                        onchange="handleEmptyValue()"
                        onclick="getRandomImageUrl()"
                        src=""
                    />
                    <span class='errorImg'>*</span>
                </div>

                <div class="add__product__name">
                    <div class="add__product__name__content">
                        <div class='name styleInput'>
                            <input 
                                type="text"
                                class="add-name"
                                placeholder="&nbsp;"
                                value=""
                                required
                            />
                            <span class="label labelName">Name</span>
                            <span class='errorName'>*</span>
                        </div>

                        <div class='type styleInput'>
                            <input 
                                type="text"
                                class="add-type"
                                placeholder="&nbsp;"
                                value=""
                                required
                            />
                            <span class="label labelType">Type</span>
                            <span class='errorType'>*</span>
                        </div>
                    </div>

                    <div class="add__product__name__action">
                        <div class='price styleInput'>
                            <input 
                                type="text"
                                class="add-price"
                                placeholder="&nbsp;"
                                value=""
                                required
                            />
                            <span class="label labelPrice">Price</span>
                            <span class='errorPrice'>*</span>
                        </div>
                        <button 
                            class="add__product__name__action__add-product"
                            id='add-product'
                            onmouseup="handleAddToggle()"
                            onClick="handleCreateProduct()"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
            `;
    }


    // }

    addmore.className = 'toggleAdd'
    console.log(addmore)
}

//