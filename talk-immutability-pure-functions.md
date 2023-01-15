
---
author: Malte Neuss
title: Immutability & Pure Functions
# revealjs
# https://github.com/jgm/pandoc-templates/blob/master/default.revealjs
theme: sky
transition: none
slideNumber: true
---

## Reasoning about code

```python
def main()
  prices = [5,2,7]
  # assert prices[0] == 5
```

. . .

```python
  minPrice = minimum(prices)
  # assert  minPrice == 2
```

. . .

```python
  # assert prices[0] == 5                     # Correct?
```

. . .

```python
def minimum(values)
   values.sort()                              # surprise
   return values[0]

```

## Content 

::: incremental

* Immutability
* Pure Functions
* OO vs FP Styles
* Reasoning 
* Referential Transparency

:::

. . .

> *Easier reasoning, less invalid state*

## Immutability

No mutation:

```python
def minimum(values)
   # values.sort()                            # mutation
   other = sorted(values)                     # no mutation
   return other[0]

```

. . .

No reassign:

```python
  value = 1                                   # Assign
# value = 2                                   # Reassign
  other = 2
```

## Reasoning

```python
def minimum(values)
   # values.sort()                            # surprise
   other = sorted(values)                     # no surprise
   return other[0]
```

. . .

```python
def main()
  prices = [5,2,7]                            # If immutable,       
  # assert prices[0] == 5                     
  minPrice = minimum(prices)
  # assert prices[0] == 5                     # Guaranteed     
```

## Type Checker Support

> *Make illegal state (more) unrepresentable*

## Immutable Built-in Classes

Immutable interface:

```python
mySet = frozenset([1, 2, 3])                  # Python
mySet.add(4)                                  # type error
```

. . .

Copy on change:

```scala
val myList = immutable.List(1, 2, 3)          // Scala
val other  = myList.appended(4)               // other list
```


## Immutable Custom Classes

Immutable interface around mutable data:

```python
class MyClass:                                
   _value: int                                # hide mutables
   
   def getValue()                             # no setters
     return _value
   
   def calcSth()                              # _value read only
     return _value*2
   
   def incremented()                          # Copy on change
     return MyClass(_value+1)
```

## Immutable Custom Classes

With extra language support:

```python
@dataclass(frozen=True)                       # Python
class MyClass:
   value: int
   
object       = MyClass(1)
object.value = 2                              # compile error!
```

. . .

```typescript
interface MyInterface {                       // Typescript
  readonly value: int;
}
```

## Immutable Variables

Mutable:

```typescript
var value = 1                                 // Typescript
value = 2                                     // ok
```

. . .

Immutable:

```typescript
const value = 1                               // Typescript
value = 2                                     // type error!
```


## Pure Functions

$$
\begin{align*}
f\colon \mathbb{R} &\to \mathbb{R} \qquad &\text{Type} \\
f(x)    &= x + \pi                  \qquad &\text{Body}
\end{align*}
$$

. . .

```python
def f(x: float) -> float:                     # Type
   return x + math.pi                         # Body
```

::: incremental

* Same input, same output
* No side-effects
* External immutable values or constants ok

:::


## Side-Effect


::: incremental

* File read call
* File write call
* Network call
* I/O call
* Throwing exception
* (Observable) mutation
* ...

:::

. . .

> *Every state change outside of function*

```python
def f(x: float) -> float
```

## Effect: Global Mutation

```python
prices                                        # Global variable

def minPrice()                                
   prices.sort()                              # Mutation
   return prices[0]
```

. . .

```python
prices = [5,2,7]                              # Init variable
# assert prices[0] == 5
```
. . .

```python
x = minPrice()                                # Hidden mutation
# assert prices[0] == 5                       # No
```

## Effect: Class Mutation

```python
class MyClass
  prices                                      # Class variable

  def minPrice()                                
    this.prices.sort()                        # Hidden mutation
    return this.prices[0]                         
```

. . .

```python
object = MyClass([5,2,7])                     # Init variable
# assert object.prices[0] == 5
```

. . .

```python
x = object.minPrice()                         # Hidden mutation
# assert object.prices[0] == 5                # No
```

## OO Impure Style

```python
class MyClass
  state=ComplexState()                        # 100s variables

  def do() -> None                            # Announced mutation 
    state.change()                            # Mutation
    state.change_more()                       # Mutation
    this._do()                                # Mutation
  
  def _do()                                   # Impure
    state.change_even_more()                  # Mutation
```

. . .

```python
object = MyClass()                            # Init variable
# assert object.state == ComplexState()
```

. . .

```python
object.do()                                  # Announced mutation
# assert object.state == no clue
```

## OO FP-ish Style

```python
class MyClass

  def do(state)                               # Pure 
    x = change(state)                         # No mutation
    y = change_more(x)                        # No mutation
    z = this._do(y)                           # No mutation
    return z
  
  def _do(y)                                  # Impure
    return change_even_more(y)                # Mutation
```

. . .

```python
state = ComplexState()                        # Init variable
# assert state == ComplexState()
```

. . .

```python
x = MyClass.do(state)                         # No mutation
# assert state == ComplexState()
```

## Why Immutable Classes

Not ok:

```python
def do(state):
  # ... change state

x = do(state)                                 # state mutated
```

. . .

So why should this?

```python
x = state.do()                                # state mutated
```

. . .

```python
class State:

    def do(self):                             # self == state
      # ... change self                         
```

## Pure Functions

Referential transparency:

```python
def main():
  y = compute(5,2) + 7
  z = compute(5,2) + 1
```

. . .

=

```python
def main():
  x = compute(5,2)                            # Factored out
  y = x            + 7
  z = x            + 1
```

. . .

Fearless refactoring, also by compiler 

## Impure Functions

No referential transparency:

```python
def main():                                   # 2 side-effects
  y = fetchNumber() + 7                        
  z = fetchNumber() + 1                      
```

. . .

!=

```python
def main():                                   # 1 side-effect
  x = fetchNumber()                           # Factored out
  y = x             + 7
  z = x             + 1
```

. . .

Careful refactoring, often manual

## Further Topics
:::::::::::::: {.columns}
::: {.column width="50%"}

Try Haskell

* All pure
* No mutation

Try Rust:

* Much pure
* No mutation<br>by default

:::
::: {.column width="50%"}

<small>
Category Theory
</small>

![](img/category_theory.svg){ width=40% }

* Functor (map)
* Monad (flatMap)
* Lens
* ...

:::
::::::::::::::

::: notes
Image is public domain
:::

##

Thanks
