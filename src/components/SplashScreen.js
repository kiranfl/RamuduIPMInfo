import React, {Component} from 'react';
import {View, Image, StyleSheet, Animated, Text} from 'react-native';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LogoAnime: new Animated.Value(0),
      LogoText: new Animated.Value(0),
      LoadingSpinner: false,
    };
  }

  componentWillMount() {
    setInterval(() => {
      this.props.navigation.navigate('Main');
    }, 3000);
  }

  componentDidMount() {
    const {LogoAnime, LogoText} = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }).start(),
      Animated.timing(LogoText, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.setState({
        LoadingSpinner: true,
      });
    });
  }

  render() {
    const spin = this.state.LogoAnime.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            transform: [{rotate: spin}],
          }}>
          <Image
            style={styles.logoImg}
            source={require('../assets/img/logo.png')}
          />
        </Animated.View>
        <Animated.View style={{opacity: this.state.LogoText}}>
          <Text style={styles.logoText}>IPMInfo</Text>
        </Animated.View>
        <Text style={styles.version}>Version: 1.0</Text>
      </View>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#997615',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    marginTop: 270,
    width: 60,
    height: 60,
  },
  logoText: {
    fontFamily: 'GoogleSans-Bold',
    letterSpacing: 0.8,
    color: 'white',
    fontSize: 30,
    marginTop: 5,
    fontWeight: 'bold',
  },
  version: {
    color: 'white',
    marginTop: 250,
  },
});
