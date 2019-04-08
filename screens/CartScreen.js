import React from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Header } from 'react-native-elements';
import ProductCartCell from '../components/ProductCartCell';

class CartScreen extends React.Component {
    state = {
        cart: [
            {
              id: 1,
              displayDiagonal: 5.5,
              memorySize: 32,
              batteryCapacity: 3000,
              oS: 'Android',
              frontalCamera: 12,
              title: 'Product1',
              info: 'Very good product! You should use it!',
              price: 200,
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
            }
        ]
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount()


    handleRemoveProduct = (id) => {       
        this.setState({
            cart: this.state.cart.filter(product => product.id !== id)
        })
    } 

    render(){
        const productsList = this.state.cart.length > 0 ? (
            this.state.cart.map(product => (
                <ProductCartCell navigation={this.props.navigation} 
                handleRemove={this.handleRemoveProduct}
                product={product} amount={2} key={product.id} />
            ))
        ) : (
            <Text>Buy somthing!!!</Text>
        );

        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{ borderBottomWidth: 0 }}
                    backgroundColor={'darkred'}
                    leftComponent={<MaterialIcons name='arrow-back' color='white' size={20} onPress={() => this.props.navigation.goBack()}/>}
                    centerComponent={{ text: 'CART', style: { color: '#fff' } }}
                    rightComponent={<MaterialIcons name='remove-shopping-cart' color='white' size={20} onPress={() => this.setState({cart: []})}/>}
                />
                <ScrollView>
                    { productsList }
                </ScrollView>
            </View>
        )
    }
}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});