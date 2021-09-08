var search = document.querySelector('.filter-page__search');
var sort = document.querySelector('.filter-page__sort');


function filterSort() {
    var option = sort.value;
    console.log(option);
}

sort.addEventListener('change', function () {
    console.log('You selected: ', this.value);
    var option = this.value;

    switch (option) {
        case 'all':
            start();
            break;
        case 'price':
            var data = SortByPrice();
            console.table("AFTER SORT -> DATA : ", data);

            var result = data.map((value, index) => {
                console.log("value -> ", value);
            })

            var formData = {
                img: img.src,
                name: name.value,
                type: type.value,
                cost: parseInt(price.value),
            };
            break;
        case 'type':
            SortByType();
            break;
        default:
            break;
    }
});

function updateSortByPrice(data, callback) {
    var options = {
        method: "PATCH",
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

async function SortByPrice() {
    const response = await fetch(courseApi);
    var data = await response.json();

    // var data = getProduct(function (data) {
    //     console.table(data);
    //     console.log("Type of data : ", typeof data);

    //     // return Promise.resolve(data);
    //     return data;
    // });

    // console.table("TYPE OF DATA => ", typeof data);

    return data.sort(function (a, b) {
        return parseFloat(b.cost) - parseFloat(a.cost);
    });

}

function SortByType() {

}