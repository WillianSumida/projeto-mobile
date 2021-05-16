import React, { useState } from 'react';
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import firebase from '../database/firebase';

const CriarTarefa = (props) =>{
    const [state, setState] = useState({
        nome: '',
        detalhes: '',
        status: false
    })

    const mudarTexto = (nome, value) => {
        setState({...state, [nome]: value})
    }

    const addTarefa = async () => {
        if (state.nome === ''){
            alert('Insira o nome da tarefa');
        } else{
            await firebase.db.collection('tarefas').add({
                nome: state.nome,
                detalhes: state.detalhes,
                status: false
            })
            props.navigation.navigate('Tarefas');  
        }
    }

    return (
       <ScrollView style = {styles.container}>
           <View style = {styles.inputGroup}>
               <TextInput placeholder='Nome da tarefa' onChangeText = {(value) => mudarTexto('nome', value)}/>
           </View>
           <View style = {styles.inputGroup}>
               <TextInput placeholder='Detalhes' onChangeText = {(value) => mudarTexto('detalhes', value)}/>
           </View>
           <View style = {styles.inputGroup}>
               <Button title='Salvar' onPress={() => addTarefa()} />
           </View>
       </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25
    },

    inputGroup : {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1 ,
        borderBottomColor: '#cccccc'
    }
})

export default CriarTarefa