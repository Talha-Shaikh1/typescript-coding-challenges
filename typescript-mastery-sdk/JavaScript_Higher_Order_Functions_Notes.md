# JavaScript Higher-Order Functions (filter, map, reduce)

# 1. Function kya hota hai?

``` ts
function add(a:number,b:number){
  return a+b;
}
```

Function ek reusable block hai.

------------------------------------------------------------------------

# 2. JavaScript me function bhi value hota hai

``` ts
const myFunc = add;

console.log(myFunc(2,3)); // 5
```

Isliye function ko variable me store kar sakte hain aur dusre function
ko argument ke taur par pass kar sakte hain.

Is passed function ko **callback** kehte hain.

------------------------------------------------------------------------

# 3. Higher Order Function (HOF)

Jo function: - kisi function ko argument me le, ya - function return
kare

use Higher Order Function kehte hain.

`filter`, `map`, aur `reduce` Higher Order Functions hain.

------------------------------------------------------------------------

# 4. Apna filter banana

``` ts
function myFilter<T>(
  arr: T[],
  callback: (item: T) => boolean
): T[] {
  const result: T[] = [];

  for (const item of arr) {
    if (callback(item)) {
      result.push(item);
    }
  }

  return result;
}
```

## Line by line

### `<T>`

Generic. TypeScript ko bolte hain: "Mujhe type nahi pata. Call ke waqt
decide kar lena."

-   number\[\] =\> T = number
-   string\[\] =\> T = string
-   User\[\] =\> T = User

### `arr: T[]`

Input array.

### `callback: (item:T)=>boolean`

Callback har item check karega aur true/false dega.

### `const result=[]`

Naya array. Original array change nahi hota.

### `for...of`

Har item ek ek karke milta hai.

### `if(callback(item))`

Agar callback true de to item rakh lo.

### `result.push(item)`

Valid item save.

### `return result`

Final filtered array.

Example:

``` ts
const even = myFilter([1,2,3,4], n => n % 2 === 0);
// [2,4]
```

------------------------------------------------------------------------

# 5. Apna map banana

``` ts
function myMap<T,U>(
  arr:T[],
  callback:(item:T)=>U
):U[]{
  const result:U[]=[];

  for(const item of arr){
    result.push(callback(item));
  }

  return result;
}
```

Difference: - filter original item push karta hai. - map callback ka
result push karta hai.

Example:

``` ts
myMap([1,2,3], n=>n*2)
// [2,4,6]
```

------------------------------------------------------------------------

# 6. Apna reduce banana

``` ts
function myReduce<T>(
  arr:T[],
  callback:(acc:T,current:T)=>T,
  initial:T
):T{

  let accumulator=initial;

  for(const item of arr){
    accumulator=callback(accumulator,item);
  }

  return accumulator;
}
```

Accumulator ek temporary box hai.

Example:

``` ts
myReduce([1,2,3,4], (acc,n)=>acc+n,0)
```

Steps

0+1=1

1+2=3

3+3=6

6+4=10

Return = 10

------------------------------------------------------------------------

# 7. Visual Difference

filter

Array ↓

Condition

↓

True -\> Push

False -\> Skip

↓

New Array

map

Array

↓

Transform

↓

Always Push

↓

New Array

reduce

Array

↓

Combine

↓

Single Value

------------------------------------------------------------------------

# 8. Kya inke bina kaam ho sakta hai?

Bilkul.

Ye sirf readable aur reusable APIs hain.

Sab kuch for loop se likha ja sakta hai.

Filter:

``` ts
const result=[];

for(const item of arr){
  if(condition){
    result.push(item);
  }
}
```

Map:

``` ts
const result=[];

for(const item of arr){
  result.push(transform(item));
}
```

Reduce:

``` ts
let total=0;

for(const item of arr){
  total+=item;
}
```

# Rule

-   filter =\> select
-   map =\> transform
-   reduce =\> combine
