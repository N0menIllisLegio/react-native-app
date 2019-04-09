import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import { Header, Input } from 'react-native-elements';
import ProductCard from '../components/ProductCard';
import ProductCell from '../components/ProductCell';

import Swiper from 'react-native-swiper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import DataController from '../components/DataController';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  doSearch(searchFor) {
    let searchedProducts = [];
    searchFor = searchFor.toLowerCase();

    this.state.products.forEach(product => {

      let title = product.title.toLowerCase().includes(searchFor);
      let info = product.info.toLowerCase().includes(searchFor);
      let oS = product.oS.toLowerCase().includes(searchFor);

      let price = JSON.stringify(product.price).toLowerCase().includes(searchFor);
      let displayDiagonal = JSON.stringify(product.displayDiagonal).toLowerCase().includes(searchFor);
      let memorySize = JSON.stringify(product.memorySize).toLowerCase().includes(searchFor);
      let batteryCapacity = JSON.stringify(product.batteryCapacity).toLowerCase().includes(searchFor);
      let frontalCamera = JSON.stringify(product.frontalCamera).toLowerCase().includes(searchFor);
      
      if (title || info || oS || price || displayDiagonal || memorySize || batteryCapacity || frontalCamera) {
        searchedProducts.push(product);
      }
    });

    this.setState({
      displayedProducts: searchedProducts
    })
  }

  refresh = () => {
    this.setState({
      searchIconColor: 'white',
      showSearch: false,
      search: '',
      products: null,
      displayedProducts: null,
      refreshing: true
    });

    DataController.getAllProducts()
      .then(response => {
        this.setState({
          products: response,
          displayedProducts: [...response],
          refreshing: false
        })
    });
  }


  updateSearch = search => {  
    this.setState({ search });
    if (search.length > 2) {
      this.doSearch(search);
    } else {
      this.setState({
        displayedProducts: [...this.state.products]
      })
    }
  };

  state = {
    searchIconColor: 'white',
    showSearch: false,
    search: '',
    products: null,
    displayedProducts: null,
    refreshing: false
  }

  componentDidMount() {
    // let dc = new DataController();
    DataController.getAllProducts()
      .then(response => {
        this.setState({
          products: response,
          displayedProducts: [...response]
        })
    });
  }

  render() {
    let productsCardsList = (<View style={[styles.loaderContainer, styles.horizontal]}><ActivityIndicator size='large' color='darkred' /></View> );
    let productsCellsList = productsCardsList;
    let searchBar = null;
    let { showSearch, searchIconColor } = this.state;

    if (this.state.displayedProducts !== null) {
      if (showSearch) {
        searchBar = (
        <Input
          leftIcon={ <FeatherIcons name='search' color='lightgrey' size={16}/> }
          leftIconContainerStyle={{marginRight: 15}}
          containerStyle={{ margin: 5, paddingRight: 20, marginBottom: 10 }}
          placeholder='Search...'
          value={this.state.search}
          onChangeText={(text) => this.updateSearch(text)}
        />);
        searchIconColor = 'lightblue'
      } else {
        searchBar = ( <View />);
        searchIconColor = 'white'
      }

      productsCardsList = this.state.displayedProducts.length > 0 ? (
        this.state.displayedProducts.map(product => <ProductCard navigation={this.props.navigation} product={product} key={product._id}/>) 
      ) : (
        <View style={[styles.loaderContainer, styles.horizontal]}>
            <Text style={styles.placeholder}>Nothing to display!</Text>
        </View>
      );

      productsCellsList = this.state.displayedProducts.length > 0 ? (
        this.state.displayedProducts.map(product => <ProductCell navigation={this.props.navigation} product={product} key={product._id}/>) 
      ) : (
        <View style={[styles.loaderContainer, styles.horizontal]}>
          <Text style={styles.placeholder}>Nothing to display!</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{ borderBottomWidth: 0 }}
          backgroundColor={'darkred'}
          leftComponent={<FeatherIcons name='search' color={ searchIconColor } size={25} onPress={() => this.setState({ showSearch: !showSearch}) }/>}
          centerComponent={{ text: 'PRODUCTS', style: { color: '#fff' } }}
          rightComponent={<MaterialCommunityIcons name='cart' color='white' size={25} onPress={() => this.props.navigation.navigate('Cart')}/>}
        />
        { searchBar }
        <Swiper
          showsButtons={false}
          showsPagination={false}
          loop={false}
        >
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={ this.refresh }/>}>
            <View style={ styles.contentContainer }>
              { productsCardsList }
            </View>
          </ScrollView>
          
          <ScrollView refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={ this.refresh }/>}>
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
  placeholder: {
    fontSize: 20,
    fontStyle: 'italic',
    color: 'grey' 
  }
});
