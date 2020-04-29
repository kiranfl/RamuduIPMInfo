import React, {Component} from 'react';
import Carousel from 'react-native-banner-carousel';
import {
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import WebView from 'react-native-webview';
import Swiper from 'react-native-swiper';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 800;
class DiseaseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      images: [],
    };
  }

  componentDidMount = () => {
    this.setState(
      {
        items: this.props.route.params,
        images: this.props.route.params[0].images,
      },
      () => {},
    );
  };

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

  pageChange = index => {
    this.setState({
      images: this.state.items[index].images,
      activeSlide: 0,
    });
  };

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
              zIndex: 999,
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
                bottom: hp('2%'),
              }}
              name="image"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}}>
          <Swiper
            style={styles.wrapper}
            showsButtons={false}
            loop={false}
            onIndexChanged={index => this.pageChange(index)}>
            {this.state.items.map(val => {
              return (
                <View style={{flex: 1}}>
                  <WebView
                    originWhitelist={['*']}
                    source={{html: val.content}}
                  />
                </View>
              );
            })}
          </Swiper>
        </View>
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
  wrapper: {
    position: 'relative',
  },
});
