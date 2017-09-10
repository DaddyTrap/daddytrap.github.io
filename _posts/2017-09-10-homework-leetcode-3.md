---
layout: default
title: 作业 leetcode 3 Longest Substring Without Repeating Characters
author: DaddyTrap
date: 2017-09-10 20:17:03 +0800
categories: Algorithm Homework
---

## 题干

Given a string, find the length of the **longest substring** without repeating characters.

**Examples:**

Given `"abcabcbb"`, the answer is `"abc"`, which the length is 3.

Given `"bbbbb"`, the answer is `"b"`, with the length of 1.

Given `"pwwkew"`, the answer is `"wke"`, with the length of 3. Note that the answer must be a **substring**, `"pwke"` is a *subsequence* and not a substring.

## 分析

意思就是找到最长的字符串并返回其长度。

思路就是用两层for循环，外层循环用来遍历字符串中每个元素，将该元素作为子字符串的 **起始字符** ；内层循环从起始字符开始遍历，直到遇到 **在起始字符和当前字符之间能找到相同字符时** 停止，此时对比这一子串和之前记录的 `max` 值(一般的找最大值做法，需要记录max值)。

---

但是这其中有一些是可以省略的。如字符串 `abcdcab` ，第一次外层循环可以找到字符串 `abcd` ，内层循环遇到 `c` 时停止。此时，第二次外层循环不需要按顺序地从 `b` 开始寻找下一子串，下面的子串 `bcd` `cd` 的长度必定比 `abcd` 短，因此下一个字符串从 `c` 之后开始找即可。


```
第一次
abcdcab
^
找到重复字符 'c'，得到 "abcd" 子串

第二次，从重复字符的后一个字符作为开始寻找
abcdcab
   ^
```

## 代码

```c++
int lengthOfLongestSubstring(string s) {
  int max = 0, index = 0, cur_start = 0;
  string cur_str, max_str;
  for (int i = 0; i < s.length(); ++i) {
      for (int j = i; j < s.length(); ++j) {
          index = 0;
          if ((index = cur_str.find(s[j])) != -1) {
              break;
          }
          cur_str += s[j];
        }
      printf("%s\t%d\t%d\t%d\n", cur_str.c_str(), i, cur_start, s.length());
      if (cur_str.length() > max) {
        max_str = cur_str;
        max = cur_str.length();
      }
      if (i + cur_str.length() >= s.length()) break;
      cur_str = "";
      i = cur_start + index;
      cur_start = i + 1;
  }
  return max;
}
```
