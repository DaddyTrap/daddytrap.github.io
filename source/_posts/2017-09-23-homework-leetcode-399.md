---
layout: post
title: 作业_4 leetcode 399 Evaluate Division
author: DaddyTrap
date: 2017-09-23 00:32:17 +0800
categories: Algorithm Homework
---

## 题干

Equations are given in the format `A / B = k`, where `A` and `B` are variables represented as strings, and `k` is a real number (floating point number). Given some queries, return the answers. If the answer does not exist, return `-1.0`.

Example:
Given `a / b = 2.0, b / c = 3.0. `
queries are: `a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? . `
return `[6.0, 0.5, -1.0, 1.0, -1.0 ].`

The input is: `vector<pair<string, string>> equations, vector<double>& values, vector<pair<string, string>> queries` , where `equations.size() == values.size()`, and the values are positive. This represents the equations. Return `vector<double>`.

According to the example above:

```
equations = [ ["a", "b"], ["b", "c"] ],
values = [2.0, 3.0],
queries = [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ].
```

The input is always valid. You may assume that evaluating the queries will result in no division by zero and there is no contradiction.

<!-- more -->

## 分析

题目意思大概是给出 `a/b=2.0, b/c=3.0` 这样的算式，要求求出 `a/c` 这样的式子的结果，如果不能得出，就返回 `-1.0`

如果直接给出一道这样的题，我可能会感觉没有思路，但是我是从 **Graph** 的标签点进来的，所以自然就想到用 **图** 来解决。从 `a/b=2.0, b/c=3.0` 建出关系

```
a ---> b ---> c
  2.0    3.0
```

当计算 `a/c` 时，则从a开始搜索，直到搜索到c，将搜索路径上边的值相乘，就得到了结果，即 `a/c=(a/b)*(b/c)=2.0*3.0=6.0`

思路上比较简单

1. 建出图结构，但要建出双向的关系，即对于关系 `a/b=2.0` ，需要建出下图关系
  ```
        2.0    3.0
        --->   --->
      a      b      c
        <---   <---
        0.5    0.333
  ```

2. 使用DFS查询关系，如对于 `a/c=?` ，先找到节点 `a` 的位置，然后对其进行DFS，直到遇到查询中的另一节点 `c` ，返回路径上的边的值的乘积

---

思路是简单，但是实现的时候要注意一些问题，比如DFS不能 “回头”，这一点需要在代码中作出判断，因此递归中还传递了一个 `Node *last_node` 的参数

而图的构造使用的Node声明，由一个节点名和一个表示有向边的next数组组成

具体代码如下

## 代码

```c++
struct Node {
  string name;
  vector<pair<Node*, double>> next;
  Node(string t_name, vector<pair<Node*, double>> t_next = {}) : name(t_name), next(t_next) {}
};

double dfs(Node *node, string target, double ret = 1.0, Node *last_node = NULL) {
  if (node->name == target) return ret;
  if (node->next.empty()) return -1.0;
  for (auto &i : node->next) {
    if (i.first == last_node) continue;
    double temp = 0.0;
    temp = dfs(i.first, target, ret * i.second, node);
    if (temp != -1.0f) return temp;
  }
  return -1.0f;
}

vector<double> calcEquation(vector<pair<string, string>> equations, vector<double>& values, vector<pair<string, string>> queries) {
  map<string, Node*> name_to_node;

  // build relation
  int n = equations.size();
  for (int i = 0; i < n; ++i) {
    if (name_to_node.find(equations[i].first) == name_to_node.end()) name_to_node[equations[i].first] = new Node(equations[i].first);
    if (name_to_node.find(equations[i].second) == name_to_node.end()) name_to_node[equations[i].second] = new Node(equations[i].second);

    (name_to_node[equations[i].first]->next).push_back(make_pair(name_to_node[equations[i].second], values[i]));
    (name_to_node[equations[i].second]->next).push_back(make_pair(name_to_node[equations[i].first], 1.0 / values[i]));
  }

  // cal queries
  vector<double> ret;
  for (auto query : queries) {
    if (name_to_node.find(query.first) == name_to_node.end() || name_to_node.find(query.second) == name_to_node.end()) {
      ret.push_back(-1.0);
      continue;
    }

    ret.push_back(dfs(name_to_node[query.first], query.second));
  }

  // clear
  for (auto val : name_to_node) {
    delete val.second;
  }

  return ret;
}
```