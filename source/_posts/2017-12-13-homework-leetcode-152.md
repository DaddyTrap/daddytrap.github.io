---
layout: post
title: 作业_15 leetcode 152 Maximum Product Subarray
subtitle:
author: DaddyTrap
date: 2017-12-13 13:39:50 +0800
categories: Algorithm Homework
---

## 题干

Find the contiguous subarray within an array (containing at least one number) which has the largest product.

For example, given the array `[2,3,-2,4]`,
the contiguous subarray `[2,3]` has the largest product = `6`.

<!-- more -->

## 分析

找到连续的数字中(子数组)的最大乘积。

在做题时很快能反应到，这应该是与动态规划有关的题目。但可能受到各种背包问题的解法的影响，第一反应是想用二维数组作为动态规划的数组，大概是：行坐标表示从第几个数字开始选择子数组，列坐标表示到第几个数字结束子数组。但很快注意到，这样的想法就是枚举所有情况而已，并不是动态规划。

首先考虑所有数都是正数的情况：

考虑完整数组中的第一个位置，如果整个数组只有这一个元素，那么其自身就是最大乘积；考虑第二个位置，如果整个数组只有两个元素，那么以该位置为终点的最大乘积的可能值就是：第二个元素本身 **a** (从第二个元素开始)、两个元素的乘积 **b** (从第一个元素开始从第二个元素结束)；考虑第三个位置，以该位置为终点的最大乘积可能值是：第三个元素(从第三个元素开始)、**a\*第三个元素**(从第二个元素开始到第三个)、**b\*第三个元素**(从第一个元素开始到第三个)，而不论是a、b哪个与其相乘，只要在a、b中选择较大的一个即可。

因此，要计算以某元素为终点的最大乘积，只需要记录以该元素的前一个元素为终点的最大乘积即可。大致代码如下：

```c++
int ret = nums[0]; // 最终的最大乘积
int pre_max = nums[0];
for (int i = 0; i < nums.size(); ++i) {
  int max = MAX(pre_max * nums[i], nums[i]);
  pre_max = max;
  ret = MAX(ret, max);
}
return ret;
```

此时再考虑有负数的情况。不难想到，之前的做法所得到的所谓最大值，只要一乘上负数反而马上会变成很小的值；而同样，在之前操作中若能得到最小值，乘上负数则马上变成很大的值。而还未遍历到的元素的正负是无法预知的，因此不仅需要记录最大值，还要记录最小值。而当当前处理的元素是负数，那么以当前元素为终点的最大乘积则应用 `pre_min * nums[i]`；否，则用 `pre_max * nums[i]`。

## 代码

```c++
#define MAX(i, j) ((i) > (j) ? (i) : (j))

#define MIN(i, j) ((i) < (j) ? (i) : (j))

int maxProduct(vector<int>& nums) {
    if (nums.empty()) return 0;
    if (nums.size() == 1) return nums[0];
    int pre_min = nums[0], pre_max = nums[0];
    int min = nums[0], max = nums[0];
    int ret = nums[0];
    for (int i = 1; i < nums.size(); ++i) {
        if (nums[i] < 0) {
            max = MAX(pre_min * nums[i], nums[i]);
            min = MIN(pre_max * nums[i], nums[i]);
        } else {
            max = MAX(pre_max * nums[i], nums[i]);
            min = MIN(pre_min * nums[i], nums[i]);
        }
        ret = MAX(max, ret);
        pre_min = min;
        pre_max = max;
    }
    return ret;
}
```