---
title: "524. Longest Word in Dictionary through Deleting (Medium)"
date: 2020-06-19T00:58:03+08:00
lastmod: 2020-06-19T00:58:03+08:00
draft: false
categories: ["题解"]
tags: ["leetcode","双指针"]

---

[LeetCode](https://leetcode.com/problems/longest-word-in-dictionary-through-deleting/)

## 最长子序列

## 题目描述

给定字符串 `s`，给定数组 `d`，判断数组 `d` 中的元素 `d[j]` 是否是 `s` 的子序列（`s.includes(d[j])`），如果存在，找出`最长的那个`

## 统计

| 版本 | 耗时 | 超越 | 内存 | 超越 | 更新时间 |
| :--: | :--: | :--: |:--: |:--:  |:--: |
| v 1.0.0 | 76ms | 95.45% | 43.1MB | 9.52% | 2020年06月19日00:58:03 |

## 想法 v 1.0.0

因为题目入参是一个数组，所以会有嵌套循环，所以抽离出判断是否是子序列的逻辑，可以让代码整洁一些

### 核心逻辑

#### 判断是否是子序列

双指针，一个指针 `i` 指向 `s` 开头，一个指针 `j` 指向 `d` 开头，**统计双指针相等的次数**，假设 `d` 是子序列，则相等的次数必定等于 `d` 自身的长度。

- 如果 `s[i] !==  d[j]`，判断下一个 `s[i]`，而 `d[j]` 不变 —— `i++`
- 如果 `s[i] ===  d[j]`，判断下一个 `s[i]` 和 `d[j]` —— `i++; j++;`

此时的 `j` 即用于统计双指针相等的次数。

#### 判断两个字符串字典序大小

> If there are more than one possible results, return the longest word with the smallest lexicographical order.

题目中有这么一个坑，在最后输出结果的时候，如果有多个长度相同字符串，输出`字典序最小`的那个，代码里我用的是网上搜到的内置方法 `d[index].localeCompare(longestWord) === -1)`，`-1` 表示小。

### 复杂度分析

#### 时间复杂度

- 判断是否是子序列，每次只遍历了一次字符串 `d`，`O(n)` 复杂度
- 判断两个字符串字典序大小，…………，掉用内置的方法，理论上应该也是 `O(n)` 的复杂度

#### 空间复杂度

使用了 `longestWord` 变量 `O(1)`，以及循环内部双指针 `i`、`j`，现在看起来似乎是每次循环都会生成一次，所以是 `O(d.length)` ？

## 测试数据

## AC 代码

2020年06月18日20:03:09

``` javascript
/**
 * @param {string} s
 * @param {string[]} d
 * @return {string}
 */
var findLongestWord = function(s, d) {
    let longestWord = '';
    for (var index = 0;index< d.length; index++) {
        // 非子序列
        if(!isSubstring(s,d[index])) {
            continue;
        }
        // 是子序列且长度大于之前的，或者长度相同时字典序靠前
        if(d[index].length > longestWord.length 
           || (d[index].length === longestWord.length) && d[index].localeCompare(longestWord) === -1)  {
            // 按字典序对比
            longestWord = d[index];
        }
    }
    return longestWord;
};

/**
 * 判断是否是子序列
 * @params string s “母”字符串
 * @params string d 候选字符串
 * @returns boolean 是否是子序列
 * 原理：双指针，相等时 j++，最终如果 j === d.length，则是子序列
 */
var isSubstring = function(s,d) {
    if(s.length < d.length) {
        return false;
    }
    var i = 0;
    var j = 0;
    while (i<s.length && j<d.length) {
        if(s[i] === d[j]) {
            j++;
        }  
        i++;
    }
    // console.log(i,j)
    return j === d.length;
}


```

## 体会

双指针系列第一道 `Medium` 难度的题目，尝试着自己写了一些代码，但发现写到后面看着代码越来越臃肿，没有信心继续写下去了（耗时 10 分钟左右）。于是求助了答案。

看了答案之后，发现整体逻辑和自己想象的逻辑差不多，在判断是否是子序列的逻辑上，答案的实现很`轻巧`。
