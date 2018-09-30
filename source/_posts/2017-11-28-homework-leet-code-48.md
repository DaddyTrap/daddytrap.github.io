---
layout: post
title: 作业_12 leetcode 48 Rotate Image
subtitle:
author: DaddyTrap
date: 2017-11-28 15:58:32 +0800
categories: Homework Algorithm
---

## 题干

You are given an n x n 2D matrix representing an image.

Rotate the image by 90 degrees (clockwise).

**Note:**
You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

**Example 1:**

```
Given input matrix =
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

rotate the input matrix in-place such that it becomes:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**Example 2:**

```
Given input matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
],

rotate the input matrix in-place such that it becomes:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
]
```


<!-- more -->

## 分析

将矩阵顺时针旋转90度。

+ 第一种想法是直接创建新的矩阵，然后按旋转后的顺序遍历原矩阵，填入对应的位置

  这种方法看起来还行

+ 第二种想法是可以使用线性代数的知识，对矩阵使用旋转变换矩阵

  这种方法看起来似乎更加地高明，但是对于C++这种并不是原生支持矩阵运算的语言，并不合适，反而因为要实现矩阵相乘而增大了工作量

而上两种做法最重要的是不符合题意中的 **in-place**，因此需要空间复杂度为 O(1) 的算法来进行计算

想到了一些非常“朴素”而复杂的方法，比如将矩阵从外向内一圈一圈地进行“移动”，但是除了实现复杂以外，步数也很多。

搜索后发现了一种更好的旋转方法：先将所有行翻转(reverse)，然后以左对角线为对称线，将左半边的元素与右半边元素对称地交换

```
1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 16

行reverse

13 14 15 16
9  10 11 12
5  6  7  8
1  2  3  4

对称交换

13 9  5  1
14 10 6  2
15 11 7  3
16 12 8  4
```

## 代码

```c++
void swap(int &a, int &b) {
    int c = a;
    a = b;
    b = c;
}
void rotate(vector<vector<int>>& matrix) {
    reverse(matrix.begin(), matrix.end());
    for (int i = 0; i < matrix.size(); ++i) {
        for (int j = i + 1; j < matrix[i].size(); ++j) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
}
```