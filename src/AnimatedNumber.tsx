import { useMemo, useCallback } from 'react';
import { View } from 'react-native';
import type { TextStyle } from 'react-native';

import { Reel } from './Reel';
import { styles, lineHeightMultiplier } from './AnimatedNumberStyle';

type AnimatedNumberProps = {
  value: number;
  format?: Intl.NumberFormat;
  fontSize: number;
  textStyle?: TextStyle;
  duration: number;
};

function AnimatedNumber(props: AnimatedNumberProps) {
  const { value, format, fontSize, textStyle, duration } = props;

  const formattedValue = useMemo(() => {
    return format ? format.format(value) : value.toString();
  }, [value, format]);

  const symbols = useMemo(
    () => formattedValue.toString().split(''),
    [formattedValue]
  );

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
      height: fontSize * lineHeightMultiplier,
    }),
    [fontSize]
  );

  return <View style={contentContainerStyle}>{renderReels()}</View>;
}

export { AnimatedNumber };
