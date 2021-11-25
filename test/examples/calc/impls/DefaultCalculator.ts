import { Calculator } from "../Calculator";
import { Implementation } from "../../../../src/decorators";

@Implementation({
    isDefault: true
})
export class DefaultCalculator implements Calculator {

    calc(num1: number, num2: number): number {
        return (num1 + num2) * 0.14
    }

}