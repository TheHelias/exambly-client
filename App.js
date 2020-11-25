import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Formik } from 'formik'
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

import logo from './assets/logo.jpg'

export default function App () {
  return (
    <View style={styles.container}>
      <View style={styles.appBar} />
      <View style={styles.appContainer}>
        <Image style={styles.logo} resizeMode='contain' source={logo} />
        <Text style={styles.signUpHeader1stLine}>Proceed with your</Text>
        <Text style={styles.signUpHeader2ndLine}>Signup</Text>
        <Formik
          initialValues={{ email: '', name: '', phone_no: '', password: '' }}
          onSubmit={(values) => {
            fetch('https://exambly-api.herokuapp.com/api/user/create', {
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(values)
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.error) {
                  alert(res.error)
                } else if (res.message) {
                  alert(res.message)
                } else {
                  alert(
                    JSON.stringify(res))
                }
              })
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                textContentType='name'
                value={values.name}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                textContentType='emailAddress'
                value={values.email}
              />
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('phone_no')}
                onBlur={handleBlur('phone_no')}
                textContentType='telephoneNumber'
                value={values.phone_no}
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                textContentType='password'
                value={values.password}
              />
              <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
              </Pressable>
              <Text style={styles.label}>
                Already have an account? Click to login
              </Text>
            </View>
          )}
        </Formik>
      </View>
      <StatusBar
        backgroundColor='#a9a9a9'
        barStyle='dark-content'
        translucent
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  appBar: {
    backgroundColor: '#26AE85',
    height: '12%',
    width: '100%'
  },
  appContainer: {
    paddingLeft: 30,
    paddingRight: 30
  },
  logo: {
    width: '60%'
  },
  signUpHeader1stLine: {
    fontSize: 40,
    color: '#7c7c7c'
  },
  signUpHeader2ndLine: {
    fontSize: 40,
    color: '#0d0d0d',
    marginBottom: 10
  },
  label: {
    fontSize: 20,
    color: '#000',
    marginTop: 10
  },
  textInput: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1
  },
  button: {
    marginTop: 20,
    backgroundColor: '#26AE85',
    padding: 20,
    borderRadius: 20
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '600'
  }
})
