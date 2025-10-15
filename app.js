const catalogo = [
  {id:1, nombre:"Netflix Premium", desc:"Cuenta Premium con 4 perfiles y UHD.", precio:9.99, img:"assets/netflix.png"},
  {id:2, nombre:"Disney+ Mensual", desc:"Acceso a todo el catálogo Disney+ en HD.", precio:7.50, img:"assets/disney.png"},
  {id:3, nombre:"HBO Max 3 meses", desc:"Suscripción por 3 meses con acceso ilimitado.", precio:15.00, img:"assets/hbo.png"},
  {id:4, nombre:"Spotify Familiar", desc:"Cuenta familiar con hasta 6 perfiles.", precio:6.99, img:"assets/spotify.png"},
  {id:5, nombre:"Amazon Prime Video", desc:"Acceso completo a Prime Video en HD.", precio:8.99, img:"assets/prime.png"},
  {id:6, nombre:"Crunchyroll Premium", desc:"Anime ilimitado en HD sin anuncios.", precio:5.99, img:"assets/crunchyroll.png"},
  {id:7, nombre:"Vix Premium", desc:"Películas y novelas exclusivas.", precio:4.99, img:"assets/vix.png"},
  {id:8, nombre:"Paramount+ Mensual", desc:"Series y películas exclusivas en HD.", precio:6.50, img:"assets/paramount.png"}
];

localStorage.setItem("catalogoData", JSON.stringify(catalogo));
let cart = JSON.parse(localStorage.getItem("cart")||"[]");

function renderCatalogo(){
  const container=document.getElementById("catalogo");
  container.innerHTML="";
  catalogo.forEach(prod=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`<img src="${prod.img}" alt="${prod.nombre}">
                    <h3>${prod.nombre}</h3>
                    <p>${prod.desc}</p>
                    <div class="price">$${prod.precio.toFixed(2)}</div>
                    <a href="product.html?id=${prod.id}">Ver detalle</a><br><br>
                    <button onclick="addToCart(${prod.id})">Añadir al carrito</button>`;
    container.appendChild(card);
  });
}

function addToCart(id){
  const prod=catalogo.find(p=>p.id===id);
  const item=cart.find(i=>i.id===id);
  if(item) item.qty++; else cart.push({id:prod.id, nombre:prod.nombre, precio:prod.precio, qty:1});
  saveCart(); updateCart();
}

function saveCart(){localStorage.setItem("cart",JSON.stringify(cart));}

function updateCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0);
  const cartItems=document.getElementById("cartItems");
  if(!cartItems) return;
  cartItems.innerHTML="";
  cart.forEach(i=>{
    const div=document.createElement("div");
    div.innerHTML=`${i.nombre} x${i.qty} - $${(i.precio*i.qty).toFixed(2)}`;
    cartItems.appendChild(div);
  });
  const total = cart.reduce((s,i)=>s+i.precio*i.qty,0);
  const totalEl=document.getElementById("cartTotal");
  if(totalEl) totalEl.textContent="$"+total.toFixed(2);
}

document.getElementById("cartBtn").onclick=()=>openModal("cartModal");
document.getElementById("checkoutBtn").onclick=()=>checkout();
document.getElementById("loginBtn").onclick=()=>openModal("loginModal");

// Tabs login/registro
const tabLogin=document.getElementById("tabLogin");
const tabRegister=document.getElementById("tabRegister");
const loginForm=document.getElementById("loginForm");
const registerForm=document.getElementById("registerForm");

tabLogin.onclick=()=>{tabLogin.classList.add("active"); tabRegister.classList.remove("active"); loginForm.classList.add("visible"); registerForm.classList.remove("visible");};
tabRegister.onclick=()=>{tabRegister.classList.add("active"); tabLogin.classList.remove("active"); registerForm.classList.add("visible"); loginForm.classList.remove("visible");};

loginForm.onsubmit=(e)=>{e.preventDefault(); alert("Bienvenido "+document.getElementById("loginEmail").value); closeModal("loginModal");};
registerForm.onsubmit=(e)=>{e.preventDefault(); alert("Registro completado para "+document.getElementById("regName").value); closeModal("loginModal");};

function openModal(id){document.getElementById(id).style.display="flex";}
function closeModal(id){document.getElementById(id).style.display="none";}

function checkout(){
  if(cart.length===0){alert("El carrito está vacío"); return;}
  const order = {id:Date.now(), items:[...cart], total:cart.reduce((s,i)=>s+i.precio*i.qty,0)};
  let orders = JSON.parse(localStorage.getItem("orders")||"[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  alert("Compra realizada con éxito");
  cart=[]; saveCart(); updateCart(); closeModal("cartModal");
}

window.onload=()=>{renderCatalogo(); updateCart(); document.getElementById("year").textContent=new Date().getFullYear();}


