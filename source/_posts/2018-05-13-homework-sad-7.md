---
layout: post
title: 系统分析与设计 第七次作业(lesson9)
subtitle:
author: DaddyTrap
date: 2018-05-13 21:47:27 +0800
categories: Homework SAD
---

## 问题

选择一个 App 进行建模

此处选用 [Tiny Hippo](https://github.com/rookies-sysu) 小组的题目， [Google Translate](https://github.com/rookies-sysu/Dashboard/blob/master/docs/XX1-Google%E7%BF%BB%E8%AF%91%E5%BA%94%E7%94%A8.md)

<!-- more -->

### 用例图

![](/assets/sad-7/use-case.png)

### 领域模型

由于对翻译类/词典类 App 的数据库设计并不熟悉，因此只能半查半猜

此处 `language` 表中，`used_in` 字段是因为观察到在不同场景可用的语言不同，可以猜测，某个语言的使用场景是有限的，可以在该字段中记录

`vocabulary` 表的设计是，将所有语言的词汇都放在同一个表中，由 `language_id` 标志其语言 (可在 `language_id` 上建立索引提高性能)

`translation` 表的设计是，一个 vocabulary 的 id，对应另一个 vocabulary 的 id，以此形成 “翻译” 的关系

`search_history` 表只需记录 vocabulary 的 id即可

![](/assets/sad-7/domain.png)

### 状态建模

![](/assets/sad-7/state.png)

### 活动图

![](/assets/sad-7/activity.png)

### 顺序图

![](/assets/sad-7/sequence.png)
