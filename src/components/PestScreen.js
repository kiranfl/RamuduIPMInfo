import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {getPreviewDetails} from '../store/actions/actions';
import {fetchPestDetails} from '../store/actions/actions';
import {connect} from 'react-redux';

class PestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount = async () => {
    await this.props.redFuncfetchPestDetails(this.props.route.params.id);
    const {pestsList} = this.props.reducer;
    if (pestsList !== undefined && pestsList.length > 0) {
      this.setState({
        items: pestsList[1]._subCategories,
      });
    }
  };

  navigateToDetailsScreen = async item => {
    const catposts = item._catposts;
    const details = [];
    for (let i = 0; i < catposts.length; i++) {
      let getResult = await getPreviewDetails(catposts[i]._id);
      details.push(getResult);
    }
    this.props.navigation.navigate('diseaseDetails', details);
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => this.navigateToDetailsScreen(item)}>
        <Image style={styles.cardImg} source={{uri: item.image}} />
        <Text style={styles.cardText}>{item.name}</Text>
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
    return (
      <View style={styles.container}>
        <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Pests</Text>
        </View>
        <FlatList
          style={styles.pestList}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
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
  pestList: {
    flex: 1,
  },
  card: {
    flex: 1,
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
  cardText: {
    flex: 8,
    fontSize: 16,
    padding: 10,
    textAlignVertical: 'center',
  },
  cardImg: {
    flex: 3,
    width: '100%',
    height: 100,
    resizeMode: 'cover',
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

const mapDispatchToProps = {
  redFuncfetchPestDetails: fetchPestDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PestScreen);
