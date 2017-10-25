---
layout: post
title: 作业_7 leetcode 22 Generate Parentheses
subtitle: 
author: DaddyTrap
date: 2017-10-25 15:09:12 +0800
categories: Homework Algorithm
---

## 题干

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

```plain
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

## 分析

参考 [Discuss](https://discuss.leetcode.com/topic/4485/concise-recursive-c-solution)

生成n个括号的排列组合，并要求括号合法

乍一看似乎是一个先生成括号关系再输出的问题，当然也确实可以按这个思路写出递归方法，但是解决方法似乎并没有这么复杂

考虑当且仅当多生成1个左括号，必须多生成1个右括号，在这种情况下，括号必定能匹配，括号不匹配的情况不会出现。

```plain
)(      // 不符合当且仅当
(()     // 不符合必须生成右括号
())     // 不符合当且仅当
```

而对于一次生成括号，可以选择生成左/右括号，而再符合上一条件，则可以完成需求

## 代码

```cpp
void addParenthesis(vector<string> &ret, int n, int m=0, string temp="") {
    if (m == 0 && n == 0) {   // 不再有括号生成
        ret.push_back(temp);
        return;
    }
    // 当可以生成左括号时
    if (n > 0) addParenthesis(ret, n - 1, m + 1, temp + "(");
    // 当可以生成右括号时
    if (m > 0) addParenthesis(ret, n, m - 1, temp + ")");
}
vector<string> generateParenthesis(int n) {
    vector<string> ret;
    addParenthesis(ret, n);
    return ret;
}
```