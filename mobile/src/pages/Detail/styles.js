import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import variables from '../../variables';

export default StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:24,
        paddingTop: Constants.statusBarHeight+20
    },
    header: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    incident: {
        padding: 24,
        borderRadius:8,
        marginTop:48,
        marginBottom:16,
        backgroundColor: "#ffffff",
    },
    incidentProperty: {
        fontSize: 14,
        marginTop: 24,
        color: "#41414d",
        fontWeight: 'bold',
    },
    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        color: variables.cinza,
    },
    contactBox: {
        padding: 24,
        borderRadius:8,
        marginBottom:16,
        backgroundColor: "#ffffff",
    },
    heroTitle: {
        fontWeight: 'bold',
        fontSize:20,
        color: '#13131a',
        lineHeight: 30
    },
    heroDescription: {
        fontSize:15,
        color: variables.cinza,
        marginTop: 16
    },
    actions: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    action: {
        backgroundColor: variables.vermelho,
        borderRadius:8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 15,
    },
})