import { CellTypeEnum } from "../enums/cell-type-enum";
import { DirectionEnum } from "../enums/direction-enum";
import { CellModel } from "./cell-model";
import { NextMoveModel } from "./next-move-model";

export class SnakeModel {
    private sections: Array<CellModel> = new Array<CellModel>();
    private defaultPosition: number = 200;
    private maxGameGridSize: number;
    public speedMs: number = 200;
    public currentDirection: DirectionEnum = DirectionEnum.Down;

    constructor(private gameGridMaxRows: number){
        const head = new CellModel(this.defaultPosition, this.defaultPosition, CellTypeEnum.Head, gameGridMaxRows);
        this.sections.push(head);
        this.maxGameGridSize = this.gameGridMaxRows * CellModel.CELL_SIZE;
    }

    public findSection(gridIndex: number): CellModel | undefined{
        return this.sections.find(item => item.gridIndex === gridIndex);
    }

    public calcNextMove(): NextMoveModel{
        let x = 0;
        let y = 0;
        switch(this.currentDirection){
            case DirectionEnum.Up:
                y -= CellModel.CELL_SIZE;
                break;
            case DirectionEnum.Right:
                x += CellModel.CELL_SIZE;
                break;
            case DirectionEnum.Down:
                y += CellModel.CELL_SIZE;
                break;
            case DirectionEnum.Left:
                y -= CellModel.CELL_SIZE;
                break;
        }

        return new NextMoveModel(x, y, this.currentDirection);
    }

    public move(nextMove: NextMoveModel):void {
        this.currentDirection = nextMove.direction;
        let index = 0;
        for(index; index < this.sections.length - 1; index++){
            this.sections[index].x = this.sections[index + 1].x;
            this.sections[index].y = this.sections[index + 1].y;
            this.sections[index].gridIndex = this.sections[index + 1].gridIndex;
        }

        // the head is always at the end of the array
        let head = this.sections.at(-1) as CellModel;
        let newX = head.x + nextMove.x;
        let newY = head.y + nextMove.y;

        if(newX < 0){
            newX = this.maxGameGridSize;
        } else if(newX > this.maxGameGridSize){
            newX = 0;
        }

        if(newY < 0){
            newY = this.maxGameGridSize;
        } else if(newY > this.maxGameGridSize){
            newY = 0;
        }

        head.x = newX;
        head.y = newY;
        head.setGridIndex();
    }
}
