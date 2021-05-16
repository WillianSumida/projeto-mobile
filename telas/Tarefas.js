import { useScrollToTop } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, Text, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../database/firebase';
import {ListItem} from 'react-native-elements';

const Tarefas = (props) =>{
    const [tarefas, setTarefas] = useState([])

    const verifica = (valor) => {
        if (valor === true){
            return 'Finalizado';
        }else{
            return 'Não Finalizado';
        }
    }

    useEffect( () => {
        firebase.db.collection('tarefas').onSnapshot(querySnapshot => {
            const tarefas = []
    
            querySnapshot.docs.forEach(doc => {
                const {nome, detalhes, status} = doc.data()
                tarefas.push({
                    id: doc.id,
                    nome,
                    detalhes,
                    status
                }) 
            });

            setTarefas(tarefas);
        })
    }, [])

   
    return (
        <ScrollView>
            <Button title='Adicionar Tarefa' onPress={() => props.navigation.navigate('CriarTarefa')}/>


        {
            tarefas.map(tarefa => {
                return (
                    <ListItem
                        key = {tarefa.id}
                        bottomDivider onPress={() => {
                                props.navigation.navigate('DetalheTarefa', {
                                tarefaId : tarefa.id
                            })
                        }}
                    >

                        <ListItem.Chevron/>
                        <ListItem.Content>
                            <ListItem.Title> {tarefa.nome} </ListItem.Title>
                            <ListItem.Subtitle> {verifica(tarefa.status)} </ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                )    
            })
        }

        </ScrollView>
    
    )
}

export default Tarefas