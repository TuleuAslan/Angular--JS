interface Type {
  prop1: number;
  prop2: string;
  prop3?: any;
}

const obj: Type = {
  prop1: 2,
  prop2: "asd",
  prop3: 2,
};

type Type2 = Type & { prop4: number };

let obj2: Type2 = {...obj, prop4: 1};


const a = [1, 2];
const b = [3, 4];

const ab = [...a, ...b];

console.log(ab);

class Class1 implements Type {
    prop1: number;
    prop2: string;
    prop3?: any;

    test() {}
}

class Class2 extends Class1 {}

class Class3 implements Class1 {
    test(): void {
        throw new Error("Method not implemented.");
    }
    prop1: number;
    prop2: string;
    prop3?: any;

}