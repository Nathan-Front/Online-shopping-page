
let CartItem = [];
let counterForCart = 0;
let counterForItemQty = 0;
const cartItemCounter = document.getElementById("added-to-cart");
const cartElement = document.getElementById('checked-out-item');


//For adding item into the cart
function addingToCart(name, productsToId) {
    //Get the data from sessionStorage for comparison
    let getIdAndSize = JSON.parse(sessionStorage.getItem('itemFromCart')) || [];
    //Check the name passed from onclick 1st parameter 
    let index = getIdAndSize.findIndex(item => item.name === name);
    //Check if the there is such item. Index should start 0
    if (index !== -1) { 
        alert("No such item");
    } else {
    //Get the click event with its 2nd parameter to be used and get the container where that button belong to                    
    const productItemId = productsToId.closest('.list-of-items');
    //get the data-product-id equivalent from the container selected above
    const selectItemId = productItemId.dataset.productId;
    //For selected size of speficic item
    const selectedSizeInput = document.querySelector(`input[name="select-size-${selectItemId}"]:checked`);
    //For the image source of selected item. Get the data-image-src from the selected container above
    const imageSource = productItemId.dataset.imageSrc;
    //console.log("Url",imageSource);

    if (selectedSizeInput) {
        //Get all data from each element to be saved in an array
        const itemSelectedQty = document.querySelector(`span[class="item-count itemTotal-${selectItemId}"]`).textContent;
        console.log(itemSelectedQty);
        const selectedSize = selectedSizeInput.value;
        const productName = document.querySelector(`span[class="product-name-${selectItemId}"]`).textContent;
        let iPrice = parseFloat(document.querySelector(`span[id="item-price-${selectItemId}"]`).textContent);
        let itemCount = parseFloat(itemSelectedQty);
        //For counter of quantity for the selected item/product
        if(itemCount <= 0){
            alert("Input quantity");
            return;          
        }else{
            let tPrice = itemCount * iPrice;
            //Use the current date/time as an ID for sessionStorage of each item
            const newItem = new Date().getTime();
            const item = {
                StoredId: newItem,
                name: productName,
                price: iPrice,
                image: imageSource,
                size: selectedSize,
                quantity: itemCount,
                total: tPrice
                }; 
            CartItem.push(item); 
            //Increase the cart counter to be saved in sessionStorage  
            let counterFromStorage = JSON.parse(sessionStorage.getItem('cartCounter'));          
            counterFromStorage++;
            sessionStorage.setItem("cartCounter", counterFromStorage);
            //Pass and update the display of cart counter
            updateCounter();
            //Save the content of array item to sessionStorage
            let cartToId = JSON.parse(sessionStorage.getItem('itemFromCart'))||[];
            cartToId.push(item);
            sessionStorage.setItem('itemFromCart', JSON.stringify(cartToId));
            //console.log("Id to be store in storage",item.StoredId);      
        }        
   // }   
     }else{
        alert("Error detected, refresh website and try again!");
     }  
    }
    //Pass the data to show/update the cart display        
    updateCartContent();
    }

//This is when the page is reloaded or refreshed manually. To keep item in the cart and other display
function itemFromStorageOnReload(){

    let cartStorage = JSON.parse(sessionStorage.getItem('itemFromCart'))||[];
    //To show/hide checkout button
    if(cartStorage.length === 0){      
        sessionStorage.removeItem('itemFromCart');
        cartElement.innerHTML = "";
    //This is needed or else item in the cart will be doubled when reloading/refreshing     
    }else{
        cartElement.innerHTML = "";
    }
    //Loop the array of sessionStorage 
    cartStorage.forEach((item, index) =>{
        const li = document.createElement('li');
        li.className = 'cart-content-item';
       // li.setAttribute('data-item-id', `${item.StoredId}`);
        li.id = 'for-update-cart';
        li.innerHTML = `
         <div class="item-descript-cart">
                        <p>Item name: ${item.name}</p>
                        <p>Item price $<span id="item-price">9.75</span></p>
                        <p>seller: ABC comp.</p>
                        <img src="${item.image}" alt="Product image">
                        <h2>Size:<span class="selected-size">${item.size}</span></h2>
                        <span>Quantity; ${item.quantity}</span>
                        <span>Total: $${item.total}</span>                       
         </div>
         <div class="item-cart-button-cart" id="cart-delete-button">
                            <button onclick="deleteItemFromSession(${item.StoredId})"  data-item-id="${item.StoredId}" id="delete-item-from-cart" class="delete-item-from-cart">Delete</button>
        </div>
        `;
        //Newly added item to be always at the top
        cartElement.prepend(li);
        //cartElement.appendChild(li);//Use this if the checkout button has a fixed position
    }); 
}

//For each item quantity selection
//For clothing category
document.getElementById('clothing-container').addEventListener('click', function(event) {
    const clickedElement = event.target; 
    if(clickedElement.classList.contains('counter-add') || clickedElement.classList.contains('counter-minus')){
        const itemCON = clickedElement.closest('.list-of-items');
        const counterElm = itemCON.querySelector('.item-count');
        let cnt = parseInt(counterElm.textContent);
        if(clickedElement.classList.contains('counter-add')){
            //counterForItemQty++;
            cnt++;
        }else if(clickedElement.classList.contains('counter-minus')){
            if(cnt > 0){
                //counterForItemQty--;
                cnt--;
            }else{return 0;}
        }counterElm.textContent = cnt;
    }
});
//For shoe category
document.getElementById('clothing-container-shoes').addEventListener('click', function(event) {
    const clickedElement = event.target; 
    if(clickedElement.classList.contains('counter-add') || clickedElement.classList.contains('counter-minus')){
        const itemCON = clickedElement.closest('.list-of-items');
        const counterElm = itemCON.querySelector('.item-count');
        let cnt = parseInt(counterElm.textContent);
        if(clickedElement.classList.contains('counter-add')){
            //counterForItemQty++;
            cnt++;
        }else if(clickedElement.classList.contains('counter-minus')){
            if(cnt > 0){
                //counterForItemQty--;
                cnt--;
            }else{return 0;}
        }counterElm.textContent = cnt;
    }
});


//For cart counter
function updateCounter() {

    let counterFromStorage = JSON.parse(sessionStorage.getItem('cartCounter'))||[];

    if(sessionStorage.getItem('cartCounter') !== ""){
        cartItemCounter.textContent = counterFromStorage;
       const saveBack = cartItemCounter.textContent;
       sessionStorage.setItem('cartCounter', JSON.stringify(saveBack));   
    }else{
       return;
    }      
    updateCartContent();  
}

//For cart counter reload page. When page is reloaded/refreshed keep the current counter as is
document.addEventListener('DOMContentLoaded', () => {
    let cartReload = JSON.parse(sessionStorage.getItem('cartCounter'));
    if(cartReload !== null && cartReload !== ""){
        updateCounter(cartReload.length);
    }else{
        //To make sure the sessionStorage will be cleared out if counter is 0/sessionstorage is ""/[]
        sessionStorage.clear('cartCounter');
    } 
});
      
//For deleting item
function deleteItemFromSession(itemId){

    let counterFromStorage = JSON.parse(sessionStorage.getItem('cartCounter'));    
    if (sessionStorage.getItem('cartCounter').length !== 0) {
        //Search specific ID of item to be filtered out
        let cart = JSON.parse(sessionStorage.getItem('itemFromCart')||'[]');
        //Filter that specific ID out while the rest will be stored back to the sessionStorage
        cart = cart.filter(item => item.StoredId !== itemId);
        sessionStorage.setItem('itemFromCart', JSON.stringify(cart));
        //Decrease the counter in the sessionStorage and update it
        counterFromStorage--;
        sessionStorage.setItem("cartCounter", counterFromStorage);
        //use to reload/refreshed everytime item is deleted from cart. 
        //Use to update the cart counter in sessionstorage to be able to add that deleted item again if wanted
        //location.reload();    
    } else {
        return;
    }
    updateCounter();
    //Pass the updated sessionStorage to remove item from the cart if delete button was clicked
    updateCartContent();
} 


//For checkout button
const payment = document.getElementById('to-payment');
payment.addEventListener('click', function(){
    let tPrice = 0;
    const itemCount = document.getElementById("added-to-cart");
    let totalCheckoutPrice = JSON.parse(sessionStorage.getItem('itemFromCart'));
    totalCheckoutPrice.forEach(item =>{
        if(itemCount !== 0 || itemCount !== "")
        {
        tPrice += item.total;
        }

    });
    //updateCartContent();
    alert(`Total price: $${tPrice}`);
 });

function updateCartContent(itemId){
          
    let cartStore = JSON.parse(sessionStorage.getItem('itemFromCart'))||[];
    //To udate cart display
    if(cartStore.length === 0){   
        sessionStorage.removeItem('itemFromCart');
        cartElement.innerHTML = "";
    //This is needed or else item diplayed in the cart will be doubled when reloading/refreshing  
    }else{
        cartElement.innerHTML = "";
    }
    //Loop the array of sessionStorage     
    cartStore.forEach((item, index) =>{
        const itemQty = document.getElementsByClassName(".item-count");
        const li = document.createElement('li');
        li.className = 'cart-content-item';
      //  li.setAttribute('data-item-id', `${item.StoredId}`);
        li.id = 'for-update-cart';
        li.innerHTML = `
         <div class="item-descript-cart">
                        <p>Item name: ${item.name}</p>
                        <p>Item price $<span id="item-price">9.75</span></p>
                        <p>seller: ABC comp.</p>
                        <img src="${item.image}" alt="Product image">
                        <h2>Size:<span class="selected-size">${item.size}</span></h2>
                        <span>Quantity; ${item.quantity}</span>
                        <span>Total: $${item.total}</span>                       
         </div>
         <div class="item-cart-button-cart" id="cart-delete-button">
                            <button onclick="deleteItemFromSession(${item.StoredId})" data-item-id='${item.StoredId}' id="delete-item-from-cart" class="delete-item-from-cart">Delete</button>
        </div>
        `;
        //Newly added item to be always at the top
        cartElement.prepend(li);
        //cartElement.appendChild(li);//Use this if the checkout button has a fixed position
    });  
}
//When web is reloaded/refreshed
document.addEventListener('DOMContentLoaded', itemFromStorageOnReload);


//For filter function
function filterFunction(){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const items = document.querySelectorAll('.list-of-items');

    const checkedBoxes = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.dataset.option);

    items.forEach(item =>{
        const filteredItem = item.getAttribute('data-filter-opt1');
        const filteredItem2 = item.getAttribute('data-filter-opt2');
        
        if(checkboxes.length === 0){
            item.classList.remove('show');
        }else if(checkedBoxes.includes(filteredItem) || checkedBoxes.includes(filteredItem2)){
            //item.classList.remove('show');
            item.style = "display:block";
            console.log('displayed');
        }else{
            //item.classList.add('show');
            item.style = "display:none";
            console.log("removed", filteredItem);
        }
    });
}

document.addEventListener('DOMContentLoaded', () =>{
    const filterBtn = document.getElementById('filter-button');
    if(filterBtn){
        filterBtn.addEventListener('click', filterFunction);
    }
    const filterCancelBtn = document.getElementById('filter-button-cancel');
    filterCancelBtn.addEventListener('click', function (){
        location.reload();
    });
    //For the cart content
    //Get the cart button when clicked
    const checkoutCartContent = document.getElementById('check-out-cart');
    //Get the Id of container aside. This is for cart display
    const cartContentEmpty = document.getElementById('display-cart');
    //This will cover the page when cart is being dispayed. Prevent access to the main page
    const coverPage = document.getElementById('overlay');
    checkoutCartContent.addEventListener('click', function(){
    //Display the cart    
    if(cartContentEmpty.style.display !== 'none'){
        //Add this class name to the container as if it's in display:none
        cartContentEmpty.classList.add('navActive');
        //This prevents access to the main page while cart is on display
        coverPage.style.display = 'block';
    }else{
        cartContentEmpty.classList.remove('navActive');
        coverPage.style.display = 'none';
    }
    });
    //When close cart button was clicked same with else condition above
    const closeCart = document.getElementById('close-cart');
    closeCart.addEventListener('click', function(){
    if(closeCart){
        cartContentEmpty.classList.remove('navActive');
        coverPage.style.display = 'none';
        //Added this to reload the page to be able to add same item if it was deleted from the cart
        //Basically reloads the function of adding item to the cart 
        location.reload();
    }
    });  
});


window.onload = function(){
    //Get all buttons
    const newsBtn = document.querySelectorAll('.new-item-display-button');
    newsBtn.forEach(function (btnEl){
        btnEl.addEventListener('click', () => {
        //Remove the newsItemActive class name and add it to the next clicked button
        document.querySelector('.newsItemActive').classList.remove('newsItemActive');
        btnEl.classList.add('newsItemActive');
        });
    });
}
//USe data- and target the related item with Id name same as the data-target value
document.querySelectorAll('button[data-target]').forEach(function (el){
    el.addEventListener('click', () =>{
        //Get list of the items to be displayed one by one
        let newsContainer = document.getElementsByClassName('new-item-panel');
        for(let i = 0; i < newsContainer.length; i++){
            newsContainer[i].style.display = 'none';
        }
        //Target the Id name with the same data-target value of the clicked button
        document.getElementById(el.getAttribute('data-target')).style.display = "flex";
    });
}); 

/*
let currentIndex = 0;
const itemContainers = document.querySelectorAll('.carousel-item');
const dotBtn = document.querySelectorAll('.dot');
function functionCarousel(index){
    itemContainers[currentIndex].classList.remove('active');
    dotBtn[currentIndex].classList.remove('active');

    currentIndex = index;

    itemContainers[currentIndex].classList.add('active');
    dotBtn[currentIndex].classList.add('actives');

}
dotBtn.forEach((dot,index) => {
    dot.addEventListener('click', () => functionCarousel(index));
});
functionCarousel(currentIndex);*/

/*
let carouselContainer = document.querySelector('.owl-carousel');
let innerCarouselContainer = document.querySelector('.carousel-item');
let pressed = false;
let indexStartAt;
let x;
carouselContainer.addEventListener('mousedown', (e) => {
    pressed = true;
    indexStartAt = e.offsetX - innerCarouselContainer.offsetLeft;
    carouselContainer.style.cursor = 'grabbing';
});
carouselContainer.addEventListener('mouseenter', () => {
    carouselContainer.style.cursor = "grab";
});
carouselContainer.addEventListener('mouseup', () => {
    carouselContainer.style.cursor = "grab";
});
carouselContainer.addEventListener('mousemove', (e) => {
    if(!pressed) return;
    e.preventDefault();
    x = e.offsetX;
    innerCarouselContainer.style.left = `${x - indexStartAt}px`;
});*/

//Start of display index
let upperCarouselIndex = 0;
//All container with this class name
const upperSlides = document.querySelectorAll('.upper-carousel');
//For auto animation slide
let intervalId = null;
//Call the function 
document.addEventListener('DOMContentLoaded', initialSlide); 
function initialSlide(){
    if(upperSlides.length > 0){
        //Add this class name to the current container on display
        upperSlides[upperCarouselIndex].classList.add('upper-display');
        //Automatically go to next slide after 10 seconds
        intervalId = setInterval(nextSlide, 7000);
    }
}
function showSlide(index){
    //If next button clicked and reached and pass the last slide, return to 1st slide
    if(index >= upperSlides.length){
        upperCarouselIndex = 0;
    //If previsou button clicked and pass 1st slide, display last slide    
    }else if(index < 0){
        upperCarouselIndex = upperSlides.length - 1;
    }
    //Remove this class name from the slide to diplay the next slide with this class name added into it
    upperSlides.forEach(slides => {
        slides.classList.remove('upper-display');
    });
    //Finally display the selected slide by adding this class name
    upperSlides[upperCarouselIndex].classList.add('upper-display');
}
//Previous button
function prevSlide(){
    //When previous button is clicked the auto aniamtion will stop = null
    clearInterval(intervalId);
    upperCarouselIndex--;
    showSlide(upperCarouselIndex);
}
//Next button
function nextSlide(){
    upperCarouselIndex++;
    showSlide(upperCarouselIndex);
}


document.addEventListener('DOMContentLoaded', function() {
 //Get the Ul tag containers using its class name. Container for the carousel contents
 const carouselItemContainer = document.querySelector('.owl-carousel');
 //For previous and next button arrows
 const arrowBtns = document.querySelectorAll('.owl-carousel-container i');
 //Get the containers of each UL tags 
 const carouselContainer = document.querySelector('.owl-carousel-container');
 //Get LI tag as the carousel contents
 const firstItem = carouselItemContainer.querySelector('.carousel-item');
 //Get the layout width of the container/carousel item with all its contents
 const firstItemWidth = firstItem.offsetWidth;
 //Declare for when dragging on the screen
 let isDrag = false,
     startX,//Left/right movement
     startScrollLeft,//Storing scroll movement X axis
     timeoutId;//Scroll after mouse pointer leaving the container
 //When clicking and holding mouse
 const dragStart = (e) => {
    isDrag = true;
    carouselItemContainer.classList.add('dragging');//Add this class name when dragging
    startX = e.pageX;//Mouse cursor horizontal movement
    startScrollLeft = carouselItemContainer.scrollLeft;
 };
 //When removing mouse cursor out of the container
 const dragging = (e) => {
    if(!isDrag) return;
    const newScrollToLeft = startScrollLeft -(e.pageX - startX);//Get scroll to left action
    //If reached end of container to scroll to
    if(newScrollToLeft <= 0 || newScrollToLeft >=
       carouselItemContainer.scrollWidth - carouselItemContainer.offsetWidth ){
        isDrag = false;
        return;
       }
       carouselItemContainer.scrollLeft = newScrollToLeft;//Keep scrolling left
 };
 //If drag is released
 const dragStop = () => {
    isDrag = false;
    carouselItemContainer.classList.remove('dragging');
 };
//When leaving mouse cursor out of the container, scroll to left
 const autoPlay = () => {
    if(window.innerWidth < 900) return; 
    const totalItemWidth = carouselItemContainer.scrollWidth;
    const maxSCrollToLeft = totalItemWidth - carouselItemContainer.offsetWidth;
    if(carouselItemContainer.scrollLeft >= maxSCrollToLeft) return;
    timeoutId = setTimeout(() => carouselItemContainer.scrollLeft += firstItemWidth);
 };
  
 carouselItemContainer.addEventListener('mousedown', dragStart);
 carouselItemContainer.addEventListener('mousemove', dragging);
 document.addEventListener('mouseup', dragStop);
 carouselContainer.addEventListener('mouseenter', () => clearTimeout(timeoutId));
 carouselContainer.addEventListener('mouseleave', autoPlay);

 //Previous/next button
 arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
            carouselItemContainer.scrollLeft += btn.id === 'left' ? -firstItemWidth : firstItemWidth;
          
    });
 });
});


document.addEventListener('DOMContentLoaded', function() {
 const carouselItemContainerShoes = document.querySelector('.owl-carousel-shoes');
 const arrowBtns = document.querySelectorAll('.owl-carousel-container-shoes i');
 const carouselContainerShoes = document.querySelector('.owl-carousel-container-shoes');
 const firstItem = carouselItemContainerShoes.querySelector('.carousel-item-shoes');
 const firstItemWidth = firstItem.offsetWidth;

 let isDrag = false,
     startX,
     startScrollLeft,
     timeoutId;
 const dragStart = (e) => {
    isDrag = true;
    carouselItemContainerShoes.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carouselItemContainerShoes.scrollLeft;
 };
 const dragging = (e) => {
    if(!isDrag) return;
    const newScrollToLeft = startScrollLeft -(e.pageX - startX);
    if(newScrollToLeft <= 0 || newScrollToLeft >=
       carouselItemContainerShoes.scrollWidth - carouselItemContainerShoes.offsetWidth ){
        isDrag = false;
        return;
       }
       carouselItemContainerShoes.scrollLeft = newScrollToLeft;
 };
 const dragStop = () => {
    isDrag = false;
    carouselItemContainerShoes.classList.remove('dragging');
 };
 const autoPlay = () => {
    if(window.innerWidth < 600) return;
    const totalItemWidth = carouselItemContainerShoes.scrollWidth;
    const maxSCrollToLeft = totalItemWidth - carouselItemContainerShoes.offsetWidth;
    if(carouselItemContainerShoes.scrollLeft >= maxSCrollToLeft) return;
    timeoutId = setTimeout(() => carouselItemContainerShoes.scrollLeft += firstItemWidth);
 };
  
 carouselItemContainerShoes.addEventListener('mousedown', dragStart);
 carouselItemContainerShoes.addEventListener('mousemove', dragging);
 document.addEventListener('mouseup', dragStop);
 carouselContainerShoes.addEventListener('mouseenter', () => clearTimeout(timeoutId));
 carouselContainerShoes.addEventListener('mouseleave', autoPlay);

 arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
            carouselItemContainerShoes.scrollLeft += btn.id === 'left-Shoes' ? -firstItemWidth : firstItemWidth;
          
    });
 });
});



/*
const carouselSlides = document.querySelector('.owl-carousel');
const carouselIndicators = document.querySelector('.dot-indicator');
const indicators = document.querySelectorAll('.dot');
let currentIndex = 0; // Tracks the current active slide

// Function to update active indicator
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Example: Handling slide changes (e.g., from dragging or next/prev buttons)
function goToSlide(index) {
  currentIndex = index;
  // Logic to visually move the carousel to the selected slide
  // For example, by adjusting the `transform: translateX()` of carouselSlides
  carouselSlides.style.transform = `translateX(-${currentIndex * 28}%)`; // Assuming each slide is 100% width
  updateIndicators();
}

// Initialize indicators
updateIndicators();*/




/*
const dots = document.querySelectorAll('.dot');
function updateActiveDot() {
  const itemWidth = carouselItemContainer[0].offsetWidth; // Assuming all items have same width
  const currentScroll = carouselContainer.scrollLeft;
  const currentIndex = Math.round(currentScroll / itemWidth);

  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}updateActiveDot();

/*
let slideIndex = 1;
functionCarousel(slideIndex);
function currenslide(n){
    functionCarousel(slideIndex = n);
}
function functionCarousel(n){
    let i;
    let slides = document.getElementsByClassName('list-of-items');
    let dots = document.getElementsByClassName('dot');
    if(n > slides.length){
        slideIndex = 1
    }
    if(n < 1){
        slideIndex = slides.length;
    }
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    for(i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(' active', "");
    }
    slides[slideIndex-1].style.display = "flex";
    slides[slideIndex].style.display = "flex";
    slides[slideIndex+1].style.display = "flex";
    dots[slideIndex-1].className += ' active';
}*/
/*
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');

let isDragging = false;
let startX;
let scrollLeft;

carouselInner.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - carouselInner.offsetLeft;
  scrollLeft = carouselInner.scrollLeft;
});

carouselInner.addEventListener('mouseleave', () => {
  isDragging = false;
});

carouselInner.addEventListener('mouseup', () => {
  isDragging = false;
});

carouselInner.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - carouselInner.offsetLeft;
  const walk = (x - startX) * 2; // Adjust sensitivity
  carouselInner.scrollLeft = scrollLeft - walk;
  updateActiveDot();
});

function updateActiveDot() {
  const itemWidth = carouselItems[0].offsetWidth; // Assuming all items have same width
  const currentScroll = carouselInner.scrollLeft;
  const currentIndex = Math.round(currentScroll / itemWidth);

  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Initial active dot setting
updateActiveDot();*//*
const throttle = (func, time = 100) => {
  let lastTime = 0;
  return () => {
    const now = new Date();
    if (now - lastTime >= time) {
      func();
      time = now;
    }
  };
};
//window.addEventListener('scroll', throttle(validateHeader, 100));
  let lastScrollTop = 0;
  //const header = document.querySelector('header');
/*
const validateHeader = () => {
    const windowY = window.scrollY;
    const windowH = window.innerHeight;

    if(windowY > windowH){
        header.classList.add('is-fixed');
        if(windowY > windowH + 40){
            header.classList.add('is-animated');
            if(windowY < lastScrollTop){
                header.classList.add('scroll-up');
            }else{
                header.classList.remove('scroll-up');
            }
        }else{
        header.classList.remove('scroll-up');
        }
    }else{
        header.classList.remove('is-fixed', 'is-animated');
    }
    lastScrollTop = windowY;
};*/

/*
  window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
      // Scrolling Down: Hide the header
      header.classList.remove('scroll-up');
    } else {
      // Scrolling Up: Show the header
      header.classList.add('scroll-up');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  });
/*
  var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  var header = document.getElementById("display-on-scroll");

  if (prevScrollpos > currentScrollPos) {
    // Scrolling up, show the header
    header.classList.remove("scroll-down-hide");
  } else {
    // Scrolling down, hide the header
    header.classList.add("scroll-down-hide");
  }
  prevScrollpos = currentScrollPos;
}*/


var lastScrollTop = 0;
//Get Title container
const header =document.getElementById('display-on-scroll');
window.addEventListener('scroll', function () {
    var scrollTop = window.screenY || document.documentElement.scrollTop;
    if(scrollTop > lastScrollTop){//Basically when scrolling up
        header.style.top ='-10%';//Display the title container
    }else{
        header.style.top ='0%';//Hide when scrolling down
    }
    lastScrollTop = scrollTop;
});