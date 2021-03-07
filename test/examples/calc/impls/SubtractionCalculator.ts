import { Calculator } from "../Calculator";
import { Implementation } from "../../../../src/decoretors/Implementation";

@Implementation({
    key: '-'
})
export class SubtractionCalculator implements Calculator {

    // constructor(public a: string) {

    // }

    calc(num1: number, num2: number): number {
        return num1 - num2
    }
}