import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  animatedNumber: {
    flexDirection: 'row', 
    overflow: 'hidden',
  },

  reel: {
    flexDirection: 'column',
  }
});

const lineHeightMultiplier = 1.2;

export { styles, lineHeightMultiplier };