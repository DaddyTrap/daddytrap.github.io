---
layout: post
title:
subtitle:
author: DaddyTrap
date: 2018-06-29 15:48:39 +0800
categories: Homework SAD
---

## 使用 ECB 实现 make reservation 用例的详细设计（包含用例简介，顺序图，类图）

### 用例简介

+ 根据城市搜索酒店
+ 填写预订酒店的信息
+ 确认“购物车内容”
+ 支付账单

![](/assets/sad-9/use-cases.png)

### 顺序图

![](/assets/sad-9/sequence.png)

### 类图

![](/assets/sad-9/class.png)

## 将逻辑设计类图映射到实际项目框架的包图。用树形结构表述表现的包和类

+ Project
	+ static
	+ module
		+ boundary
			+ UI.js
			+ payment-interface.js
		+ control
			+ system-control.js
		+ entity
			+ hotel.js
			+ room.js
			+ user.js
			+ order.js
	+ index.js