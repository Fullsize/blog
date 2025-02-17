---
title: js 对象对比是否相等
date: 2020-11-26 09:45
tags:
  - javascript
categories:
  - 技术
  - 学习
---

ES6 有一个方法来判断两个对象是否相等

```jsx
console.log(Object.is(a, b));
```

但是这个相等，和我们平时要的相等可能不一样,这个方法判断的是 a 和 b 是不是同一个指针的对象,比如说

```jsx
var a = {
  id: 1,
};
var b = a;
console.log(Object.is(a, b)); //true
```

但是下面这种情况就不管用了

```jsx
var a = {
  id: 1,
};
var b = {
  id: 1,
};
console.log(Object.is(a, b)); //false
```

当我们只需要两个对象的内容相同的时候，他就没效果了

**思路**
只要两个对象的名和键值都相同。那么两个对象的内容就相同了

1. 用 Object.getOwnPropertyNames 拿到对象的所以键名数组
2. 比对键名数组的长度是否相等。否=>false。真=>3
3. 比对键名对应的键值是否相等

```jsx
function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    var propA = a[propName];
    var propB = b[propName];
    if (propA !== propB) {
      return false;
    }
  }
  return true;
}
```

粗略一看没问题,但是细心的同学发现如果键值也是对象的话,那这个方法就不管用了

```jsx
var a = {
  id: 1,
  name: 2,
  c: {
    age: 3,
  },
};
var b = {
  id: 1,
  name: 2,
  c: {
    age: 3,
  },
};
console.log(isObjectValueEqual(a, b)); //false
```

这个时候递归一下就可以解决了
注意，递归的时候要判断 prop 是不是 Object，然后会进入无限递归的死循环

```jsx
function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a);
  var bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];

    var propA = a[propName];
    var propB = b[propName];
    // 2020-11-18更新，这里忽略了值为undefined的情况
    // 故先判断两边都有相同键名
    if (!b.hasOwnProperty(propName)) return false;
    if (typeof propA === "object") {
      if (this.isObjectValueEqual(propA, propB)) {
        // return true     这里不能return ,后面的对象还没判断
      } else {
        return false;
      }
    } else if (propA !== propB) {
      return false;
    } else {
    }
  }
  return true;
}
var a = {
  id: 1,
  name: 2,
  c: {
    age: 3,
  },
};
var b = {
  id: 1,
  name: 2,
  c: {
    age: 3,
  },
};
console.log(isObjectValueEqual(a, b)); //true
```
