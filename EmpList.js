import React, {Component} from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import  EventCard  from './EventCard';
import ActionButton from 'react-native-action-button';
import { GetEvents } from './Repository/Event';

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#F3F3F3',
        marginBottom: 10,
        paddingBottom: 20
    }
})

class EmpList extends Component{   
    constructor(props){
        super(props);

        this.handler = this.handler.bind(this);
    }

    state = {
        events: []
    }

    handler() {
        GetEvents().then(res=>{
            const ev = res.map(t=>({
                title: t.name,
                date: new Date(t.eventDate),
                id: t.id
            }));
            this.setState({events: ev});
        })
    }

    handleAddEvent = () =>{
        this.props.navigation.navigate('EventForm');
    }

    componentDidMount(){
        setInterval(()=>{
            this.setState({
                events: this.state.events.map(evt=>({
                    ...evt,
                    timer: Date.now(),
                }))
            })
        }, 1000)

        this.props.navigation.addListener('focus', () => {
            GetEvents().then(res=>{
                const ev = res.map(t=>({
                    title: t.name,
                    date: new Date(t.eventDate),
                    id: t.id
                }));
                this.setState({events: ev});
            })
        });
    }

    render(){
        return[
            <FlatList
                style = {styles.list}
                data={this.state.events}
                renderItem ={({ item })=> <EventCard event={item} action={this.handler}/>}
                keyExtractor={item => item.id}
            />,
            <ActionButton
                key="fab"
                onPress={this.handleAddEvent}
                buttonColor="rgba(231, 76, 60, 1)"
            />
        ];
    }
}

export default EmpList;