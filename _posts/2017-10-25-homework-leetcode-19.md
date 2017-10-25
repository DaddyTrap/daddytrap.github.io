---
layout: post
title: 作业_6 leetcode 19 Remove Nth Node From End of List
subtitle: 
author: DaddyTrap
date: 2017-10-25 13:29:31 +0800
categories: Algorithm Homework
---

## 题干

Given a linked list, remove the nth node from the end of list and return its head.

For example,

```plain
Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
```

**Note:**
Given n will always be valid.
Try to do this in one pass.

## 分析

删除倒数第n个节点

这个问题在曾经数据结构课上，老师就考过，基本思路就是使用两个指针，一个(记为s)用于 **探测** 链表的结束，一个(记为d)用于指向需要删除的节点。如要删除 [1,2,3,4] 中的倒数第二个节点，过程如下

```plain
1 2 3 4 N
^
ds

==> 拉开d s距离直到距离为2

1 2 3 4 N
^ ^
d s

==> 拉开d s距离直到距离为2

1 2 3 4 N
^   ^
d   s

==> 指针同时右推

1 2 3 4 N
  ^   ^
  d   s

==> 指针同时右推

1 2 3 4 N
    ^   ^
    d   s

探测指针指向NULL，搜索结束，d指向要删除的节点
```

但是难点就在于，**如何删除** 节点。在链表中删除某一节点，必须找到其前一个节点，那么讨论上面的例子，就应该拉开ds的距离直到距离为3，以使得d指针指向的是 **待删除节点的前一节点**。

但这里会再次出现难题，考虑删除[1,2]中的倒数第2个节点

```plain
1 2 N
^
ds

==> 拉开ds距离直到距离为3
==> ...

1 2 N ?
^     ^
```

最终会出现如上的情况，在C++中会造成访问NULL的next错误。

因此需要加入判断条件：**在拉开距离过程中，下一次拉开前，如果s指针指向空指针，则删除的是首节点**。恰好首节点需要特殊操作，在此将首节点指向原首节点的下一节点即可。

## 代码

```cpp
ListNode* removeNthFromEnd(ListNode* head, int n) {
    ListNode *pre_node = head, *post_node = head;
    for (int i = 0; i < n + 1; ++i) {
        if (!post_node) {
            head = head->next;
            return head;
        } else {
            post_node = post_node->next;
        }
    }
    while (post_node) {
        post_node = post_node->next;
        pre_node = pre_node->next;
    }
    if (pre_node->next == nullptr) return nullptr;
    pre_node->next = pre_node->next->next;
    return head;
}
```