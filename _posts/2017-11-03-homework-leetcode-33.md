---
layout: post
title: 作业_9 leetcode 33 Search in Rotated Sorted Array
subtitle: 
author: DaddyTrap
date: 2017-11-03 14:00:17 +0800
categories: Homework Algorithm
---

## 题干

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., `0 1 2 4 5 6 7` might become `4 5 6 7 0 1 2`).

You are given a target value to search. If found in the array return its index, otherwise return -1.

You may assume no duplicate exists in the array.

## 分析

意思是在一个由有序序列 *rotate* 而成的序列中做搜索。

一说到搜索，那么第一反应就是二分搜索，但是对于rotate后的"无序"序列如何进行二分呢？

这时候回忆起一些“奇怪”的二分方法，比如课堂上看到的一道题: **在不知道长度的有序序列中进行二分搜索**，做法(以升序为例)是下标按 `1, 2, 4, 8, 16, 32...` 的顺序寻找目标，如果目标比当前值小，则证明目标在前一个值到现在的值之间，然后再如此确定二分范围。

可以考虑，如果能找到序列中的最小值，那么从最小值开始向右看，到达数组最后一个值后循环回到数组第一个值，再到最小值的前一个值，就是一个有序的序列，所以问题就变为在 `log(N)` 的复杂度中寻找出最小值。在一般的序列中这是不可能的，但这是由有序序列 *rotate* 而成，因此由其他特性。

考虑一个rotate后的序列，对其进行二分，如果mid的值比最右值大，则表示序列的最小值在mid右边；否则在左边

```plain
4 5 6 1 2 3
    ^
6 > 3 ==> 最小值在6的右边

6 1 2 3 4 6
    ^
2 < 6 ==> 最小值在2的左边
```

缩小范围之后，由于得到的子序列同样符合 **是一个有序序列rotate而成** 的条件，因此可以用同样方法缩小范围，直到找到最小值。(复杂度 `log(N)`)

得到了最小值，就等于得到了一个有序序列，之后只要对此有序序列进行二分搜索即可。具体地说，在上一步获得了 `min_index`，这就是序列起点的偏移。在接下来的二分搜索中，得到 `mid` 之后，需要在其基础上加上偏移才得到真正的 `real_mid` 值，并需要时刻注意将实际下标限制在 `0~(len-1)` 中。

## 代码

```cpp
int search(vector<int>& nums, int target) {
    // Find the minimum value
    int min_index = 0, left = 0, right = nums.size() - 1;
    while (right > left) {
        min_index = (left + right) / 2;
        if (nums[min_index] > nums[right]) // min in the right part
            left = min_index + 1;
        else
            right = min_index;
    }
    min_index = left;
    
    // Binary search
    left = 0;
    right = nums.size() - 1;
    while (right >= left) {
        int mid = (left + right) / 2;
        int real_mid = (mid + min_index) % nums.size();
        if (nums[real_mid] == target) return real_mid;
        else if (nums[real_mid] > target) right = mid - 1;
        else left = mid + 1;
    }
    return -1;
}
```