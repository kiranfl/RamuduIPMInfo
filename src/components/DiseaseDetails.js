import React, {Component} from 'react';
import Carousel from 'react-native-banner-carousel';
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import HTML from 'react-native-render-html';
import {base_url} from '../constants/Constant';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

  renderItem(item) {
    return (
      <ScrollView>
        <View>
          <HTML
            tagsStyles={{
              p: {fontSize: 10},
              font: {color: '#C99700'},
            }}
            html={item}
          />
        </View>
      </ScrollView>
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'relative',
              bottom: hp('36%'),
              left: wp('90%'),
            }}>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'relative',
              bottom: hp('7%'),
              left: wp('85%'),
              right: wp('2%'),
              borderRadius: 50,
              width: 50,
              height: 50,
              backgroundColor: '#354A5E',
            }}
            onPress={() =>
              this.props.navigation.navigate('Carousel', {
                images: this.state.images,
              })
            }>
            <Icon
              style={{
                position: 'absolute',
                left: wp('3.5%'),
                top: hp('2%'),
              }}
              name="image"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}}>
          {this.renderItem(this.state.items.content)}
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
