import './style.css';

var players = ['black', 'white', 'red', 'yellow', 'blue'];
var order = 0;

var Game = (function() {
  const ele = document.getElementById('main')

  function renderBoard(num) {
    let tpl
    let coordArr = []
    let board = ''

    let rwidth = ele.clientWidth
    let swidth = parseInt((rwidth/num), 10) + 'px'
    let cwidth = parseInt((rwidth/num/1.2), 10) + 'px'

    tpl = (coord, color) => (`
        <div class="square" style="width:${swidth};height:${swidth}">
            <div class="circle ${color ? color : ''}" data-coord="${coord}" style="width:${cwidth};height:${cwidth}"></div>
        </div>
    `)

    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        board += tpl([i, j], '')
      }
    }

    ele.innerHTML = board
  }

  function bindEvent() {
    ele.addEventListener('click', (e)=> {
      // if(isWin) {
      //   return
      // }
      var target = e.target
      if (target.className.includes('circle') && target.classList.length == 1) {
        // chessColor = 3 - chessColor
        var coord = target.getAttribute('data-coord').split(',')

        if (order < 4) {
          order++
        } else {
          order = 0
        }

        console.log('position: ' + coord + ' color: ' + players[order]);

        target.classList.add(players[order])
        // mygobang.palyChess(+coord[0], +coord[1], chessColor)
      }
    })
  }

  return {
    start(num) {
      renderBoard(num)
      bindEvent()
    }
  }
})()

Game.start(30)
