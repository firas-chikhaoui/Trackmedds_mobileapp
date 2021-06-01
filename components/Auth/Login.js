
import React, { Component } from 'react';
import { TextInput, Text, Button, Alert, View, StyleSheet,Image } from 'react-native';
import * as yup from 'yup'
import { Formik } from 'formik'
import axios from 'axios';


export default class Login extends Component {

    render() {
        const inputStyle = {
            borderWidth: 1,
            borderColor: '#eee',
            padding: 12,
            marginBottom: 10,
          };

        return (
           <Formik
        initialValues={{ 
          email: '', 
          password: '' 
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
             const userObject = {
              email: values.email,
              password: values.password,
            };

            //console.log(values);

            axios.post('http://172.16.158.124:4000/login', userObject)
              .then((res) => {
                  console.log(res.data)
                  if(res.data=="user not exists"){
                    Alert.alert(
                    "email or password not exists"
                   )
                  }else{
                    this.props.history.push('/Commande/'+res.data.id)
                  }
              }).catch((error) => {
                  Alert.alert(
                    console.log(error)
                   )
              });

            setSubmitting(true);
          }, 400);
        }}

        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email()
            .required(),
          password: yup
            .string()
            .min(4)
            .max(10, 'Password should not excced 10 chars.')
            .required(),
        })}
       >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.formContainer}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/img/logo.png') }
      />
              <Text style={styles.textlogin}>Login</Text>
            <TextInput
              value={values.email}
              style={inputStyle}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder="E-mail"
            />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
            }
            <TextInput
              value={values.password}
              style={inputStyle}
              onChangeText={handleChange('password')}
              placeholder="Password"
              onBlur={() => setFieldTouched('password')}
              secureTextEntry={true}
            />
            {touched.password && errors.password &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
            }
            <Button
              color="#3740FE"
              title='Login'
              disabled={!isValid}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>
            )
    }
}

const styles = StyleSheet.create({
    formContainer: {
      padding: 50,
      backgroundColor:"#fff"
    },
    textlogin: {
    fontSize:36,
    paddingBottom:30
    },
    tinyLogo: {
        width: 300,
        height: 100,
        marginBottom:50
      }
  });
  
  console.disableYellowBox = true;