import React from 'react'
import {
    Animated,
    ImageBackground,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
    Dimensions
  } from 'react-native';

class ProductCard extends React.Component {
    state = {
        animatePress: new Animated.Value(1)
    }

    animateIn(){
        Animated.timing(this.state.animatePress,{
            toValue: 0.95,
            duration: 200
        }).start()
    }

    animateOut(){
        Animated.timing(this.state.animatePress,{
            toValue: 1,
            duration: 200
        }).start()
    }


    render() {
        const { title, price, photoMain, displayDiagonal, 
            memorySize, batteryCapacity, id } = this.props.product
        const width = Dimensions.get('window').width / 3 - 10;

        return(
            <TouchableWithoutFeedback 
                onPress={() => this.props.navigation.navigate('Details', { id: id })}
                onPressIn={()=>this.animateIn()}
                onPressOut={()=>this.animateOut()}
            >
                <Animated.View style={[styles.card, { transform: [{ scale: this.state.animatePress }]}]} width={width} height={width*2.15}>
                    <ImageBackground source={photoMain} 
                        resizeMode= 'cover'
                        style={styles.image}>
                        <View style={styles.context} blurRadius={20}>
                            <Text numberOfLines={2} style={styles.title}>{title}</Text>

                            <Text numberOfLines={1} style={styles.template}>Display: <Text style={styles.info}>{displayDiagonal}</Text>"</Text>
                            <Text numberOfLines={1} style={styles.template}>Memory: <Text style={styles.info}>{memorySize}</Text> Gb</Text>
                            <Text numberOfLines={1} style={styles.template}>Battery: <Text style={styles.info}>{batteryCapacity}</Text> mAh</Text>
                            
                            <Text numberOfLines={1} style={styles.price}>Price: <Text style={{fontWeight:'bold'}}>{price}</Text>$</Text>
                        </View>
                    </ImageBackground>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%', 
        height: '100%', 
        overflow: 'hidden', 
        flexDirection: 'column', 
        alignItems: 'stretch', 
        justifyContent: 'flex-end'
    },
    price: {
        color: 'white', 
        padding: 2
    },
    info: {
        color: 'white', 
        padding: 2,
        fontStyle: 'italic'
    },
    title: {
        color: 'white', 
        padding: 2,
        fontWeight: 'bold',
        fontSize: 20
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 8,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,

        elevation: 15,
        margin: 5,
        borderRadius: 5
    },
    context: { 
        backgroundColor: 'rgba(0, 0, 0, 0.75)', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        alignItems: 'stretch'
    }, 
    template: {
        paddingRight: 2,
        paddingLeft: 2,
        color: 'white'
    }
});

export default ProductCard