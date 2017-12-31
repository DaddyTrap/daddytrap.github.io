---
layout: post
title: 作业_17 证明吝啬SAT是NP完全问题
subtitle: 
author: DaddyTrap
date: 2017-12-31 11:08:25 +0800
categories: Algorithm Homework
---

## 题干

**STINGY SAT** is the following problem: given a set of clauses (each a disjunction of literals) and an integer *k*, find a satisfying assignment in which at most *k* variables are **true**, if such an assignment exists. Prove that **STINGY SAT** is **NP**-complete.

吝啬SAT是这样的问题：给出一组子句(每个子句都是文字的析取)和一个整数k。如果存在，则找出让最多k个文字为true的赋值使得子句满足。证明吝啬SAT是NP完全的。


## 分析

证明NP完全应该分两步，第一步是证明它是NP复杂的，第二步是将已知的NP完全问题归约到其上。

1. 对于该问题的实例 *I*，有一个高效校验方法能判断可能解 *S* 确实是 *I* 的解 —— 这一高效方法就是先校验可能解中为true的文字是否小于等于k，若是则代入 *|I|* 个子句中看是否满足。因此可以证明吝啬SAT是NP复杂的。

2. 设有一个SAT的实例 *I*，令 *(I,k)* 是 *k=|I|* 的STINGY SAT实例。要证明：*I* 是一个SAT，当且仅当 *(I,k)* 是一个STINGY SAT实例。
  + 假设 *I* 有一个解S，则因为 *I* 总共有k个文字而使得不会超过k个文字是true，所以S同时也是 *(I,k)* 的解
  + 假设 *(I,k)* 有一个解S，显然S也是 *I* 的一个解

综上，可知 **STINGY SAT** 也是NP完全问题。