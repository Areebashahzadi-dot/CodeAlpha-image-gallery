const cards=[...document.querySelectorAll(".gallery-card")];
const filterButtons=[...document.querySelectorAll(".filter-btn")];
const grid=document.getElementById("galleryGrid"),count=document.getElementById("photoCount"),empty=document.getElementById("emptyState");
const box=document.getElementById("lightbox"),boxImg=document.getElementById("lightboxImage"),boxCat=document.getElementById("lightboxCategory"),boxTitle=document.getElementById("lightboxTitle"),boxCount=document.getElementById("lightboxCounter");
const closeBtn=document.getElementById("closeLightbox"),prevBtn=document.getElementById("prevImage"),nextBtn=document.getElementById("nextImage");
let visible=[...cards],current=0,lastFocus=null;
function filterGallery(category){
 visible=cards.filter(card=>category==="all"||card.dataset.category===category);
 cards.forEach(card=>card.hidden=!visible.includes(card));
 filterButtons.forEach(btn=>{const active=btn.dataset.filter===category;btn.classList.toggle("active",active);btn.setAttribute("aria-pressed",String(active));});
 count.textContent=`${String(visible.length).padStart(2,"0")} PHOTOGRAPHS`;
 empty.hidden=visible.length!==0;grid.hidden=visible.length===0;
}
filterButtons.forEach(btn=>btn.addEventListener("click",()=>filterGallery(btn.dataset.filter)));
function showImage(index){
 if(!visible.length)return;current=(index+visible.length)%visible.length;
 const card=visible[current],img=card.querySelector("img");
 boxImg.src=img.src.replace(/w=\\d+/,"w=1600");boxImg.alt=img.alt;
 boxTitle.textContent=card.querySelector(".card-overlay strong").textContent;
 boxCat.textContent=card.dataset.category;boxCount.textContent=`${current+1} / ${visible.length}`;
}
function openBox(card){lastFocus=document.activeElement;showImage(visible.indexOf(card));box.classList.add("open");box.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";closeBtn.focus();}
function closeBox(){box.classList.remove("open");box.setAttribute("aria-hidden","true");document.body.style.overflow="";if(lastFocus)lastFocus.focus();}
cards.forEach(card=>card.addEventListener("click",()=>openBox(card)));
prevBtn.addEventListener("click",()=>showImage(current-1));nextBtn.addEventListener("click",()=>showImage(current+1));closeBtn.addEventListener("click",closeBox);
box.addEventListener("click",e=>{if(e.target===box)closeBox();});
document.addEventListener("keydown",e=>{if(!box.classList.contains("open"))return;if(e.key==="Escape")closeBox();if(e.key==="ArrowRight")showImage(current+1);if(e.key==="ArrowLeft")showImage(current-1);});
filterGallery("all");
