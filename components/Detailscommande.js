import React, {Component} from 'react';
import {View,Text,SafeAreaView,StyleSheet, Platform,StatusBar,Button} from 'react-native';
import { Link } from "react-router-native";
import MapboxGL from '@react-native-mapbox-gl/maps';
import axios from 'axios';


MapboxGL.setAccessToken('pk.eyJ1IjoidGFiYmVuZSIsImEiOiJjazdkaDhreW4wOXJoM2xud2ZtdmdheGF5In0.Ipm8n0Ak75F4yzx51OPCHQ',);
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
      commandebyid: [],
      iduser : this.props.match.params.iduser
    }
  }
  
  componentDidMount() {
    axios.get(`http://172.16.158.124:4000/commandebyid/${this.props.match.params.id}`)
      .then(res => {
        const commandebyid = res.data;
        this.setState({ commandebyid });
      })
  }
  
  onPressButtonLiv() {
    axios.get(`http://172.16.158.124:4000/updatecommandebyid/${this.props.match.params.id}`)
    axios.get(`http://172.16.158.124:8000/api/place-order/${this.props.match.params.id}`) 
    .then((res) => {
      console.log(res.data)
  }).catch((error) => {
      console.log(error)
  });

    
  this.props.history.push(`/Commande/${this.state.iduser}`)
  }
  
  onPressButtonCmd() {
  this.props.history.push(`/Commande/${this.state.iduser}`)
  }


  render() {
    return (
       <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor="blue" />
       
         {this.state.commandebyid.map(commande =>
       <View style={styles.container_detail}>
         <Text>code commande : {commande.id}</Text>
         <Text>pharmacie : {commande.nom}</Text>
         <Text>adresse : {commande.adress}</Text>
         <Text>ville : {commande.ville}</Text>

         
        </View>
        )}
  <View style={styles.containermap}>
<MapboxGL.MapView
ref={c=>(this._map=c)}
zoomLevel={14}
centerCoordinate={this.state.coordinates[0]}
showUserLocation={true}
style={styles.containermap}
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
<View style={[{ padding:10}]}>
<Button onPress={this.onPressButtonLiv.bind(this)}  title="Livré" />



</View>
<Button onPress={this.onPressButtonCmd.bind(this)}  title="Retour" />
         </View>
       </SafeAreaView>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
  },
  containermap:{
    flex:0,
    height:300,
    padding:10,
  },
  container_detail:{
    flex:0,
    padding:10,
  },
  sectionHeader: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    paddingLeft: 10,
    fontSize: 14,
    height: 'auto',
  },
})


