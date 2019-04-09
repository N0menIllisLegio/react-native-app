const ProductSchema = {
    name: 'Product',
    properties: {
        id: 'int',
        displayDiagonal: 'float',
        memorySize: 'int',
        batteryCapacity: 'int',
        oS: 'string',
        frontalCamera: 'int',
        title: 'string',
        info: 'string',
        price: 'float',
        inStock: 'bool',
        photoMain: 'string',
        extraPhoto1: 'string?',
        extraPhoto2: 'string?'
    }
};

import firebase from 'firebase'
import { SQLite } from 'expo';
import { FileSystem } from 'expo';

class DataController {
    static Cart = [ ];
    
    constructor() {
        SQLite.openDatabase('Expo.db');
        console.log(FileSystem.getInfoAsync('/SQLite/Expo.db'));
    }


    static getCart() {
        let returnValue = [];
        // console.log(DataController.Cart);
        DataController.Cart.forEach(element => {
            returnValue.push({
                product: DataController.getProduct(element.id),
                amount: element.amount
            });
        })

        return returnValue;
    }

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

        // console.log(DataController.Cart);
    }

    static getAllProducts() {
        return storage;
    }

    static getProduct(id) {
        return storage.find(product => product.id == id);
    }
}

export default DataController

const storage = [{
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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