var Datastore = require('react-native-local-mongodb')
  , db = new Datastore({ filename: 'ProductsDB', autoload: true });


class DataController {
    static Cart = [];
    
    constructor() {
    	// db.insert(storage[0], function(er, n){});
    	// db.insert(storage[1], function(er, n){});
    	// db.insert(storage[2], function(er, n){});
    	// db.insert(storage[3], function(er, n){});
    	// db.insert(storage[4], function(er, n){});
    	// db.insert(storage[5], function(er, n){});
    	// db.insert(storage[6], function(er, n){});
      // db.insert(storage[7], function(er, n){});

      db.update({ _id: 1 }, { $set: { inStock: 1 } }, { multi: true }, function (err, numReplaced) { });
      db.update({ _id: 2 }, { $set: { inStock: 0 } }, { multi: true }, function (err, numReplaced) { });
      db.update({ _id: 3 }, { $set: { inStock: 4 } }, { multi: true }, function (err, numReplaced) { });
      db.update({ _id: 4 }, { $set: { inStock: 0 } }, { multi: true }, function (err, numReplaced) { });
      db.update({ _id: 5 }, { $set: { inStock: 2 } }, { multi: true }, function (err, numReplaced) { });
      db.update({ _id: 6 }, { $set: { inStock: 0 } }, { multi: true }, function (err, numReplaced) { });
      db.update({ _id: 7 }, { $set: { inStock: 9 } }, { multi: true }, function (err, numReplaced) { });
      db.update({ _id: 8 }, { $set: { inStock: 0 } }, { multi: true }, function (err, numReplaced) { });
    }

    static getOneProduct(id, amount) {
      return new Promise((resolve) => {
        db.findOneAsync({_id: id}).then( response =>
            resolve({
                product: response,
                amount: amount
            })
        )
      });
    }

    static getCart = () => new Promise(function(resolve, reject) {
        let promises = [];
        
        DataController.Cart.forEach(element => {
            promises.push(DataController.getOneProduct(element.id, element.amount));
        })
        
        Promise.all(promises)
            .then((results) => resolve(results))
    })

    static addProductToCart(product, amountStr) {
        let id = product._id
        let amount = parseInt(amountStr, 10);
        let elemExists = false;
        db.update({ _id: id }, { $set: { inStock: product.inStock - amount } }, { multi: true }, function (err, numReplaced) {
        });

        DataController.Cart.forEach(element => {
            if (element.id == id) {
                element.amount += amount;
                elemExists = true;
            }
        });

        if (!elemExists) {
            DataController.Cart.push({
                id: id,
                amount: amount
            });
        }
    }

    static getAllProducts = () => new Promise(function(resolve, reject) {
        db.find({}, function(error, data) {
            resolve(data);
        });
    })

    static getProduct = (id) => new Promise(function(resolve, reject) {
        db.findOne({_id: id}, function(error, data) {
            resolve(data);
        });
    })

    static updateStock = (id, amount) => new Promise(function(resolve, reject) {
      db.findOne({_id: id}, function(error, data) {
        db.update({ _id: id }, { $set: { inStock: data.inStock + amount } }, { multi: true }, function (err, numReplaced) {
          resolve(numReplaced);
        });
      });
    })
}

export default DataController

const storage = [
	    {
	    _id: 1,
	    displayDiagonal: 5.5,
	    memorySize: 8,
	    batteryCapacity: 2000,
	    oS: 'Android',
	    frontalCamera: 5,
	    title: 'Motorola',
	    info: 'Very good product! You should use it!',
	    price: 300,
	    inStock: 1,
	    photoMain: require('../photos/Photo_1.png'),
	    extraPhoto1: require('../photos/Photo_2.jpeg'),
	    extraPhoto2: require('../photos/Photo_3.jpeg')
	  },
	  {
	    _id: 2,
	    displayDiagonal: 5.1,
	    memorySize: 64,
	    batteryCapacity: 2800,
	    oS: 'Windows Phone',
	    frontalCamera: 11,
	    title: 'Nokia',
	    info: 'Very good product! You should use it!',
	    price: 450,
	    inStock: 0,
	    photoMain: require('../photos/Photo_4.jpeg'),
	    extraPhoto1: require('../photos/Photo_5.jpeg'),
	    extraPhoto2: null
	  },
	  {
	    _id: 3,
	    displayDiagonal: 5.8,
	    memorySize: 54,
	    batteryCapacity: 3500,
	    oS: 'ios',
	    frontalCamera: 12,
	    title: 'Apple iPhone 4s',
	    info: 'Very good product! You lkdfkdsnjnj jsndjsnd ksdk ksnd kdfskdflk should use it!',
	    price: 600,
	    inStock: 4,
	    photoMain: require('../photos/Photo_6.jpeg'),
	    extraPhoto1: require('../photos/Photo_7.jpeg'),
	    extraPhoto2: null
	  },
	  {
	    _id: 4,
	    displayDiagonal: 7.3,
	    memorySize: 16,
	    batteryCapacity: 4000,
	    oS: 'Android',
	    frontalCamera: 15,
	    title: 'Samsung Galaxy Note',
	    info: 'Very good product! You should use it!',
	    price: 750,
	    inStock: 0,
	    photoMain: require('../photos/Photo_8.jpeg'),
	    extraPhoto1: require('../photos/Photo_9.jpeg'),
	    extraPhoto2: require('../photos/Photo_10.jpeg')
	},
    {
    _id: 5,
    displayDiagonal: 6.5,
    memorySize: 16,
    batteryCapacity: 2895,
    oS: 'Android',
    frontalCamera: 40,
    title: 'Motorola One',
    info: 'Very good product! You should use it!',
    price: 187.99,
    inStock: 3,
    photoMain: require('../photos/Photo_8.jpeg'),
    extraPhoto1: require('../photos/Photo_9.jpeg'),
    extraPhoto2: require('../photos/Photo_10.jpeg')
  },
  {
    _id: 6,
    displayDiagonal: 6.1,
    memorySize: 32,
    batteryCapacity: 3000,
    oS: 'Andorid',
    frontalCamera: 9,
    title: 'Redmi Go',
    info: 'Very good product! You should use it!',
    price: 322,
    inStock: false,
    photoMain: require('../photos/Photo_10.jpeg'),
    extraPhoto1: require('../photos/Photo_11.jpeg'),
    extraPhoto2: null
  },
  {
    _id: 7,
    displayDiagonal: 5.8,
    memorySize: 32,
    batteryCapacity: 3500,
    oS: 'ios',
    frontalCamera: 12,
    title: 'Apple iPhone 6',
    info: 'Very good product! You lkdfkdsnjnj jsndjsnd ksdk ksnd kdfskdflk should use it!',
    price: 600,
    inStock: 0,
    photoMain: require('../photos/Photo_12.jpeg'),
    extraPhoto1: require('../photos/Photo_13.jpeg'),
    extraPhoto2: null
  },
  {
    _id: 8,
    displayDiagonal: 6.3,
    memorySize: 16,
    batteryCapacity: 4000,
    oS: 'Android',
    frontalCamera: 15,
    title: 'Samsung Galaxy S8',
    info: 'Very good product! You should use it!',
    price: 545.99,
    inStock: 5,
    photoMain: require('../photos/Photo_14.jpeg'),
    extraPhoto1: require('../photos/Photo_15.jpeg'),
    extraPhoto2: require('../photos/Photo_16.jpeg')
}]