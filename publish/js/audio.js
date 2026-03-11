// =========================
// audio.js 背景音樂 + 點擊音效
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById('bgm');
  const sakuraAudio = document.getElementById('sakuraAudio');
  const clickAudio = document.getElementById('clickAudio');
  const avatar = document.getElementById('vtuber-avatar');

  document.body.addEventListener('click', () => {
    try { bgm.play(); sakuraAudio.play(); } catch(e){}
  }, {once:true});

  if(avatar){
    avatar.addEventListener('click', () => {
      alert("You clicked the VTuber! 🎉");
      if(clickAudio) clickAudio.play();
    });
  }
});