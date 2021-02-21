import React, {Component} from 'react';
import EmpList from './EmpList';
import EventForm from './EventForm';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component {
  render(){
    return (
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="EmpList" options = {{title: 'Your recent events'}} component = {EmpList}/>
              <Stack.Screen name="EventForm" options= {{title: 'Add new event'}} component = {EventForm}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}