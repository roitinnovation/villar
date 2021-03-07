import { expect } from 'chai';
import { SubtractionCalculator } from "./examples/calc/impls/SubtractionCalculator";
import { VillarImplResolver } from "../src/resolvers/VillarImplResolver";
import { VillarImplDiscovery } from "../src/discovery/VillarImplDiscovery";
import { Calculator } from "./examples/calc/Calculator";
import { AdditionCalculator } from './examples/calc/impls/AdditionCalculator';
describe('FactoryCore tests', () => {

  VillarImplResolver.register(SubtractionCalculator, AdditionCalculator)

  it('Find iml subtraction', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('-')

    expect(calculator?.calc(10, 1)).to.equal(9)

  });

  it('Find iml addition', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('+')

    expect(calculator?.calc(10, 1)).to.equal(11)

  });

  it('Find iml any', async () => {

    const calculator: Calculator | undefined = VillarImplDiscovery.getInstance().findImpl<Calculator>('any')

    expect(calculator?.calc(10, 1)).to.equal(undefined)

  });

});