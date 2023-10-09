import { Component, HostListener, OnInit } from '@angular/core';
import { CellTypeEnum } from 'src/app/enums/cell-type-enum';
import { DirectionEnum } from 'src/app/enums/direction-enum';
import { CellModel } from 'src/app/models/cell-model';
import { NextMoveModel } from 'src/app/models/next-move-model';
import { SnakeModel } from 'src/app/models/snake-model';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  public grid: Array<CellTypeEnum> = new Array<CellTypeEnum>(1600).fill(CellTypeEnum.Empty);
  public gameOver: boolean = false;
  public fruit: CellModel;
  public snake: SnakeModel;
  public score: number = 0;
  public wallHit: boolean = false;
  private gameGridMaxRows: number = 40;
  private playerMoves: Array<NextMoveModel> = new Array<NextMoveModel>();
  private intervalId: any;

  ngOnInit(): void {
    this.snake = new SnakeModel(this.gameGridMaxRows);
    this.spawnFruit();
    this.startGameLoop();
  }

  public getCellType(index: number): string {
    const snakeSectionFound = this.snake.findSectionByGridIndex(index);

    if (index === this.fruit.gridIndex) {
      return this.fruit.cellType;
    } else if (snakeSectionFound) {
      return snakeSectionFound.cellType;
    }

    return CellTypeEnum.Empty;
  }

  @HostListener('window:keyup', ['$event'])
  private keyUpHandle(event: KeyboardEvent): void {
    let x: number = 0;
    let y: number = 0;
    let direction: DirectionEnum = DirectionEnum.Down;
    console.log(event.key);
    switch (event.key) {
      case 'ArrowUp':
        if (this.snake.currentDirection == DirectionEnum.Down && this.snake.Length > 2) {
          return;
        }
        y -= CellModel.CELL_SIZE;
        direction = DirectionEnum.Up;
        break;
      case 'ArrowRight':
        if (this.snake.currentDirection == DirectionEnum.Left && this.snake.Length > 2) {
          return;
        }
        x += CellModel.CELL_SIZE;
        direction = DirectionEnum.Right;
        break;
      case 'ArrowDown':
        if (this.snake.currentDirection == DirectionEnum.Up && this.snake.Length > 2) {
          return;
        }
        y += CellModel.CELL_SIZE;
        direction = DirectionEnum.Down;
        break;
      case 'ArrowLeft':
        if (this.snake.currentDirection == DirectionEnum.Right && this.snake.Length > 2) {
          return;
        }
        x -= CellModel.CELL_SIZE;
        direction = DirectionEnum.Left;
        break;
      default:
        return;
    }

    this.playerMoves.push(new NextMoveModel(x, y, direction));
  }

  private startGameLoop(): void {
    this.intervalId = setInterval(() => this.doNextMove(), this.snake.speedMs);
  }

  private doNextMove(): void {
    let nextMove: NextMoveModel;
    if (this.playerMoves.length > 0) {
      nextMove = this.playerMoves[0];
      this.playerMoves.splice(0, 1);
    } else {
      nextMove = this.snake.calcNextMove();
    }
    //handle possible wall hits
    this.wallHit = this.snake.checkWallHit(nextMove);
    //handle possible cannibal hits
    const cannibal = this.snake.eatSelf(nextMove);

    if(this.wallHit || cannibal){
      this.gameOver = true;
      clearInterval(this.intervalId);
      if(cannibal){
        this.snake.move(nextMove);
      }
      return;
    }

    //handle game over if above hits happen
    //move snake
    this.snake.move(nextMove);
    //eat possible fruit then spawn new fruit and grow snake
    const fruitEaten = this.snake.eatFruit(this.fruit.gridIndex);
    if(fruitEaten){
      this.score++;
      this.spawnFruit();
      this.snake.grow();
    }
  }

  private spawnFruit(): void {
    let x: number;
    let y: number;
    let spawnedOnSnake: boolean = false;
    do {
      x = this.getRandomNumber();
      y = this.getRandomNumber();
      spawnedOnSnake = this.snake.findSectionByCos(x, y) !== undefined;
    } while (spawnedOnSnake);
    this.fruit = new CellModel(x, y, CellTypeEnum.Fruit, this.gameGridMaxRows);
  }

  private getRandomNumber(): number {
    return Math.floor(Math.random() * this.gameGridMaxRows) * CellModel.CELL_SIZE;
  }
}
