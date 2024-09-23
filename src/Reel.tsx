import { useMemo, useEffect, useCallback } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { TextStyle, FontVariant } from 'react-native';

import { styles, lineHeightMultiplier } from './AnimatedNumberStyle';

type ReelProps = {
  fontSize: number;
  textStyle?: TextStyle;
  symbol: string;
  duration: number;
};

const reelNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const frameDuration = 16;
const fontVariant = ['tabular-nums' as FontVariant];

function Reel(props: ReelProps) {
  const { fontSize, symbol, duration, textStyle } = props;

  const lineHeight = fontSize * lineHeightMultiplier;

  const fontStyle = useMemo(
    () => ({ ...textStyle, fontSize, lineHeight, fontVariant }),
    [textStyle, fontSize, lineHeight]
  );

  const translateY = useSharedValue(0);

  const isNumber = /\d/.test(symbol);

  const style = useAnimatedStyle(() => {
    return {
      ...styles.reel,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    if (isNumber) {
      const digit = parseInt(symbol, 10);
      translateY.value = withTiming(fontSize * -lineHeightMultiplier * digit, {
        duration,
      });
    } else {
      // Direct setting to 0 from JS thread is async and slower than using withTiming
      translateY.value = withTiming(0, { duration: frameDuration });
    }
  }, [symbol, isNumber, duration, translateY, fontSize]);

  const renderContent = useCallback(() => {
    const renderReelNumbers = () => {
      return reelNumbers.map((number) => {
        return (
          <Text key={number} style={fontStyle}>
            {number}
          </Text>
        );
      });
    };

    const renderSymbol = () => {
      return (
        <Text key={symbol} style={fontStyle}>
          {symbol}
        </Text>
      );
    };

    return isNumber ? renderReelNumbers() : renderSymbol();
  }, [fontStyle, isNumber, symbol]);

  return <Animated.View style={style}>{renderContent()}</Animated.View>;
}

export { Reel };
