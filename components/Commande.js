import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  FlatList,
  SafeAreaView,
  StatusBar
} from 'react-native';
import axios from 'axios';
import CalendarPicker from 'react-native-calendar-picker';

function Separator() {
  return <View style={styles.separator} />;
}

export default class Commande extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      comList: []
    };
  }

  
UNSAFE_componentWillMount() {
  axios.get(`http://172.16.158.124:4000/listcommande/${this.props.match.params.iduser}`)
      .then(res => {
        const comList = res.data;
        this.setState({ comList });
      })
  }
 

  render() {
    return (
      <SafeAreaView>
        <View>
        <StatusBar backgroundColor="blue" />
        <View style={{padding:10}}>
          <Text style={{position: 'absolute', left: 10,top:15}}>Bonjour</Text>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button
          onPress={() => this.props.history.push(`/`)}
                            title="Logout"
                        />
         </View>
        </View>
        <Separator />
        <View style={{marginTop:50}}>
        <CalendarPicker
        weekdays={['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']}
          months={['Janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']}
          previousTitle="Précédente"
          nextTitle="Suivant"
          todayBackgroundColor="#66ff33"
          selectedDayColor="#66ff33"
         />
         </View>
         {this.state.comList.length == 0 ? <Text style={styles.titleText}>Aucune commande pour aujourhui</Text> :<View> 
         <Text style={styles.titleText}>Les commandes pour livrer aujourdhui ces sont {this.state.comList.length}:</Text>
        <FlatList
          data={this.state.comList}
          renderItem={({item}) => 
          <View style={[{ padding:10}]}>
          <Button style={styles.btncmd} title={'Commande N°: '+item.id} onPress={() => this.props.history.push(`/Detailscommande/${item.id}/${item.livred_by}`)} />
           </View> 
            }
        /> 
        </View> 
        }
        </View>
      </SafeAreaView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    padding:10
  }, 
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
