import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, gStyle } from '../constants';

function TouchTextIcon({ icon, iconSize = 20 , onPress, text, width = 280 }) {
  return (
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      onPress={onPress}
      style={[styles.container, { width }]}
    >
      <View style={styles.icon}>
        {React.cloneElement(icon, { size: iconSize })}
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}



TouchTextIcon.propTypes = {
  // required
  icon: PropTypes.element.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,

  // optional
  iconSize: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    color: colors.infoGrey,
    fontFamily: fonts.light,
    marginTop: 2
  },
  icon: {
    justifyContent: 'center'
  }
});

export default TouchTextIcon;
