// =========================
// gallery.js Lightbox
// =========================
const images=document.querySelectorAll(".gallery-scroll img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let currentIndex = 0;
function showImage(index){
  lightbox.style.display = "flex";
  lightboxImg.src = images[index].src;
  currentIndex = index;
}
images.forEach((img,i)=>{ img.onclick = ()=>{ showImage(i); }});
document.getElementById("prev").onclick = ()=>{ showImage((currentIndex-1+images.length)%images.length); };
document.getElementById("next").onclick = ()=>{ showImage((currentIndex+1)%images.length); };
lightbox.onclick = (e)=>{ if(e.target===lightbox) lightbox.style.display="none"; };

const gallery = document.getElementById("gallery-scroll");
const gLeft = document.getElementById("gallery-left");
const gRight = document.getElementById("gallery-right");

const scrollAmount = 300;

gLeft.addEventListener("click",()=>{
gallery.scrollBy({
left:-scrollAmount,
behavior:"smooth"
});
});

gRight.addEventListener("click",()=>{
gallery.scrollBy({
left:scrollAmount,
behavior:"smooth"
});
});