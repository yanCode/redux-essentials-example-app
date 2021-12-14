# Redux Essentials Tutorial Example (Rewritten in Typescript)

This project was forked from the source code of [Redux Essentials](https://redux.js.org/tutorials/essentials/part-1-overview-concepts), 
which is an official tutorial of the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/). Unfortunately, 
it comes only with javascript, but without the typescript version.

So I personally implemented the typescript version of each stage functionalities, which can be reviewed in bellow git branches.

### [feature/typescript-support-01](https://github.com/yanCode/redux-essentials-example-app/tree/feature/typescript-support-01)

This is the very beginning of my fork, in which I convert the whole project from javascript to typescript. It proves React projects written in javascript  
can be very friendly if you want to incrementally convert it to be type-safe. The Redux actions in this branch were created via `createSlice`, and all are synchronous.

### [feature/full-function-02](https://github.com/yanCode/redux-essentials-example-app/blob/feature/full-function-02/)

On top of previous branch, [feature/typescript-support-01](https://github.com/yanCode/redux-essentials-example-app/tree/feature/typescript-support-01), 
this branch introduces async actions created by `createAsyncThunk` to load data via accessing remote http endpoints.

### [feature/entity-adapter-03](https://github.com/yanCode/redux-essentials-example-app/blob/feature/entity-adapter-03/)
In this branch, the `createEntityAdapter` is used, so that the data in Redux store is normalized, and with the benefits of normalized data,
boilerplate code was largely reduced.

### [feature/rtk-query-04](https://github.com/yanCode/redux-essentials-example-app/blob/feature/entity-adapter-03/)
Finally, [`RTK Query`](https://redux-toolkit.js.org/rtk-query/overview) comes to play. which can automatically generate react hooks for data fetching along with handy API to revalidate 
or even precisely update the cache on what actually changed. 


``N.B.`` For details of setup and running this project, please refer to the official code: [https://github.com/reduxjs/redux-essentials-example-app](https://github.com/reduxjs/redux-essentials-example-app)