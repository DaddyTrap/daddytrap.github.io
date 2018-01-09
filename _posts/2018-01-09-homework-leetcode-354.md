---
layout: post
title: 
subtitle: 
author: DaddyTrap
date: 2018-01-09 22:59:10 +0800
categories: Algorithm Homework
---


## 题干

You have a number of envelopes with widths and heights given as a pair of integers `(w, h)`. One envelope can fit into another if and only if both the width and height of one envelope is greater than the width and height of the other envelope.

What is the maximum number of envelopes can you Russian doll? (put one inside other)

Example:
Given envelopes = `[[5,4],[6,4],[6,7],[2,3]]`, the maximum number of envelopes you can Russian doll is `3` ([2,3] => [5,4] => [6,7]).


## 分析

俄罗斯套娃信封，很有趣的题目名……求套娃信封的最大信封数。

最初的想法是，按照分别以宽、高升序的方法来排序，然后遍历一次，遍历途中根据上次选择的信封找下一个合适的信封(贪心)。但是这个想法是有问题的，如果途中某个信封的高很大，使得后面可选的信封减少，而后面比该信封的高要小的信封也选不了，就会导致出错。

考虑将信封进行，宽升序、宽相同时高降序的方法来排序，排列好后，选择信封的问题就可以转变为对 **高** 的 **寻找最长递增序列(的长度)** 的问题。

考虑这一问题，其做法是：使用一个数组记录当前已被选择的数字。遍历原序列，如果在已选择的数组中能找到比当前元素大的值，则用当前元素替换已选数字中恰比当前元素大的数字；如果找不到，则将当前元素加入到已选择数字中。最终输出已选择数组的长度即可。

## 代码

```cpp
static bool cmp(pair<int, int> a, pair<int, int> b) {
    if (a.first != b.first) {
        return a.first < b.first;
    } else {
        return a.second > b.second;
    }
}
int maxEnvelopes(vector<pair<int, int>>& envelopes) {
    if (envelopes.empty()) return 0;
    sort(envelopes.begin(), envelopes.end(), cmp);
    
    vector<int> selected = {envelopes[0].second};
    for (int i = 1; i < envelopes.size(); ++i) {
        auto iter = lower_bound(selected.begin(), selected.end(), envelopes[i].second);
        if (iter == selected.end()) {
            selected.push_back(envelopes[i].second);
        } else {
            *iter = envelopes[i].second;
        }
    }
    return selected.size();
}
```