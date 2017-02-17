import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, View, ListView} from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';

// var {
//   DeviceEventEmitter // will emit events that you can listen to
// } = React;


class GeolocationExample extends React.Component {


componentWillMount() {

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);
    // this.setState()
    // Now configure the plugin.
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 1,
      distanceFilter: 1,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable for debug sounds & notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'https://requestb.in/124tk7t1',
      autoSync: true,         // <-- POST each location immediately to server
      params: {               // <-- Optional HTTP params
        "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
  }
  onLocation(location) {
    // fetch('https://requestb.in/124tk7t1', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(location)
    // }).then(success => {
    //   console.log('success###')
    // }).catch(error => {
    //   console.log('error###', error)
    // })
    console.log('- [js]location: ', JSON.stringify(location));
  }
  onMotionChange(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  }


  render() {
    return (
        <Text>Hello</Text>
    );
  }
}


// class GeolocationExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     this.state = {
//       dataSource: this.ds.cloneWithRows(['hello'])
//     };
//   }

//   watchID: ?number = null;

//   sendData(coordinates) {
//     fetch('https://requestb.in/124tk7t1', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(coordinates)
//     }).then(success => {
//       console.log('success###')
//     }).catch(error => {
//       console.log('error###', error)
//     })
//   }

//   getLatAndLong(position) {
//     var coords = JSON.parse(position).coords;
//     var lat = coords.latitude;
//     var long = coords.longitude;

//     this.setState({
//       dataSource: this.ds.cloneWithRows({lat: lat, long: long})
//     })

//     console.log(lat, long)
//   }

//   // getLatAndLong(position) {
//   //   bgGeo.configure({
//   //     desiredAccuracy: 0,
//   //     distanceFilter: 50
//   //   }, function(state) {
//   //     console.log('- Configure success.  Current state: ', state);
//   //   });
//   //   // Use #setConfig if you need to change options after you've executed #configure

//   //   bgGeo.setConfig({
//   //       desiredAccuracy: 10,
//   //       distanceFilter: 10
//   //   }, function(state) {
//   //       console.log('- setConfig success.  Current state: ', state);
//   //   });
//   // }

//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition(position => {
//         var initialPosition = JSON.stringify(position);
//         this.getLatAndLong(initialPosition);
//       }, error => alert(JSON.stringify(error)),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//     );

//     this.watchID = navigator.geolocation.watchPosition(position => {
//       var lastPosition = JSON.stringify(position);
//       this.sendData(lastPosition);
//       this.getLatAndLong(lastPosition);
//     }, error => {
//       console.log('error')
//     }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1});

//     console.log('#####', this.watchID)

//   }

//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//   }

//   render() {
//     return (
//       <View style={{flex: 1, paddingTop: 22}}>
//         <ListView
//           dataSource={this.state.dataSource}
//           renderRow={(rowData) => <Text>{rowData}</Text>}
//         />
//       </View>
//     );
//   }
// }

// var styles = StyleSheet.create({
//   view: {
//     marginTop: 20
//   },
//   title: {
//     fontWeight: '500',
//   },
// });

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