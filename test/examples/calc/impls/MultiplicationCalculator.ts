import { Implementation } from "../../../../src/decoretors/Implementation";
import { Calculator } from "../Calculator";

@Implementation({
    key: 'multiplication*',
    truthCustom: (key: string, metadata: any): boolean => { 
        return key.includes('*') && metadata?.value == 10
    }
})
export class MultiplicationCalculator implements Calculator {

    calc(num1: number, num2: number): number {
        return num1 * num2
    }

}