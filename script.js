const products=[
{id:1,name:"The Everyday Blazer",cat:"Women",price:1899,tag:"BESTSELLER",rating:"4.9",img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80"},
{id:2,name:"Classic White Shirt",cat:"Men",price:999,tag:"ESSENTIAL",rating:"4.8",img:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80"},
{id:3,name:"Soft Knit Sweater",cat:"Women",price:1499,tag:"NEW",rating:"4.7",img:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80"},
{id:4,name:"Everyday Crossbody",cat:"Accessories",price:1299,tag:"POPULAR",rating:"4.9",img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=80"},
{id:5,name:"Relaxed Fit T-Shirt",cat:"Men",price:699,tag:"EASY WEAR",rating:"4.6",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"},
{id:6,name:"Weekend Denim",cat:"Women",price:1599,tag:"TRENDING",rating:"4.8",img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80"},
{id:7,name:"Minimal Watch",cat:"Accessories",price:1799,tag:"JUST IN",rating:"4.7",img:"https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=80"},
{id:8,name:"Smart Casual Jacket",cat:"Men",price:2199,tag:"EDITOR'S PICK",rating:"4.9",img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80"},
{id:9,name:"Pleated Midi Skirt",cat:"Women",price:1399,tag:"NEW",rating:"4.6",img:"https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=700&q=80"},
{id:10,name:"Classic Sunglasses",cat:"Accessories",price:899,tag:"SUN EDIT",rating:"4.8",img:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"},
{id:11,name:"Linen Casual Shirt",cat:"Men",price:1199,tag:"LIGHT & EASY",rating:"4.7",img:"https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80"},
{id:12,name:"Everyday Tote",cat:"Accessories",price:799,tag:"FAVOURITE",rating:"4.8",img:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80"}];
let cart=JSON.parse(localStorage.getItem("trendlyCart")||"[]"),wishlist=JSON.parse(localStorage.getItem("trendlyWish")||"[]"),active="All";
const $=id=>document.getElementById(id),money=n=>"₹"+n.toLocaleString("en-IN");
function save(){localStorage.setItem("trendlyCart",JSON.stringify(cart));localStorage.setItem("trendlyWish",JSON.stringify(wishlist))}
function toast(s){$("toast").textContent=s;$("toast").classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>$("toast").classList.remove("show"),2100)}
function render(){
let q=$("search").value.toLowerCase(),list=products.filter(p=>(active==="All"||p.cat===active)&&(`${p.name} ${p.cat}`).toLowerCase().includes(q)),sort=$("sort").value;
if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
$("products").innerHTML=list.map(p=>`<article class="card"><div class="photo"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/500x650/f1eee8/555?text=TRENDLY'"><span class="tag">${p.tag}</span><button class="heart ${wishlist.includes(p.id)?"active":""}" data-wish="${p.id}">${wishlist.includes(p.id)?"♥":"♡"}</button></div><div class="info"><div class="line"><div><p class="name">${p.name}</p><span class="cat">${p.cat}</span></div><b class="price">${money(p.price)}</b></div><div class="bottom"><span class="rating">★ ${p.rating}</span><button class="add" data-add="${p.id}">ADD TO BAG +</button></div></div></article>`).join("");
$("empty").classList.toggle("hidden",list.length>0);document.querySelectorAll(".chips button").forEach(b=>b.classList.toggle("active",b.dataset.cat===active));}
function counts(){let n=cart.reduce((s,x)=>s+x.qty,0);$("cartCount").textContent=n;$("drawerCount").textContent=`(${n})`;$("wishCount").textContent=wishlist.length}
function renderCart(){counts();$("cartEmpty").classList.toggle("hidden",cart.length>0);$("summary").classList.toggle("hidden",!cart.length);$("cartItems").innerHTML=cart.map(x=>{let p=products.find(y=>y.id===x.id);return `<div class="cartrow"><img src="${p.img}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="qty"><button data-qty="${p.id}" data-d="-1">−</button> ${x.qty} <button data-qty="${p.id}" data-d="1">+</button></div></div><button class="remove" data-remove="${p.id}">Remove</button></div>`}).join("");let sub=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);$("subtotal").textContent=money(sub);$("shipping").textContent=sub>=1999?"FREE":money(99);$("total").textContent=money(sub+(sub&&sub<1999?99:0))}
function category(c){active=c;$("category").value=c;render()}
$("products").addEventListener("click",e=>{let a=e.target.closest("[data-add]"),w=e.target.closest("[data-wish]");if(a){let id=+a.dataset.add,item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();renderCart();toast("Added to your bag")}if(w){let id=+w.dataset.wish;wishlist.includes(id)?wishlist=wishlist.filter(x=>x!==id):wishlist.push(id);save();render();counts();toast("Wishlist updated")}});
document.querySelector(".chips").addEventListener("click",e=>{let b=e.target.closest("[data-cat]");if(b)category(b.dataset.cat)});
$("category").onchange=e=>category(e.target.value);$("search").oninput=render;$("sort").onchange=render;
$("cartItems").addEventListener("click",e=>{let q=e.target.closest("[data-qty]"),r=e.target.closest("[data-remove]");if(q){let x=cart.find(i=>i.id===+q.dataset.qty);x.qty+=+q.dataset.d;if(x.qty<1)cart=cart.filter(i=>i!==x)}if(r)cart=cart.filter(i=>i.id!==+r.dataset.remove);save();renderCart()});
function open(){ $("drawer").classList.add("open");$("shade").classList.add("show")}function close(){ $("drawer").classList.remove("open");$("shade").classList.remove("show")}
$("openCart").onclick=open;$("closeCart").onclick=close;$("shade").onclick=close;$("continue").onclick=close;
$("checkoutOpen").onclick=()=>{close();$("modal").classList.remove("hidden")};$("closeModal").onclick=()=>$("modal").classList.add("hidden");
$("checkout").onsubmit=e=>{e.preventDefault();let name=new FormData(e.target).get("name"),order="TR"+Date.now().toString().slice(-6);cart=[];save();renderCart();e.target.reset();$("modal").classList.add("hidden");toast(`Thanks ${name}! Demo order ${order} placed.`)};
$("newsletter").onsubmit=e=>{e.preventDefault();$("newsMsg").textContent="Thanks for subscribing! (Demo only)";e.target.reset()};
$("searchFocus").onclick=()=>{document.querySelector("#shop").scrollIntoView({behavior:"smooth"});setTimeout(()=>$("search").focus(),400)};
$("wishJump").onclick=()=>{category("All");$("search").value="";render();document.querySelector("#shop").scrollIntoView({behavior:"smooth"});toast(wishlist.length?`${wishlist.length} item(s) saved in wishlist`:"Your wishlist is empty — tap ♡ on a product")};
$("menu").onclick=()=>$("nav").classList.toggle("open");document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>$("nav").classList.remove("open"));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){close();$("modal").classList.add("hidden")}});
render();renderCart();