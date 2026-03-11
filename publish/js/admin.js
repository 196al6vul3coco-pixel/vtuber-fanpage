// ====================
// 後台管理 JS
// ====================

const msgTbody = document.querySelector('#msg-table tbody');
const voteTbody = document.querySelector('#vote-table tbody');

// --------------------
// 載入留言
// --------------------
async function loadMessages(){
  try{
    const res = await fetch('/api/messages');
    const messages = await res.json();

    // 最新在前
    messages.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));

    msgTbody.innerHTML = '';
    messages.forEach(m=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${m.id}</td>
        <td>${m.name}</td>
        <td>${m.msg}</td>
        <td>${m.created_at}</td>
        <td><button data-id="${m.id}">刪除</button></td>
      `;
      msgTbody.appendChild(tr);
    });

    // 刪除事件
    msgTbody.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const id = btn.dataset.id;
        if(confirm('確定刪除這筆留言？')){
          await fetch(`/api/messages/${id}`, { method:'DELETE' });
          loadMessages();
        }
      });
    });

  }catch(e){
    console.error('載入留言失敗', e);
  }
}

// --------------------
// 載入投票
// --------------------
async function loadVotes(){
  try{
    const res = await fetch('/api/votes/all'); // 後端回傳每筆投票
    const votes = await res.json();

    // 最新在前
    votes.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));

    voteTbody.innerHTML = '';
    votes.forEach(v=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${v.id}</td>
        <td>${v.option}</td>
        <td>${v.created_at}</td>
        <td><button data-id="${v.id}">刪除</button></td>
      `;
      voteTbody.appendChild(tr);
    });

    // 刪除投票
    voteTbody.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click', async ()=>{
        const id = btn.dataset.id;
        if(confirm('確定刪除這筆投票？')){
          await fetch(`/api/votes/${id}`, { method:'DELETE' });
          loadVotes();
        }
      });
    });

  }catch(e){
    console.error('載入投票失敗', e);
  }
}

// --------------------
loadMessages();
loadVotes();