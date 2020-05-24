## Mobile Phones Store
Store of mobile phones.

## Screenshots
![Alt text](../images/Loading.jpg?raw=true)

![Alt text](../images/FilledProducts.jpg?raw=true)

![Alt text](../images/Filter.jpg?raw=true)

![Alt text](../images/Details.jpg?raw=true)

![Alt text](../images/Details2.jpg?raw=true)

![Alt text](../images/Buying.jpg?raw=true)

![Alt text](../images/Snackbar.jpg?raw=true)

![Alt text](../images/FilledCart.jpg?raw=true)

![Alt text](../images/EmptyCart.jpg?raw=true)

![Alt text](../images/EmptyProducts.jpg?raw=true)

## Building

1. Run:
```bash
npm install
```
2. You need to check *\node_modules\metro-config\src\defaults\blacklist.js*. If there code like this:
```javascript
var sharedBlacklist = [
  /node_modules[/\\]react[/\\]dist[/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
```
Then you need to change it to:
```javascript
var sharedBlacklist = [
  /node_modules[\/\\]react[\/\\]dist[\/\\].*/,
  /website\/node_modules\/.*/,
  /heapCapture\/bundle\.js/,
  /.*\/__tests__\/.*/
];
```
3. Run:
```bash
expo start
```
4. Install **Expo** on phone.
5. Scan QR code. 
