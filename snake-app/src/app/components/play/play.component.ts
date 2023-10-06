import { Component, OnInit } from '@angular/core';
import { CellTypeEnum } from 'src/app/enums/cell-type-enum';
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

  private gameGridMaxRows: number = 40;

  ngOnInit(): void {
    this.snake = new SnakeModel(this.gameGridMaxRows);
    this.spawnFruit();
    this.startGameLoop();
  }

  public getCellType(index: number): string{
    const snakeSectionFound = this.snake.findSection(index);

    if(index === this.fruit.gridIndex){
      return this.fruit.cellType;
    } else if(snakeSectionFound){
      return snakeSectionFound.cellType;
    }
  
    return CellTypeEnum.Empty;
  }

  private startGameLoop(): void {
    setInterval(() => this.doNextMove(), this.snake.speedMs);
  }

  private doNextMove(): void {
    //handle player moves
    //handle automatic snake moves
    let nextMove: NextMoveModel;
    nextMove = this.snake.calcNextMove();
    //handle possible wall hits
    //handle possible cannibal hits
    //handle game over if above hits happen
    //move snake
    this.snake.move(nextMove);
    //eat possible fruit then spawn new fruit and grow snake
  }

  private spawnFruit(): void{

    let x: number;
    let y: number;
    do{
      x = this.getRandomNumber();
      y = this.getRandomNumber();
    } while(false);
    this.fruit = new CellModel(x, y, CellTypeEnum.Fruit, this.gameGridMaxRows);
  }

  private getRandomNumber(): number{
    return Math.floor(Math.random() * this.gameGridMaxRows) * CellModel.CELL_SIZE;
  }
}
