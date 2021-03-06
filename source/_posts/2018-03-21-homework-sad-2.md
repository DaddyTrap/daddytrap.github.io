---
layout: post
title: 系统分析与设计 第二次作业
subtitle:
author: DaddyTrap
date: 2018-03-21 20:13:44 +0800
categories: Homework SAD
---

## 简述瀑布模型、增量模型、螺旋模型（含原型方法）的优缺点。

<!-- more -->

+ 瀑布模型
  + 优点
    + 为项目提供了按阶段划分的检查点。
    + 当前一阶段完成后，您只需要去关注后续阶段。
    + 可在迭代模型中应用瀑布模型。
    + 它提供了一个模板，这个模板使得分析、设计、编码、测试和支持的方法可以在该模板下有一个共同的指导。
  + 缺点
    + 各个阶段的划分完全固定，阶段之间产生大量的文档，极大地增加了工作量。
    + 由于开发模型是线性的，用户只有等到整个过程的末期才能见到开发成果，从而增加了开发风险。
    + 通过过多的强制完成日期和里程碑来跟踪各个项目阶段。
    + 瀑布模型的突出缺点是不适应用户需求的变化。

+ 增量模型
  + 优点
    + 将待开发的软件系统模块化，可以分批次地提交软件产品，使用户可以及时了解软件项目的进展。
    + 以组件为单位进行开发降低了软件开发的风险。一个开发周期内的错误不会影响到整个软件系统。
    + 开发顺序灵活。开发人员可以对组件的实现顺序进行优先级排序，先完成需求稳定的核心组件。当组件的优先级发生变化时，还能及时地对实现顺序进行调整。
  + 缺点
    + 要求待开发的软件系统可以被模块化。如果待开发的软件系统很难被模块化，那么将会给增量开发带来很多麻烦。

+ 螺旋模型
  + 优点
    + 通过原型的创建，使软件开发在每个迭代的最初明确方向；
    + 通过风险分析，最大程度地降低软件彻底失败造成损失的可能性；
    + 在每个迭代阶段植入软件测试，使每个阶段的质量得到保证；
    + 整体过程具备很高的灵活性，在开发过程的任何阶段自由应对变化；
    + 每个迭代阶段累计开发成本，使支出状况容易掌握；
    + 通过对用户反馈的采集，与用户沟通，以保证用户需求的最大实现；
  + 缺点
    + 过分依赖风险分析经验与技术，一旦在风险分析过程中出现偏差将造成重大损失；
    + 过于灵活的开发过程不利于已经签署合同的客户与开发者之间的协调；
    + 由于只适用大型软件，过大的风险管理支出会影响客户的最终收益；

## 简述 UP 的三大特点，其中哪些内容体现了用户驱动的开发，哪些内容体现风险驱动的开发？

三大特点：
+ 迭代的且增量的
  + UP是一个迭代、增量开发过程。细化、构建、移交阶段被分解为有时限的迭代。每个迭代最终导致增量，即一个 较前一发布有增加/改进的功能的发布。
+ 架构中心的
  + UP坚持认为架构是项目组形成系统的核心。由于没有任何一个模型足以覆盖系统的所有方面，因此UP支持多种模型与观点(?)。
+ 风险关注的
  + UP要求项目组在项目初期就致力于定位最关键的风险。每次迭代的交付，尤其是细化阶段，必须精心选择以保证最大的风险已被定位。

迭代且增量体现了用户驱动的开发，因为每次迭代都可以给用户看到成品并得到用户的反馈；在项目初期定位风险体现了风险驱动的开发。

## UP 四个阶段的划分准则是什么？关键的里程碑是什么？

划分准则可以用每个阶段的结束来表示：

+ 构思阶段：开发一个系统大致版本、构思业务例子、定义范围、粗略估计开发费用和计划
+ 细化阶段：完成一个构建阶段的准确可靠的计划，并定位重要的风险因子
+ 构建阶段：完成一个待(在移交阶段)部署的软件
+ 移交阶段：部署给目标用户

关键的里程碑是 **构思阶段的结束**。

## IT 项目管理中，“工期、质量、范围/内容” 三个元素中，在合同固定条件下，为什么说“范围/内容”是项目团队是易于控制的

由于一般会在合同中限制截止日期，因此工期对于项目来说是确定的，不能由项目团队控制。

质量是指满足明确或隐含需求的程度。在合同中应该对需求会有一个明确的标准，而交付物也必须达到这一标准，才能真正交付。

范围是指为了实现项目目标必须完成的工作，即只要可以“实现项目目标”/“达到交付物标准”，具体如何工作一般不会由合同甲方限制，因此这是项目团队易于控制的

## 为什么说，UP 为企业按固定节奏生产、固定周期发布软件产品提供了依据？

UP将阶段划分为4个阶段：构想阶段、细化阶段、构造阶段、移交阶段，通过阶段划分，可以使企业能有一个固定的节奏来生产；UP的迭代性，使得项目组能周期性地产出交付物，因此固定周期地发布软件产品也是UP的指导