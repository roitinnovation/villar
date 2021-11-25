import { Implementation } from "../../../../src/decorators";
import { Calculator } from "../Calculator";

@Implementation({
    key: 'any_division_inclues(/)',
    includes: true
})
export class DivisionCalculator implements Calculator {

    calc(num1: number, num2: number): number {
        return num1 / num2
    }

}