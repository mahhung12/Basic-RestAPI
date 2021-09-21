var search = document.querySelector('.filter-page__search__value');
var sort = document.querySelector('.filter-page__sort');
var option = document.querySelectorAll('.optionValue');
var index = 0;
var indexType = 0;

search.addEventListener('input', function (e) {
    console.log(e.target.value);

    var valueSearch = e.target.value;


})

sort.addEventListener('mouseout', function () {
    var option = sort.value;
    switch (option) {
        case 'all':
            start();
            break;
        case 'price':
            var data;
            if (index % 2 === 0) {
                data = SortByPrice(0);
            } else {
                data = SortByPrice(1);
            }
            index++;

            var pro = Promise.resolve(data);
            pro.then(function (value) {
                renderProduct(value);
            });
            break;
        case 'type':
            var data;
            if (indexType % 2 === 0) {
                data = SortByType(0);
            } else {
                data = SortByType(1);
            }
            indexType++;

            var pro = Promise.resolve(data);
            pro.then(function (value) {
                renderProduct(value);
            });
            break;
        default:
            break;
    }
});

async function SortByPrice(index) {
    const response = await fetch(courseApi);
    var data = await response.json();

    if (index === 0) {
        return data.sort(function (a, b) {
            return parseFloat(a.cost) - parseFloat(b.cost);
        });
    } else if (index === 1) {
        return data.sort(function (a, b) {
            return parseFloat(b.cost) - parseFloat(a.cost);
        });
    }
}

async function SortByType(index) {
    const response = await fetch(courseApi);
    var data = await response.json();
    var field = "type";

    if (index === 0) {
        return data.sort((a, b) => (a[field] || "").toString().localeCompare((b[field] || "").toString()));
    } else if (index === 1) {
        return data.sort((a, b) => (b[field] || "").toString().localeCompare((a[field] || "").toString()));
    }
}

async function Search(product) {

}