---
title: " 345. Reverse Vowels of a String (Easy)"
date: 2020-06-14T19:43:03+08:00
lastmod: 2020-06-18T11:24:00+08:00
draft: false
categories: ["题解"]
tags: ["leetcode","双指针"]
toc: 
  enable: true
  auto: true
---

[LeetCode](https://leetcode.com/problems/reverse-vowels-of-a-string/)

## 反转字符串中的元音字符

## 想法

### 核心逻辑

1. 用 `hash` 来记录元音字符并判断，o(1)复杂度 #优化
2. js 没办法直接替换字符.. 所以只好用一个数组来存，可能会有时间和空间上额外开销

### 特殊处理

题目有毒或者说自己没考虑周全 —— 要考虑**大写字母**的情况…… 淦……

## AC 代码

### v 1.0.0

2020年06月14日

``` javascript
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
    let i = 0;
    let j = s.length - 1;
    const vowelHash = {
      'a': true,
      'e': true,
      'i': true,
      'o': true,
      'u': true,
      'A': true,
      'E': true,
      'I': true,
      'O': true,
      'U': true
    }
    const result = [];
    while(i<=j) {
        if(!isVowel(s[i])) {
            result[i] = s[i];
            i++;
            continue;
        }
        if(!isVowel(s[j])) {
            result[j] = s[j];
            j--;
            continue;
        }
        result[i] = s[j];
        result[j] = s[i];
        i++;
        j--;
    }
    return result.join('');
    function isVowel (s) {
        return vowelHash[s];
    }
};

```
