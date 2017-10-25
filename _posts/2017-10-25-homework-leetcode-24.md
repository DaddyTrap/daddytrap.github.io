---
layout: post
title: 作业_8 leetcode 24 Swap Nodes in Pairs
subtitle:
author: DaddyTrap
date: 2017-10-25 17:22:53 +0800
categories: Algorithm Homework
---

## 题干

Given a linked list, swap every two adjacent nodes and return its head.

For example,
Given `1->2->3->4`, you should return the list as `2->1->4->3`.

Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed.

## 分析

交换相邻节点，且不允许直接交换值。 (不允许直接交换值是有意义的，因为值可能是一个占用很大内存的对象)

这道题主要在于对整个交换过程的理解，定义每一对的前一个叫 `first`、后一个叫 `second`，其他定义如下，并展示过程

```plain
... -> first_prev -> first -> second -> second_next -> ...

// 过程如下
// first_prev->next = second;
... -> first_prev -> second ->second_next -> ...
              first -^

// second->next = first;
                             first
... -> first_prev -> second -^     second_next -> ...

// first->next = second_next;
... -> first_prev -> second -> first -> second_next -> ...
```

如此，first和second的位置就交换了，下面只需要考虑临界条件

对于first就是head，它就没有first_prev，而此时的 `first_prev->next = second` 需改为 `head = second`

对于奇数个元素的序列，对最后的元素不进行交换。只需要判断每次获取到的 `first` 和 `second` 是否都不是空指针再操作即可。

对于空序列，先判断head是否为空指针即可。

## 代码

```cpp
ListNode* swapPairs(ListNode* head) {
    if (head == nullptr  || head->next == nullptr) return head;
    ListNode *first = head, *second = head->next;
    ListNode *first_prev = nullptr, *first_next_next = second->next;

    head = second; // first_prev->next = second
    second->next = first;
    first->next = first_next_next;

    while (first->next) {
        first_prev = first;
        first = first->next;
        second = first->next;
        if (!second) break;
        first_next_next = second->next;

        first_prev->next = second;
        second->next = first;
        first->next = first_next_next;
    }

    return head;
}
```