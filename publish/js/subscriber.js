// =========================
// subscriber.js 粉絲數即時統計
// =========================
let subs = 10000;
function updateSubs(){
  const growth = Math.floor(Math.random()*3);
  subs += growth;
  document.getElementById("subs").innerText = subs;
}
setInterval(updateSubs,3000);