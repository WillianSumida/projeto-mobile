import React, { useEffect, useState } from 'react';
import {View, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator, Text, CheckBox} from 'react-native';
import firebase from '../database/firebase';


const DetalheTarefa = (props) =>{

    const initialState = {
        nome: '',
        detalhes: '',
        status:''
    }

    const [tarefa, setTarefa] = useState(initialState);

    const [loading, setLoading] = useState(true)

    const getTarefaById = async (id) => {
        const dbRef = firebase.db.collection('tarefas').doc(id)
        const doc=  await dbRef.get();
        const tarefa = doc.data();
        setTarefa({
            ...tarefa,
            id: doc.id,
        })
        setLoading(false)
    }

    useEffect( () => {
        getTarefaById(props.route.params.tarefaId)
    }, [])

    const mudarTexto = (nome, value) => {
        setTarefa({...tarefa, [nome]: value})
    }

    const deletarTarefa = async () => {
        const dbRef = firebase.db.collection('tarefas').doc(props.route.params.tarefaId);
        await dbRef.delete();
        props.navigation.navigate('Tarefas');
    }

    const atualizarTarefa = async () => {
        const dbRef = firebase.db.collection('tarefas').doc(tarefa.id);
        await dbRef.set({
            nome: tarefa.nome,
            detalhes: tarefa.detalhes,
            status: tarefa.status
        });
        setTarefa(initialState)
        props.navigation.navigate('Tarefas');
    }

 
    if(loading){
        return (
            <View>
                <ActivityIndicator size='large' color='#9e9e9e'/>
            </View>
        )
    }

    return (
        <ScrollView style = {styles.container}>
            <View style = {styles.inputGroup}>
                <TextInput placeholder='Nome da tarefa' value={tarefa.nome} onChangeText = {(value) => mudarTexto('nome', value)}/>
            </View>
            <View style = {styles.inputGroup}>
                <TextInput placeholder='Detalhes' value={tarefa.detalhes} onChangeText = {(value) => mudarTexto('detalhes', value)}/>
            </View>

            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={tarefa.status}
                    onValueChange={(value) => mudarTexto('status', value)}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Finalizado</Text>
            </View>

            <View style = {styles.inputGroup}>
                <Button title='Atualizar' onPress={() => atualizarTarefa() } />
            </View>

            <View style = {styles.inputGroup}>
                <Button title='Deletar' color='red' onPress={() => deletarTarefa() } />
            </View>

        </ScrollView>
    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },

    inputGroup : {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1 ,
        borderBottomColor: '#cccccc'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    }
}) 

export default DetalheTarefa