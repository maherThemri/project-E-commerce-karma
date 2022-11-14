function signup() {
  var test = true;
  //************** */ first name*************************
  // declaration d'une fonction email

  var firstName = document.getElementById("firstName").value;

  if (firstName.length < 3) {
    document.getElementById("firstNameError").innerHTML =
      "First name must have at least 3 ch";
    document.getElementById("firstNameError").style.color = "red";
    test = false;
  } else {
    document.getElementById("firstNameError").innerHTML = "";
  }

  //************** */ last name*************************

  var lastName = document.getElementById("lastName").value;
  if (firstName.length < 3) {
    document.getElementById("lastNameError").innerHTML =
      "Last name must have at least 5 ch";
    document.getElementById("lastNameError").style.color = "red";
    test = false;
  } else {
    document.getElementById("lastNameError").innerHTML = "";
  }

  //************** */ email*************************

  var email = document.getElementById("email").value;
  var verifEmail = validateEmail(email);

  if (verifEmail) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "Invalid email";
    document.getElementById("emailError").style.color = "red";

    test = false;
  }
  console.log(emailExist(email));
  if (emailExist(email)) {
    document.getElementById("emailExistError").innerHTML =
      "Email already exists";
    document.getElementById("emailExistError").style.color = "red";
    test = false;
  } else {
    document.getElementById("emailExistError").innerHTML = "";
  }

  //*************** password*************************
  var password = document.getElementById("password").value;
  var verifPassword = checkPassword(password);

  if (verifPassword) {
    document.getElementById("passwordError").innerHTML = "";
  } else {
    document.getElementById("passwordError").innerHTML = "Invalid password";
    document.getElementById("passwordError").style.color = "red";

    test = false;
  }

  //************** */ confirmPassword *************************
  var confirmPassword = document.getElementById("confirmPassword").value;
  if (confirmPassword != password) {
    document.getElementById("confirmPasswordError").innerHTML =
      "confirm password must match";
    document.getElementById("confirmPasswordError").style.color = "red";
    test = false;
  } else {
    document.getElementById("confirmPasswordError").innerHTML = "";
  }
  //************** tel *************************
  var tel = document.getElementById("tel").value;

  if (!isNaN(tel) && tel.length == 8) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML = "invalid tel";
    document.getElementById("telError").style.color = "red";

    test = false;
  }

  if (test) {
    alert("test");
    // stockage
    // regrouppement des valeur dans un objet  JSPON
    //  creation d'un id
    var idUser = JSON.parse(localStorage.getItem("idUser") || "10");

    var user = {
      id: idUser,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      tel: tel,
      role: "client",
    };

    console.log(user);

    var users = JSON.parse(localStorage.getItem("users") || "[]");
    console.log(users);

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));
    //   rajouter le id de user prochain
    localStorage.setItem("idUser", idUser + 1);
    // refrecher la page
    location.replace("login.html");
  }
}

// *****************FUNCTION EMAIL*********************
// declaration d'une fonction email

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function checkPassword(str) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
}

function addProduct() {
  var test = true;
  var productName = document.getElementById("productName").value;

  if (productName.length < 3) {
    document.getElementById("productNameError").innerHTML =
      "product Name  must have at leave 3ch";
    document.getElementById("productNameError").style.color = "red";
    test = false;
  } else {
    document.getElementById("productNameError").innerHTML = "";
  }

  var price = document.getElementById("price").value;

  if (price <= 0) {
    document.getElementById("priceError").innerHTML =
      "price must be greater than 0";
    document.getElementById("priceError").style.color = "red";
    test = false;
  } else {
    document.getElementById("priceError").innerHTML = "";
  }

  var stock = document.getElementById("stock").value;

  if (stock < 10) {
    document.getElementById("stockError").innerHTML =
      "stock must be greater than 10";
    document.getElementById("stockError").style.color = "red";
    test = false;
  } else {
    document.getElementById("stockError").innerHTML = "";
  }

  var category = document.getElementById("category").value;

  if (category.length == 0) {
    document.getElementById("catergoryError").innerHTML =
      "category is required";
    document.getElementById("catergoryError").style.color = "red";
    test = false;
  } else {
    document.getElementById("catergoryError").innerHTML = "";
  }

  if (test) {
    var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");
    var product = {
      id: idProduct,
      productName: productName,
      price: price,
      stock: stock,
      category: category,
    };
    var products = JSON.parse(localStorage.getItem("products") || "[]");

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("idProduct", idProduct + 1);
    location.reload();
  }
}

function insertAdmins() {
  var admin1 = {
    id: 1,
    firstName: "admin1",
    lastName: "admin1",
    email: "admin1@gmail.com",
    password: "admin1@22",
    tel: "12345678",
    role: "admin",
  };

  var admin2 = {
    id: 2,
    firstName: "admin2",
    lastName: "admin2",
    email: "admin2@gmail.com",
    password: "admin2@22",
    tel: "22345678",
    role: "admin",
  };

  var admin3 = {
    id: 3,
    firstName: "admin3",
    lastName: "admin3",
    email: "admin3@gmail.com",
    password: "admin3@22",
    tel: "23345678",
    role: "admin",
  };

  var users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push(admin1, admin2, admin3);
  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("adminsAdded", true);
}

//  fonction login **********************
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var findedUser;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      findedUser = users[i];
      break;
    }
  }

  console.log(findedUser);

  if (findedUser) {
    // valeur exists
    document.getElementById("loginError").innerHTML = "";
    localStorage.setItem("connectedUser", JSON.stringify(findedUser.id));

    switch (findedUser.role) {
      case "admin":
        location.replace("dashboardAdmin.html");
        break;

      case "client":
        location.replace("index.html");
        break;
    }
  } else {
    // user not exists

    document.getElementById("loginError").innerHTML = "Wrong informations";
    document.getElementById("loginError").style.color = "red";
  }
}

function displayUsers() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var usersTable = `
    <table class="table table-dark">
    <thead>
        <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Tel</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
    `;
  for (let i = 0; i < users.length; i++) {
    usersTable =
      usersTable +
      `
        
    
        <tr>
            <th scope="row">${users[i].firstName}</th>
            <td>${users[i].lastName}</td>
            <td> ${users[i].email}</td>
            <td>${users[i].tel}</td>
            <td>${users[i].role}</td>
            <td>
                <button type="button" class="btn btn-warning" onclick = "editUser(${users[i].id})">Edit</button>
                <button type="button" class="btn btn-danger" onclick = "deleteUser(${users[i].id})">Delete</button>

            </td>
        </tr>

        `;
  }
  usersTable =
    usersTable +
    `
    </tbody>
</table>`;

  document.getElementById("usersTable").innerHTML = usersTable;
}

function emailExist(email) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var exist = false;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      alert("test");
      exist = true;
    }
  }
  return exist;
}

function deleteUser(id) {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  // recherche  position
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      pos = i;
    }
  }

  // supp
  users.splice(pos, 1);

  // sauvegarde
  localStorage.setItem("users", JSON.stringify(users));

  location.reload();
}

function editUser(id) {
  var user = searchById(id, "users");
  var editUserForm = `<div class="login_form_inner">
    <h3>EditUser</h3>
    <div class="row login_form" id="contactForm"
        novalidate="novalidate">
     
       
   
     
     
        <div class="col-md-12 form-group">
            <input type="tel" class="form-control" id="tel" value  ="${user.tel}" name="phone" placeholder="tel"
                onfocus="this.placeholder = ''" onblur="this.placeholder = 'tel'">
                
                <span id="telError"></span>
        </div>


        <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="primary-btn" onclick = "">Edit</button>
        </div>
    </div>
</div>`;

  document.getElementById("editUserForm").innerHTML = editUserForm;
}

function searchById(id, key) {
  var tab = JSON.parse(localStorage.getItem(key) || "[]");
  var object;
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].id == id) {
      object = tab[i];
    }
  }
  return object;
}

// ***********************************Home work*************************

function displayProducts() {
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var productsTable = `
    <table class="table table-dark">
    <thead>
        <tr>
            <th scope="col">product Name</th>
            <th scope="col">price</th>
            <th scope="col">stock</th>
            <th scope="col">category</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
    `;
  for (let i = 0; i < products.length; i++) {
    productsTable =
      productsTable +
      `
        
    
        <tr>
            <th scope="row">${products[i].productName}</th>
            <td>${products[i].price}</td>
            <td> ${products[i].stock}</td>
            <td>${products[i].category}</td>
           
            <td>
                <button type="button" class="btn btn-warning" onclick = "editProucts(${products[i].id})">Edit</button>
                <button type="button" class="btn btn-danger" onclick = "deleteProducts(${products[i].id})">Delete</button>

            </td>
        </tr>

        `;
  }
  productsTable =
    productsTable +
    `
    </tbody>
</table>`;

  document.getElementById("productsTable").innerHTML = productsTable;
}

function deleteProducts(id) {
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  // recherche  position
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      pos = i;
    }
  }

  // supp
  products.splice(pos, 1);

  // sauvegarde
  localStorage.setItem("products", JSON.stringify(products));

  location.reload();
}

function editProucts(id) {
  var product = searchById(id, "products");
  var editproductForm = `
    
    
    <div class="login_form_inner">
    <h3>Edit Product</h3>
    <div class="row login_form" id="contactForm" novalidate="novalidate">
        
      

        <div class="col-md-12 form-group">
            <input type="number" class="form-control" id="price"  value="${product.price}" name="price" placeholder="price"
                onfocus="this.placeholder = ''" onblur="this.placeholder = 'price'">

       
                
            </div>
            <span id="priceError"></span>
           
       

        <div class="col-md-12 form-group">
            <input type="number" class="form-control" id="stock" value="${product.stock}" name="stock" placeholder="stock"
                onfocus="this.placeholder = ''" onblur="this.placeholder = 'stock'">


                
        </div>
        <span id="stockError"> </span>
        

        

        <div class="col-md-12 form-group">
            <button type="submit" value="submit" class="primary-btn"
                onclick="">Edit</button>

        </div>
    </div>
</div>`;

  document.getElementById("editproductForm").innerHTML = editproductForm;
}

// Function that allows to display all products objects into products page
function displayCatalogue() {
  // Get all products from LS
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  //
  var prBloc = "";
  //
  for (let i = 0; i < products.length; i++) {
    prBloc =
      prBloc +
      `
    <div class="col-lg-3 col-md-6">
						<div class="single-product">
							<img class="img-fluid" src="img/product/p1.jpg" alt="">
							<div class="product-details">
								<h6>${products[i].productName}</h6>
								<div class="price">
									<h6>$ ${products[i].price}</h6>
									<h6 class="l-through">$210.00</h6>
								</div>
									<button class="btn btn-warning" onclick="addToBasket(${products[i].id})"> 
                    Order 
                  </button>
							</div>
						</div>
					</div>`;
  }

  document.getElementById("productsBloc").innerHTML = prBloc;
}
//
function addToBasket(idProduct) {
  alert(idProduct);
  var connectedUser = localStorage.getItem("connectedUser");
  if (connectedUser) {
    localStorage.setItem("prToReserve", idProduct);
    location.replace("productDetails.html");
  } else {
    location.replace("login.html");
  }
}

function prInfos() {
  var prToReserve = localStorage.getItem("prToReserve");
  var product = searchById(prToReserve, "products");
  var prBloc = `
  <div class="s_product_text">
						<h3>${product.productName}</h3>
						<h2>$${product.price}</h2>
						<h2>Stock : ${product.stock}</h2>
						<ul class="list">
							<li><a class="active" href="#"><span>Category</span> : Household</a></li>
							<li><a href="#"><span>Availibility</span> : In Stock</a></li>
						</ul>
						<p>Mill Oil is an innovative oil filled radiator with the most modern technology. If you are looking for
							something that can make your interior look awesome, and at the same time give you the pleasant warm feeling
							during the winter.</p>
						<div class="product_count">
							<label for="qty">Quantity:</label>
							<input type="text" name="qty" id="qty" class="input-text qty">
              <span id="qtyError"></span>
						</div>
						<div class="card_area d-flex align-items-center">
							<button class="primary-btn" onclick="validateQty(${product.stock})" >Add to Cart</button>
						</div>
					</div>`;

  document.getElementById("prInfos").innerHTML = prBloc;
}

//
function validateQty(stock) {
  var connectedUser = localStorage.getItem("connectedUser");
  var prToReserve = localStorage.getItem("prToReserve");
  var qty = document.getElementById("qty").value;
  if (Number(stock) < Number(qty)) {
    document.getElementById("qtyError").innerHTML = "Stock is Not Avaialable";
    document.getElementById("qtyError").style.color = "red";
  } else {
    document.getElementById("qtyError").innerHTML = "";
    var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");
    // create order object : id,qty,idUser, idProduct
    var order = {
      id: idOrder,
      qty: Number(qty),
      idUser: Number(connectedUser),
      idProduct: Number(prToReserve),
      status: false,
    };
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("idOrder", idOrder + 1);

    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id == prToReserve) {
        products[i].stock = Number(products[i].stock) - Number(qty);
        break;
      }
    }
    localStorage.setItem("products", JSON.stringify(products));
    location.replace("basket.html");
  }
}

function getFromLS(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function getMyOrders() {
  var connectedUser = localStorage.getItem("connectedUser");
  var orders = getFromLS("orders");
  var myOrders = [];
  for (let i = 0; i < orders.length; i++) {
    if (connectedUser == orders[i].idUser) {
      myOrders.push(orders[i]);
    }
  }
  return myOrders;
}

function displayOrders() {
  var myOrders = getMyOrders();
  var userOrders = "";
  for (let i = 0; i < myOrders.length; i++) {
    var pr = searchById(myOrders[i].idProduct, "products");
    userOrders =
      userOrders +
      `
    <tr>
                                <td>
                                    <div class="media">
                                        <div class="d-flex">
                                            <img src="img/cart.jpg" alt="">
                                        </div>
                                        <div class="media-body">
                                            <p>${myOrders[i].id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>${pr.productName}</h5>
                                </td>
                                <td>
                                      ${myOrders[i].qty}
                                </td>
                                <td>
                                    <h5>$${pr.price}</h5>
                                </td>
                                <td>
                                    <h5>$${pr.price * myOrders[i].qty}</h5>
                                </td>
                                <td>
                                    <h5>${orderStatus(myOrders[i].status)}</h5>
                                </td>
                                <td>
                                    <button class="btn btn-danger" onclick='deleteObject(${
                                      myOrders[i].id
                                    },  "orders")'>Delete</button>
                                </td>
                            </tr>`;
  }
  document.getElementById("userOrders").innerHTML = userOrders;
}

function orderStatus(status) {
  // if (status) {
  //   return "Confirmée";
  // } else {
  //   return "En attente";
  // }
  return status ? "Confirmée" : "En attente";
}

function displayAllOrders() {
  var orders = getFromLS("orders");
  var ordersTable = `
  <table class="table table-dark">
  <thead>
      <tr>
          <th scope="col">Id Order</th>
          <th scope="col">Product Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Total Price</th>
          <th scope="col">User name</th>
          <th scope="col">Actions</th>
      </tr>
  </thead>
  <tbody>
  `;
  for (let i = 0; i < orders.length; i++) {
    var pr = searchById(orders[i].idProduct, "products");
    var user = searchById(orders[i].idUser, "users");
    ordersTable =
      ordersTable +
      `
    <tr>
                                <td>${orders[i].id} </td>
                                <td>
                                      ${pr.productName}
                                </td>
                                <td>
                                      ${orders[i].qty}
                                </td>
                                <td>
                                      $${pr.price}
                                </td>
                                <td>
                                    ${pr.price * orders[i].qty}
                                </td>
                                <td>
                                    ${user.firstName}
                                </td>
                                <td>
                                    <button class="btn btn-danger" onclick='deleteObject(${
                                      orders[i].id
                                    },  "orders")'>Delete</button>
                                    <button class="btn btn-success" onclick='confirmOrder(${
                                      orders[i].id
                                    },  "orders")'>Confirm</button>
                                </td>
                            </tr>`;
  }
  ordersTable = ordersTable + `</tbody> </table>`;
  document.getElementById("ordersTable").innerHTML = ordersTable;
}

function deleteObject(id, key) {
  var order = searchById(id, "orders");
  // Update product stock
  var products = getFromLS("products");
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == order.idProduct) {
      products[i].stock = products[i].stock + order.qty;
      break;
    }
  }
  localStorage.setItem("products", JSON.stringify(products));
  //
  var objects = getFromLS(key);
  var pos;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id == id) {
      pos = i;
      break;
    }
  }
  objects.splice(pos, 1);
  localStorage.setItem(key, JSON.stringify(objects));
  location.reload();
}

function generateHeader() {
  var headerContent = "";
  var connectedUser = localStorage.getItem("connectedUser");
  if (connectedUser) {
    var user = searchById(connectedUser, "users");
    if (user.role == "client") {
      headerContent = `
    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
    <li class="nav-item"><a class="nav-link" href="basket.html">Basket</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Welcome ${user.firstName}</a></li>
    <li class="nav-item"><a class="nav-link" href="profile.html">Profile</a></li>
    <li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>`;
    } else {
      headerContent = `
    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
    <li class="nav-item"><a class="nav-link" href="dashboardAdmin.html">Dashboard</a></li>
    <li class="nav-item"><a class="nav-link" href="login.html">Welcome ${user.firstName}</a></li>
    <li class="nav-item"><a class="nav-link" href="profile.html">Profile</a></li>
    <li class="nav-item"><a class="nav-link" onclick="logout()" href="#">Logout</a></li>
    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>`;
    }
  } else {
    headerContent = `
    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
    <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
    <li class="nav-item"><a class="nav-link" href="singup.html">Signup</a></li>
    <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
  `;
  }

  document.getElementById("headerId").innerHTML = headerContent;
}

function logout() {
  localStorage.removeItem("connectedUser");
  location.replace("index.html");
}

function profile() {
  var connectedUser = localStorage.getItem("connectedUser");
  var user = searchById(connectedUser, "users");
  var profileContent = `
  <h3>Edit Profile</h3>
                        <div class="row login_form" id="contactForm" novalidate="novalidate">
                            <div class="col-md-12 form-group">
                                <input type="text" value=${user.firstName} class="form-control" id="fName" name="firstName"
                                    placeholder="First Name" >
                            </div>
                            <div class="col-md-12 form-group">
                                <input type="text"  value=${user.lastName}  class="form-control" id="lName" name="lastName"
                                    placeholder="Last Name" >
                            </div>
                            <div class="col-md-12 form-group">
                                <input type="email"  value=${user.email}  class="form-control" id="email" name="email" placeholder="Email" >
                            </div>
                            
                            <div class="col-md-12 form-group">
                                <button type="submit" value="submit" class="primary-btn"
                                    onclick="editProfile()">Edit</button>
                            </div>
                        </div>`;
  document.getElementById("profileId").innerHTML = profileContent;
}

function editProfile() {
  var connectedUser = localStorage.getItem("connectedUser");
  var users = getFromLS("users");
  var newFirstName = document.getElementById("fName").value;
  var newLastName = document.getElementById("lName").value;
  var newEmail = document.getElementById("email").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == connectedUser) {
      users[i].firstName = newFirstName;
      users[i].lastName = newLastName;
      users[i].email = newEmail;
      break;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}

function confirmOrder(id) {
  var orders = getFromLS("orders");
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].id == id) {
      orders[i].status = true;
      break;
    }
  }
  localStorage.setItem("orders", JSON.stringify(orders));
  location.reload();
}

function generateInvoice() {
  var invoiceTable = "";
  var orders = getFromLS("orders");
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].status == true) {
      var pr = searchById(orders[i].idProduct, "products");
      invoiceTable =
        invoiceTable +
        `
    <tr>
                                                        <td>
                                                            ${pr.productName}
                                                        </td>
                                                        <td>${pr.price}</td>
                                                        <td>${
                                                          orders[i].qty
                                                        }</td>
                                                        <td>${
                                                          pr.price *
                                                          orders[i].qty
                                                        }</td>
                                                    </tr>`;
    }
  }

  document.getElementById("invoiceId").innerHTML = invoiceTable;
}

function generateUserAddress() {
  var userId = localStorage.getItem("connectedUser");
  var user = searchById(userId, "users");
  var address = `<address>
  ${user.firstName} ${user.lastName}<br>
  ${user.tel} <br> ${user.email} <br>
  ${new Date()}
</address>`;
  document.getElementById("userAddress").innerHTML = address;
}
