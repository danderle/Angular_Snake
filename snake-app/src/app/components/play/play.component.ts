import { Component } from '@angular/core';
import { CellTypeEnum } from 'src/app/enums/cell-type-enum';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {

  public grid: Array<CellTypeEnum> = new Array<CellTypeEnum>(1600).fill(CellTypeEnum.Empty);
  constructor(){
  }
}
