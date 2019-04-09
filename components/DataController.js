
var Datastore = require('react-native-local-mongodb')
  , db = new Datastore({ filename: 'ProductsDB', autoload: true });


class DataController {
    static Cart = [];
    
    constructor() {
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

    static addProductToCart(id, amountStr) {
        let amount = parseInt(amountStr, 10);
        let elemExists = false;

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
            // resolve(storage);
        });
    })

    static getProduct = (id) => new Promise(function(resolve, reject) {
        db.findOne({_id: id}, function(error, data) {
            resolve(data);
        });
    })
}

export default DataController

const storage = [
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
    inStock: true,
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
    inStock: true,
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
    inStock: false,
    photoMain: require('../photos/Photo_14.jpeg'),
    extraPhoto1: require('../photos/Photo_15.jpeg'),
    extraPhoto2: require('../photos/Photo_16.jpeg')
}]