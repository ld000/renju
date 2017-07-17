import './style.css';

var players = [{ name: 'player1', color: 'black' }, { name: 'player2', color: 'white' }];
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

  function renderPlayerBox() {
    const div = document.getElementById('players')

    let dom = '<ul>'
    players.forEach(item => {
      dom += (`
          <li class="player">
            <span>${item.name}: </span><div style="width: 20px; height: 20px; background-color: ${item.color};"></div>
          </li>
        `)
    })
    dom += '</ul>'
    div.innerHTML = dom
  }

  function init(num) {
    renderBoard(num)
    renderPlayerBox()
  }

  function bindEvent() {
    ele.addEventListener('click', (e) => {
      // if(isWin) {
      //   return
      // }
      var target = e.target
      if (target.className.includes('circle') && target.classList.length == 1) {
        // chessColor = 3 - chessColor
        var coord = target.getAttribute('data-coord').split(',')

        console.log('position: ' + coord + ' color: ' + players[order]);

        target.classList.add(players[order].color)

        if (order < players.length - 1) {
          order++
        } else {
          order = 0
        }

        // mygobang.palyChess(+coord[0], +coord[1], chessColor)
      }
    })
  }

  function bindAddPlayerEvent() {
    document.getElementById('add-player').addEventListener('click', (e) => {
      const name = document.getElementById('name-input').value
      const color = document.getElementById('color-input').value

      players.push({
        name: name,
        color: color
      })

      console.log('Add player, name: ' + name + ', color: ' + color)
    })
  }

  return {
    start(num) {
      init(num)
      bindEvent()
      bindAddPlayerEvent()
    }
  }
})()

Game.start(30)
