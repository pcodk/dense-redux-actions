import React from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { GeolocationResponse } from '@react-native-community/geolocation';
import DigitalCounter from './DigitalCounter';
import Selector from './Selector';
import { speedUnits } from '../utils/variables';
import { strings } from '../locales/index';

interface Props {
  whereAmI: () => void;
  currentLocation?: GeolocationResponse;
  unit: SpeedUnit;
  selectUnit: (newUnit: SpeedUnit) => void;
  selectSpeedLimit: (newLimit: string) => void;
  speedLimit: string;
  speedLimits: string[];
  currentSpeed: number;
  toggleSpeedMonitor: () => void;
  isMonitoringSpeed: boolean;
}
class SpeedMonitor extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.selectColor = this.selectColor.bind(this);
    this.state = {};
  }

  private showLocation(location?: GeolocationResponse) {
    if (!location) {
      return;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text>{strings('speedMonitor.lat')} </Text>
          <Text>{`${location.coords.latitude}`} </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{strings('speedMonitor.lon')}</Text>
          <Text>{`${location.coords.longitude}`}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{strings('speedMonitor.alt')}</Text>
          <Text>{`${location.coords.altitude}`}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{strings('speedMonitor.timestamp')}</Text>
          <Text>{`${location.timestamp}`}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text>{'speed: '}</Text>
          <Text>{`${location.coords.speed}`}</Text>
        </View>
      </View>
    );
  }

  private selectColor() {
    // percent of speed limit.

    const currentLimit = parseFloat(this.props.speedLimit);

    if (this.props.currentSpeed <= 0) {
      return 'black';
    }

    if (this.props.currentSpeed / currentLimit  <= 0.9) {
      return 'green';
    }

    if (this.props.currentSpeed / currentLimit <= 1) {
      return 'yellow';
    }

    if (this.props.currentSpeed / currentLimit > 1) {
      return 'red';
    }
  }

  public render() {
    return (
      <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', height: '20%' }}>
            <Selector
              style={{ width: 100 }}
              label={strings('speedMonitor.selectLimit')}
              selected={this.props.speedLimit}
              values={this.props.speedLimits}
              onSelect={this.props.selectSpeedLimit}
            />
            <Selector
              style={{ width: 120 }}
              label={strings('speedMonitor.selectUnit')}
              selected={this.props.unit}
              values={speedUnits}
              onSelect={this.props.selectUnit}
            />
          </View>
          <DigitalCounter
            color={this.selectColor()}
            buttonText={this.props.isMonitoringSpeed ? strings('speedMonitor.stop') : strings('speedMonitor.start')}
            count={this.props.currentSpeed}
            onPress={this.props.toggleSpeedMonitor}
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Button onPress={this.props.whereAmI} title={ strings('speedMonitor.getLocationButton')} />
            {this.showLocation(this.props.currentLocation)}
          </View>
      </SafeAreaView>
    );
  }
}

export default SpeedMonitor;
