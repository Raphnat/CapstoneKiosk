import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuSzs-m6ToSKy5M7RGPT6-whsmajo0iKg",
  authDomain: "soshiok-ip2023.firebaseapp.com",
  databaseURL: "https://soshiok-ip2023-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "soshiok-ip2023",
  storageBucket: "soshiok-ip2023.appspot.com",
  messagingSenderId: "431465307758",
  appId: "1:431465307758:web:4eb2571a1d02940f1a507f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

  var center;
  var stall;
  var item;
  var itemQty;
  

  
// MENU STUFF WQILRHIWHRIWFQHFIORF@Q 
  function displayMenu(center, stall) {
    var menuRef = firebase.database().ref(center + '/' + stall + 'menu');
    menuRef.on('value', function(snapshot) {

      clearMenu();
  
      snapshot.forEach(function(childSnapshot) {
        var itemName = childSnapshot.key;
        var itemData = childSnapshot.val();
        var itemPrice = itemData.price;
  
        var itemElement = document.createElement('div');
        itemElement.classList.add('item');
  
        
        var nameElement = document.createElement('h3');
        nameElement.textContent = itemName;
        itemElement.appendChild(nameElement);
  
        
        var priceElement = document.createElement('p');
        priceElement.textContent = '$' + itemPrice;
        itemElement.appendChild(priceElement);
  
        
        var orderButton = document.createElement('button');
        orderButton.textContent = 'Order';
        orderButton.addEventListener('click', function() {

          // order button click 
          console.log('Order: ' + itemName);

        });
        itemElement.appendChild(orderButton);
  
        var menuContainer = document.getElementById('menuContainer');
        menuContainer.appendChild(itemElement);
      });
    });
  }
  

  function clearMenu() {
    var menuContainer = document.getElementById('menuContainer');
    menuContainer.innerHTML = '';
  }
  
  displayMenu(center,stall);

  // STALL STUFFS
function displayStalls(center,stall) {

  var centerRef = firebase.database().ref(center+"/" + stall);


  centerRef.on('value', function(snapshot) {

    clearStalls();


    snapshot.forEach(function(childSnapshot) {
      var stallKey = childSnapshot.key;

      var stallElement = document.createElement('div');
      stallElement.classList.add('stall');

      var nameElement = document.createElement('h3');
      nameElement.textContent = stallKey;
      stallElement.appendChild(nameElement);

      var stallsContainer = document.getElementById('stallsContainer');
      stallsContainer.appendChild(stallElement);
    });
  });
}


function clearStalls() {
  var stallsContainer = document.getElementById('stallsContainer');
  stallsContainer.innerHTML = '';
}

displayStalls(center);

//ORDERING STUFF

// call function when press order button under menu item
function openOrderItem(item){
  var orderItemContainer = document.getElementById('orderItemContainer');
  var orderItemImg=document.getElementById('orderItemImg');
  var orderItemName =document.getElementById('orderItemName');


  orderItemName = item;
  orderItemContainer.style.display ="block";

  //image source need to link to firebase storage later
}

// shopping cart n check out 

function addToCart(item,itemQty){

  var cartItems = localStorage.getItem('cartItems');
  var cart = [];

  if (cartItems){

    cart = JSON.parse(cartItems);
  }
  var cartItem ={
    item: item,
    itemQty: itemQty
  };

  cart.push(cartItem)

  localStorage.setItem('cartItems',JSON.stringify(cart));
  console.log('item:',cartItem);
  
}
function oushcheckout(center, stall, items) {

  var orderId = firebase.database().ref(center + '/' + stall + 'order/active').push().key;

  var order = {
    orderId: orderId,
    items: items
  };
  

  firebase.database().ref(center + '/' + stall + 'order/active/' + orderId).set(order)
    .then(() => {
      console.log('Order placed:', order);
      // add stuff after success order here
    })
    .catch((error) => {
      console.error('Error:', error);
      // add stuff aft fail order here
    });
}
// view cart : change page to cart page
// need payment function : use stripe

// check out: link to fb database, ordering branch (need to do)