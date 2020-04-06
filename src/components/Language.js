import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectEnglish: false,
      selectSpanish: false,
    };
    this.langSelect = this.langSelect.bind(this);
    this.navigateToNextScreen = this.navigateToNextScreen.bind(this);
  }
  langSelect = type => {
    if (type === 'English') {
      this.setState({selectEnglish: true, selectSpanish: false});
    } else {
      this.setState({selectEnglish: false, selectSpanish: true});
    }
  };
  navigateToNextScreen = () => {
    if (this.state.selectEnglish || this.state.selectSpanish) {
      this.props.navigation.navigate('Home');
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{marginLeft: wp('5%'), marginTop: hp('3%')}}>
          <View>
            <Text style={styles.titleText}>Pick Your</Text>
          </View>
          <View>
            <Text style={styles.titleLang}>Language</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            marginTop: hp('5%'),
          }}>
          <TouchableOpacity
            style={
              this.state.selectEnglish ? styles.langTypeSelect : styles.langType
            }
            onPress={() => this.langSelect('English')}>
            <Text
              style={
                this.state.selectEnglish
                  ? styles.langTextSelect
                  : styles.langText
              }>
              English
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              this.state.selectSpanish ? styles.langTypeSelect : styles.langType
            }
            onPress={() => this.langSelect('Spanish')}>
            <Text
              style={
                this.state.selectSpanish
                  ? styles.langTextSelect
                  : styles.langText
              }>
              Spanish
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            borderTopColor: 'rgb(211,211,211)',
            borderTopWidth: wp('0.2%'),
            marginTop: hp('45%'),
          }}>
          <TouchableOpacity onPress={() => this.navigateToNextScreen()}>
            <View
              style={{
                width: wp('20%'),
                height: hp('30%'),
                borderWidth: wp('0.5%'),
                borderColor: 'rgb(211,211,211)',
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  fontWeight: 'Bold',
                  fontSize: hp('3%'),
                  marginTop: hp('2%'),
                }}>
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Language;

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    color: 'rgb(26, 25, 24)',
    fontSize: hp('5%'),
  },
  titleLang: {
    fontWeight: 'bold',
    color: 'rgb(66, 245, 173)',
    fontSize: hp('5%'),
  },
  langType: {
    width: wp('42%'),
    height: hp('12%'),
    backgroundColor: 'rgb(211,211,211)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  langTypeSelect: {
    width: wp('42%'),
    height: hp('12%'),
    backgroundColor: 'rgb(0, 0, 102)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  langText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.8%'),
    color: 'rgb(0, 51, 0)',
  },
  langTextSelect: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.8%'),
    color: 'rgb(255, 255, 255)',
  },
});
