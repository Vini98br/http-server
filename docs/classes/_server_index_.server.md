> **[@poppinss/http-server](../README.md)**

[Globals](../README.md) / ["Server/index"](../modules/_server_index_.md) / [Server](_server_index_.server.md) /

# Class: Server <**Context**>

Server class handles the HTTP requests by using all Adonis micro modules.

```
const http = require('http')
const { Request } = require('@adonisjs/request')
const { Response } = require('@adonisjs/response')
const { Router } = require('@adonisjs/router')
const { MiddlewareStore, Server, routePreProcessor } = require('@adonisjs/server')

const middlewareStore = new MiddlewareStore()
const router = new Router((route) => routePreProcessor(route, middlewareStore))

const server = new Server(Request, Response, router, middlewareStore)
http.createServer(server.handle.bind(server)).listen(3000)
```

## Type parameters

▪ **Context**: *[HttpContextContract](../interfaces/_contracts_.httpcontextcontract.md)*

## Hierarchy

* **Server**

## Implements

* [ServerContract](../interfaces/_contracts_.servercontract.md)‹*`Context`*›

## Index

### Constructors

* [constructor](_server_index_.server.md#constructor)

### Properties

* [instance](_server_index_.server.md#optional-instance)

### Methods

* [after](_server_index_.server.md#after)
* [before](_server_index_.server.md#before)
* [errorHandler](_server_index_.server.md#errorhandler)
* [handle](_server_index_.server.md#handle)
* [optimize](_server_index_.server.md#optimize)

## Constructors

###  constructor

\+ **new Server**(`_context`: object, `_router`: [RouterContract](../interfaces/_contracts_.routercontract.md)‹*`Context`*›, `_middlewareStore`: [MiddlewareStoreContract](../interfaces/_contracts_.middlewarestorecontract.md)‹*`Context`*›, `_logger`: `LoggerContract`, `_httpConfig`: [ServerConfigContract](../modules/_contracts_.md#serverconfigcontract)): *[Server](_server_index_.server.md)*

**Parameters:**

Name | Type |
------ | ------ |
`_context` | object |
`_router` | [RouterContract](../interfaces/_contracts_.routercontract.md)‹*`Context`*› |
`_middlewareStore` | [MiddlewareStoreContract](../interfaces/_contracts_.middlewarestorecontract.md)‹*`Context`*› |
`_logger` | `LoggerContract` |
`_httpConfig` | [ServerConfigContract](../modules/_contracts_.md#serverconfigcontract) |

**Returns:** *[Server](_server_index_.server.md)*

## Properties

### `Optional` instance

• **instance**? : *`HttpServer` | `HttpsServer`*

*Implementation of [ServerContract](../interfaces/_contracts_.servercontract.md).[instance](../interfaces/_contracts_.servercontract.md#optional-instance)*

The server itself doesn't create the http server instance. However, the consumer
of this class can create one and set the instance for further reference. This
is what ignitor does.

## Methods

###  after

▸ **after**(`cb`: [HookNode](../modules/_contracts_.md#hooknode)‹*`Context`*›): *this*

*Implementation of [ServerContract](../interfaces/_contracts_.servercontract.md)*

Define hooks to be executed after the route handler. The after hooks
can modify the lazy response. However, it shouldn't write the
response to the socket.

**Parameters:**

Name | Type |
------ | ------ |
`cb` | [HookNode](../modules/_contracts_.md#hooknode)‹*`Context`*› |

**Returns:** *this*

___

###  before

▸ **before**(`cb`: [HookNode](../modules/_contracts_.md#hooknode)‹*`Context`*›): *this*

*Implementation of [ServerContract](../interfaces/_contracts_.servercontract.md)*

Define hooks to be executed as soon as a new request
has been received

**Parameters:**

Name | Type |
------ | ------ |
`cb` | [HookNode](../modules/_contracts_.md#hooknode)‹*`Context`*› |

**Returns:** *this*

___

###  errorHandler

▸ **errorHandler**(`handler`: [ErrorHandlerNode](../modules/_contracts_.md#errorhandlernode)‹*`Context`*›): *this*

*Implementation of [ServerContract](../interfaces/_contracts_.servercontract.md)*

Define custom error handler to handler all errors
occurred during HTTP request

**Parameters:**

Name | Type |
------ | ------ |
`handler` | [ErrorHandlerNode](../modules/_contracts_.md#errorhandlernode)‹*`Context`*› |

**Returns:** *this*

___

###  handle

▸ **handle**(`req`: `IncomingMessage`, `res`: `ServerResponse`): *`Promise<void>`*

*Implementation of [ServerContract](../interfaces/_contracts_.servercontract.md)*

Handles a given HTTP request. This method can be attached to any HTTP
server

**Parameters:**

Name | Type |
------ | ------ |
`req` | `IncomingMessage` |
`res` | `ServerResponse` |

**Returns:** *`Promise<void>`*

___

###  optimize

▸ **optimize**(): *void*

*Implementation of [ServerContract](../interfaces/_contracts_.servercontract.md)*

Optimizes internal handlers, based upon the existence of
before handlers and global middleware. This helps in
increasing throughput by 10%

**Returns:** *void*