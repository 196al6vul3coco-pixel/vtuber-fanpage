// =========================
// message.js 留言板 + 左右滑動
// =========================
const sendBtn = document.getElementById('send-msg');
const clearBtn = document.getElementById('clear-msg');
const msgInput = document.getElementById('fan-msg');
const nameInput = document.getElementById('fan-name');
const messagesDiv = document.getElementById('messages');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const cardWidth = 265; // 卡片寬 + gap

async function loadMessages(){
  try {
    const res = await fetch('/api/messages');
    const msgs = await res.json();
    messagesDiv.innerHTML='';
    msgs.forEach((m,index)=>{
      const msgDiv = document.createElement('div');
      msgDiv.className='msg-card';
      msgDiv.innerHTML = `<div class="msg-name">${m.name}</div>
                          <div class="msg-text">${m.msg}</div>
                          <div class="msg-time">${m.created_at}</div>`;
      messagesDiv.appendChild(msgDiv);
      setTimeout(()=>{ msgDiv.classList.add('show'); }, index*80);
    });
    document.getElementById('total-msg').innerText = msgs.length;
  } catch(e){
    console.error('載入留言失敗', e);
  }
}
loadMessages();

sendBtn.addEventListener('click', async ()=>{
  const name = nameInput.value||"Anonymous";
  const msg = msgInput.value;
  if(!msg) return alert("留言不能為空");
  if(msg.length>50) return alert("留言最多50字");
  if(name.length>10) return alert("暱稱最多10字");

  try {
    const res = await fetch('/api/messages', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ name, msg })
    });
    const data = await res.json();
    if(data.success){
      loadMessages();
      msgInput.value=""; nameInput.value="";
    } else {
      alert('留言失敗');
    }
  } catch(e){
    console.error('送出留言失敗', e);
  }
});

// 左右滑動
leftArrow.addEventListener('click',()=>{ messagesDiv.scrollBy({left:-cardWidth, behavior:'smooth'}); });
rightArrow.addEventListener('click',()=>{ messagesDiv.scrollBy({left:cardWidth, behavior:'smooth'}); });