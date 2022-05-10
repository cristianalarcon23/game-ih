window.onload = function () {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const startPage = document.getElementById('start-page');
  const startButton = document.getElementById('start');
  const easyButton = document.getElementById('easy');
  const instructPage = document.getElementById('instructions-page')
  
  startButton.onclick = function () {
    startPage.style = "display: none";
    instructPage.style = 'display: grid';
  }

  easyButton.onclick = function () {
    startPage.style = "display: none";
    instructPage.style = "display: none";
    canvas.classList.remove('hidden');
    const game = new Game(ctx);
    game.start();
  }



}