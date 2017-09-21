---
layout: post
title: 作业_3 leetcode 5 Longest Palindromic Substring
author: DaddyTrap
date: 2017-09-21 13:52:32 +0800
categories: Homework Algorithm
---

## 题目

Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

**Example:**

```
Input: "babad"

Output: "bab"

Note: "aba" is also a valid answer.
```

**Example**

```
Input: "cbbd"

Output: "bb"
```

## 分析

简单说就是寻找最长回文串

那么第一直觉，就是找出 **所有** 的回文串后选出 **最长** 的回文串，算法大概是

一层从头遍历字符串选出子串的头部，二层循环从尾遍历字符串选出子串的尾部，判断选出的子串是否为回文串(这一步需要O(n)的复杂度) —— 总计需要 O(n^3) 的时间复杂度

思路一出，代码可算是一气呵成；复制、提交， **Time Limit** 。没有办法，只能再想更好的算法……

---

思索无果后，还是看了一下solution，看到了其中有 **Around Center** ，恍然大悟，想起来这就是某一次ACM新手赛上大家都会而我们队却始终做不出来的题目，最终我们在欢声笑语中以 **0 AC** 成绩离开实验室，并在路上偶遇大佬请教了一番。

这一算法的思路是，遍历字符串中能作为回文串的 **中间位置** 的位置(O(n))，从中间开始向两边寻找回文(O(n))，由此得出最长回文串。而这里要注意的是所谓“中间位置”，是既可以是字符串中的某个字符(回文长度为奇数)，也可以是两个字符间的空隙(回文长度为偶数)。

这个算法应该说很容易理解，但对于我并不容易想到……那么既然知道了思路，代码也就可以写出来了

## 代码

### “朴素”的算法 (Time Limit **未通过** )

```c++
bool isPalindromic(string s, int head, int tail) {
  int len = tail - head + 1;
  for (int i = 0; i < len / 2; ++i) {
      if (s[head + i] != s[tail - i])
          return false;
  }
  return true;
}

string longestPalindrome(string s) {
  int len = s.length();
  int max_len = 0;
  string max_str = "";
  for (int head = 0; head < len; ++head) {
      if (len - head < max_len) break;
      for (int tail = len - 1; tail >= 0; --tail) {
          if (tail - head + 1 < max_len) break;
          // check if it is a palindromic string
          if (isPalindromic(s, head, tail)) {
              if (max_len < tail - head + 1) {
                  max_len = tail - head + 1;
                  max_str = s.substr(head, tail - head + 1);
                  break;
              }
          }
      }
  }
  return max_str;
}
```

### 中间向两边地查找回文

```c++
int expandAroundCenter(string s, int left, int right) {
  while (left >= 0 && right < s.length() && s[left] == s[right]) {
    --left, ++right;
  }
  return right - left - 1;
}

string longestPalindrome(string s) {
  int len = s.length();
  int start = 0, end = 0;
  for (int i = 0; i < len; ++i) { // 遍历中间位置
    int len1 = expandAroundCenter(s, i, i); // 以字符为中间位置
    int len2 = expandAroundCenter(s, i, i + 1); // 以空隙为中间位置
    int len = len1 > len2 ? len1 : len2;
    if (len > end - start + 1) {
      start = i - (len - 1) / 2;
      end = i + len / 2;
    }
  }

  return s.substr(start, end - start + 1);
}
```