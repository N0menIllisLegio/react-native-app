import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ListItem } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons'

class ProductCell extends React.Component {
    render(){
        const { title, price, displayDiagonal, 
            memorySize, batteryCapacity, id, photoMain } = this.props.product;
        let info = (<View>
            <Text numberOfLines={1} style={styles.template}>Display: <Text style={styles.info}>{displayDiagonal}</Text>"</Text>
            <Text numberOfLines={1} style={styles.template}>Memory: <Text style={styles.info}>{memorySize}</Text> Gb</Text>
            <Text numberOfLines={1} style={styles.template}>Battery: <Text style={styles.info}>{batteryCapacity}</Text> mAh</Text>
        </View>)

        return(
            <ListItem
                key={id}
                title={title}
                titleStyle={{fontWeight: 'bold'}}
                titleProps={{ numberOfLines: 1 }}
                topDivider={true}
                bottomDivreact-native link react-native-fast-imageider={true}
                subtitle={info}
                rightTitle={ price + '$' }
                rightTitleStyle={{fontWeight: 'bold'}}
                rightTitleProps={{ numberOfLines: 1 }}
                leftAvatar={{ rounded: false, source: photoMain }}
                onPress={() => this.props.navigation.navigate('Details')}
                chevron
            />
        )
    }
}

const styles = StyleSheet.create({
    info: {
        padding: 2,
        fontStyle: 'italic'
    },
    template: {
        paddingLeft: 5
    }
});

export default ProductCell