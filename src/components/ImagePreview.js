import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import ImageView from 'react-native-image-viewing';

class ImageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesData: [],
      isImageViewVisible: true,
    };
  }

  componentDidMount = () => {
    const tempImageList = [];
    for (var i = 0; i < this.props.route.params.images.length; i++) {
      var obj = {};
      obj.uri = this.props.route.params.images[i];
      tempImageList.push(obj);
    }
    this.setState({
      imagesData: tempImageList,
    });
  };

  closeRequest = () => {
    this.setState({isImageViewVisible: false});
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageView
          images={this.state.imagesData}
          imageIndex={0}
          visible={this.state.isImageViewVisible}
          presentationStyle="overFullScreen"
          onRequestClose={() => this.closeRequest()}
        />
      </View>
    );
  }
}
export default ImageCarousel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
