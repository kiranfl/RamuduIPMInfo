import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';

class CropList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      title: ''
    }
  }

  componentDidMount = () => {
    console.log(this.props);
    this.setState({ isLoaded: true });
    const url = `http://23.20.169.44/api/menu/pest-news`;
    fetch(url)
      .then(response => response.json())
      .then(responsejson => {
        this.setState({
          items: responsejson.value,
          title: responsejson.name
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ isLoaded: false });
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>{item.article}</Text>
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
        <View style={{ textAlign: 'center' }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginBottom: 5 }}>{this.state.title}</Text>
        </View>
        <FlatList
          style={styles.cropList}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

export default CropList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  cropList: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginLeft: '2%',
    width: '96%',
    shadowColor: '#000000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    padding: 20,
    textAlign: "left",
    justifyContent: "center",
    alignItems: 'center'
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})