import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AnimatedNumber } from '../../src/';

export default function App() {
  const [number, setNumber] = useState(812);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((n) => n + 123);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <AnimatedNumber
        value={number}
        fontSize={48}
        duration={750}
        format={new Intl.NumberFormat('en-US')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
