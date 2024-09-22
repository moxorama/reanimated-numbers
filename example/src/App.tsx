import React,{ useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedNumber } from 'react-native-reanimated-number';


export default function App() {

  const [number, setNumber] = useState(812);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber(number + 123);
    }, 2000);
    return () => clearInterval(interval);
  }, [number]);

  return (
    <View style={styles.container}>
      <AnimatedNumber
        value={number} 
        fontSize={48}  
        duration={750} 
        format={new Intl.NumberFormat('en-US')}   
      />
      <StatusBar style="auto" />
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
