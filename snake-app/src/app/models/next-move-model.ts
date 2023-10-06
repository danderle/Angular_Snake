import { DirectionEnum } from "../enums/direction-enum";

export class NextMoveModel {
    constructor(public x: number, public y: number, public direction: DirectionEnum){}
}
