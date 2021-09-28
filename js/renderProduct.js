/**
 *  -> fetch data from API - using json-server
 *  -> do CRUD operator
 * 
 */

var courseApi = "http://localhost:3000/product";
function start() {
    // getProduct(renderProduct);
    getProduct(function (products) {
        renderProduct(products);
    });
}

start();

/**
 * #fetch funciton
 * @param {callback} callback 
 * 
 */
// Get Courses
function getProduct(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}


// Render Courses
function renderProduct(data) {
    var listProductsBlock = document.querySelector(".header-content__items");
    var htmls = data.map(function (Product) {
        return `
        <div class="header-content__items__product product-${Product.id}">
            <img 
                src=${Product.img}
                class="header-content__items__product-image image-${Product.id}" 
                src=""
            />
            <div class="header-content__items__product-properties">
                <div class="properties__name">
                    <div class="properties__name__content">
                        <h3 class="name name-${Product.id}">${Product.name}</h3>
                        <div class="style style-${Product.id}">${Product.type}</div>
                    </div>

                    <div class="properties__name__action">
                        <button 
                            class="btn-wrapper AddCart"
                            onClick="handleAddProductToCart(${Product.id})">
                            &#128722;
                        </button>
                        <button 
                            class="EditCart"
                            onClick="handleEditProduct(${Product.id})">
                            &#x270D;
                        </button>
                        <button 
                            class="Remove"
                            onClick="handleDeleteProduct(${Product.id})">
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="properties__value">
                    <div class="properties__value__price">
                        <input 
                            class="fakePrice fakePrice-${Product.id}"
                            value="${Product.cost}"
                        />
                        <div class="costed price-${Product.id}">${Product.cost}<div class="dollar">$</div></div>
                    </div>
                    <div class="properties__value__quantity">
                        <button 
                            class="plus"
                            onClick="SelectAddCart(${Product.id})">
                            &#43;
                        </button>
                        <input 
                            class="total total-${Product.id}" 
                            type="text" 
                            value="1" 
                            readonly 
                        />
                        <button 
                            onClick="SelectMinusCart(${Product.id})"
                            class="minus">
                            &#8722;
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    listProductsBlock.innerHTML = htmls.join("");
}


//Handle Quantity Product


// CreateCourse
function createCourse(data, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(courseApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

// Create Product
function handleCreateProduct() {
    var createBtn = document.querySelector("#add-product");
    createBtn.onclick = function () {
        var img = document.querySelector('#fileUpload').src;
        var name = document.querySelector('.add-name').value;
        var type = document.querySelector('.add-type').value;
        var price = document.querySelector('.add-price').value;
        var formData = {
            img: img,
            name: name,
            type: type,
            cost: parseInt(price),
        };
        if (img != "" && name != "" && type != "" && price != "") {
            createCourse(formData, function () {
                getProduct(renderProduct);
            });
        } else {
            alert("Hãy nhập đầy đủ thông tin");
        }
    };
}

// Delete Product
function handleDeleteProduct(id) {
    var result = confirm("Want to delete?");
    if (result) {
        var options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(courseApi + "/" + id, options)
            .then(function (response) {
                return response.json();
            })
            .then(function () {
                var productItem = document.querySelector(".product-" + id);
                if (productItem) {
                    productItem.remove();
                }
            });
    }
}

/**
 * # Update Course
 * @param { id Product } id 
 * @param { data update } data 
 * @param { callback function } callback 
 */

function updateProduct(id, data, callback) {
    var options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(courseApi + "/" + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function handleEditProduct(id) {
    var ProductEdit = document.querySelector('.product-' + id);

    var currentImg = document.querySelector('.image-' + id).src;
    var currentName = document.querySelector('.name-' + id).textContent;
    var currentType = document.querySelector('.style-' + id).textContent;
    var currentPrice = document.querySelector('.price-' + id).textContent;

    // console.log(currentName)

    ProductEdit.innerHTML = `
            <div class="add__product updated-${id}">
                <div class="add__product__img">
                    <span class="label labelImg">Random Images</span>
                    <img 
                        id="fileUpload" 
                        class="updateImg-${id}"
                        onchange="handleEmptyValue()"
                        onclick="getRandomImageUrl()"
                        name="img"
                        src=${currentImg}
                    />
                    <span class='errorImg'>*</span>
                </div>

                <div class="add__product__name">
                    <div class="add__product__name__content">
                        <div class='name styleInput'>
                            <input 
                                type="text"
                                class="edit-name-${id}"
                                placeholder="&nbsp;"
                                name="name"
                                value="${currentName}"
                                required
                            />
                            <span class="label labelName">
                                Name
                            </span>
                            <span class='errorName'>*</span>
                        </div>

                        <div class='type styleInput'>
                            <input 
                                type="text"
                                class="edit-type-${id}"
                                placeholder="&nbsp;"
                                name="type"
                                value="${currentType}"
                                required
                            />
                            <span class="label labelType">
                                Type
                            </span>
                            <span class='errorType'>*</span>
                        </div>
                    </div>

                    <div class="add__product__name__action">
                        <div class='price styleInput'>
                            <input 
                                type="text"
                                class="edit-price-${id}"
                                placeholder="&nbsp;"
                                name="price"
                                value="${currentPrice}"
                                required
                            />
                            <span class="label labelPrice">
                               Price
                            </span>
                            <span class='errorPrice'>*</span>
                        </div>
                        <button 
                            class="add__product__name__action__add-product"
                            id='add-product'
                            onClick="updatedProduct(${id})"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>`;
}

function updatedProduct(id) {
    var productItem = document.querySelector(".updated-" + id);
    // console.log(productItem);

    var img = productItem.querySelector('.updateImg-' + id);
    var name = productItem.querySelector('.edit-name-' + id);
    var type = productItem.querySelector('.edit-type-' + id);
    var price = productItem.querySelector('.edit-price-' + id);

    console.log("img - " + img);
    console.log("name - " + name);
    console.log("type - " + type);
    console.log("price - " + price);

    var formData = {
        img: img.src,
        name: name.value,
        type: type.value,
        cost: parseInt(price.value),
    };
    if (name.value != "" && img.src != "" && type.value != "" && price.value != "") {
        updateProduct(id, formData, function () {
            // getProduct(renderProduct);
        });
    } else {
        alert("Hãy nhập đầy đủ thông tin");
    }
}

/**
 * End of Update Product
 */









/**
 *
 *  Add product to cart
 *
 */

function handleAddProductToCart(id) {

}


