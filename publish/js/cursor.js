// ====================
// cursor.js 游標監聽
// ====================
// 原本游標
const normalCursor = 'images/bananaCat-cursor.png';   // 貓貓1
const clickCursor = 'images/bananaCat-click.png';    // 貓貓2
const textCursor = 'images/bananaCat32-text.png';      // 貓貓3

// 按下滑鼠 -> 貓貓2
document.addEventListener('mousedown', (e) => {
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'){
    document.body.style.cursor = `url(${textCursor}) 10 10, auto`;
    e.target.style.cursor = `url(${textCursor}) 10 10, auto`;
  } else {
    document.body.style.cursor = `url(${clickCursor}) 10 10, auto`;
    e.target.style.cursor = `url(${clickCursor}) 10 10, auto`;
  }
});

// 放開滑鼠 -> 回到預設或文字框貓貓3
document.addEventListener('mouseup', (e) => {
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'){
    document.body.style.cursor = `url(${textCursor}) 10 10, auto`;
    e.target.style.cursor = `url(${textCursor}) 10 10, auto`;
  } else {
    document.body.style.cursor = `url(${normalCursor}) 10 10, auto`;
  }
});