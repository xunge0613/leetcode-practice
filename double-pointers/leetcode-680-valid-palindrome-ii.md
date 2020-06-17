# 680. Valid Palindrome II (Easy)

[LeetCode](https://leetcode.com/problems/valid-palindrome-ii/)

## 想法

1. 判断回文，即判断位置 i 与 length - i 的值是否相等
2. 题目条件支持删除一次，即需要判断左删一次与右删一次的情况
3. 如果左删失败，要尝试进行右删（需要读档点或递归调用）

## 记录

`"lcupuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupucul"`

这个测试用例失败了好几次，因一开始太长，看着太混乱，所以缩小了下，

`"lcupuufxoohdfpggpfdhooxfuupucul"`

然后手动模拟，发现存在一个点同时能够左删和右删，且左删不是回文，右删才是。

说明自己考虑这个问题的时候没有考虑全面

## 测试数据

"abc"
"aaa"
"abba"
"abcba"
"aaaaabbbbbaaaaab"
"lcupuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupucul"

## AC 代码 v 1.0.0

``` javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    let i = 0;
    let j = s.length - 1;
    let canDelete = true;
    let savePoint = [];
    // 当一个点同时满足左删右删，则记录这个点的信息，即读档点
    // 因题目告知只能删一次，所以读档点也只会有一个
    while(i<=j) {
        if(s[i] !== s[j]) {
            if(savePoint.length !== 0) {
                i = savePoint[0];
                j = savePoint[1];
                savePoint = [];
                continue;
            }
            if(!canDelete) {
               return false;
            }
            canDelete = false;
            // 记录读档点
            if(s[i+1] === s[j] && s[j-1] === s[i]) {
                // 默认从左边尝试，所以读档点总是在右边
                savePoint = [i+1, j-2];
            }
            if(s[i+1] === s[j] ) {
                // 优先尝试删除左边
                i = i + 2;
                j--;
                continue;
            }
            if(s[j-1] === s[i] ) {
                // 左边不满足，尝试删除右边
                j = j-2;
                i++;
                continue;
            }
            // 尝试失败
            return false;
        }
        if(i === j) {
            // 奇数最后相遇时
            return true;
        }
        i++;
        j--;
    }
    // 偶数情况，i>j，返回true
    return true;
};


```
