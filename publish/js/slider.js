// =========================
// slider.js Fanart 自動輪播
// =========================
const sliderImages = [
  "teeth/teeth-1.jpeg","teeth/teeth-2.jpeg","teeth/teeth-3.jpeg",
  "teeth/teeth-4.jpeg","teeth/teeth-5.jpeg","teeth/teeth-6.jpeg",
  "teeth/teeth-7.jpeg","teeth/teeth-8.jpeg","teeth/teeth-9.jpeg"
];
let sliderIndex = 0;
function changeSlide(){
  sliderIndex++; if(sliderIndex>=sliderImages.length) sliderIndex=0;
  document.getElementById("slider-img").src = sliderImages[sliderIndex];
}
setInterval(changeSlide,3000);