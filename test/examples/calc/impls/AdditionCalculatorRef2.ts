import { Calculator } from "../Calculator";
import { Implementation } from "../../../../src/decorators";

@Implementation({
    truthCustom: (key: string) => key.includes('+'),
    ref: 'ANY2'
})
export class AdditionCalculatorRef2 implements Calculator {

    calc(num1: number, num2: number): number {
        return num1 + num2 * 30000
    }

}