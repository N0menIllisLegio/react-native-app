import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    ActivityIndicator,
    View
} from 'react-native';

import ProductDetailCell from '../components/ProductDetailCell'
import { Header, Button, PricingCard, ThemeProvider, Input } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal";
import DataController from "../components/DataController";
import SnackBar from 'react-native-snackbar-component'

class DetailsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        visibleModal: false,
        buyingPrice: 0,
        amount: '1',
        product: null,
        snackbarVisible: false 
    };

    componentDidMount() {
        const id = this.props.navigation.getParam('id', -1);
        DataController.getProduct(id).then(
            response =>
            this.setState({
                product: response,
                buyingPrice: response.price
            })
        );
    }

    handleAmountInput = (amount) => {
        amount = amount === '' ? '1' : amount;
        let number = parseInt(amount, 10);
        if (!isNaN(number) && number > 0) {
            this.setState({
                amount: JSON.stringify(number),
                buyingPrice: this.state.product.price * number
            });
        }
    }

    handleAmountIncrease = () => {
        let amount = this.state.amount;
        let number = parseInt(amount, 10);
        number++;
        this.setState({
            amount: JSON.stringify(number),
            buyingPrice: this.state.product.price * number
        });
    }

    handleAmountDecrease = () => {
        let amount = this.state.amount;
        let number = parseInt(amount, 10);
        number--;
        if (number > 0) {
            this.setState({
                amount: JSON.stringify(number),
                buyingPrice: this.state.product.price * number
            });   
        }
    }

    handleAdding = () => {
        DataController.addProductToCart(this.state.product._id, this.state.amount);

        this.setState({
            visibleModal: false, 
            amount: '1', 
            buyingPrice: this.state.product.price,
            snackbarVisible: true
        });

        setTimeout(() => this.setState({ snackbarVisible: false }), 2500);
    }

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text numberOfLines={1} style={{ fontSize: 50, fontWeight: '700'}}>{ this.state.buyingPrice }$</Text>
            <Text style={{ fontSize: 20, marginTop: 20 }}>Amount:</Text>
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
                <Button title='ADD' icon={<MaterialIcons name='done' color='white' size={20}/>} 
                    buttonStyle={{ backgroundColor: 'darkgreen', marginRight: 10}}
                    containerStyle={{width: 150}}
                    onPress={ this.handleAdding }
                />
                <Button title='CANCEL' icon={<MaterialIcons name='clear' color='white' size={20}/>} 
                    buttonStyle={{ backgroundColor: 'darkred'}}
                    containerStyle={{width: 150}}
                    onPress={() => this.setState({ visibleModal: false, amount: '1', 
                        buyingPrice: this.state.product.price })}
                />
            </View>
        </View>
    );

    _toggleModal = () => {
        this.setState({ visibleModal: !this.state.visibleModal });
    }

    _renderDetails = (product) => {
        const infoColor = product.inStock ? 'green' : 'red';
        const stock = product.inStock ? 'In Stock' : 'Out Of Stock';
        const resize = 'contain';
        let swiperComponent = [(<Image key={'photo1'} resizeMode={resize} 
            style={styles.slide} source={product.photoMain} />)];
        if (product.extraPhoto1 !== null) {
            swiperComponent.push(<Image  key={'photo2'} resizeMode={resize} 
                style={styles.slide} source={product.extraPhoto1} />);
        }
        if (product.extraPhoto2 !== null) {
            swiperComponent.push(<Image key={'photo3'} resizeMode={resize} 
                style={styles.slide} source={product.extraPhoto2} />);
        }

        theme.Button.disabled = !product.inStock;

        return(<View style={styles.container}>
                <Header
                    containerStyle={{ borderBottomWidth: 0 }}
                    backgroundColor={'darkred'}
                    leftComponent={<MaterialIcons name='arrow-back' color='white' size={20} onPress={() => this.props.navigation.goBack() }/>}
                    centerComponent={{ text: 'DETAILS', style: { color: '#fff' } }}
                    rightComponent={<MaterialIcons name='shopping-cart' color='white' size={20} onPress={() => this.props.navigation.navigate('Cart')}/>}
                />
                                <ScrollView style={styles.contentContainer}>
                    <Swiper height={300} paginationStyle={{ bottom: -20 } } activeDotColor='rgba(242, 38, 19, 1)' > 
                        {swiperComponent}
                    </Swiper>

                    <View style={styles.title}>
                        <Text style={styles.textTitle}>{product.title}</Text>
                    </View>

                    <View style={styles.table}>
                        <ProductDetailCell value={product.batteryCapacity} iconId={0}/> 
                        <ProductDetailCell value={product.displayDiagonal} iconId={1}/> 
                        <ProductDetailCell value={product.oS} iconId={2}/> 
                        <ProductDetailCell value={product.memorySize} iconId={3}/> 
                        <ProductDetailCell value={product.frontalCamera} iconId={4}/> 
                    </View>

                    <Modal isVisible={ this.state.visibleModal } 
                        style={styles.bottomModal} avoidKeyboard={true}
                        onBackdropPress={()=> this.setState({ visibleModal: false })}
                    >
                        { this._renderModalContent() }
                    </Modal>

                    <ThemeProvider theme={theme}>
                        <PricingCard
                            price={product.price + '$'}
                            infoStyle={{ color:infoColor }}
                            info={[stock, product.info]}
                            button={{title: 'ADD TO CART'}}
                            onButtonPress={ this._toggleModal }
                        />
                    </ThemeProvider>
                </ScrollView>
                <SnackBar visible={this.state.snackbarVisible} backgroundColor='darkred'
                textMessage={this.state.product.title + ' added to cart!'}/>
            </View>
        )
    }
    
    render() {
        const { product } = this.state; 
        let displayComponent = product !== null ? (
            this._renderDetails(product)
        ) : (
            <View style={[styles.loaderContainer, styles.horizontal]}>
                <ActivityIndicator size='large' color='darkred'/>
            </View>
        );

        return (displayComponent)
    }
}

export default DetailsScreen;

const defProduct = {
    _id: -1,
    displayDiagonal: 0,
    memorySize: 0,
    batteryCapacity: 0,
    oS: '-',
    frontalCamera: 0,
    title: '-',
    info: '-',
    price: 0,
    photoMain: require('../photos/180copy3.jpeg')
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        margin: 5
    },
    table: {
        margin: 5
    },
    info: {
        margin: 3,
        marginLeft: 10,
        marginRight: 10
    },
    textInfo: {
        fontStyle: 'italic',
        fontSize: 18
    },
    title: {
        margin: 5,
        marginTop: 30,
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 35,
        fontWeight: 'bold'
    }, 
    slide: {
        flex: 1, 
        height: undefined, 
        width: undefined
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

let theme = {
    Button: {
        disabled: true
    }
};
// 
