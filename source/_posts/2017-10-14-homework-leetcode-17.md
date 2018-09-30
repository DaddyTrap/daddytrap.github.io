---
layout: post
title: 作业_5 leetcode 17 Letter Combinations of a Phone Number
subtitle:
author: DaddyTrap
date: 2017-10-14 14:42:01 +0800
categories: Homework Algorithm
---

## 题干

Given a digit string, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below.

![pic](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

```
Input:Digit string "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

**Note:**
Although the above answer is in lexicographical order, your answer could be in any order you want.

<!-- more -->

## 分析

这其实是一个很简单的排列组合问题，思路上就是找到每个数字对应的字符串，然后再在每个字符串里选出一个字符与其他字符串中选出的字符进行组合

思路很简单，反而是代码实现上有些麻烦。

样例上输入了 "23" ，选择字符的分支不难想象是一个树状结构，如下

```
2->abc
3->def
      ------|------
     /      |      \
    a       b       c
   /|\     /|\     /|\
  d e f   d e f   d e f
```

要得出从根到叶的所有排列，可以使用递归方法

## 代码

```cpp
// 数字-字母映射表
map<char, string> digit_string_map = {
  {'2', "abc"},
  {'3', "def"},
  {'4', "ghi"},
  {'5', "jkl"},
  {'6', "mno"},
  {'7', "pqrs"},
  {'8', "tuv"},
  {'9', "wxyz"}
};

// 递归得出
string recursive_combine(const vector<string> &str_list, int index, string &cur_string, vector<string> &final_res) {
  if (index >= str_list.size()) return cur_string;
  for (int i = 0; i < str_list[index].length(); ++i) {
    cur_string += str_list[index][i];
    if (index != str_list.size() - 1) {
      recursive_combine(str_list, index + 1, cur_string, final_res);
    } else {
      final_res.push_back(cur_string);
    }
    cur_string.pop_back();
  }
  return cur_string;
}

vector<string> letterCombinations(string digits) {
  vector<string> str_list, res;
  for (int i = 0; i < digits.length(); ++i) {
    str_list.push_back(digit_string_map[digits[i]]);
  }
  string temp;
  recursive_combine(str_list, 0, temp, res);
  return res;
}
```