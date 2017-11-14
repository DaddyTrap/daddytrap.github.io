---
layout: post
title: 作业_11 leetcode 25 Reverse Nodes in k-Group
subtitle: 
author: DaddyTrap
date: 2017-11-14 20:25:25 +0800
categories: Homework Algorithm
---

## 题干

Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.

k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes in the end should remain as it is.

You may not alter the values in the nodes, only nodes itself may be changed.

Only constant memory is allowed.

For example,
Given this linked list: `1->2->3->4->5`

For k = 2, you should return: `2->1->4->3->5`

For k = 3, you should return: `3->2->1->4->5`

## 分析

题目大意是 **以组** 翻转链表，如果不足长度则不翻转。

思路可以参考reverse整个链表，先考虑如何reverse整个链表，过程如下

```plain
A    B
1 -> 2 -> 3 -> 4 -> 5 -> NULL

---

B->next = A;
A B 同向后移动

A    B
1 <- 2    3 -> 4 -> 5 -> NULL

---

B->next = A;
A B 同向后移动(同上)

     A    B
1 <- 2 <- 3    4 -> 5 -> NULL

---

...(重复至B为NULL)
                    A    B
1 <- 2 <- 3 <- 4 <- 5    NULL

将原本的头的next指向NULL，将链表头指向A的位置

                            H
NULL <- 1 <- 2 <- 3 <- 4 <- 5
```

如此，就完成了对 **整个** 链表的reverse

如题目提示的 reverse in **group**，解题的过程可以转换为 **整个地** reverse各个 **group**，但有些许变化，详细如下

```
before -> 1 -> 2 -> 3 -> 4 -> 5 -> after
```

before->next将替换掉上面的 **原本的头指针** 的角色，after将替换掉上面的 **NULL** 的角色，即要使最后的链表变为

```
after <- 1 <- 2 <- 3 <- 4 <- 5 <- before
```

---

另一个问题是要使 **不足k长度的部分** 不变化，这可以通过先判断剩下的元素是否足够k长度，再进行reverse来实现

## 代码

代码将 **部分reverse** 和 **测试长度** 两个模块分离，在主要函数中的逻辑是

```python
while (当前组有k长度):
  reverse 该组
  当前组变为下一组
```

完整代码如下

```c++
ListNode** reverseList(ListNode** head, int n) {
  if (n <= 1) return &((*head)->next);
  ListNode *first = *head, *second = (*head)->next;
  while (n-- > 1) {
    ListNode *next_second = second->next;
    second->next = first;
    first = second;
    second = next_second;
  }
  (*head)->next = second;
  ListNode **ret = &((*head)->next);
  *head = first;
  return ret;
}

bool hasLength(ListNode *head, int len) {
  while (head && len != 0) {
    len--;
    head = head->next;
  }
  return len == 0;
}

ListNode* reverseKGroup(ListNode* head, int k) {
  if (!head) return head;
  ListNode **next_head = NULL;
  if (hasLength(head, k)) {
    next_head = reverseList(&head, k);
  }
  if (!next_head) return head;
  while (hasLength(*next_head, k)) {
    next_head = reverseList(next_head, k);
  }
  return head;
}
```