import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, gStyle } from '../constants';
//YouNet
// icons
//w9lGmFNJplnTRf26 password 
//aboubakarkone8958 username
//currente id :  38.199.237.65)
import SvgCast from '../icons/Svg.Cast';

function Cast({ setShowHeader }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      onPress={() => setShowHeader(false)}
      style={styles.container}
    >
      <SvgCast />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.castGrey,
    borderRadius: 26,
    bottom: 16,
    height: 52,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    shadowColor: colors.black,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: 52
  }
});

export default Cast;
