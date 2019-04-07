import React from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Header, Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';

class DetailsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render(){
        return (
            <View>
                <Image source={require('../photos/180copy3.jpeg')} />

                    <Swiper>
                        <View>
                            
                        </View>

                        <View>
                            <Image source={require('../photos/9hq.png')} />
                        </View>
                    </Swiper>
                
                
                    
            </View>
        )
    }
}

export default DetailsScreen;