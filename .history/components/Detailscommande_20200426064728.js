import React, {Component} from 'react';
import {View,Text,SafeAreaView,StyleSheet, Platform} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken('pk.eyJ1IjoibmFtbG9uZ21vYmlsZSIsImEiOiJjazRsYmsyY2cwZnRuM2pvajluMDJvbjlzIn0.HYVfIvcuXzWqGyv5KQXnnA',);
const IS_ANDROID=Platform.os==='android';

export default class Detailscommande extends Component {
  async UNSAFE_componentWillMount(){
    if(IS_ANDROID){
      const IsGranted=await MapboxGL.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted:isGranted,
        isFetchingAndroidPermission:false,
      });
    }
  }
  constructor(props){
    super(props);
    this.state={
      isAndroidPermissionGranted:false,
      isFetchingAndroidPermission:IS_ANDROID,
      coordinates:[[-122.084990,37.426929]],
      showUserLocation:true,
      location:[[-122.084990,37.426929]],
    }
  }
  render() {
    return (
        <View>
        <Text>runnnnnnnnnn</Text>
        </View>
    );
  }
}

