import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { ListItem } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class ProductDetailCell extends React.Component {

    render() {
        let { iconId, value } = this.props;

        return (
            <ListItem 
                key={iconId}
                topDivider={iconId == 0}
                bottomDivider={true}
                rightTitleProps={{ numberOfLines: 1 }}
                title={icons[iconId].title}
                rightTitle={<Text><Text style={{fontStyle:'italic'}}>{value}</Text>{icons[iconId].stat}</Text>}
                leftIcon={icons[iconId].icon}
            />
        )
    }
}

export default ProductDetailCell;

const icons = [ 
    {
        title: 'Battery',
        icon: (<MaterialIcons name='battery-charging-full' size={20} color='lightgrey'/>),
        stat: ' mAh'
    },
    {
        title: 'Display diagonal',
        icon: (<MaterialIcons name='settings-overscan' size={20} color='lightgrey'/>),
        stat: '"'
    },
    {
        title: 'Operating system',
        icon: (<MaterialIcons name='perm-device-information' size={20} color='lightgrey'/>),
        stat: ''
    },
    {
        title: 'Memory size',
        icon: (<MaterialIcons name='memory' size={20} color='lightgrey'/>),
        stat: ' Gb'
    },
    {
        title: 'Frontal camera',
        icon: (<MaterialIcons name='camera' size={20} color='lightgrey'/>),
        stat: ' MP'
    },
]

//OS
//camera
//memory
//resolution
//battery