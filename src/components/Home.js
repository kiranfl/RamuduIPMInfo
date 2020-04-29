import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fetchCropsDetails} from '../store/actions/actions';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import strawberry from '../assets/img/strawberry-icon.png';
import lettuce from '../assets/img/lettuce.png';
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      name: '',
      originalName: '',
      description: '',
      id: '',
      img: null,
    };
  }

  componentDidMount = async () => {
    await this.props.redFuncfetchCropsData();
  };

  componentWillReceiveProps = nextProps => {
    const {cropsList} = nextProps.reducer;
    if (cropsList !== undefined && cropsList.length > 0) {
      this.setState({
        name: cropsList[0].name,
        originalName: cropsList[0].scientificName,
        description: cropsList[0].description,
        id: cropsList[0].id,
        img: cropsList[0].image,
      });
    }
  };

  getCrops = async index => {
    const {cropsList} = this.props.reducer;
    this.setState(
      {
        name: cropsList[index].name,
        originalName: cropsList[index].scientificName,
        description: cropsList[index].description,
        id: cropsList[index].id,
        img: cropsList[index].image,
      },
      function() {},
    );
  };
  renderItem = ({item}) => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={{uri: item.image}}
          style={{width: 200, height: 260, borderRadius: 20}}
        />
      </View>
    );
  };

  render() {
    const {cropsList} = this.props.reducer;
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 6,
            marginTop: 15,
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              textTransform: 'uppercase',
              fontSize: 25,
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: 15,
            }}>
            {this.state.name}
          </Text>
          <Carousel
            ref={ref => (this.carousel = ref)}
            firstItem={2}
            sliderWidth={wp('100%')}
            itemWidth={200}
            data={cropsList}
            renderItem={this.renderItem}
            onSnapToItem={index => this.getCrops(index)}
            onBeforeSnapToItem={index => this.getCrops(index)}
            containerCustomStyle={{overflow: 'visible'}}
            contentContainerCustomStyle={{overflow: 'visible'}}
            enableMomentum={true}
          />
        </View>
        <View style={{flex: 1.5, alignItems: 'center', padding: 20}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon
              name="star"
              size={20}
              style={{
                position: 'absolute',
                top: 17,
                left: -30,
                color: 'gray',
              }}
            />
            <Text style={{marginTop: 5, fontSize: 24, padding: 5}}>
              {this.state.originalName}
            </Text>
          </View>
          <Text style={{textAlign: 'center', width: wp('90%')}}>
            {this.state.description}
          </Text>
        </View>
        <View style={{flex: 4, justifyContent: 'center'}}>
          <ImageBackground
            source={{uri: this.state.img}}
            style={styles.imagePreview}>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('MoreDetails', {
                    data: {id: this.state.id},
                  })
                }>
                <View>
                  {this.state.name === 'Lettuce' ? (
                    <Image
                      style={{
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        left: 10,
                        top: hp('0%'),
                      }}
                      source={lettuce}
                    />
                  ) : (
                    <Image
                      style={{
                        position: 'absolute',
                        width: 30,
                        height: 30,
                        left: 10,
                        top: hp('0%'),
                      }}
                      source={strawberry}
                    />
                  )}
                  <Text style={styles.moredetails}>More details</Text>
                </View>
                <View style={styles.icon}>
                  <Icon size={18} name="chevron-right" color="white" />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    justifyContent: 'center',
    width: wp('100%'),
    height: hp('30%'),
    opacity: 0.7,
  },
  footer: {
    position: 'relative',
    width: wp('100%'),
    height: hp('8%'),
    top: 85,
    bottom: 0,
    paddingTop: wp('3.3%'),
    backgroundColor: 'white',
  },
  moredetails: {
    textAlign: 'center',
    fontSize: hp('3%'),
  },
  icon: {
    position: 'absolute',
    width: 30,
    top: 0,
    right: 8,
    height: 30,
    borderRadius: 50,
    paddingLeft: 10,
    paddingTop: 6,
    backgroundColor: 'gray',
    borderColor: 'gray',
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
  redFuncfetchCropsData: fetchCropsDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
