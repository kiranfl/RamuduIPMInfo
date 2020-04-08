import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesData: [],
    };
    this.renderItem = this.renderItem.bind(this);
  }
  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({imagesData: this.props.route.params.images});
  }

  renderItem(item) {
    return (
      <View>
        <Image
          style={{width: wp('100%'), height: 300}}
          source={{
            uri: item.item,
          }}
        />
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{position: 'relative', left: wp('90%'), top: hp('3%')}}>
          <Icon name="close" size={30} color="#565656" />
        </TouchableOpacity>

        <View
          style={{
            justifyContent: 'center',
            position: 'relative',
            top: hp('25%'),
          }}>
          <Carousel
            data={this.state.imagesData}
            sliderWidth={450}
            itemWidth={500}
            renderItem={this.renderItem}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default ImageCarousel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
