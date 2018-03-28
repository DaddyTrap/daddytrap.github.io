---
layout: post
title: C++实现final类(不可被继承的类)
subtitle: 
author: DaddyTrap
date: 2018-03-26 18:08:56 +0800
categories: C++
---

> Edit(2018.3.28): 昨天听说C++11已经有 `final` 关键字了，不需要搞这个复杂的东西了……不过也算是一个对C++知识的巩固吧。具体参考[cppreference](http://zh.cppreference.com/w/cpp/language/final)


写这个的重要原因是今天(2018.3.26)被问到了一个 **如何用C++实现一个不可继承的类** 的问题，虽说我也略知一些“骚操作”，但是当时确实没能想到……所以就在这里记一下吧

## 实现一个不可被继承的类(final)

需求是实现一个不可继承的类，即，使得 只要代码中继承这一个类就会报错 这样的需求。

### 使用“封印”父类构造函数的方法实现

原理是，子类构造的时候必定会调用父类的构造函数，而如果将父类的构造函数放在 `private` 区，那么只要代码中 无论**显式/隐式** 地调用了子类的构造函数，就会因无法调用父类构造函数而发生编译错误

```c++
// final.cpp
class Parent {
 private:
  Parent() {}
};

class Child : public Parent {

};

Child c; // 导致编译错误
// Child *c; // 不导致编译错误，但也没什么意义
```

使用 `g++ -c final.cpp` 编译该文件，出现报错

```bash
C:\xxx\xxx\xxx>g++ final.cpp -c
final.cpp:10:8: error: 'c' declared as reference but not initialized
 Child &c;
        ^

```

但是这里会出现一个问题，那么就是我们也无法直接使用父类的构造函数，解决方法可以参考 **单例模式** —— 单例模式中构造函数就是在 `private` 区的。改写如下

```c++
class Parent {
 private:
  Parent() {}
 public:
  static Parent* newParent() {
    return new Parent();
  }
};

Parent* p = Parent::newParent();
```

### 使用虚继承的实现

哦？但是貌似不是很优雅啊……于是有了另一种方法……

这次的原理是
`Parent` 再 **虚继承** 一个父类 `Final` ，`Final` 的构造函数放在 `protected` 区中，而 `Parent` 继承时使用 `private` (和 `virtual`) 描述符，这样会达到下面的效果

+ `Final` 的构造函数在 `protected` 中，且 `Parent` 用 `private` 继承 —— 因此其构造函数只能在 `Parent` 调用
+ `Parent` 虚继承了 `Final` —— 因此 `Parent` 的子类不会通过 `Parent` 来调用 `Final` 的构造函数，而是自己调用 `Final` 的构造函数

以上两点加起来，就使得 `Final` 的子类 **“进退两难”**，引发编译错误

代码如下：

```c++
class Final {
 protected:
  Final() {}
};

class Parent : private virtual Final {
 public:
  Parent() {}
 private:
  int a, b, c;
};

class Child : public Parent {
 public:
  Child() {}
};
```

编译报错如下:

```bash
C:\xxx\xxx\xxx>g++.exe -c final.cpp
final.cpp: In constructor 'Child::Child()':
final.cpp:3:3: error: 'Final::Final()' is protected
   Final() {}
   ^
final.cpp:15:11: error: within this context
   Child() {}
           ^

```

---

实际上，按照上面第二种方法的原理，不管怎么写，只要达到

+ `Parent` 的父类构造函数只能由 `Parent` 调用
+ `Child` 必须直接调用 `Parent` 的父类构造函数

两条即可

比如，查到的维基百科上的实现是这样的：

```c++
template<typename T> class MakeFinally{
   private:
       MakeFinally(){};//只有MakeFinally的友类才可以构造MakeFinally
       ~MakeFinally(){};
   friend T;
};

class MyClass:public virtual  MakeFinally<MyClass>{};//MyClass是不可派生类

//由于虚继承，所以D要直接负责构造MakeFinally类，从而导致编译报错，所以D作为派生类是不合法的。
class D: public MyClass{};
```

---

> 然而，这样的搞法到底能不能防止 `Parent` 被继承，貌似还得取决于编译器……比如我在Windows下使用MSYS2的 gcc(`gcc version 7.2.0 (Rev1, Built by MSYS2 project)`) 的时候，竟然不会报错……实在是恐怖如斯

### Bonus -- 我在面试的时候的想法

> 当时没有说出来，但是或许试着说出来会更好吧 —— 但是这是错的！

我想到了让子类 “进退两难” 的这种思路，刚好面试官在这个问题前提到重载，于是我的想法是：

+ 父类写一个纯虚函数 —— 子类**必须**实现这一函数
+ 这个纯虚函数放在 `private` 区域 —— 子类**不能**实现这一函数

**然而**，父类如果有纯虚函数，那么父类就变成了**抽象类**，这样父类也无法实例化了，并不符合需求