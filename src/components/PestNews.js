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
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from './Header';
import {fetchPestsNews} from '../store/actions/actions';
import {connect} from 'react-redux';
class PestNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      title: '',
      refreshing: false,
    };
  }

  componentDidMount = async () => {
    this.makeNewRequest();
  };

  makeNewRequest = async () => {
    await this.props.fetchPestsNews();
    const {PestsNews} = this.props.reducer;
    this.setState({
      items: PestsNews.value,
      title: PestsNews.name,
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

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => Linking.openURL(item.url)}>
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
  },
  pestNewsList: {
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    height: hp('15%'),
    backgroundColor: '#ffffff',
    marginBottom: 5,
    marginLeft: '2%',
    borderRadius: 2,
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

const mapStateToProps = state => ({
  reducer: state,
});

export default connect(
  mapStateToProps,
  {fetchPestsNews},
)(PestNews);
