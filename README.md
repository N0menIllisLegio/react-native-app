## Mobile Phones Store
Store of mobile phones.

## Screenshots
<img src="../images/Loading.jpg?raw=true" width="200" height="400">

<img src="../images/FilledProducts.jpg?raw=true" width="200" height="400">

<img src="../images/Filter.jpg?raw=true" width="200" height="400">

<img src="../images/Details.jpg?raw=true" width="200" height="400">

<img src="../images/Details2.jpg?raw=true" width="200" height="400">

<img src="../images/Buying.jpg?raw=true" width="200" height="400">

<img src="../images/Snackbar.jpg?raw=true" width="200" height="400">

<img src="../images/FilledCart.jpg?raw=true" width="200" height="400">

<img src="../images/EmptyCart.jpg?raw=true" width="200" height="400">

<img src="../images/EmptyProducts.jpg?raw=true" width="200" height="400">

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
