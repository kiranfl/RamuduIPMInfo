import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Linking,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Header from './Header';
import {api} from '../constants/Constant';
import {heightPercentageToDP} from 'react-native-responsive-screen';

class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.getVideos();
  }

  getVideos() {
    this.setState({isLoaded: true});
    const url = `${api}/videos`;
    fetch(url)
      .then(response => response.json())
      .then(responsejson => {
        this.setState({
          items: responsejson.value,
        });
      })
      .catch(error => {});
    this.setState({isLoaded: false});
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={styles.card}>
        <WebView
          style={{
            flex: 4,
            overflow: 'visible',
            height: heightPercentageToDP('15%'),
          }}
          ref={ref => {
            this.webview = ref;
          }}
          source={{uri: item.url}}
          onNavigationStateChange={event => {
            if (event.url !== item.url) {
              this.webview.stopLoading();
              Linking.openURL(event.url);
            }
          }}
        />
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
        <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Videos</Text>
        </View>
        <FlatList
          style={styles.List}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Videos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  List: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginLeft: '2%',
    width: '96%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 10,
  },
  cardText: {
    flex: 2,
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'center',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
