import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import Header from './Header';
import {api} from '../constants/Constant';

class PestNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      title: '',
    };
  }

  componentDidMount = () => {
    this.setState({isLoaded: true});
    const url = `${api}/pest-news`;
    fetch(url)
      .then(response => response.json())
      .then(responsejson => {
        this.setState({
          items: responsejson.value,
          title: responsejson.name,
        });
      })
      .catch(error => {});
    this.setState({isLoaded: false});
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>{item.article}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    let {items} = this.state;
    if (items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={{flex: 0.1, justifyContent: 'center'}}>
          <Text
            style={{
              textAlignVertical: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              textTransform: 'capitalize',
            }}>
            {this.state.title}
          </Text>
        </View>
        <FlatList
          style={styles.pestNewsList}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default PestNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  pestNewsList: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginLeft: '2%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 10,
    width: '96%',
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    padding: 20,
    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
