import { useMemo, useEffect, useCallback } from 'react';
import {
  Text,
  StyleProp,
  TextStyle,
  FontVariant,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { styles, lineHeightMultiplier } from './AnimatedNumberStyle';

type ReelProps = {
  fontSize: number;
  textStyle?: StyleProp<TextStyle>;
  symbol: string;
  duration: number;
};

const reelNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const frameDuration = 16;
const fontVariant = ['tabular-nums' as FontVariant];
const { fontScale } = Dimensions.get('window');

function Reel(props: ReelProps) {
  const { fontSize, symbol, duration, textStyle } = props;

  const lineHeight = fontSize * lineHeightMultiplier;

  const fontStyle = useMemo(
    (): TextStyle =>
      StyleSheet.flatten([textStyle, { fontSize, lineHeight, fontVariant }]),
    [textStyle, fontSize, lineHeight]
  );

  const isNumber = /\d/.test(symbol);

  const getOffset = useCallback(() => {
    if (!isNumber) {
      return 0;
    }
    const digit = parseInt(symbol, 10);
    return fontSize * -lineHeightMultiplier * digit * fontScale;
  }, [isNumber, symbol, fontSize]);

  const translateY = useSharedValue(getOffset());

  const style = useAnimatedStyle(() => {
    return {
      ...styles.reel,
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    if (isNumber) {
      translateY.value = withTiming(getOffset(), { duration });
    } else {
      // Direct setting to 0 from JS thread is async and slower than using withTiming
      translateY.value = withTiming(0, { duration: frameDuration });
    }
  }, [symbol, isNumber, duration, translateY, fontSize, getOffset]);

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
