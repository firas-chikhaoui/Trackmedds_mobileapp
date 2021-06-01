import React, {Component} from 'react';
import {View,Text,SafeAreaView,StyleSheet, Platform,SectionList} from 'react-native';
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
      location:[-122.084990,37.426929],
    }
  }
  render() {
    return (
       <SafeAreaView style={styles.container}>
         <Text>Details Commande</Text>
         <SectionList
          sections={[
            {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
  <View style={styles.container}>
<MapboxGL.MapView
ref={c=>(this._map=c)}
zoomLevel={14}
centerCoordinate={this.state.coordinates[0]}
showUserLocation={true}
style={styles.container}
userTrackingMode={this.state.userSelectedUserTrackingMode}
>
<MapboxGL.Camera
zoomLevel={16}
animationMode={'flyTo'}
animationDuration={0}
ref={c=>(this.camera=c)}
centerCoordinate={this.state.location}
>

</MapboxGL.Camera>

</MapboxGL.MapView>
<MapboxGL.UserLocation>

</MapboxGL.UserLocation>

         </View>
       </SafeAreaView>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

