import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TextInput, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDateTime } from './api';
import { AddEvent } from './Repository/Event';

const styles = StyleSheet.create({
    fieldContainer: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    text:{
        height: 40,
        margin: 0,
        marginRight: 7,
        paddingLeft: 10
    },
    button:{
        height: 50,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        alignSelf: 'stretch',
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText:{
        color: '#fff',
        fontSize: 18
    },
    borderTop:{
        borderColor: '#edeeef',
        borderTopWidth: 0.5
    }
});

class EventForm extends Component {
    state= {
        title: null,
        date: null,
        showDatePicker: false
    }

    handleAddPress = () =>{
        AddEvent(this.state.title, this.state.date).then(res => {
            if(res.no == 1){
                this.props.navigation.navigate('EmpList', { params: {update: true}});
            }else{
                console.log('Data not saved. Error!'+res);
            }
        }); 
       }

    handleDatePress = () => {
        this.setState({ showDatePicker: true });
    }

    handleDatePicked = (date) =>{
        this.setState({
            date: date,
            showDatePicker: false
        });
    }
    
    handleOnCanceled = () =>{

    }
    
    render(){
        return (
            <View style={{
                flex: 1
            }}>
                <View style={styles.fieldContainer}>
                    <TextInput style={styles.text} placeholder="Event title" spellCheck={false} value={this.state.title} onChangeText = {(text)=> this.setState({title: text})} />
                    <TextInput
                        style={[styles.text, styles.borderTop]}
                        placeholder = "Event date"
                        spellCheck= {false}
                        value = {formatDateTime(this.state.date)}
                        editable = { !this.state.showDatePicker }
                        onFocus = {this.handleDatePress}
                    />
                    <DateTimePickerModal 
                        isVisible={this.state.showDatePicker}
                        mode='datetime'
                        onConfirm={this.handleDatePicked}
                        onCancel = {this.handleOnCanceled}
                    />
                </View>
                <TouchableHighlight
                    onPress= {this.handleAddPress}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default EventForm;