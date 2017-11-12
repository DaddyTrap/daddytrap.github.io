---
layout: post
title: 作业_10 leetcode 34 Search for a Range
subtitle: 
author: DaddyTrap
date: 2017-11-12 12:55:47 +0800
categories: Algorithm Homework
---

## 题干

Given an array of integers sorted in ascending order, find the starting and ending position of a given target value.

Your algorithm's runtime complexity must be in the order of *O(log n)*.

If the target is not found in the array, return `[-1, -1]`.

For example,
Given `[5, 7, 7, 8, 8, 10]` and target value 8,
return `[3, 4]`.

## 分析

题意是使用二分搜索，找出在数组中最左的目标值和最右的目标值。

如果使用的方法是，二分搜索到目标值后，在该位置向两边逐个遍历寻找边界，那么算法复杂度将会是 O(n)，不符合题目要求。

考虑一般的二分搜索，一般在搜索到目标值时就会停止搜索；而这一题的需求是要找到最左边/最右边的下标，因此可以采用的方法是 **即使找到了目标值也不停止搜索**。

要找到最左的目标值，则在找到目标值时，使二分选用左半边；同理，要找到最右的目标值，则在找到目标值时，使二分选用右半边。用代码描述如下：

```c++
// 寻找最左值
while (left < right) {
  int mid = (left + right) / 2;
  if (nums[mid] < target)
    left = mid + 1;
  else            // 包括了找到了目标值的情况
    right = mid;  // 选择二分的左半边
}
```

这一问题有一个需要注意的问题就是临界值。如上面这一例子，在找到第一个目标值之后，继续寻找目标值就要保证搜索范围中至少有一个目标值。因此写 `right = mid` 而不是 `mid - 1` 或是 `mid + 1`。

## 代码

```c++
vector<int> searchRange(vector<int>& nums, int target) {
  if (nums.empty()) return vector<int>({-1, -1});
  int left = 0, right = nums.size() - 1;
  int left_occur = -1, right_occur = -1;

  while (left < right) {
    int mid = (left + right) / 2;
    if (nums[mid] < target)
      left = mid + 1;
    else
      right = mid;
  }
  if (nums[left] != target) return vector<int>({left_occur, right_occur});
  left_occur = left;

  right = nums.size() - 1;
  while (left < right) {
    int mid = (left + right) / 2 + 1;
    if (nums[mid] > target)
      right = mid - 1;
    else
      left = mid;
  }

  if (nums[right] != target) return vector<int>({left_occur, right_occur});
  right_occur = right;

  return vector<int>({left_occur, right_occur});
}
```