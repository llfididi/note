### 6: React.FC

经常出现`React.Fc`这个函数, 比如我不使用`React.Fc`来处理组件的函数, 则在组件里面使用`props.children`会报错, 我们一起进入源码分析一下。

```
 type FC<P = {}> = FunctionComponent<P>;

    interface FunctionComponent<P = {}> {
        // 第一句
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;

        propTypes?: WeakValidationMap<P> | undefined;
        contextTypes?: ValidationMap<any> | undefined;
        defaultProps?: Partial<P> | undefined;
        displayName?: string | undefined;
    }
```

1. `FC`这个`type`接收一个参数`P`, 默认值为空对象, 而这个`P`。
2. `FunctionComponent`就是个过度的名称而已, 可以认为`FC`就是`FunctionComponent`。
3. 第一句意义为第一个参数为`PropsWithChildren<P>`类型, 第二个参数可有可无, 有则为任意类型, 返回React的dom或者返回`null`。
4. 后面四个参数不是必填, 我们主要研究第一句。

我们追查一下`PropsWithChildren`

```
 type PropsWithChildren<P> = P & { children?: ReactNode | undefined };
```

只是将传入的P的类型与`{ children?: ReactNode | undefined }`合并而已, 看到这里我们就明白了, 其实用`React.FC`包裹一下是可以帮助`ts`推导出`props`身上可能有`children`属性。

### 7: RematchRootState

rematch官网;

`rematch`是对`Redux`的二次封装, 而`RematchRootState`是`rematch`导出的一个ts推导函数, `RematchRootState`到底做了什么令程序员脱发的操作...

项目里使用了这个`RematchRootState`之后, 发现某些类型推导出来`never`类型如图所示:

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/H8M5QJDxMHrp49TtpdLqbZERDUSB0FribNSvNN9ehpjax8mHKBXdJMrc2icfp8fMic8KAqlCIVOZOr6D6beXpgdoA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)image.png

###### 一起探索源码里的奥义

```
export type RematchRootState<M> = ExtractRematchStateFromModels<M>

export type ExtractRematchStateFromModels<M> = {
    [modelKey in keyof M]: M[modelKey] extends ModelConfig ? M[modelKey]['state'] : never
} 
```

1. 在使用`RematchRootState`时我们使用typeof的形式导出了一个ts类型, typeof在ts里面使用就不是js里面的意义了:

   ```
   Xxx<typeof {name:'金毛', age:9}>
   
   // 此处就相当于:
   
   Xxx<typeof {name:string, age:number}>
   ```

2. `[modelKey in keyof M]`循环`M`对象里面所有的key值, 每次循环时命名为modelKey。

3. `M[modelKey]`就是取出对应的值, 这里特指`ts`里面的类型值。

4. `M[modelKey] extends ModelConfig ? M[modelKey]['state'] : never`, 也就是每次取出'值', 并且此'值'符合`ModelConfig类型`的话则返回`M[modelKey]['state']`的类型, 否则返回`never`, 这里的`extends`你可以理解为`is`用来判断某个值是不是符合规范的, 以后文章还会涉及`extends`的其他用法。

至此我们已经明白了, 问题一定出在`M[modelKey]`的类型未符合 `ModelConfig`的类型规范导致的返回的`never`, 那`ModelConfig`又是什么规范那?

```
export interface ModelConfig<S = any, SS = S, K extends string = string> {
    name?: string
    state: S
    baseReducer?: (state: SS, action: Action) => SS
    reducers?: ModelReducers<S>

    effects?:
        | ModelEffects<any>
        | (<M extends Models<K> | void = void>(dispatch: RematchDispatch<M>) => ModelEffects<any>)
} 
```

1. 由于调用`ModelConfig`时什么参数都没传, 则使用默认值。
2. 当`name`属性我们赋予了`number`类型时会导致错误。
3. `state` 对应的`S`类型, 也就是默认的`any`任何类型都可以。
4. `baseReducer`的参数不符合规范, 或是返回值不符合规范时。

###### `effects` 要单独拿出来讲

第一个: `effects = ModelEffects<any>`

```
type ModelEffects<S> = {
    [key: string]: ( this: { [key: string]: (payload?: any, meta?: any) => Action<any, any> },payload: any,rootState: S) => void
}

export type Action<P = any, M = any> = {
    type: string,
    payload?: P,
    meta?: M,
} 
```

1. `[key: string]`这种写法意思就是取出里面所有的项进行循环。
2. `ModelEffects`每一项都为函数, 并且没有返回值。
3. `ModelEffects`对象的每个函数的第一个参数为一个对象, 这个对象里面值都为函数, 并且返回值为`Action<any, any>`。
4. `ModelEffects`对象的每个函数的第二个参数为任意类型。
5. `ModelEffects`对象的每个函数的第三个参数为`rootState: S` S类型, S则是我们上一步传入进来的, 也就是`any`。

第二个:

```
effects = (<M extends Models<K> | void = void>(dispatch: RematchDispatch<M>) 
=> ModelEffects<any>)
```

1. `M`是新定义的一个泛型, 它符合`Models<K>`的规范, 如果不符合的话就为`void`类型。
2. 这个`K`就是上面默认的`string` (写到这里我都感觉好麻烦😭)。

这里是`Models`的类型:

```
export type Models<K extends string = string> = {
    [key in K]: ModelConfig
} 
```

每项都是`ModelConfig`, 而`ModelConfig`我们上面已经讲过啦。

1. 这个函数接收的第一个参数`dispatch`要符合类型`RematchDispatch<M>`, 这里就不再扩展了, 往下还有特别深:

```
export type RematchDispatch<M = void> =

  ExtractRematchDispatchersFromModels<M> &

    (RematchDispatcher | RematchDispatcherAsync) &

    (Redux.Dispatch<any>) 
```

可以看出来, 这个参数的类型我们用`Redux.Dispatch<any>`来定义就没问题的。

1. 返回值必须为: `ModelEffects<any>`这个我们刚才也讲过了。

正确的用法可以是如下的样子:

```
 effects: (dispatch: Redux.Dispatch) => ({
    async FnXxx(_: any, state: RootState) {
      console.log(state.xxx.xxxList)
    },
  }), 
```

总结一句话就是"读这代码好心累"!

### 8: ts 修改函数参数

###### 实现: 增加函数一个参数

假设当前我有这样一个`type`:

```
 type Obj = {
    getX: (a: string, c: boolean) => void;
    getN: (a: number) => void;
  };
```

而我希望将这个`type`处理成下面这个样子:

```
 type Obj = {
    getX: (s: string[], a: string, c: boolean) => void;
    getN: (s: string[], a: number) => void;
  };
```

这里的关键点就是取到函数返回值的类型, 以及函数参数的类型集合, 实现代码如下:

```
 type Obj2<T> = {
    [Key in keyof T]: T[Key] extends (...arg: any) => any
      ?(s: string[], ...arg: Parameters<T[Key]>) => ReturnType<T[Key]>
      : T[Key];
  };
```

1. 循环泛型`T`里面所有的值。
2. 如果`T[Key]`不满足`(...arg: any) => any`则不处理, 因为`T[Key]`可能不是函数类型。
3. 反之`T[Key]`为函数类型, 则第一个参数为`s: string[]`。
4. `...arg`为后续参数类型, `Parameters<>`为自带方法, 可以推导出函数的所有参数组成的数组的类型。
5. `ReturnType<>`为自带方法, 可以推导出函数的返回值的类型。

使用方法就是:

```
type NewObj = Obj2<Obj1> 
```

###### 实现: 去掉函数第一个参数

假设当前我有这样一个`type`:

```
 type Obj = {
    getX: (a: string, c: boolean) => void;
    getN: (a: number) => void;
  };
```

而我希望将这个`type`处理成下面这个样子:

```
 type Obj = {
    getX: (c: boolean) => void;
    getN: () => void;
  };
```

这里的关键点就是, 在ts里如何剔除数组的第一个元素, 并使用剩下的元素组成数组返回出来:

```
 type Obj2<T> = {
    [Key in keyof T]: T[Key] extends (s: any, ...arg: infer Arg) => any
      ? (...arg: Arg) => ReturnType<T[Key]>
      : T[Key];
  }; 
```

1. 这里整体的逻辑是不变的, 与上面一个原理。
2. `(s: any, ...arg: infer Arg) => any`, 这里是核心, 将函数处理第一个参数以外的参数单独拿出来命名为`Arg`, 然后使用`Arg`来定义函数的参数。
3. `infer`是ts内置的关键字, 有点类似js中的`var`, 他可以定义一个变量。

使用方法就是:

```
type NewObj = Obj2<Obj1> 
```