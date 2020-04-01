import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      name: '',
      originalName: '',
      description: '',
      id: '',
    };
  }
  componentDidMount() {
    this.getCropDetails();
  }
  getCropDetails = () => {
    const url = 'http://23.20.169.44/api/en-us/crops';
    fetch(url)
      .then(response => response.json())
      .then(responsejson => {
        this.setState({
          data: responsejson,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCrops = index => {
    console.log(index);
    this.setState(
      {
        name: this.state.data[index].name,
        originalName: this.state.data[index].scientificName,
        description: this.state.data[index].description,
        id: this.state.data[index].id,
      },
      function () {
        console.log(index);
      },
    );
  };
  renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ textTransform:'uppercase',fontSize: 25,textAlign:'center', fontWeight: 'bold', marginBottom: 15 }}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={{ width: 200, height: 280, borderRadius: 20 }} />
      </View>
    );
  };

  render() {
    const { width } = Dimensions.get('window');
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 10, justifyContent: 'center', flexDirection: 'column' }}>
          <View style={{ flex: 6 }}>
            <Carousel
              ref={ref => (this.carousel = ref)}
              firstItem={1}
              sliderWidth={1000}
              itemWidth={500 / 2.5}
              height={250}
              data={this.state.data}
              renderItem={this.renderItem}
              onSnapToItem={index => this.getCrops(index)}
              onBeforeSnapToItem={index => this.getCrops(index)}
              containerCustomStyle={{ overflow: 'visible' }}
              contentContainerCustomStyle={{ overflow: 'visible' }}
              enableMomentum={true}
            />
          </View>
          <View style={{ flex: 3, alignItems: 'center', padding: 20 }}>
            <Text style={{ marginTop: 5,fontSize:24,padding:5 }}>{this.state.originalName}</Text>
            <Text style={{ textAlign: "center", width: wp('50%') }}>{this.state.description}</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderTopColor: 'gray', borderTopWidth: .6 }}>
          <TouchableOpacity style={{ flex: 2, alignItems: 'center' }}>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MoreDetails', { data: { id: this.state.id } })} style={{ flex: 6, alignItems: 'center' }}>
            <View>
              <Text style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontWeight: 'Bold', fontSize: hp('3%'), marginTop: hp('2%') }}>More details</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 2, alignItems: 'center' }}>
            <View style={{ marginTop: 20, alignSelf: 'flex-end' }}>
              <View style={{ width: 30, padding: 5, paddingLeft: 8, height: 30, borderWidth: 1, borderRadius: 50, backgroundColor: "gray", borderColor: 'gray' }}>
                <Icon
                  size={20}
                  name="chevron-right"
                  color="white">
                </Icon>
              </View>
            </View>
          </TouchableOpacity>
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
});

export default Home;
