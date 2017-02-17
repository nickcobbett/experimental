// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Vibration
} from 'react-native';
// import GeolocationExample from './components/GeolocationExample.js';
// import Foo from './components/foo.js';

// export default class ThesisTest extends Component {
//   render() {
//     return (
//       <Foo/>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// import React, { Component } from 'react';
// import {AppRegistry, StyleSheet, Text, View, ListView} from 'react-native';
import BackgroundGeolocation from "react-native-background-geolocation";

var ThesisTest = React.createClass({

  componentWillMount() {
    // var pattern = [0];
    // var interval = setInterval(() => {
    //   Vibration.vibrate(pattern);
    // }, 10000);
    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    BackgroundGeolocation.on('heartbeat', this.onMotionChange);
    // BackgroundGeolocation.on('heartbeat', this.onMotionChange);

    // Now configure the plugin.
    BackgroundGeolocation.configure({
      // Geolocation Config
      heartbeatInterval: 5,
      activityRecognitionInterval: 0,
      disableElasticity: true,
      desiredAccuracy: 0,
      stationaryRadius: 1,
      distanceFilter: 1,
      // Activity Recognition
      stopTimeout: 10000,
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
  },
  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
  },
  onLocation(location) {
    console.log('- [js]location: ', JSON.stringify(location));

    // fetch('https://requestb.in/124tk7t1', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(location)
    //   }).then(success => {
    //     console.log('success###')
    //   }).catch(error => {
    //     console.log('error###', error)
    //   })
    // }
    var pattern = [0];
    // var patternLiteral = '[]';
    Vibration.vibrate(pattern);
  },
  onMotionChange(location) {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
    // fetch('https://requestb.in/124tk7t1', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(location)
    //   }).then(success => {
    //     console.log('success###')
    //   }).catch(error => {
    //     console.log('error###', error)
    //   })
    // }
    var pattern = [0];
    // var patternLiteral = '[]';
    Vibration.vibrate(pattern);

  },

  render() {
    return (<Text>hello</Text>)
  }
});

AppRegistry.registerComponent('ThesisTest', () => ThesisTest);
