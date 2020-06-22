 
[LeetCode](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

## 有序数组的 Two Sum

## 想法

双指针，遇到异常情况改变其中一个指针；

异常：和小于小的 - 小的+1，大于大的 - 大的-1

正解：相等

## AC 代码

### v 1.0.0

2020年06月12日

``` javascript
/**
 * 167. Two Sum II - Input array is sorted (Easy)
 */
function twoSum(numbers: number[], target: number): number[] {
    let i = 0;
    let j = numbers.length - 1;
    while(i<j) {
        if(numbers[i] + numbers[j] < target) {
            i++;
            continue;
        }
        if(numbers[i] + numbers[j] > target) {
            j--;
            continue;
        }
        return [i+1,j+1]
    }
    return [i+1,j+1];
};


```
