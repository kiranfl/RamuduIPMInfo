import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  Image,
  Linking,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from './Header';
import {fetchVideos} from '../store/actions/actions';
import {connect} from 'react-redux';
class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      refreshing: false,
    };
  }

  componentDidMount = async () => {
    this.makeNewRequest();
  };

  makeNewRequest = async () => {
    await this.props.fetchVideos();
    const {VideosList} = this.props.reducer;
    this.setState({
      items: VideosList.value,
      name: VideosList.name,
      refreshing: false,
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.makeNewRequest();
      },
    );
  };

  imageUrl = item => {
    const vid = item.split('?v=');
    return `https://img.youtube.com/vi/${vid[1]}/default.jpg`;
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => Linking.openURL(item.url)}>
        <Image style={styles.cardImg} source={{uri: this.imageUrl(item.url)}} />
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
          <Text style={styles.title}>{this.state.name}</Text>
        </View>
        <FlatList
          style={styles.List}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 10,
  },
  List: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  card: {
    flex: 1,
    height: hp('15%'),
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginLeft: '2%',
    borderRadius: 2,
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
  cardImg: {
    flex: 4,
    width: '100%',
    resizeMode: 'cover',
  },
  cardText: {
    flex: 8,
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

const mapStateToProps = state => ({
  reducer: state,
});

export default connect(
  mapStateToProps,
  {fetchVideos},
)(Videos);
