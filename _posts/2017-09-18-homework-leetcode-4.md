---
layout: post
title: 作业_2 leetcode 4 Median of Two Sorted Arrays
subtitle: 
author: DaddyTrap
date: 2017-09-18 10:07:45 +0800
categories: Algorithm Homework
---

## 题干

There are two sorted arrays **nums1** and **nums2** of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be *O(log (m+n))*.

**Example1**

```
nums1 = [1, 3]
nums2 = [2]

The median is 2.0
```

**Example2**
```
nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
```

## 分析

找出两个有序数组中的中位数

---

如果复杂度上没有要求，第一个能想到的就是使用复杂度为 **O(m+n)** 的算法，大致思路如下：

同时遍历两个数组(a, b)，定义当前遍历到的元素为 a\_i 和 b\_j，并定义计数器cnt。当 a\_i < b\_j，`i++, cnt++`；否则 `j++, cnt++`。直到 `cnt == length_a + length_b` ，得到 `min{a_i, b_j}` 为中位数(此处仅考虑长度为奇数的情况，若为偶数则取另一个值相加除以2得到中位数)。

---

然而复杂度要求是 `O(log(m+n))` ，看到这里，我的第一个想法就是 *二分法* 。找出中位数算是一种 **搜索**，搜索算法要达到 `O(log(n))` 的复杂度，那么一般就是使用二分搜索了。

虽说这一反应很快，但是如何把二分法用在这个题目中还是让我绞尽脑汁。最后还是求助于同学和LeetCode上的solution……下面就说一下我对这个思路的理解

对某一数组进行二分搜索，并检验当前搜索的数是否为中位数。这样就可以使算法复杂度达到 `O(log(min{m, n}))`。而重点在于如何检验中位数。

首先假设当前搜索到的位置就是中位数，那么另一数组中有多少个元素在中位数前就可以确定，如假设a中的i位置是中位数，则b中的(j = (length_ab + 1)/2 - i)位置及其之前的数都是都在a\_i的左边。然而在这种情况下，实际上a\_i可能是中位数，b\_j也可能是中位数，而验证这两个数是不是中位数的方法，就是看它们是否在“中间”位置，即 `max{a_(i+1), b_(j+1)}` 中的最小值要**大于** `min{a_i, b_j}`  ，如果符合该条件，那么中位数就是 `min{a_i, b_j}` 了。

(如果讨论长度为偶数的情况，则中位数为 `(a_i + b_j) / 2`)

---

## 代码
```c++
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
  int len = nums1.size() + nums2.size();
  vector<int>* p_nums_to_bin = nums1.size() < nums2.size() ? &nums1 : &nums2;
  vector<int>* p_nums_other = nums1.size() < nums2.size() ? &nums2 : &nums1;

  vector<int>& nums_to_bin = *p_nums_to_bin;
  vector<int>& nums_other = *p_nums_other;

  int m = nums_to_bin.size(), n = nums_other.size();

  int left = 0, right = m;

  while (left <= right) {
    int i = (left + right) / 2;
    int j = (m + n + 1) / 2 - i;
    if (i < right && nums_other[j - 1] > nums_to_bin[i]) {
      left = i + 1;
    } else if (i > left && nums_to_bin[i - 1] > nums_other[j]) {
      right = i - 1;
    } else {
      int max = 0;
      if (i == 0) max = nums_other[j - 1];
      else if (j == 0) max = nums_to_bin[i - 1];
      else max = MAX(nums_other[j - 1], nums_to_bin[i - 1]);

      int min = 0;
      if (i == m) min = nums_other[j];
      else if (j == n) min = nums_to_bin[i];
      else min = MIN(nums_other[j], nums_to_bin[i]);

      if (len % 2 == 0) return (max + min) / 2.0;
      else return max;
    }
  }
  return 0.0;
}
```