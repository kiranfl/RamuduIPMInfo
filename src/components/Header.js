import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

function Header(props) {
  return (
    <TouchableOpacity
      style={{
        width: wp('100%'),
        height: hp('8%'),
        backgroundColor: '#997615',
        justifyContent: 'center',
      }}
      onPress={() => props.navigation.toggleDrawer()}>
      <TouchableOpacity>
        <Icon
          style={{position: 'absolute', left: wp('2%'), top: hp('0.5%')}}
          size={25}
          name="navicon"
          backgroundColor="#3b5998"
          color="white"
        />
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: wp('20%'),
          alignItems: 'center',
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: 25,
        }}>
        IPMInfo
      </Text>
    </TouchableOpacity>
  );
}

export default Header;
