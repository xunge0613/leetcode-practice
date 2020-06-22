---
title: "141. Linked List Cycle (Easy)"
date: 2020-06-18T20:00:03+08:00
lastmod: 2020-06-18T20:00:03+08:00
draft: false
categories: ["题解"]
tags: ["leetcode","双指针"]

---

[LeetCode](https://leetcode.com/problems/linked-list-cycle/)

## 判断链表是否存在环

## 题目描述

想象是2个人在玩大富翁游戏/环形跑道，快的一次走2格，慢的一次1格

- 如果地图完整有环，那么快的那个一定会再次相遇（eg: 如果是闭合的环，套慢的那个一圈）
- 如果地图没有环，那么快的就会先一步跑到终点结束，不会相遇

## 统计

| 版本 | 耗时 | 超越 | 内存 | 超越 | 更新时间 |
| :--: | :--: | :--: |:--: |:--:  |:--: |
| v 1.0.0 | 76ms | 46.04% | 38.6MB | 16.25% | 2020年06月18日20:03:09 |

## 想法 v 1.0.0

### 核心逻辑

使用双指针，同时从起点出发，快的指针一次走**2**步，慢的指针一次走**1**步

- 如果链表没有环，那么两者不会相遇，当快的指针无路可走，指向 `null` 时， `while` 循环结束，返回 `false`
- 如果链表有环，两者会再次相遇（快的“追上”慢的）

### 复杂度分析

#### 时间复杂度

- 无环的情况，快的会跑 `长度/2` 次， `O(n)` 级
- 有环的情况
  - 如果像跑道那样完整的环，快的会跑`环长度`次（2圈），在起点套慢的一圈， `O(n)`
  - 如果环非闭合，那么快的`差不多`跑`环长度`次（大于该数）  + `非环长度`次（等慢的赶上来），复杂度大于 `O(n)`，但差不多可看做 `O(n)` 级别

#### 空间复杂度

因为只用了 2 个临时变量，所以是 `O(1)`级别

## 测试数据

[3,2,0,-4]
1

## AC 代码

2020年06月18日20:03:09

``` javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // 想象是2个人在玩大富翁游戏/环形跑道，快的一次走2格，慢的一次1格，
    // 如果地图完整有环，那么快的那个一定会再次相遇（eg: 如果是闭合的环，套慢的那个一圈）
    // console.log(head)
    if(!(head && head.next && head.next.next)) {
        // 异常处理，保证 while 循环的第一步移动有效（fast = fast.next.next）
        return false;
    }
    // 初始化双指针
    let fast = head;
    let slow = head;
    while (fast.next.next !== slow.next) {
        fast = fast.next.next;
        slow = slow.next;
        if(!(fast && fast.next && fast.next.next)) {
            return false;
        }
    }
    return true;
};


```
