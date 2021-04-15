# Villar factory
Facilitates factory creation and infrastructure

## Usage
-----------
### Classes and decorators

1. Implementation
    1. **key** defines which key the impl represents
    2. **implName** if the instance is initialized with the original class name
    3. **ref** distinguishes if there are two identical keys for different implementations

2. VillarImplDiscovery
    1. **findImpl<T>(string)** searches for the implementation according to the key provided

3. NestVillarImplDiscovery
    1. **findImpl<T>(string)** has the same function as VillarImplDiscovery but does search for impl in the context of nest injection

### Usage example

#### Configurate the impls

```javascript

// The interface
export interface Calculator {
    calc(num1: number, num2: number): number
}

import { Implementation } from "villar"

// Addition impl
@Implementation({
    key: '+'
})
// At NestJs use @Injectable()
export class AdditionCalculator implements Calculator {

    calc(num1: number, num2: number): number {
        return num1 + num2
    }

}

// Subtraction
@Implementation({
    key: '-'
})
// At NestJs use @Injectable()
export class SubtractionCalculator implements Calculator {

    calc(num1: number, num2: number): number {
        return num1 - num2
    }
}

// Division
// includes attr is like in key
@Implementation({
    key: 'any_division_inclues(/)',
    includes: true
})
export class DivisionCalculator implements Calculator {

    calc(num1: number, num2: number): number {
        return num1 / num2
    }

}

// Multiplication
// truthCustom is function from custom truth impl selector
// function (key: string, metadata: any)
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

```

#### Discovery impls

```javascript

import { VillarImplResolver } from "villar"

// Register impls
VillarImplResolver.register(SubtractionCalculator, AdditionCalculator)

// Addition Impl
const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('+')
console.log(calculator?.calc(10, 1)) //result: 11

// Subtraction Impl result
const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('-')
console.log(calculator?.calc(10, 1)) //result: 9

// Anu Impl rsult
const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('any_key')
console.log(calculator?.calc(10, 1)) //result: undefined

// Division
const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('*')
console.log(calculator?.calc(10, 2)) //result: 5

// Multiplication
const options: any = { 
      metadata: { 
        value: 10 
      }
    }

const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('*',  options)
console.log(calculator?.calc(10, 2)) //result: 20
```

#### NestJs Discovery impls

```javascript

// Configure AppModule
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AdditionCalculator, // Custom impl
    SubtractionCalculator // Custom impl,
    NestVillarImplDiscovery, // Helper Villar, import with import { NestVillarImplDiscovery } from "villar",
    anysProviders....
  ],
})
export class AppModule {}

// Example in controller

@Controller()
export class AppController {
  
  constructor(
    private readonly implDiscovery: NestVillarImplDiscovery
  ) {}

  @Get("execute-calc/:operator/:value/:value2")
  executeCalc(@Param("operator") operator: string, @Param("value") value: number, @Param("value2") value2: number) {
    const calculator = this.implDiscovery.findImpl<Calculator>(operator)
    return calculator?.calc(value, value2)
  }
}

```