// an account class
class Account {
    constructor(readonly accountNum: string
      , private _amount: number = 0) { }
  
    get amount(): number{
      return this._amount;
    }
  
    set amount(value: number) {
      if (value < 0) {
        throw new Error(`amount has to be greater than 0!`);
      }
      else {
        this._amount = value;
      }
    }
    // debug details
    debugInfo() {
      return `AccNum = ${this.accountNum}, Amount = ${this._amount}`;
    }
  }
  
  // construct function - represents meta-type
  type ConstructFunc<T> = new (...args: any[]) => T
  
  // 'mixin' function to add 'debug()' method
  // 'C' is a type that represents a type - meta-type
  function MixinDebug<C extends ConstructFunc<{debugInfo(): void}>>(Class: C) {
  //function MixinDebug(Class: ConstructFunc) {
    return class extends Class{
      debug() {
        console.log(this.debugInfo());
      }
    }
  }
  
  const DebugAccount = MixinDebug(Account);
  const myAcc = new DebugAccount('US98760XX', 100);
  
  myAcc.debug();