// simulate sleep of main thread (JS Event Loop)
function sleep(seconds: number) 
{
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

console.log(`call setTimeout ${new Date().toLocaleTimeString()}`)
// set timeout for 1 second
setTimeout(() => {
    console.log(`done setTimeout ${new Date().toLocaleTimeString()}`)
  }
  , 1000)

console.log(`call sleep ${new Date().toLocaleTimeString()}`)
// sleep for 3 seconds
sleep(3)
console.log(`done sleep ${new Date().toLocaleTimeString()}`)

/* --- Output ----
call setTimeout 10:45:54s
call sleep 10:45:54
done sleep 10:45:57
done setTimeout 10:45:57 --> takes 3 seconds instead of 1

>> We see that setTimeout takes 3 seconds to fulfill rather than 1
second passed in. 
>> The main Event-Loop will not pop from 'MacroTask event-queues' 
(such as timer APIs, I/O APIs) till the call stack is empty.  
  -> if even-loop is busy then asychrounous callbacks will have
  to wait
  -> avoid blocking operations in the main code, implement 
  everything as asynchrnous operations

  Aside* - the 'NextTick Queue' and 'Microtasks Queue' are
  the only queues in between the loop!!
*/


// === Precedence of 'MicroTask Q' and 'MacroTask Q' ===
console.log('1) Sync - 1')

setTimeout(() => console.log('2) Timeout - callback'), 0);

Promise.resolve().then(() => console.log('3) Promise - resolve'))

console.log('4) Sync - 2')

/* --- output ----
1) Sync - 1
4) Sync - 2
3) Promise - resolve --> {Promise on 'MicroTask Q' takes precedence}
2) Timeout - callback --> {Timeout on 'MacroTask Q'}
*/