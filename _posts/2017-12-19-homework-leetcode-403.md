---
layout: post
title: 作业_16 leetcode 152 Maximum Product Subarray
subtitle: 
author: DaddyTrap
date: 2017-12-19 23:16:53 +0800
categories: Homework Algorithm
---

## 题干

A frog is crossing a river. The river is divided into x units and at each unit there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water.

Given a list of stones' positions (in units) in sorted ascending order, determine if the frog is able to cross the river by landing on the last stone. Initially, the frog is on the first stone and assume the first jump must be 1 unit.

If the frog's last jump was *k* units, then its next jump must be either *k - 1*, *k*, or *k + 1* units. Note that the frog can only jump in the forward direction.

**Note:**

+ The number of stones is ≥ 2 and is < 1,100.
+ Each stone's position will be a non-negative integer < 2^31.
+ The first stone's position is always 0.

**Example 1:**

```plain
[0,1,3,5,6,8,12,17]

There are a total of 8 stones.
The first stone at the 0th unit, second stone at the 1st unit,
third stone at the 3rd unit, and so on...
The last stone at the 17th unit.

Return true. The frog can jump to the last stone by jumping 
1 unit to the 2nd stone, then 2 units to the 3rd stone, then 
2 units to the 4th stone, then 3 units to the 6th stone, 
4 units to the 7th stone, and 5 units to the 8th stone.
```

**Example 2:**

```plain
[0,1,2,3,4,8,9,11]

Return false. There is no way to jump to the last stone as 
the gap between the 5th and 6th stone is too large.
```

## 分析

青蛙跳，若上一次跳了k距离，那么这次就只能跳k-1, k, k+1的距离，求能不能到达最后一个位置。

一开始我并不明白**这么简单**的题目为什么是hard，于是按自己的想法——直接模拟。也就是说每次只跳了相邻石头：


错误示范：

```c++
bool canCross(vector<int>& stones) {
  if (stones.size() <= 1) return true;
  int last_k = 0;
  for (int i = 1; i < stones.size(); ++i) {
      int exp_k = stones[i] - stones[i - 1];
      if (abs(exp_k - last_k) <= 1) {
          last_k = exp_k;
      } else {
          return false;
      }
  }
  return true;
}
```

但是发现并不能AC，因为这里的石头允许非相邻的跳跃。

重新考虑该题，可以使用DFS算法进行 **搜索从第一个石头到最后一个石头的路径**，但在实现时发现，为了效率可能需要一个从距离映射到数组下标的map。这当然是一个可行的思路，然而我是从Dynamic Programming这个分类点进来的，所以想要思考一个动态规划的解法。

---

考虑题中条件，可以发现某个石头能跳到哪一个石头，是通过前一个石头跳了多少步到达该石头这一数字计算才能得到的，即要知道某个石头能到哪个石头，要从前一个石头获得这一信息。(题目要求只能向前跳)

构建DP表，DP表需要一个键值对集合的结构，键表示石头的距离(即参数数组中的数字)；值是一个列表，表示到达该石头时，所有可能的前一个石头跳的步数k，为了防止重复，这一列表应该使用set数据结构

遍历参数中的石头数组，根据元素的值i可以在DP表中获得该石头的上一跳距离k，然后就可以在该石头能跳到的石头中添加一条该石头所跳距离的记录。

```c++
DP[i + k - 1].insert(k - 1); // 跳跃k-1距离到达石头i+k-1
DP[i + k].insert(k);         // 跳跃k距离到达石头i+k
DP[i + k + 1].insert(k + 1); // 跳跃k+1距离到达石头i+k+1
```

当所有参数数组中所有石头被遍历完成，则得到了一个完整的DP表。这时只需要看最后一个石头的上一跳数集合中有无元素即可(如果有元素，则表示有石头可以到达最后一个石头)。

```c++
DP[stones.back()].size();
```

## 代码

```c++
bool canCross(vector<int>& stones) {
    if (stones.size() <= 1) return true;
    map<int, unordered_set<int>> dp = {{0, {0}}};
    for (auto i : stones) {
        for (auto it = dp[i].begin(); it != dp[i].end(); ++it) {
            if (*it - 1 > 0) dp[i + *it - 1].insert(*it - 1);
            dp[i + *it].insert(*it);
            dp[i + *it + 1].insert(*it + 1);
        }
    }
    return dp[stones.back()].size();
}
```