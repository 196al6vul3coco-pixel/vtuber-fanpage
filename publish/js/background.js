// =========================
// background.js 星空 + 櫻花動畫
// =========================
const canvasStars = document.getElementById('stars');
const ctxStars = canvasStars.getContext('2d');
const canvasSakura = document.getElementById('sakura');
const ctxSakura = canvasSakura.getContext('2d');
canvasStars.width = window.innerWidth; canvasStars.height = window.innerHeight;
canvasSakura.width = window.innerWidth; canvasSakura.height = window.innerHeight;

let stars = [], petals = [];
function initParticles(){
  stars = []; petals = [];
  for(let i=0;i<150;i++) stars.push({x:Math.random()*canvasStars.width, y:Math.random()*canvasStars.height, r:Math.random()*1.5});
  for(let i=0;i<50;i++) petals.push({x:Math.random()*canvasSakura.width, y:Math.random()*canvasSakura.height, r:Math.random()*4+2, d:Math.random()});
}
initParticles();

function draw(){
  ctxStars.clearRect(0,0,canvasStars.width,canvasStars.height);
  ctxSakura.clearRect(0,0,canvasSakura.width,canvasSakura.height);
  const hours = new Date().getHours();
  if(hours>=6 && hours<18){
    ctxStars.fillStyle="#0f1a3f";
    ctxStars.fillRect(0,0,canvasStars.width,canvasStars.height);
    stars.forEach(s=>{
      ctxStars.beginPath();
      ctxStars.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctxStars.fillStyle="white";
      ctxStars.fill();
      s.x += Math.random()*0.5-0.25;
      s.y += Math.random()*0.2;
      if(s.y>canvasStars.height) s.y=0;
    });
  } else {
    ctxSakura.fillStyle="#08101f";
    ctxSakura.fillRect(0,0,canvasSakura.width,canvasSakura.height);
    petals.forEach(p=>{
      ctxSakura.beginPath();
      ctxSakura.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctxSakura.fillStyle="pink";
      ctxSakura.fill();
      p.y += p.d + 1;
      p.x += Math.sin(p.y*0.01);
      if(p.y>canvasSakura.height) p.y=-10;
    });
  }
}
setInterval(draw,33);

window.addEventListener("resize", () => {
  canvasStars.width = window.innerWidth; canvasStars.height = window.innerHeight;
  canvasSakura.width = window.innerWidth; canvasSakura.height = window.innerHeight;
  initParticles();
});