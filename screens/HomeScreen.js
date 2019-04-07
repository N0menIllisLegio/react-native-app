import React from 'react';
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

import { Header, Input } from 'react-native-elements';
import ProductCard from '../components/ProductCard';
import ProductCell from '../components/ProductCell';
import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  updateSearch = search => {
    if (search.length > 2) {
      this.setState({ search });
    }
  };


  state = {
    searchIconColor: 'white',
    showSearch: false,
    search: '',
    products: [
      {
        id: 1,
        displayDiagonal: 5.5,
        memorySize: 32,
        batteryCapacity: 3000,
        title: 'Product1',
        info: 'Very good product! You should use it!',
        price: 200,
        photoMain: require('../photos/180copy3.jpeg')
      },
      {
        id: 2,
        displayDiagonal: 6.5,
        memorySize: 16,
        batteryCapacity: 2500,
        title: 'Product1',
        info: 'Very good product! You should use it!',
        price: 240,
        photoMain: require('../photos/9hq.png')
      },
      {
        id: 3,
        displayDiagonal: 5.2,
        memorySize: 8,
        batteryCapacity: 2800,
        title: 'Mac Book Pro 2016',
        info: 'Very good product! You lkdfkdsnjnj jsndjsnd ksdk ksnd kdfskdflk should use it!',
        price: 210,
        photoMain: require('../photos/180copy3.jpeg')
      },
      {
        id: 4,
        displayDiagonal: 6.1,
        memorySize: 64,
        batteryCapacity: 3500,
        title: 'Product1',
        info: 'Very good product! You should use it!',
        price: 320,
        photoMain: require('../photos/180copy3.jpeg')
      }
    ]
  }

  render() {
    let productsCardsList = null;
    let productsCellsList = null;
    let searchBar = null;
    let { showSearch, searchIconColor } = this.state;

    if (showSearch) {
      searchBar = (
      <Input
        leftIcon={ <FeatherIcons name='search' color='lightgrey' size={16}/> }
        leftIconContainerStyle={{marginRight: 15}}
        placeholder='Search...'
      />);
      searchIconColor = 'lightblue'
    } else {
      searchBar = (
      <View />);

      searchIconColor = 'white'
    }

    if (this.state.products === null) {
      productsList = (<Text>Loading</Text>);
    } else {
      productsCardsList = this.state.products.length > 0 ? (
        this.state.products.map(product => <ProductCard navigation={this.props.navigation} product={product} key={product.id}/>) 
      ) : (
        <Text>Nothing to display!</Text>
      );

      productsCellsList = this.state.products.length > 0 ? (
        this.state.products.map(product => <ProductCell navigation={this.props.navigation} product={product} key={product.id}/>) 
      ) : (
        <Text>Nothing to display!</Text>
      );
    }
    
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{ borderBottomWidth: 0 }}
          backgroundColor={'darkred'}
          leftComponent={<FeatherIcons name='search' color={ searchIconColor } size={20} onPress={() => this.setState({ showSearch: !showSearch}) }/>}
          centerComponent={{ text: 'PRODUCTS', style: { color: '#fff' } }}
          rightComponent={<MaterialCommunityIcons name='cart' color='white' size={20} onPress={() => this.props.navigation.navigate('Cart')}/>}
        />
        { searchBar }
        <Swiper
          showsButtons={false}
          showsPagination={false}
          loop={false}
        >
          <ScrollView>
            <View style={ styles.contentContainer }>
              { productsCardsList }
            </View>
          </ScrollView>
          
          <ScrollView>
            { productsCellsList }
          </ScrollView>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customBrick: {
    backgroundColor: '#560319'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  }
});
