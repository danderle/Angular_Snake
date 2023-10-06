import { CellTypeEnum } from "../enums/cell-type-enum";

export class CellModel {
    public static CELL_SIZE: number = 10;
    public gridIndex: number;
    constructor(public x: number, public y: number, public cellType: CellTypeEnum, private gameGridMaxRows: number){
        this.setGridIndex();
    }

    public setGridIndex(): void{
        this.gridIndex = this.x/CellModel.CELL_SIZE + (this.y/CellModel.CELL_SIZE * this.gameGridMaxRows)
    }

    public static copyCellModel(src: CellModel){
        return new CellModel(src.x, src.y, src.cellType, src.gameGridMaxRows);
    }
}
