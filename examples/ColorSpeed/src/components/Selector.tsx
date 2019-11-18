import React from 'react';
import { StyleSheet, View, Picker, Text, Button } from 'react-native';

interface Props {
  values: string[];
  onSelect: (value: SpeedUnit) => void;
  selected: string;
  label: string;
  style?: any;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  counter: {
    fontSize: 60,
    textAlign: 'center',
    height: 80,
  },
  button: {
    fontSize: 20,
    position: 'relative',
    top: -32,
    right: -50,
  },
});

class Selector extends React.PureComponent<Props> {
  
    private pickerItem(value: string, index: number) {
        return <Picker.Item key={index} label={value} value={value} />;
    }
  
    public render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.label}</Text>
        <Picker
          selectedValue={this.props.selected}
          style={[this.props.style, { height: 50}]}
          onValueChange={(itemValue, itemIndex) => this.props.onSelect(itemValue)}>
          {this.props.values.map(this.pickerItem)}
        </Picker>
      </View>
    );
  }
}

export default Selector;