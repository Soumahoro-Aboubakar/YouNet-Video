import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts, gStyle } from '../constants';

function TouchText({ onPress = ()=> console.log(""), text, textStyle = {} }) {
  return (
    <TouchableOpacity activeOpacity={gStyle.activeOpacity} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}



TouchText.propTypes = {
  // optionnel
  onPress: PropTypes.func,
  text: PropTypes.string.isRequired,

  // optionnel
  textStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
};


const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontFamily: fonts.medium
  }
});

export default TouchText;
