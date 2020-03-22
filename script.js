	  //переменные
    const canvas = document.getElementById('game');//переменная для поля
    const context = canvas.getContext('2d');//2д змейка
    const grid = 16;//размер клетки
    let count = 0;//переменная для скорости

    //данные змейки
    const snake = {
      //начальные координаты
      x: 160,
      y: 160,
      //скорость змейки, по у скорость равна нулю, потому что будет двигаться по х
      dx: grid,
      dy: 0,
      //данные хвоста, вначале пустые
      cells: [],
      //стартовая длина змейки
      maxCells: 4
    };

    //данные еды(яблока)
    var apple = {
      //начальные координаты
      x: 320,
      y: 320
    };

 
//генератор случайных чисел, для расположения еды
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

 
    //основная фун-ция внутри весь процесс
    function loop() {
      //замедляем кадры(фпс) до с 60 до 10
      requestAnimationFrame(loop);
      //игровой код выполнится один раз из шести, а пока переменная count меньше шести, код выполняться не будет
      if (++count < 15) {
        return;
      }
      
      //обнуляем переменную скорости
      count = 0;

      //очищаем игровое поле
      context.clearRect(0,0,canvas.width,canvas.height);

      //двигаем змейку с нужной скоростью
      snake.x += snake.dx;
      snake.y += snake.dy;

 
      //продолжаем её движение с противоположной строны, если достигли края
      if (snake.x < 0) {
        snake.x = canvas.width - grid;
      }

      else if (snake.x >= canvas.width) {
        snake.x = 0;
      }

      //делаем то же самое для движения по вертикали
      if (snake.y < 0) {
        snake.y = canvas.height - grid;
      }

      else if (snake.y >= canvas.height) {
        snake.y = 0;
      }

 
      //продолжаем двигаться в выбранном направлении
      snake.cells.unshift({x: snake.x, y: snake.y});//голова всегда впереди, поэтому добавляем её координаты в начало массива

      //удаляем последнее значениеиз массива, потому что она движется и постоянно освобождает клетки после себя
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }

      //отрисовка еды, задаем координаты
      context.fillStyle = 'red';
      context.fillRect(apple.x, apple.y, grid-1, grid-1);

      //одно движение: новый нарисованный квадратик 
      context.fillStyle = 'green';

      //обрабатываем каждый элемент змейки
      snake.cells.forEach(function(cell, index) {
        //делаем границу меньше чтобы отрисовать квадраты змейки
        context.fillRect(cell.x, cell.y, grid-1, grid-1);  

        //увеличение длины, если добрались до яблока
        if (cell.x === apple.x && cell.y === apple.y) {
          //увеличиваем длину змейки
          snake.maxCells++;
          //рисуем новое яблочко
          apple.x = getRandomInt(0, 25) * grid;
          apple.y = getRandomInt(0, 25) * grid;
        }

        //проверяем, не столкнулась ли змея сама с собой
        for (var i = index + 1; i < snake.cells.length; i++) {
          //если есть одининаковые координаты, начинаем заного
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {

            //задаём стартовые параметры основным переменным
            snake.x = 160;
            snake.y = 160;
            snake.cells = [];
            snake.maxCells = 4;
            snake.dx = grid;
            snake.dy = 0;

            //задаем параметры яблоку
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
          }
        }
      });
    }

    //вешаем слушатели на клавиши
    document.addEventListener('keydown', function(e) {
      //так же проверяем если змейка движется, влево, то ещё одно нажатие влево или вправо ничего не поменяет
      //стрелка влево
      if (e.which === 37 && snake.dx === 0) {
        //даём ей движение по горизонтали, влево, а вертикальное — останавливаем
        snake.dx = -grid;
        snake.dy = 0;
      }

      //та же самая логика в др клавишах
      //стрелка вверх
      else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
      }

      // Стрелка вправо
      else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
      }

      // Стрелка вниз
      else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
      }
    });
    
    //запускаем игру
    requestAnimationFrame(loop);
