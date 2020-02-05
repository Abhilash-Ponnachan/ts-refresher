const log = (() => {
    const strt = Date.now()
    return (msg: any) => {
      console.log(`${msg} - @ : ${Date.now() - strt}`)
    }
  })()
  
  
  function sleep(ms: number) {
    const end = new Date().getTime() + ms
    while (new Date().getTime() < end) { }
  }
  
  function longCalc(x: number) : number {
    sleep(2000)
    return 2 * x
  }
  
  function longCalcPromise(x: number): Promise<number>{
    return new Promise((resolve, reject) => {
      //sleep(2000)
      Promise.resolve().then(() => {
        sleep(2000)
        resolve(x * 2)
      })
      /*
      Functions passed to 'then()' are executed asynchronously,
      even for resolved promises. They are put on the 
      'microtask queue', which are inspected at popped at
      the end of the 'event-loop'
  
      So this is one way to wrap synchronous APIs as 
      asynchronous ones.
      */
      //resolve(x * 2)
    }
  }
  
  log('start')
  
  // const rslt = longCalc(23)
  // log(rslt)
  
  const rslt = longCalcPromise(23)
  rslt
    .then(n => log(n))
  
  log('end')