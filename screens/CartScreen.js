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

class CartScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render(){
        return (
            <View>
                <Header
                    containerStyle={{ borderBottomWidth: 0 }}
                    backgroundColor={'darkred'}
                    leftComponent={<MaterialIcons name='arrow-back' color='white' size={20} onPress={() => this.props.navigation.goBack()}/>}
                    centerComponent={{ text: 'CART', style: { color: '#fff' } }}
                    rightComponent={<MaterialIcons name='remove-shopping-cart' color='white' size={20}/>}
                />
                
                <View onPress={() => this.props.navigation.navigate('Home')}>
                    <Text>Cart Screen</Text>
                </View>
            </View>
        )
    }
}

export default CartScreen;