---
layout: post
title: 系统分析与设计 第八次作业(lesson13)
subtitle:
author: DaddyTrap
date: 2018-06-03 10:55:54 +0800
categories: SAD Homework
---

## 描述软件架构与框架之间的区别与联系

### 架构

> 架构是特定领域常见问题的解决方案。

可以包括 三层架构、模块化架构 等。架构与编程语言无关，一种架构是对某一类问题的通用的解决方案，指导具体实现时应如何操作。

### 框架

> 框架是特定语言和技术的架构应用解决方案。

框架与编程语言紧密相关，它更像是一种对架构的实现，如 Java Spring 提供了一个针对 web 应用的对经典三层架构的实现组件，这样的就是框架。

### 总

在构建项目时，一般首先针对项目的类型确定使用某一种架构，如 web 应用一般都会采用三层架构；然后针对选用的架构，寻找适合架构的框架，如 Django 框架就能解决表示层的 MVC 问题和在持久化层中使用ORM解决问题。

## 以你的项目为案例

### 绘制三层架构模型图，细致到分区

![](/assets/sad-8/layers.png)

### 结合你程序的结构，从程序员角度说明三层架构给开发者带来的便利

使用三层架构可以实现架构解耦，业务层和表示层的分离使前后端也得以分离。如此，开发者的分工可以更加明确，负责不同架构的开发者可以专注于某一层的开发。

## 研究 VUE 与 Flux 状态管理的异同

### Flux

Flux 是 Facebook 提出的一套架构模式，其用于解决 MVC 中某些依赖复杂的情况。Flux 的核心是在 Dispatcher, Store, View, Action 之间建立“单向数据流”，使得数据流向可预测、便于管理。

其流向如下图

![](/assets/sad-8/flux-overview.png)

> 参考自 [React入门教程 - Flux](https://hulufei.gitbooks.io/react-tutorial/content/flux.html)
> + 首先要有 action，通过定义一些 action creator 方法根据需要创建 Action 提供给 dispatcher
> + View 层通过用户交互（比如 onClick）会触发 Action
> + Dispatcher 会分发触发的 Action 给所有注册的 Store 的回调函数
> + Store 回调函数根据接收的 Action 更新自身数据之后会触发一个 change 事件通知 View 数据更改了
> + View 会监听这个 change 事件，拿到对应的新数据并调用 setState 更新组件 UI

如上述，Flux 的状态管理，是由 View 调用 Action，然后通过 Dispatcher 通知 Store 更新状态 (，然后 Store 通知 View 进行更新)。状态存储在 Store 中。

### Vuex

Vuex 其实是一种对 Flux 架构的实现，但状态管理不完全相同。

![](/assets/sad-8/vuex.png)

+ Vuex 中 "Dispatch" 一个 Action
+ Action 中可以通过异步请求，从后端 API 获得数据，通过 Commit 调用 Mutations
+ Mutations 中会同步地改变 (Mutate) State
+ State 改变后，依赖 Vue 实现的数据绑定更新 Vue Component

Vuex 将状态保存在 State 中，对比 Flux，在修改状态的过程中，细分了异步的 Action 和同步的 Mutation 两个过程。

但是由于 Vuex 是一种对 Flux 的实现，因此其 “单向数据流” 的思想，是与 Flux 相仿的。
