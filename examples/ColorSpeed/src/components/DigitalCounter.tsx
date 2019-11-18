import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

interface Props {
  color?: string;
  count: number;
  buttonText: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  counter: {
    fontSize: 60,
    textAlign: 'center',
    height: 80,
  },
});

export default (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.counter, {color: props.color}]}>{props.count.toFixed(0).toString().padStart(3,'0')}</Text>
      <Button onPress={props.onPress} title={props.buttonText} />
    </View>
  );
};
