import { useMemo, useCallback } from 'react';
import {
  View,
  StyleProp,
  TextStyle,
  Dimensions,
  ViewProps,
} from 'react-native';

import { Reel } from './Reel';
import { styles, lineHeightMultiplier } from './AnimatedNumberStyle';

type OwnProps = {
  value: number;
  format?: Intl.NumberFormat;
  fontSize: number;
  textStyle?: StyleProp<TextStyle>;
  duration: number;
};

type AnimatedNumberProps = ViewProps & OwnProps;

const { fontScale } = Dimensions.get('window');

function AnimatedNumber(props: AnimatedNumberProps) {
  const { value, format, fontSize, textStyle, duration, ...viewProps } = props;

  const formattedValue = format ? format.format(value) : value.toString();
  const symbols = formattedValue.split('');

  const renderReels = useCallback(() => {
    return symbols.map((symbol, index) => {
      return (
        <Reel
          key={`reel-${index}`}
          fontSize={fontSize}
          textStyle={textStyle}
          symbol={symbol}
          duration={duration}
        />
      );
    });
  }, [symbols, fontSize, duration, textStyle]);

  const contentContainerStyle = useMemo(
    () => ({
      ...styles.animatedNumber,
      height: fontSize * lineHeightMultiplier * fontScale,
    }),
    [fontSize]
  );

  return (
    <View
      style={contentContainerStyle}
      {...viewProps}
      accessibilityRole="text"
      accessibilityLabel={formattedValue}
      aria-label={formattedValue}
    >
      {renderReels()}
    </View>
  );
}

export { AnimatedNumber };
