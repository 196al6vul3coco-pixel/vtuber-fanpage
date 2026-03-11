// =========================
// animation.js Scroll動畫 + 分享功能
// =========================
const tlItems = document.querySelectorAll(".timeline-item");
window.addEventListener('scroll', () => {
  tlItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) item.classList.add('show');
  });
});

const animatedElems = document.querySelectorAll('.animated');
window.addEventListener('load', () => {
  animatedElems.forEach(el => el.classList.add('show'));
});

function share(platform){
  const url = encodeURIComponent(location.href);
  const text = encodeURIComponent("Check out this VTuber fanpage!");
  if(platform==='twitter') window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`);
  if(platform==='facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  if(platform==='line') window.open(`https://social-plugins.line.me/lineit/share?url=${url}`);
}
