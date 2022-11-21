
# Express Request/Transaction Id Middleware
## Description
Append transaction id to every request to the express server application. We can specify the existing id header or populate a new transaction id. 
-   TypeScript support.
-   Populate id from existing header or generate a random uuid
-   Setup a custom response header to pipe the transaction id to the requester
-   Pass in any custom logic to generate a transaction id of your own

## Quick Links

-   [Example Usage](https://www.npmjs.com/package/@akrdevtech/lib-express-request-id#Example-Usage)
-   [Custom Id Generator Usage Example](https://www.npmjs.com/package/@akrdevtech/lib-express-request-id#Custom-Id-Generator-Usage-Example)
-   [API](https://www.npmjs.com/package/@akrdevtech/lib-express-request-id#API)
## Usage
### Install
```sh
npm i @akrdevtech/lib-express-request-id
```
### [](https://www.npmjs.com/package/@akrdevtech/lib-express-request-id#Example-Usage) Example Usage

```js script
import * as express from 'express'
import { expressRequestId } from  '@akrdevtech/lib-express-request-id';

const app = express();

app.use(expressRequestId());

app.get('/', [
  (req, res) => { 
    res.send(`Hello World! ${req.txId}`) // Hello World! 44bd3872-f16c-46fc-a775-97d83c796432
  } 
]);

const port = 8000;
app.listen(port, () => {console.log(`⚡️ Service started : PORT → ${port}}`);
```

### [](https://www.npmjs.com/package/@akrdevtech/lib-express-request-id#Custom-Id-Generator-Usage-Example) Custom Id Generator Usage Example

```js script
import * as express from 'express'
import { expressRequestId } from  '@akrdevtech/lib-express-request-id';

const app = express()

const customIdGen = (req: express.Request): string => {
	const id:string = // your random id generator logic here
	return id
}

app.use(expressRequestId({ customIdGenerator: customIdGen ));

app.get('/', [
  (req, res) => { 
    res.send(`Hello World! ${req.txId}`)
  } 
]);

const port = 8000;
app.listen(port, () => {console.log(`⚡️ Service started : PORT → ${port}}`);
```

##  [](https://www.npmjs.com/package/@akrdevtech/lib-express-request-id#API)API

### expressRequestId(options?)
Options contains the following attributes
- **`requestHeaderName`** - Defines name of header, that should be used for checking and setting request ID.
	- Type: `string`
	- Default: `"x-transaction-id"`
- **`responseHeaderName`** - Defines name of header, that should be used for setting the id in reponse.
	- Type: `string`
	- Default: `"x-transaction-id"`
- **`setResponseHeader`** - Specifies whether the transaction id is to be set in the response header
	- Type: `boolean`
	- Default: `true`
- **`attributeName`** - Specifies the attribute name through which we can access the id from request object
	- Type: `string`
	- Default: `'txId'`
-  **`customIdGenerator`** - Defines a custom method that takes in optional attribute as request object and returns an id string
	- Type: `Function`
	- Interface: `(request?: Express.Request)=>string`
	- Default: `(request?: Express.Request)=>string(UUID v4)`