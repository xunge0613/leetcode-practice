---
title: "88. Merge Sorted Array (Easy)"
date: 2020-06-17T18:48:03+08:00
lastmod: 2020-06-18T11:24:00+08:00
draft: false
categories: ["题解"]
tags: ["leetcode","双指针"]
---

[LeetCode](https://leetcode.com/problems/merge-sorted-array/)

## 归并两个有序数组

## 统计

| 版本 | 耗时 | 超越 | 内存 | 超越 | 更新时间 |
| :--: | :--: | :--: |:--: |:--:  |:--: |
| v 1.0.0 | 148ms | 5.77% | 43.6MB | 5.01% | 2020年06月17日20:08:06 |
| v 1.1.0 | 64ms | 51.06% | 33.8MB | 80.80% | 2020年06月17日23:11:06 |

## 想法 v 1.0.0

### 核心逻辑

1. 双指针分别从第一位开始判断，3种情况：①不换 ②换+挪 ③只换
2. 情况2：从第 i 位起向后挪 m-i+j 个元素

### 特殊处理

情况3：当 nums2 的值大于 nums1 的最大值时，直接替换即可，不需要挪

### 调试记录

原先判断情况3的逻辑，因为太过相信题目案例，于是用 `nums1[i] === 0`，结果提交后发现本题的测试用例包含 `0`……

于是换了计算方式，为了判断 i 是否匹配完，记录 nums2[j] >= nums1[i] 的次数 `count`

### 测试数据

[1,2,3,0,0,0]
3
[2,5,6]
3

### AC 代码

2020年06月17日20:23:11

``` javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let i = 0;
    let j = 0;
    let count = 0; // 记录 nums2[j] >= nums1[i] 的次数，为了判断 i 是否匹配完
    while (i<(m+n) && j<n) {
        if(count>=m) {
            // 原 nums1 匹配完之后，直接放上去
            nums1[i] = nums2[j];
            i++;
            j++;
            continue;
        }
        if(nums2[j] >= nums1[i]) {
            i++;
            count++;
            continue;
        }
        if(nums2[j] < nums1[i]) {
            // 核心是计算出移多少步：m - i + j
            nums1 = update(nums1,nums2[j],m,i,j)
            i++;
            j++;
             continue;
        }
    }
};

/**
 * 从第 i 位起向后挪 m-i+j 个元素
 * @param {number[]} nums1
 * @param {number} start index to replace
 * @return {nums1}
 */
var update = function(nums1,value,m,i,j) {
    // 从最后一位开始移，移到第 i+1 位为止（即把 i 放到 i+1的位置上）
    // 好处：这样就可以不用临时变量了
    console.log(nums1,value,m,i,j)
    var k = m + j;
    while(k>i) {
        nums1[k] = nums1[k-1];
        k--;
    }
    // 移动完之后替换 k[i]
    nums1[i] = value;
    return nums1;
}

```

## 想法 v 1.1.0

回家路上，对速度只超过 5% 有点怨念，又突然想到自己在 v 1.0.0 版本里 `update()` 时，为了不用临时变量，**从最后一位开始移**，所以想到我从一开始，是不是也可以从后面开始匹配？

### 核心逻辑

双指针分别从两个数组最末位开始判断，大的那个放在新数组最末位，依次往前

### 特殊处理

如果一个数组先匹配完，余下的值都由另一个数组填充，

即，此时 `nums1` 的 `i` 索引变为了 `-1`，余下全部的 `new_array[k]` = `nums2[j]`

### 测试数据

[1,2,3,0,0,0]
3
[2,5,6]
3

[2,0]
1
[1]
1

[0]
0
[1]
1

[0,0,3,0,0,0,0,0,0]
3
[-1,1,1,1,2,3]
6

[1,2,3,0,0,0]
3
[2,5,6]
3

### AC 代码

``` javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let k = m + n - 1; // 已知新数组的长度 m+n, 从最末尾开始放新数据
    let i = m - 1;
    let j = n - 1;

    if(k === 0) {
        nums1[0] = nums1[0] || nums2[0];
    }

    while (k>=0) {
      // k 表示的是新数组下标，所以需要包含0，
        // console.log(k,i,j,nums1)
        // console.log(nums1[i], nums2[j])
        // 需要提前判断 undefined，否则正常流程用 else 会有异常
        if(typeof nums2[j] === "undefined") {
          // j 已匹配完
            nums1[k] = nums1[i];
            i--;
            k--;
            continue;
        }
        if(typeof nums1[i] === "undefined") {
          // i 已匹配完
            nums1[k] = nums2[j];
            j--;
            k--;
            continue;
        }

        if(nums1[i] >= nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else  {
            nums1[k] = nums2[j];
            j--;
        }
        k--;
    }
};

```
