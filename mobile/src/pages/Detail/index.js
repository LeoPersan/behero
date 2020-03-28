import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';

import styles from './styles';
import variables from '../../variables';
import logoImg from '../../assets/logo.png';

export default function Detail () {
    const incident = useRoute().params.incident;
    const navigation = useNavigation();
    

    function navigateBack() {
        navigation.goBack();
    }

    function sendWhatsApp(incident) {
        const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}`;
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    function sendEmail(incident) {
        const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}`;
        MailComposer.composeAsync({
            subject: 'Herói do caso: Cachorro',
            recipients: [incident.email],
            body: message
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity style={styles.incidentButton} onPress={navigateBack}>
                    <Feather name="arrow-left" size={16} color={variables.vermelho} />
                </TouchableOpacity>
            </View>
            
            
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty,{marginTop:0}]}>Ong:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>
                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>
                <Text style={styles.incidentProperty}>Descrição:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>
                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</Text>
            </View>
            
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói dese caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={()=>{sendWhatsApp(incident)}}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={()=>{sendEmail(incident)}}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}