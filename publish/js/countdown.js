// =========================
// countdown.js 天數 + 倒數
// =========================
const debut = new Date("2023-06-01");
function updateDays(){
  const today = new Date();
  const diff = today - debut;
  const days = Math.floor(diff/(1000*60*60*24));
  document.getElementById("days").innerText = days;
}
updateDays();

function countdown(){
  const now = new Date();
  let next = new Date(now.getFullYear(),5,1);
  if(now>next) next = new Date(now.getFullYear()+1,5,1);
  const diff = next-now;
  document.getElementById("d").innerText=Math.floor(diff/(1000*60*60*24));
  document.getElementById("h").innerText=Math.floor(diff/(1000*60*60)%24);
  document.getElementById("m").innerText=Math.floor(diff/(1000*60)%60);
  document.getElementById("s").innerText=Math.floor(diff/1000%60);
}
countdown();
setInterval(countdown,1000);