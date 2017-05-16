// https://leetcode.com/problems/single-number/#/description

// https://jsfiddle.net/xunge0613/tn275kzk/

/**
 * @param {number[]} nums
 * @return {number}
 */

// v 0.0.1  95ms [1]
// result : Wrong Answer
// 613,1991 
// => 13
// 61991
var singleNumber = function(nums) {
    var num = ''
    for(var i = 0;i<nums.length;i++) {
    	console.log('start',num,nums[i])
    	if(num.indexOf(nums[i] + ',') !== -1) {     
      	num = num.replace(nums[i] + ',','')
      } else {
      	num += (nums[i] + ',');
      }     
    	console.log('end',num,nums[i])  
    }
    
    return parseInt(num.replace(',',''))
};






// v 0.0.2 95ms [1]
// result : Time Limit
var singleNumber = function(nums) {
    var num = ','
    for(var i = 0;i<nums.length;i++) {
      console.log('start',num,nums[i])
      if(num.indexOf(',' + nums[i] + ',') !== -1) {     
        num = num.replace(',' + nums[i] + ',',',')
      } else {
        num += (nums[i] + ',');
      }     
      console.log('end',num,nums[i])  
    }
    
    return parseInt(num.replace(',',''))
};





console.log(singleNumber([1,2,3,4,2,3,4]))

// v 0.0.3 https://leetcode.com/submissions/detail/103108288/
// coding time: 2017/5/17 00:45 - 01:01
// [1] Runtime: 105 ms
// result : Accepted
// Runtime: 138 ms, beat 21%


var singleNumber = function(nums) {
    nums = nums.sort()
    for(var i = 0;i<nums.length;i+=2) {
      // 1,1,2,2,3,4,4
      // 1,2,2,3,3,4,4
      if(nums[i] !== nums[i+1]) {
        return nums[i]
      }
      // 1,1,2,2,3,3,4
      if(i === (nums.length - 1)) {
        return nums[i]
      }
    }
    
    return num
};

/*
其他想法，未实现
Plan A
1,2,3,4,1,2,3,4,5
2(1+2+3+4)+5
2*A+B

B = Sum - 2*A


Plan B
var list = {
  1: false, // 1,2,3,4,5,5,7
  2: false,
  3: false,
  4: false,
  5: true,
  7: false,
}

*/

