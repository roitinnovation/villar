import { Calculator } from "../Calculator";
import { Implementation } from "../../../../src/decorators";

@Implementation({
    key: '+',
    ref: 'ANY'
})
export class AdditionCalculatorRef implements Calculator {

    calc(num1: number, num2: number): number {
        return num1 + num2 * 70000
    }

}