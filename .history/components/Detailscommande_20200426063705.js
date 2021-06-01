import React, {Component} from 'react';
import {View,Text,SafeAreaView,StyleSheet, Platform} from 'react-native';
import MapboxGl from '@react-native-mapbox-gl/maps';
MapboxGl.setAccessToken('pk.eyJ1IjoibmFtbG9uZ21vYmlsZSIsImEiOiJjazRsYmsyY2cwZnRuM2pvajluMDJvbjlzIn0.HYVfIvcuXzWqGyv5KQXnnA',);
const IS_ANDROID=Platform.os==='android';

export default class Detailscommande extends Component {
  render() {
    return (
        <View>
        <Text>runnnnnnnnnn</Text>
        </View>
    );
  }
}

