import React from 'react';
import { StyleSheet, View, Picker, Text } from 'react-native';

interface Props {
  values: string[];
  onSelect: (value: string) => void;
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
          style={[this.props.style]}
          onValueChange={(itemValue) => this.props.onSelect(itemValue)}>
          {this.props.values.map(this.pickerItem)}
        </Picker>
      </View>
    );
  }
}

export default Selector;