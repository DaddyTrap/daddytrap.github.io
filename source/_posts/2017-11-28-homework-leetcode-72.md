---
layout: post
title: 作业_13 leetcode 72 Edit Distance
subtitle:
author: DaddyTrap
date: 2017-11-28 19:21:43 +0800
categories: Homework Algorithm
---

## 题干

Given two words word1 and word2, find the minimum number of steps required to convert word1 to word2. (each operation is counted as 1 step.)

You have the following 3 operations permitted on a word:

a) Insert a character
b) Delete a character
c) Replace a character

<!-- more -->

## 分析

最经典的编辑距离的题目，所以下面主要是算法描述，就算是一个复习吧~

编辑距离的解题思想是动态规划，那么就是要确定状态转移方程。考虑：

+ 两个空串的编辑距离是0
+ 长度为n的串与空串的编辑距离是n
+ 对其他情况，假设已知串 **x,y** 和 **x,y** 的编辑距离为 **e(x,y)**
  + 对在x串上增加一个字符得到的串 **x+1**，可以得到 **e(x+1,y)=e(x,y)+1**
  + 对在x,y串上增加一个字符得到 **x+1,y+1**
    + 如果增加的字符相同，则 **e(x,y)=e(x+1,y+1)**
    + 如果增加的字符不同，则 **e(x,y)=e(x+1,y+1)+1**

由此，可以得出动态规划时使用的矩阵 `d` ，以 `a="ace"`、`b="abcdef"` 为例。

|.|0|a|b|c|d|e|f|
|-|-|-|-|-|-|-|-|
|0|
|a|
|c|
|e|

`d[i][j]` 表示 **串a的前i个字符组成的子串** 与 **串b的前j个字符组成的子串** 的编辑距离，根据上面总结的规律，不难得出下面的初始矩阵：

|.|0|a|b|c|d|e|f|
|-|-|-|-|-|-|-|-|
|0|0|1|2|3|4|5|6|
|a|1|
|c|2|
|e|3|

计算某一位置的值，可以取 `min{左+1, 上+1, 左上+common}` (其中 `common` 表示该位置子串中的最后一个字符是否相同，相同为1，不同为2)

如，计算 `d[1][1]`，两子串中的最后一个字符直接向该位置的纵轴字符和横轴字符看，都是 `'a'`，因此common为0，取 `min{左+1, 上+1, 左上+common} = 0`

如此一直递推直到得到 `d[3][6]`，这就是所要的编辑距离


## 代码

```c++
int min(int a, int b) {
    return a < b ? a : b;
}

int min(int a, int b, int c) {
    return min(min(a, b), c);
}

int minDistance(string word1, string word2) {
    int len1 = word1.length(), len2 = word2.length();

    // make dynamic matrix
    int **dynamic = nullptr;
    dynamic = new int*[len1 + 1];
    for (int i = 0; i < len1 + 1; ++i) {
        dynamic[i] =  new int[len2 + 1];
        dynamic[i][0] = i;
        if (i == 0) {
            for (int j = 0; j < len2 + 1; ++j) {
                dynamic[0][j] = j;
            }
        }
    }

    // cal
    for (int i = 1; i < len1 + 1; ++i) {
        for (int j = 1; j < len2 + 1; ++j) {
            int common = 0;
            if (word1[i - 1] != word2[j - 1]) common = 1;
            dynamic[i][j] = min(dynamic[i - 1][j] + 1, dynamic[i][j - 1] + 1, dynamic[i - 1][j - 1] + common);
        }
    }

    return dynamic[len1][len2];
}
```