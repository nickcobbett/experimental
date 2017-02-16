import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView} from 'react-native';
// import Accelerometer from 'NativeModules';

var {
  DeviceEventEmitter // will emit events that you can listen to
} = React;

class GeolocationExample extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows(['hello'])
    };
  }

  watchID: ?number = null;

  sendData(coordinates) {
    fetch('https://requestb.in/124tk7t1', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coordinates)
    }).then(success => {
      console.log('success###')
    }).catch(error => {
      console.log('error###', error)
    })
  }

  getLatAndLong(position) {
    var coords = JSON.parse(position).coords;
    var lat = coords.latitude;
    var long = coords.longitude;

    this.setState({
      dataSource: this.ds.cloneWithRows({lat: lat, long: long})
    })

    console.log(lat, long)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
        var initialPosition = JSON.stringify(position);
        this.getLatAndLong(initialPosition);
      }, error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition(position => {
      var lastPosition = JSON.stringify(position);
      this.sendData(lastPosition);
      this.getLatAndLong(lastPosition);
    }, error => {
      console.log('error')
    }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1});

    console.log('#####', this.watchID)

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData}</Text>}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  view: {
    marginTop: 20
  },
  title: {
    fontWeight: '500',
  },
});

export default GeolocationExample


      // <View style={styles.view}>
      //   <Text>
      //     <Text style={styles.title}>Initial position: </Text>
      //     {this.state.initialPosition}
      //   </Text>
      //   <Text>
      //     <Text style={styles.title}>Current position: </Text>
      //     {this.state.lastPosition}
      //   </Text>