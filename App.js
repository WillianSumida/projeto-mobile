import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const Stack = createStackNavigator()

import Tarefas from './telas/Tarefas';
import CriarTarefa from './telas/CriarTarefa';
import DetalheTarefa from './telas/DetalheTarefa';

function Mystack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Tarefas' component = {Tarefas} options={{title: 'Lista de Tarefas'}}/>
      <Stack.Screen name='CriarTarefa' component = {CriarTarefa} options={{title: 'Adicionar Tarefa'}}/>
      <Stack.Screen name='DetalheTarefa' component = {DetalheTarefa} options={{title: 'Detalhes'}}/>
    </Stack.Navigator>

  )
}


export default function App() {
  return (
   <NavigationContainer>
     <Mystack/>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
