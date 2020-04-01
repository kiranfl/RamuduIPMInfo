import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator, Animated, Text } from 'react-native';
import { color } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';



function Uclicked({route, navigation}, props) {
  const eswar = 'Welcome to the details page Eswar';
  navigation.navigate('Details', {data: eswar});
}
class CropList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount = () => {
    console.log(this.props);
    this.setState({isLoaded: true});
    const url = `http://23.20.169.44/api/en-us/crops/${
      this.props.route.params.id
    }/categories`;
    fetch(url)
      .then(response => response.json())
      .then(responsejson => {
        this.setState({
          items: responsejson[0]._subCategories,
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({isLoaded: false});
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Image style={styles.cardImg} source={{ uri: item.image }} />
        <Text style={styles.cardText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    let { items } = this.state
    if (items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
      <FlatList
        style={styles.cropList}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this._renderItem}
      />
      </View>
    )
  }
}

export default CropList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  cropList: {
    flex: 1,
  },
  empty: {
    width: "100%",
    height: 60,
    borderTopWidth: 1,
    borderColor: '#edebeb',
    backgroundColor: 'white',
    color:'black'
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginLeft: '2%',
    width: '96%',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardText: {
    flex: 8,
    fontSize: 16,
    padding: 10,
  },
  cardImg: {
    flex: 3,
    width: '100%',
    height: 100,
    resizeMode: 'cover'
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})