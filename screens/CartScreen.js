import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    ActivityIndicator,
    View
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Header, Button, Input } from 'react-native-elements';
import ProductCartCell from '../components/ProductCartCell';
import DataController from '../components/DataController';
import Modal from "react-native-modal";

class CartScreen extends React.Component {
    state = {
        visibleModal: false,
        maxAmount: 1,
        amount: '1',
        removingID: null,

        cart: null
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        DataController.getCart().then( response => {
            this.setState({
                cart: response
            })
        })
    }

    handleRemoveProduct = (id, productAmount) => {       
        this.setState({
            visibleModal: true,
            maxAmount: productAmount,
            removingID: id
        })
    } 

    handleAmountInput = (amount) => {
        amount = amount === '' ? '1' : amount;
        let number = parseInt(amount, 10);
        if (!isNaN(number) && number > 0 && number <= this.state.maxAmount) {
            this.setState({
                amount: JSON.stringify(number)
            });
        }
    }

    handleAmountIncrease = () => {
        let amount = this.state.amount;
        let number = parseInt(amount, 10);
        number++;
        if (!isNaN(number) && number > 0 && number <= this.state.maxAmount) {
            this.setState({
                amount: JSON.stringify(number)
            });
        }
    }

    handleAmountDecrease = () => {
        let amount = this.state.amount;
        let number = parseInt(amount, 10);
        number--;
        if (!isNaN(number) && number > 0 && number <= this.state.maxAmount) {
            this.setState({
                amount: JSON.stringify(number)
            });
        }
    }

    handleRemoving = () => {
        let result = null;
        let amount = parseInt(this.state.amount, 10);

        if (amount === this.state.maxAmount) {
            result = this.state.cart.filter(element => element.product._id !== this.state.removingID);
        } else {
            result = this.state.cart.map(element => {
                if (element.product._id == this.state.removingID) {
                    element.amount = element.amount - amount;
                }
                return element;
            })
        }
        

        this.setState({
            cart: result,
            visibleModal: false, 
            amount: '1', 
            maxAmount: 1,
            removingID: null
        });
    }

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, marginTop: 20 }}>Remove:</Text>
            <View style={{ flexDirection: 'row', marginBottom: 40, alignItems: 'center', marginTop: 20, marginRight: 40, marginLeft: 40}}>
                <Button type='clear' icon={<MaterialIcons name='navigate-before' size={40} color='darkred'/>} 
                    onPress={this.handleAmountDecrease}/>
                <Input value={this.state.amount} keyboardType={'number-pad'} 
                    inputStyle={{ textAlign: 'center'}}
                    onChangeText={ (text) => this.handleAmountInput(text) }
                />
                <Button type='clear' icon={<MaterialIcons name='navigate-next'size={40} color='darkred'/>} 
                    onPress={this.handleAmountIncrease}/>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Button title='REMOVE' icon={<MaterialIcons name='done' color='white' size={20}/>} 
                    buttonStyle={{ backgroundColor: 'darkgreen', marginRight: 10}}
                    containerStyle={{width: 150}}
                    onPress={ this.handleRemoving }
                />
                <Button title='CANCEL' icon={<MaterialIcons name='clear' color='white' size={20}/>} 
                    buttonStyle={{ backgroundColor: 'darkred'}}
                    containerStyle={{width: 150}}
                    onPress={() => this.setState({ visibleModal: false, amount: '1', 
                        maxAmount: 1, removingID: null})}
                />
            </View>
        </View>
    );

    componentWillUnmount() {
        let updCart = [];
        this.state.cart.forEach(element => updCart.push({ id: element.product._id, amount: element.amount }))
        DataController.Cart = updCart;
    }

    render() {
        let productsList = (<View style={[styles.loaderContainer, styles.horizontal]}>
                                <ActivityIndicator size='large' color='darkred'/>
                            </View>);

        if (this.state.cart) {
            productsList = this.state.cart.length > 0 ? (
                this.state.cart.map(element => (
                    <ProductCartCell navigation={this.props.navigation} 
                    handleRemove={this.handleRemoveProduct}
                    product={element.product} amount={element.amount} key={element.product._id} />
                ))
            ) : (
                <View style={[styles.loaderContainer, styles.horizontal]}>
                    <Text style={styles.placeholder}>Your cart is empty!</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{ borderBottomWidth: 0 }}
                    backgroundColor={'darkred'}
                    leftComponent={<MaterialIcons name='arrow-back' color='white' 
                        size={20} onPress={() => this.props.navigation.goBack()}/>}
                    centerComponent={{ text: 'CART', style: { color: '#fff' } }}
                    rightComponent={<MaterialIcons name='remove-shopping-cart' color='white' 
                        size={20} onPress={() => this.setState({cart: []})}/>}
                />

                <ScrollView>
                    { productsList }
                </ScrollView>

                <Modal isVisible={ this.state.visibleModal } 
                    style={styles.bottomModal} avoidKeyboard={true}
                    onBackdropPress={()=> this.setState({ visibleModal: false, amount: '1', 
                        maxAmount: 1, removingID: null })}
                >
                    { this._renderModalContent() }
                </Modal>

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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    placeholder: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'grey' 
    }
});