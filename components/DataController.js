
var Datastore = require('react-native-local-mongodb')
  , db = new Datastore({ filename: 'ProductsDB', autoload: true });


class DataController {
    static Cart = [];
    
    constructor() {
        db.count({}, function (err, count) {
            console.log(count);
        });
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

    static getAllProducts = new Promise(function(resolve, reject) {
        db.find({}, function(error, data) {
            resolve(data);
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
    _id: 1,
    displayDiagonal: 5.5,
    memorySize: 32,
    batteryCapacity: 3000,
    oS: 'Android',
    frontalCamera: 12,
    title: 'Product1',
    info: 'Very good product! You should use it!',
    price: 200.99,
    inStock: true,
    photoMain: require('../photos/180copy3.jpeg'),
    extraPhoto1: require('../photos/180copy3.jpeg'),
    extraPhoto2: require('../photos/9hq.png')
  },
  {
    _id: 2,
    displayDiagonal: 6.5,
    memorySize: 16,
    batteryCapacity: 2500,
    oS: 'ios',
    frontalCamera: 10,
    title: 'Product1',
    info: 'Very good product! You should use it!',
    price: 240,
    inStock: false,
    photoMain: require('../photos/9hq.png'),
    extraPhoto1: require('../photos/180copy3.jpeg'),
    extraPhoto2: null
  },
  {
    _id: 3,
    displayDiagonal: 5.2,
    memorySize: 8,
    batteryCapacity: 2800,
    oS: 'WindowsPhone',
    frontalCamera: 8,
    title: 'Mac Book Pro 2016',
    info: 'Very good product! You lkdfkdsnjnj jsndjsnd ksdk ksnd kdfskdflk should use it!',
    price: 210,
    inStock: true,
    photoMain: require('../photos/180copy3.jpeg'),
    extraPhoto1: null,
    extraPhoto2: null
  },
  {
    _id: 4,
    displayDiagonal: 6.1,
    memorySize: 64,
    batteryCapacity: 3500,
    oS: 'Android',
    frontalCamera: 9,
    title: 'Product1',
    info: 'Very good product! You should use it!',
    price: 320,
    inStock: false,
    photoMain: require('../photos/180copy3.jpeg'),
    extraPhoto1: null,
    extraPhoto2: null
  }]