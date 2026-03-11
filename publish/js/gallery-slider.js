// =========================
// galler-slider.js 投票系統
// =========================
const track = document.getElementById("gallery-track");
const left = document.getElementById("gallery-left");
const right = document.getElementById("gallery-right");

const scrollAmount = 300;

left.addEventListener("click",()=>{
track.scrollBy({
left:-scrollAmount,
behavior:"smooth"
});
});

right.addEventListener("click",()=>{
track.scrollBy({
left:scrollAmount,
behavior:"smooth"
});
});