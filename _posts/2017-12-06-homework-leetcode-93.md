---
layout: post
title: 作业_14 leetcode 93 Restore IP Addresses
subtitle: 
author: DaddyTrap
date: 2017-12-06 21:22:18 +0800
categories: Algorithm Homework
---

## 题干

Given a string containing only digits, restore it by returning all possible valid IP address combinations.

For example:
Given `"25525511135"`,

return `["255.255.11.135", "255.255.111.35"]`. (Order does not matter)

## 分析

需要用一串字符串构造可能的IP地址，那么首先是要了解IP地址如何构成

IP地址分为4段，每段应是一个范围在 `0-255` 的数字

思路也非常简单，只要枚举出所有将字符串分割成4段且每段字符数在 `1-3` 之间的情况，然后判断每段字符串是否表示一个 `0-255` 的数字即可。于是问题变为了如何枚举。

这里可以使用递归的方法。

+ 递归结束条件：选出了4段字符串
+ 递归：分别选当前字符串的第一个字符作为字符串、前两个字符作为字符串、前三个字符作为字符串加入到已选字符串列表中，在当前字符串中删除已选的字符，分别进入递归
+ 递归结束时，如果当前字符串长度不为0，即没有选完，不符合条件，舍弃；如果已选完，判断所有已选字符串是否 **合法**，如果存在不合法字符串则舍弃，如果不存在则合并已选字符串并加到结果集合中

而判断 **合法** 的逻辑，对这道题目也比较简单：

+ 如果字符串的第一位为 `'0'` 且长度不为 `1`，则不合法 (如 `"01", "00"`)
+ 如果字符串所表示的整数大小大于 `255`，则不合法 (不存在负数情况)

## 代码

```cpp
bool isValidNum(string s) {
    if (s.length() <= 0) return false;
    if (s[0] == '0' && s.length() > 1) return false;
    int num = atoi(s.c_str());
    if (num > 255) return false;
    return true;
}

void recursive(string s, vector<string> cur_chosen, vector<string> &ret) {
    if (s.length() == 0) {
        if (cur_chosen.size() == 4) {
            string one_res = "";
            for (int i = 0; i < cur_chosen.size(); ++i) {
                if (!isValidNum(cur_chosen[i])) return;
            }
            one_res = cur_chosen[0] + "." + cur_chosen[1] + "." + cur_chosen[2] + "." + cur_chosen[3];
            ret.push_back(one_res);
            return;
        } else {
            return;
        }
    }
    if (cur_chosen.size() == 4) return;
    cur_chosen.push_back(string(""));
    for (int i = 0; i < 3; ++i) {
        if (s.length() <= 0) return;
        cur_chosen[cur_chosen.size() - 1] += s[0];
        s.erase(0, 1);
        recursive(s, cur_chosen, ret);
    }
}
vector<string> restoreIpAddresses(string s) {
    vector<string> ret, cur_chosen;
    recursive(s, cur_chosen, ret);
    return ret;
}
```