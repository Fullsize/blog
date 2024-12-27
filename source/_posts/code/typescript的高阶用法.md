---
title: typescript的高阶用法
date: 2024-05-20
tags:
  - typescript
  - javascript
categories:
  - 技术
  - 学习
---

记录和学习一些常用或需要了解的用法,下面是一些 TypeScript 的高级用法及其示例：

### 1. 泛型 (Generics)

泛型允许你定义函数、类或接口时，不指定具体的类型，而是使用类型参数。这样可以使代码更加灵活和可重用。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("Hello TypeScript");
let output2 = identity<number>(42);
```

### 2. 交叉类型 (Intersection Types)

交叉类型用于将多个类型合并为一个类型，表示一个对象可以同时拥有这些类型的所有成员。

```typescript
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type EmployeePerson = Person & Employee;

let employee: EmployeePerson = {
  name: "John",
  employeeId: 1234,
};
```

### 3. 联合类型 (Union Types)

联合类型允许一个值可以是几种类型之一。

```tsx
function format(input: string | number): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input.toFixed(2);
  }
}
```

### 4. 类型守卫 (Type Guards)

类型守卫用于在运行时判断变量的类型，从而在代码中使用特定类型的方法和属性。

```tsx
function isString(value: any): value is string {
  return typeof value === "string";
}

function example(input: string | number) {
  if (isString(input)) {
    console.log(input.toUpperCase());
  } else {
    console.log(input.toFixed(2));
  }
}
```

### 5. 映射类型 (Mapped Types)

映射类型允许你基于已有类型创建新类型，常用于转换对象属性的类型。

```tsx
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

type ReadOnlyPerson = ReadOnly<Person>;

let person: ReadOnlyPerson = { name: "Alice", age: 30 };
// person.age = 31; // Error: Cannot assign to 'age' because it is a read-only property.
```

### 6. 条件类型 (Conditional Types)

条件类型根据条件表达式选择一种类型。

```tsx
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : "object";

type T0 = TypeName<string>; // "string"
type T1 = TypeName<number>; // "number"
type T2 = TypeName<boolean>; // "boolean"
type T3 = TypeName<object>; // "object"
```

### 7. 高级类型推断

TypeScript 的类型推断能力非常强大，可以根据上下文自动推断出复杂类型。

```tsx
function makeTuple<T, U>(first: T, second: U) {
  return [first, second] as [T, U];
}

let tuple = makeTuple("hello", 42); // [string, number]
```

### 8. 模板字面量类型 (Template Literal Types)

模板字面量类型允许通过模板字符串创建类型。

```tsx
type Color = "red" | "green" | "blue";
type Brightness = "light" | "dark";

type Theme = `${Color}-${Brightness}`;

let theme: Theme;
theme = "red-light"; // valid
theme = "blue-dark"; // valid
// theme = "yellow-light"; // Error
```

### 9. 索引类型和查找类型

索引类型用于访问另一种类型的属性。

```tsx
interface Person {
  name: string;
  age: number;
}

type PersonName = Person["name"]; // string
type PersonProperties = keyof Person; // "name" | "age"
```

### 10. Utility Types

TypeScript 提供了一些内置的实用类型，可以简化常见的类型操作。

```tsx
interface Person {
  name: string;
  age: number;
  address: string;
}

// Partial: 将所有属性设为可选
type PartialPerson = Partial<Person>;

// Required: 将所有属性设为必需
type RequiredPerson = Required<Person>;

// Readonly: 将所有属性设为只读
type ReadonlyPerson = Readonly<Person>;

// Pick: 选择特定属性
type PersonNameAndAge = Pick<Person, "name" | "age">;
```

这些高级用法使得 TypeScript 能够表达更复杂的类型逻辑，增强类型检查的能力，从而提高代码的安全性和可维护性。
