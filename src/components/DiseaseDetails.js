import React, {Component} from 'react';
import Carousel from 'react-native-banner-carousel';
import {
  Button,
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {base_url} from '../constants/Constant';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 800;
class DiseaseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      images: [],
    };
  }

  componentDidMount() {
    this.getDiseaseDetails();
  }

  getDiseaseDetails() {
    this.setState({isLoaded: true});
    const url = `${base_url}/posts/${
      this.props.route.params.data.id
    }?type=plain`;
    fetch(url)
      .then(response => response.json())
      .then(responsejson => {
        this.setState({
          items: responsejson,
          images: responsejson.images,
        });
      })
      .catch(error => {});
    this.setState({isLoaded: false});
  }

  renderPage(image, index) {
    return (
      <View key={index}>
        <Image
          style={{width: BannerWidth, height: BannerHeight}}
          source={{uri: image}}
        />
      </View>
    );
  }

  render() {
    const navigation = this.props.navigation;
    let {items} = this.state;
    if (items.length === 0) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          <Carousel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={BannerWidth}>
            {this.state.images.map((image, index) =>
              this.renderPage(image, index),
            )}
          </Carousel>
        </View>
        <View style={{flex: 0.8, justifyContent: 'center'}}>
          <Text
            style={{
              flex: 0.5,
              textAlignVertical: 'center',
              fontSize: 18,
              paddingLeft: 5,
            }}>
            {this.props.route.params.data.name}
          </Text>
          <Text
            style={{
              flex: 0.3,
              textAlignVertical: 'center',
              fontSize: 18,
              color: '#997615',
              paddingLeft: 5,
            }}>
            {this.state.items.name}
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text>{this.state.items.content}</Text>
        </View>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

export default DiseaseDetails;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
