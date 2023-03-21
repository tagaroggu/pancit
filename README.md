# pancit
Experimental javascript signals library with slightly different style.

## Note
This is just experimental, may or may not leak memory in its implementation, I don't know. 

## Installation
```bash
npm install tagaroggu/pancit # or pnpm, yarn, etc
```

## Example
```js
import { signal, computed, effect } from 'pancit'

const count = signal(0)

// To get the value, call the signal without a value
const squared = computed(() => { return count() * count() })

const logger = effect(() => { console.log(squared()) }) // 0

// To update the signal's value, call with a new value
count(1) // 1
count(2) // 4
count(3) // 9

// To stop an effect, call the returned function
logger()

count(4) // Does not log 16

// TO stop a computed signal, call the stop method
squared.stop() // Value will stop updating

```