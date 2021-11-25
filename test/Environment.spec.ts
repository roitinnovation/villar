import { SubtractionCalculator } from "./examples/calc/impls/SubtractionCalculator";
import { VillarImplResolver } from "../src/resolvers/VillarImplResolver";
import { VillarImplDiscovery } from "../src/discovery/VillarImplDiscovery";
import { Calculator } from "./examples/calc/Calculator";
import { AdditionCalculator } from './examples/calc/impls/AdditionCalculator';
import { DivisionCalculator } from './examples/calc/impls/DivisionCalculator';
import { MultiplicationCalculator } from './examples/calc/impls/MultiplicationCalculator';
import { DefaultCalculator } from './examples/calc/impls/DefaultCalculator';
import { DefaultRefCalculator } from './examples/calc/impls/DefaultRefCalculator';
import { DefaultRef2Calculator } from "./examples/calc/impls/DefaultRef2Calculator";
describe('FactoryCore tests', () => {

  VillarImplResolver.register(SubtractionCalculator, AdditionCalculator, DivisionCalculator, MultiplicationCalculator, DefaultCalculator, DefaultRefCalculator, DefaultRef2Calculator)

  it('Find iml subtraction', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('-')

    expect(calculator?.calc(10, 1)).toBe(9)

  });

  it('Find iml addition', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('+')

    expect(calculator?.calc(10, 1)).toBe(11)

  });

  it('Find iml any', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('apple')

    expect(calculator?.calc(10, 1)).toBe(1.54)

  });

  it('Includes validator', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('/')

    expect(calculator?.calc(10, 2)).toBe(5)

  });

  it('truth Custom', async () => {

    const options: any = { 
      metadata: { 
        value: 10 
      }
    }

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('*',  options)

    expect(calculator?.calc(10, 2)).toBe(20)

  });

  it('default impl with ref', async () => {

    const options: any = { 
      metadata: { 
        value: 10 
      },
      ref: 'CALC_REF'
    }

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('ANY',  options)

    // expect(calculator?.calc(10, 2)).toBe(20)

    console.log(calculator?.calc(10, 2))
  });

  it('default impl with ref2', async () => {

    const options: any = { 
      metadata: { 
        value: 10 
      },
      ref: 'CALC_REF_2'
    }

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('ANY',  options)

    // expect(calculator?.calc(10, 2)).toBe(20)

    console.log(calculator?.calc(10, 2))
  });


});