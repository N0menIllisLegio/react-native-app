import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { ListItem } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class ProductCartCell extends React.Component {

    render(){
        const { title, price, id, photoMain } = this.props.product;
        const amount = this.props.amount;

        return(
            <ListItem
                key={id}
                title={title}
                titleStyle={{fontWeight: 'bold'}}
                titleProps={{ numberOfLines: 4 }}
                topDivider={true}
                bottomDivider={true}
                rightTitle={ price * amount + '$' }
                rightTitleStyle={{fontWeight: 'bold'}}
                rightSubtitle={'Amount: ' + amount}
                rightTitleProps={{ numberOfLines: 1 }}
                leftAvatar={{ rounded: true, source: photoMain }}
                rightAvatar={<MaterialIcons name='remove' size={40} color='darkred' 
                    onPress={ () => this.props.handleRemove(id, amount) } />}
                onPress={() => this.props.navigation.navigate('Details', {
                    id: id,
                    product: this.props.product,
                })}
            />
        )
    }
}

export default ProductCartCell