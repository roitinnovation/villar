import { Calculator } from "../Calculator";
import { Implementation } from "../../../../src/decorators";

@Implementation({
    isDefault: true,
    ref: 'CALC_REF_2'
})
export class DefaultRef2Calculator implements Calculator {

    calc(num1: number, num2: number): number {
        return (num1 + num2) * 1000
    }

}