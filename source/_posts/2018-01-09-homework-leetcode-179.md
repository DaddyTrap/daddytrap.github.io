---
layout: post
title: 作业_18 leetcode 179 Largest Number
subtitle:
author: DaddyTrap
date: 2018-01-09 20:20:27 +0800
categories: Algorithm Homework
---

## 题干

Given a list of non negative integers, arrange them such that they form the largest number.

For example, given `[3, 30, 34, 5, 9]`, the largest formed number is `9534330`.

Note: The result may be very large, so you need to return a string instead of an integer.

<!-- more -->

## 分析

使用列表中的数字拼接成一个最大的数字。

显然，如果有一个数字以9开头，其他数字都不以9开头，那么这一个数字肯定会被放在最前面，但是这并不是一个能够推出算法的规律。

如果所有数字都只有一位，那么显然可以从大到小地排序，然后拼接输出；但是现在的情况是有不同位数的数字 —— 但是 **排序** 这个思路应该是没错的，我们可以自己定义一种排序规则，使得排序后前面的数字比后面的数字 **有更强的使整个序列数字变大的能力**，那么问题就变成如何判断这个“能力”。

初看似乎很困难，比如3比30要“大”，但是却比34要“小”，如果再加一个数字，如3比304又要“小”。实际上，有一种很简单的判断方法，设两个数字 `a, b`，将其以 `ab` 和 `ba` 的方式拼接，如果 `ab > ba` 那么a的“能力”就更强，否则a,b“能力”相同或b更强。如此，就可以据此定义比较方式了。根据比较方式，将“能力”强的数字放在前面，弱的放在后面，再将排序后的数字拼接即可。

## 代码

```cpp
static bool comp(int a, int b) {
    char res1[22] = {0}, res2[22] = {0};
    sprintf(res1, "%d%d", a, b);
    sprintf(res2, "%d%d", b, a);
    return string(res1) > string(res2);
}
// "000" 的情况下要转换为 "0"
static void trimZero(string &str) {
    if (str == "0") return;
    int i = 0;
    for (i = 0; i < str.length(); ++i) {
        if (str[i] != '0') break;
    }
    if (i >= str.length()) {
        str = "0";
        return;
    }
    str = str.substr(i);
}
string largestNumber(vector<int>& nums) {
    vector<int> nums_copy = nums;
    sort(nums_copy.begin(), nums_copy.end(), comp);
    char buffer[11] = {0};
    string ret = "";
    for (auto num : nums_copy) {
        sprintf(buffer, "%d", num);
        ret += buffer;
    }
    trimZero(ret);
    return ret;
}
```
