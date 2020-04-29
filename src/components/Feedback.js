import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from './Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {postFeedback} from '../store/actions/actions';
import {connect} from 'react-redux';

const REACTIONS = [
  {
    label: 'Terrible',
    rating: 1,
    src: require('../assets/img/worried.png'),
    bigSrc: require('../assets/img/worried_big.png'),
  },
  {
    label: 'Bad',
    rating: 2,
    src: require('../assets/img/sad.png'),
    bigSrc: require('../assets/img/sad_big.png'),
  },
  {
    label: 'Okay',
    rating: 3,
    src: require('../assets/img/ambitious.png'),
    bigSrc: require('../assets/img/ambitious_big.png'),
  },
  {
    label: 'Good',
    rating: 4,
    src: require('../assets/img/smile.png'),
    bigSrc: require('../assets/img/smile_big.png'),
  },
  {
    label: 'Great',
    rating: 5,
    src: require('../assets/img/surprised.png'),
    bigSrc: require('../assets/img/surprised_big.png'),
  },
];
const WIDTH = 380;
const DISTANCE = WIDTH / REACTIONS.length;
const END = WIDTH - DISTANCE;

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '0',
      email: '',
      Comments: '',
      isValid: false,
    };
    this._pan = new Animated.Value(2 * DISTANCE);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        this._pan.setOffset(this._pan._value);
        this._pan.setValue(0);
      },
      onPanResponderMove: Animated.event([null, {dx: this._pan}]),
      onPanResponderRelease: () => {
        this._pan.flattenOffset();

        let offset = Math.max(0, this._pan._value + 0);
        if (offset < 0) {
          return this._pan.setValue(0);
        }
        if (offset > END) {
          return this._pan.setValue(END);
        }

        const modulo = offset % DISTANCE;
        offset =
          modulo >= DISTANCE / 2
            ? offset + (DISTANCE - modulo)
            : offset - modulo;

        this.updatePan(offset);
      },
    });
  }

  updatePan(toValue, reaction) {
    Animated.spring(this._pan, {toValue, friction: 7}).start();
    this.setState({rating: reaction.rating});
  }

  submitFeedback = async () => {
    const {email, comments, rating} = this.state;
    const payload = {
      email: email,
      comments: comments,
      rating: rating,
    };
    await postFeedback(payload);
    this.props.navigation.navigate('Farm Crops');
  };

  validateFeedback = () => {
    const {email, comments, rating} = this.state;
    if (
      email === '' ||
      email === undefined ||
      (comments === '' || comments === undefined) ||
      rating === undefined
    ) {
      this.setState({
        isValid: true,
      });
    } else {
      this.submitFeedback();
    }
  };
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header navigation={navigation} />
        <View style={{flex: 2, justifyContent: 'center'}}>
          <Text
            style={{
              textAlignVertical: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              textTransform: 'capitalize',
            }}>
            Give your Feedback
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            textAlignVertical: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder="Enter Email"
            style={{
              width: wp('90%'),
              borderBottomColor: 'gray',
              borderBottomWidth: 2,
            }}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
          {this.state.isValid &&
          (this.state.email === '' || this.state.email === undefined) ? (
            <Text style={{color: 'red'}}>Please enter the email</Text>
          ) : null}
        </View>
        <View
          style={{
            flex: 2,
            textAlignVertical: 'center',
            justifyContent: 'center',
          }}>
          <TextInput
            placeholder="Enter Comments"
            style={{
              width: wp('90%'),
              borderBottomColor: 'gray',
              borderBottomWidth: 2,
            }}
            onChangeText={comments => this.setState({comments})}
            value={this.state.comments}
          />
          {this.state.isValid &&
          (this.state.comments === '' || this.state.comments === undefined) ? (
            <Text style={{color: 'red'}}>Please enter the comments</Text>
          ) : null}
        </View>
        <View style={styles.wrap}>
          <View style={styles.reactions}>
            {REACTIONS.map((reaction, idx) => {
              const u = idx * DISTANCE;
              let inputRange = [u - 20, u, u + 20];
              let scaleOutputRange = [1, 0.25, 1];
              let topOutputRange = [0, 10, 0];
              let colorOutputRange = ['#999', '#222', '#999'];

              if (u - 20 < 0) {
                inputRange = [u, u + 20];
                scaleOutputRange = [0.25, 1];
                topOutputRange = [10, 0];
                colorOutputRange = ['#222', '#999'];
              }

              if (u + 20 > END) {
                inputRange = [u - 20, u];
                scaleOutputRange = [1, 0.25];
                topOutputRange = [0, 10];
                colorOutputRange = ['#999', '#222'];
              }

              return (
                <TouchableOpacity
                  onPress={() => this.updatePan(u, reaction)}
                  activeOpacity={0.9}
                  key={idx}>
                  <View style={styles.smileyWrap}>
                    <Animated.Image
                      source={reaction.src}
                      style={[
                        styles.smiley,
                        {
                          transform: [
                            {
                              scale: this._pan.interpolate({
                                inputRange,
                                outputRange: scaleOutputRange,
                                extrapolate: 'clamp',
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  </View>

                  <Animated.Text
                    style={[
                      styles.reactionText,
                      {
                        top: this._pan.interpolate({
                          inputRange,
                          outputRange: topOutputRange,
                          extrapolate: 'clamp',
                        }),
                        color: this._pan.interpolate({
                          inputRange,
                          outputRange: colorOutputRange,
                          extrapolate: 'clamp',
                        }),
                      },
                    ]}>
                    {reaction.label}
                  </Animated.Text>
                </TouchableOpacity>
              );
            })}
            <Animated.View
              {...this._panResponder.panHandlers}
              style={[
                styles.bigSmiley,
                {
                  transform: [
                    {
                      translateX: this._pan.interpolate({
                        inputRange: [0, END],
                        outputRange: [0, END],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}>
              {REACTIONS.map((reaction, idx) => {
                let inputRange = [
                  (idx - 1) * DISTANCE,
                  idx * DISTANCE,
                  (idx + 1) * DISTANCE,
                ];
                let outputRange = [0, 1, 0];

                if (idx === 0) {
                  inputRange = [idx * DISTANCE, (idx + 1) * DISTANCE];
                  outputRange = [1, 0];
                }

                if (idx === REACTIONS.length - 1) {
                  inputRange = [(idx - 1) * DISTANCE, idx * DISTANCE];
                  outputRange = [0, 1];
                }
                return (
                  <Animated.Image
                    key={idx}
                    source={reaction.bigSrc}
                    style={[
                      styles.bigSmileyImage,
                      {
                        opacity: this._pan.interpolate({
                          inputRange,
                          outputRange,
                          extrapolate: 'clamp',
                        }),
                      },
                    ]}
                  />
                );
              })}
            </Animated.View>
          </View>
        </View>
        <View
          style={{
            flex: 1.2,
            flexDirection: 'row',
            borderTopColor: 'gray',
            borderTopWidth: 0.3,
          }}>
          <TouchableOpacity style={{flex: 10, alignItems: 'center'}}>
            <View>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontWeight: 'Bold',
                  fontSize: hp('3%'),
                }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.validateFeedback()}
            style={{
              borderLeftWidth: 0.3,
              borderLeftColor: 'gray',
              flex: 4,
              justifyContent: 'center',
            }}>
            <View>
              <Text
                style={{
                  alignItems: 'center',
                  textAlign: 'center',
                  fontWeight: 'Bold',
                  fontSize: hp('2.5%'),
                }}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const size = 42;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  wrap: {
    flex: 6,
    marginTop: hp('10%'),
    width: WIDTH,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  smileyWrap: {
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#c7ced3',
  },
  bigSmiley: {
    width: DISTANCE,
    height: DISTANCE,
    borderRadius: DISTANCE / 2,
    backgroundColor: '#ffb18d',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bigSmileyImage: {
    width: DISTANCE,
    height: DISTANCE,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reactionText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
    fontWeight: '400',
    fontFamily: 'Avenir',
  },
});

const mapStateToProps = state => ({
  mainReducer: state,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feedback);
