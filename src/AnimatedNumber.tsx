import { useMemo, useCallback } from 'react';
import { View, StyleProp, TextStyle, Dimensions } from 'react-native';

import { Reel } from './Reel';
import { styles, lineHeightMultiplier } from './AnimatedNumberStyle';

type AnimatedNumberProps = {
  value: number;
  format?: Intl.NumberFormat;
  fontSize: number;
  textStyle?: StyleProp<TextStyle>;
  duration: number;
};

const { fontScale } = Dimensions.get('window');

function AnimatedNumber(props: AnimatedNumberProps) {
  const { value, format, fontSize, textStyle, duration } = props;

  const symbols = useMemo(() => {
    const formattedValue = format ? format.format(value) : value.toString();
    return formattedValue.split('');
  }, [value, format]);

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

  return <View style={contentContainerStyle}>{renderReels()}</View>;
}

export { AnimatedNumber };
