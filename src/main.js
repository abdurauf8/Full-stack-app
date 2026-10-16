const themeBtn = document.querySelector('.theme');
const logo = document.querySelector('#logo');

let currentTheme = localStorage.getItem('theme') || null;
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.classList.toggle('night');
    logo.setAttribute('src', 'src/assets/logo_nav.png');
}

themeBtn.addEventListener('click', () => {
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        currentTheme = 'light';
        themeBtn.classList.toggle('night');
        logo.setAttribute('src', 'src/assets/logo_nav_light.png');
    } else if (currentTheme === 'light' || !currentTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        currentTheme = 'dark';
        themeBtn.classList.toggle('night');
        logo.setAttribute('src', 'src/assets/logo_nav.png');
    }
});
/////////////////////////
const notify = (message) => {
    const alert = document.querySelector('.alert');
    alert.textContent = message;
    alert.classList.add('active');
    setTimeout(() => {
        alert.classList.remove('active');
    }, 4000);
};
/////////////////////////
const products = document.querySelector('.products');
const categoriesUl = document.querySelector('.categories');
const render = async function () {
    try {
        const res = await fetch('http://localhost:3300/products');
        if (!res.ok) {
            throw new Error("Serverdan ma'lumot olishda xatolik");
        }
        const data = await res.json();

        // Categories render
        const categories = data.reduce((acc, c) => {
            if (!acc.includes(c.category)) acc.push(c.category);
            return acc;
        }, []);

        categoriesUl.innerHTML = `<li id="all" class="active">All</li>`;
        const all = document.getElementById('all');
        all.addEventListener('click', render);
        categories.forEach((categoryValue) => {
            const newCategory = document.createElement('li');
            newCategory.textContent =
                categoryValue[0].toUpperCase() + categoryValue.slice(1) + 's';
            categoriesUl.append(newCategory);

            newCategory.addEventListener('click', () => {});
        });

        // Rendering products
        products.innerHTML = '';
        const fragment = document.createDocumentFragment();
        data.forEach((product) => {
            const newProduct = document.createElement('div');
            const newImgPart = document.createElement('div');
            const newInfoPart = document.createElement('div');
            const newBtnsPart = document.createElement('div');
            const newImg = document.createElement('img');
            const newProductName = document.createElement('p');
            const newProductPrice = document.createElement('h3');
            const newAddFavouriteBtn = document.createElement('button');
            const newAddCartBtn = document.createElement('button');
            const newFavouriteI = document.createElement('i');
            const newCartI = document.createElement('i');

            newProduct.classList.add('product');
            newImgPart.classList.add('img_part');
            newInfoPart.classList.add('info_part');
            newBtnsPart.classList.add('buttons_part');
            newProductName.classList.add('product_name');
            newProductPrice.classList.add('product_price');
            newAddFavouriteBtn.id = 'add_favourite';
            newAddCartBtn.id = 'add_cart';
            newFavouriteI.classList.add('fa-regular', 'fa-heart');
            newCartI.classList.add('fa-solid', 'fa-cart-plus');

            newImg.setAttribute('src', `http://localhost:3300${product.img}`);
            newProductName.textContent = product.name;
            newProductPrice.textContent = product.price + ' $';
            newAddFavouriteBtn.textContent = 'Favourite';
            newAddCartBtn.textContent = 'Add to Cart';

            newImgPart.append(newImg);
            newInfoPart.append(newProductName, newProductPrice);
            newAddFavouriteBtn.prepend(newFavouriteI);
            newAddCartBtn.prepend(newCartI);
            newBtnsPart.append(newAddFavouriteBtn, newAddCartBtn);

            newProduct.append(newImgPart, newInfoPart, newBtnsPart);
            fragment.append(newProduct);
        });
        products.append(fragment);
    } catch (err) {
        console.log('Xatolik:', err.message);
        notify("Xatolik sodir bo'ldi");
    }
};
render();
