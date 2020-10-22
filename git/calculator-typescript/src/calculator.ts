import { BaseClass } from "./base.class";

import { questionInt, question } from "readline-sync";

// Считывание с консоли
const num = questionInt("Enter number");
console.log(num);

type Parts<T> = Partial<T>[];

export class Calculator extends BaseClass<Calculator> {
  constructor(...parts: Parts<Calculator>) {
    super(...parts);

    this.someProperty = "" + this.a + this.b;
  }

  a: number;
  b: number;

  private someProperty: string;

  public set operation(v: string) {
    this.someProperty = v;
    console.log("Operation changed to ", this.someProperty);
  }

  c: string;

  sum() {
    return this.a + this.b;
  }
}

export class NewCalculator extends Calculator {
  newProperty: number;

  constructor(...parts: Parts<NewCalculator>) {
    super(...parts);
  }

  sum(): number;
  sum(a: number, b: number): number;

  sum(a?: number, b?: number) {
    if (a == undefined && b == undefined) {
      return this.a + this.b;
    }
    return a + b;
  }
}

const t = new NewCalculator({});

t.sum(1, 2);
t.sum();

const calc = new Calculator({});

const c = new Calculator({ a: 1, b: 2, operation: "+" });

const c2 = new Calculator(c, { operation: "-" }, c, { c: "test" });

console.log(c, c.operation, c2, c2.operation);

console.log(c.sum);

const a = {
  a: 2,
  c: 3,
};

const b = {
  ...a,
};

Object.assign(b, a);

b.a = a.a;
b.c = a.c;

const arr = [1, 2, 3];

console.log(arr);

console.log(...arr);
