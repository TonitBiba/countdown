import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import PropTypes from 'prop-types';
import { formatDate, getCountdownParts } from './api';
import {DeleteEvent} from './Repository/Event';

const styles= StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 10,
        paddingTop: 10,
        paddingBottom: 20,
        margin: 10,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20
    },
    cardHeader: {
        flex: 1,
        flexDirection: 'row'
    },
    date: {
        fontWeight: '200',
        fontSize: 15,
        color: '#bdbdbd',
        width: '30%',
        textAlign: 'right'
    },
    title: {
        fontSize: 15,
        fontWeight: '300',
        marginLeft: 7,
        textAlign: 'left'
    },
    counterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    counter: {
        width: '25%',
        flex: 1
    },
    counterText: {
        fontSize: 35,
        textAlign: 'center'
    },
    counterLabel:{
        fontSize: 13,
        fontWeight: '100',
        color: '#a3a3a3',
        textAlign: 'center',
        paddingTop: 0
    },
    closeBtn:{
        borderRadius: 30,
        fontSize: 18,
        backgroundColor: 'red',
        color: '#FFF',
        width: 27,
        textAlign: 'center'
    }
});

class EventCard extends Component{
    constructor(props){
        super(props);
    }

    handleDelete(id, action){
        DeleteEvent(id).then(t=>{
            if(t.no == 1){
                alert('Event deleted successfully!');
                action();
            }else{
                alert('There was an error during data deletion! Please try again later.');
            }
        });
    }

    render(){
        const{
            days,
            hours,
            minutes,
            seconds
        } = getCountdownParts(this.props.event.date);
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.date}>{formatDate(this.props.event.date)}</Text>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.title}>{this.props.event.title}</Text>
                    <Text style={styles.closeBtn} onPress={()=>this.handleDelete(this.props.event.id, this.props.action)} >X</Text>
                </View>
            </View>

            <View style={styles.counterContainer}>
                <View style={styles.counter}>
                    <Text style={styles.counterText}>{days}</Text>
                    <Text style={styles.counterLabel}>DAYS</Text>
                </View>
                <View style={styles.counter}>
                    <Text style={styles.counterText}>{hours}</Text>
                    <Text style={styles.counterLabel}>HOURS</Text>
                </View>
                <View style={styles.counter}>
                    <Text style={styles.counterText}>{minutes}</Text>
                    <Text style={styles.counterLabel}>MINUTES</Text>
                </View>
                <View style={styles.counter}>
                    <Text style={styles.counterText}>{seconds}</Text>
                    <Text style={styles.counterLabel}>SECONDS</Text>
                </View>
            </View>
        </View>
    );
    }
}

export default EventCard;