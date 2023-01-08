---
author: Malte Neuss
title: Algebraic Data Types (ADT)
# revealjs
# https://github.com/jgm/pandoc-templates/blob/master/default.revealjs
theme: sky
transition: none
slideNumber: true
---

## Algebra

Numbers:

```python
2 + 2 + 2 =  3 * 2
```

. . .

Types:

```python
class User 
  verified: Bool
  email:    String
```

::: notes
Algebra = Lehre von Symbol-Konstellation und Manipulation
:::

## Content 

::: incremental

* Product Type
* Sum Type
* Examples

:::

. . .

> *Make illegal state unrepresentable*

## Basic Types 
```
type Void:                      // 0
type Unit: unit                 // 1
type Bool: true, false          // 2
...
type String: "", "a", "b" ...   // infty
```

## Product Type

```
type ProductType = Type x Type
```

. . .

```python
type User = Bool x String
```

. . .

```python
class User 
  verified: Bool
  email:    String
```

## Product Type

:::::::::::::: {.columns}
::: {.column width="50%"}

Type:

```python
type User = Bool x String
```

Values:

```python
User(true,  "no@reply.com")
User(false, "no@reply.com")
User(true,  "ok@reply.com")
User(false, "ok@reply.com")
...
```

:::
::: {.column width="50%"}

![](img/cartesian-product.svg){ width=90% }

<small style="font-size: 9pt">
By Quartl - Own work, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=22436861
</small>

:::
::::::::::::::

## Algebra
```python
Bool x Bool: (true,true) (false,false) (true,false) (false,true)
   2 x 2   =  4
```

. . .

```python
Bool x Unit: (true,unit) (false,unit)    ~ Boolean
   2 x 1   =  2                              
```

. . .

```python
Bool x Void: (true,???)                  ~ Void
   2 x 0   =  0
```

## Sum Type

```python
type SumType = Type + Type
```

. . .

```python
type ID = Int + String
```

. . .

```python
type ID = Int | String                           Typescript
```

. . .

```python
     ID = Union[int, str]                        Python
```

. . .

```python
sealed trait ID                                  Scala

case class IntID(Int)       extends ID
case class StringID(String) extends ID
```

## Sum Type

:::::::::::::: {.columns}
::: {.column width="50%"}

Type:

```python
type ID = Int | String
```

Values:

```python
myID: ID = 1                   ✓
myID: ID = "123e4567-e89b..."  ✓
...
```

:::
::: {.column width="50%"}

![](img/disjoint-sets.svg){ width=40% }

<small style="font-size: 9pt">
By Stephan Kulla (User:Stephan Kulla) - Own work, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=14978640
</small>

:::
::::::::::::::

## Algebra

```python
Bool | Unit: true, false, unit
   2 + 1   =  3 
```

. . .

```python
Bool | Void: true, false          ~ Bool
   2 + 0   =  2                     2
```

. . .

```python
Bool | Int:  true, false, 1, 2, 3, ...
   2 + 2^64  
```

## Unit Type

```python
type BoolOpt     = Bool | Unit 

type Optional[T] =   T  | Unit 
```

. . .

```typescript
type Optional[T] =    T | undefined              Typescript
```

. . .

```python
     Optional[T] = Union[T, NoneType]            Python
```

. . .

```scala
sealed trait Option[A]                           Scala

case class  Some[A] extends Option[A]
case object None    extends Option[A]
```

## Examples

Modelling Data

> Make illegal state unrepresentable

## No ADT: Error codes

```python
class UserResult:
  error_code: int             # 0 means ok
  user:       User            # contains dummy data on error

def fetchUser() -> UserResult:
  # network call
```

. . .

```python
myUser = fetchUser()

if myUser.error_code == 0:
  # do sth.
  # what if myUser.user still has dummy data?
else
  # do fallback
```

## No ADT: Error codes

```python
class UserResult:
  error_code: int             # 0 means ok
  user:       User            # contains dummy data on error
```

. . .

Representable valid values:

```python
UserResult(0, User("John"))
UserResult(0, User("Jane"))
UserResult(1, User("dummy"))
...

```

. . .

Representable invalid values:

```
UserResult(1, User("John"))
UserResult(0, User("dummy"))
```

## No ADT: Exceptions

```python
def fetchUser() -> User:
    # raise Exception on error
```

. . .

```python
myUser = fetchUser()
# do sth.
```

. . .

```python
try:
  myUser = fetchUser()
  # do sth.
except ...
```


## ADT: Optional

```python
type Optional[T] = NoneType | T

def fetchUser() -> Optional[User]:
    # return None on error
```

. . .

```python
myUser = fetchUser()

if   isinstance(myUser, User):
  # do sth.
elif isinstance(myUser, NoneType):
  # do fallback
```

## ADT: Either 

```python
type Either[E,T] = E | T

def fetchUser() -> Either[Error, User]:
    # return Error value on error
```

. . .

```python
myUser = fetchUser()

if   isinstance(myUser, User):
  # do sth.
elif isinstance(myUser, Error):
  # analyze reason
```


## ADT: Custom 

```python
type User = Anonymous | LoggedIn

def fetchUser() -> User:
```

. . .

```python
myUser = fetchUser()

if   isinstance(myUser, Anonymous):
  # do anonymous stuff.
elif isinstance(myUser, LoggedIn):
  # do logged-in stuff.
```

## ADT: Custom extended

```python
type User = Anonymous | LoggedIn | Admin
                                 # !new!
def fetchUser() -> User:
```

. . .

```python
myUser = fetchUser()

if   isinstance(myUser, Anonymous):
  # do anonymous stuff.
elif isinstance(myUser, LoggedIn):
  # do logged-in stuff.
!!! Compiler error: forgot Admin case !!!
```


## Further Topics
:::::::::::::: {.columns}
::: {.column width="50%"}

* Scala
* Haskell
* Rust
* Dependent Types
* Linear Types

:::
::: {.column width="50%"}

<small>
Category Theory
</small>

![](img/category_theory.svg){ width=50% }

* Functor (map)
* Monad (flatMap)
* ...

:::
::::::::::::::

::: notes
Image is public domain
:::

##

