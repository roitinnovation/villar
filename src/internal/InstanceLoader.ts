export class InstanceLoader {

    constructor(private testType: new () => any) {
    }

    getNew() : any {
        return new this.testType();
    }
}