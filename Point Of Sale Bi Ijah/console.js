// select semua tab menu utama
const tabs = document.querySelectorAll('[data-tab-target]');
// select semua tab yang memiliki id pada data tab target diatas
const tabsContent = document.querySelectorAll('[data-tab-content]');
// select elemen dengan id 'empty-order'
const emptyOrder = document.getElementById('empty-order');
// select order list container
const orderListContainer = document.getElementById('order-list-container');
// select elemen total harga
const totalHarga = document.getElementById('total-harga');

let jmlTotal;

// membuat format pecahan uang
function commaSeperatedFormat(amount) {
    return amount.toLocaleString('id');
}
// mengubah text harga dari elemen html menjadi integer
function intPrice(price) {
    return parseInt(price.match(/\d/g).join(''));
}

// menjumlahkan semua harga orderan
function sumHarga(productPrice, total) {
    total = total + productPrice;
    console.log(total)
    return total;
}

// membuat order list elemen html
function createOrderList(productName, productPrice) {
    // membuat container order list 
    const orderDetailContainer = document.createElement('li');
    orderDetailContainer.classList.add('order-detail-container');

    // membuat container order (delete button, nama produk, jumlah order)
    const orderContainer = document.createElement('div');
    orderContainer.classList.add('order-container');
    orderContainer.classList.add('flex-row');
    orderDetailContainer.appendChild(orderContainer);
    
    // membuat delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = '/icons/deleteIcon.svg';
    deleteBtn.appendChild(deleteIcon);
    orderContainer.appendChild(deleteBtn);
    // membuat nama order
    const orderName = document.createElement('h3');
    orderName.classList.add('order-name');
    orderName.innerHTML = productName;
    orderContainer.appendChild(orderName);
    
    // membuat container jumlah order
    const qtyContainer = document.createElement('div');
    qtyContainer.classList.add('qty-container');
    qtyContainer.classList.add('flex-row');
    orderContainer.appendChild(qtyContainer);
    // membuat tombol kurang
    const subtractBtn = document.createElement('button');
    subtractBtn.classList.add('subtract-btn');
    subtractBtn.innerHTML = '-';
    qtyContainer.appendChild(subtractBtn);
    //membuat text jumlah order
    const qtyOrder = document.createElement('h3');
    qtyOrder.classList.add('qty-order');
    qtyOrder.innerHTML = 1;
    qtyContainer.appendChild(qtyOrder);
    // membuat tombol tambah
    const addBtn = document.createElement('button');
    addBtn.classList.add('add-btn');
    addBtn.innerHTML = '+';
    qtyContainer.appendChild(addBtn);
    
    // membuat container harga produk
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container');
    priceContainer.classList.add('flex-row');
    orderDetailContainer.appendChild(priceContainer);
    
    // membuat text harga produk
    const orderPrice = document.createElement('h4');
    orderPrice.classList.add('order-price');
    orderPrice.innerHTML = `Rp ${commaSeperatedFormat(productPrice)}`;
    priceContainer.appendChild(orderPrice);

    // memasukkan order container kedalam order list container
    orderListContainer.appendChild(orderDetailContainer);
}

// membuat auto format form untuk jumlah uang
new Cleave('.form-uang-tunai', {
    numeral: true,
    numeralThousandGroupStyle: 'thousand',
    numeralDecimalMark: ',',
    delimiter: '.'
});

//loop setiap tab
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabsContent.forEach(tabContent => {
            tabContent.classList.remove('active');
        })
        target.classList.add('active');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        })
        tab.classList.add('active');
    })
});

// select semua menu selection
const menuItems = document.querySelectorAll(".menu-selection");
// loop setiap item yang belum ditekan
menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', () => {
        if(menuItem.classList.contains('active')) {
            menuItem.classList.remove('active');
        } else {
            menuItem.classList.add('active');
            emptyOrder.classList.add('hidden');
            const menuName = menuItem.querySelector('h1').textContent;
            const menuPrice = menuItem.querySelector('h3').textContent;
            // console.log(intPrice(menuPrice));
            createOrderList(menuName, intPrice(menuPrice));
            totalHarga.textContent = `Rp ${commaSeperatedFormat(sumHarga(intPrice(menuPrice), jmlTotal))}`;
        }
    })
});



// const kembalian = document.getElementById('jml-kembalian');
// const jumlah = 2500;
// kembalian.textContent = `Rp ${commaSeperatedFormat(jumlah)}`;