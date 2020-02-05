// Maybe - Monad
abstract class Maybe<T>{
    private static _none: None
  
    abstract valueOrDefault(defaultVal: T): T
    abstract map<U>(transform: (value: T) => U): Maybe<U>
    // declare flatMap
    abstract flatMap<U>(transform: (value: T) => Maybe<U>): Maybe<U>
  
    static get None(): None{
      if (Maybe._none == null) {
        Maybe._none = new None()
      }
      return Maybe._none
    }
  
    static fromValue<U>(value: U | null | undefined): Maybe<U>{
      if (value == null) {
        return Maybe.None
      }
      return new Some(value)
    }
  }
  
  // Subtype None of Maybe
  class None extends Maybe<never>{
    valueOrDefault(defaultVal: never): never{
      return defaultVal
    }
    
    map<U>(transform: (value: never) => U): Maybe<U> {
      return this
    }
  
    flatMap<U>(transform: (value: never) => Maybe<U>): Maybe<U> {
      return this
    }
  }
  
  // Subtype Some value of Maybe
  class Some<T> extends Maybe<T>{
    constructor(private readonly _value: T) {
      super()
    }
  
    valueOrDefault(defaultVal: T): T {
      return this._value != null ? this._value : defaultVal
    }
  
    map<U>(transform: (value: T) => U): Maybe<U> {
      return Maybe.fromValue(transform(this._value))
    }
  
    flatMap<U>(transform: (value: T) => Maybe<U>): Maybe<U> {
      // need to check for null
      return (transform(this._value))
    }
  }
  
  // decalre employee type
  class Employee{
    constructor(readonly Id: number
      , public name: string
      , public managerId?: number) { }
  }
  // declare an employee repository
  class EmpRepository{
    private readonly _emps = [
      new Employee(1001, 'Alan'),
      new Employee(1002, 'Bob', 1001),
      new Employee(1003, 'Cathy', 1001),
      new Employee(1004, 'Diana', 1002),
      new Employee(1005, 'Edwin', 1003),
      new Employee(1006, 'Fed', 1003),
    ]
  
    findByid(id: number) {
      const match = this._emps.filter(emp => emp.Id === id)
      return match.length ? match[0] : null
    }
  }
  
  // read an Input value
  function read() {
    return Maybe.fromValue(prompt('Enter employee Id.'))
  }
  
  // convert to number for empId
  function toId(text: string) {
    const val = parseInt(text)
    if (Number.isNaN(val)) {
      return Maybe.None
    }
    return Maybe.fromValue(val)
  }
  
  //const rslt = read().map(toId)
  const rslt = read().flatMap(toId)
  
  console.log(rslt)
  
  
  // find Employee with thaat empId
  // get manager for that emp
  // get manager's name