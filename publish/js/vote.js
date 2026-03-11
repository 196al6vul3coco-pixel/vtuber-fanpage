// =========================
// vote.js 投票系統
// =========================
const voteBtns = document.querySelectorAll('.vote-btn');
const voteResults = document.getElementById('vote-results');

async function loadVotes(){
  try{
    const res = await fetch('/api/votes');
    const data = await res.json();
    voteResults.innerHTML='';
    let total = 0;
    data.forEach(v=>{
      total += v.count;
    });
    data.forEach(v=>{
      const percent = total ? Math.round(v.count / total * 100) : 0;
      voteResults.innerHTML += `
        ${v.option}: ${v.count} votes (${percent}%)
        <br>
      `;
    });
  }
  catch(e){
    console.error("投票載入失敗",e);
  }
}
loadVotes();

voteBtns.forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    const option = btn.dataset.option;
    try {
      const res = await fetch('/api/votes', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ option })
      });
      const data = await res.json();
      if(data.success){
        loadVotes();
      } else {
        alert('投票失敗');
      }
    } catch(e){
      console.error('投票失敗', e);
    }
  });
});