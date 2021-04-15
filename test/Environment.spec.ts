import { expect } from 'chai';
import { SubtractionCalculator } from "./examples/calc/impls/SubtractionCalculator";
import { VillarImplResolver } from "../src/resolvers/VillarImplResolver";
import { VillarImplDiscovery } from "../src/discovery/VillarImplDiscovery";
import { Calculator } from "./examples/calc/Calculator";
import { AdditionCalculator } from './examples/calc/impls/AdditionCalculator';
import { DivisionCalculator } from './examples/calc/impls/DivisionCalculator';
import { MultiplicationCalculator } from './examples/calc/impls/MultiplicationCalculator';
describe('FactoryCore tests', () => {

  VillarImplResolver.register(SubtractionCalculator, AdditionCalculator, DivisionCalculator, MultiplicationCalculator)

  it('Find iml subtraction', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('-')

    expect(calculator?.calc(10, 1)).to.equal(9)

  });

  it('Find iml addition', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('+')

    expect(calculator?.calc(10, 1)).to.equal(11)

  });

  it('Find iml any', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('apple')

    expect(calculator?.calc(10, 1)).to.equal(undefined)

  });

  it('Includes validator', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('/')

    expect(calculator?.calc(10, 2)).to.equal(5)

  });

  it('truth Custom', async () => {

    const options: any = { 
      metadata: { 
        value: 10 
      }
    }

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('*',  options)

    expect(calculator?.calc(10, 2)).to.equal(20)

  });

});