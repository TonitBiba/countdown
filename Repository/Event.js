const endpointUrl = 'http://192.168.0.104:5000/api/Event';

export function GetEvents(){
    return fetch(endpointUrl).
    then(response=>response.json()).catch(erro=>{
        console.log(erro);
    })
}

export function AddEvent(name, date){
    return fetch(endpointUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            date: date
        })
    }).then(t=>{
        return t.json();
    }).
    catch(err=>{
        console.log(err);
    });
}

export function DeleteEvent(id){
    return fetch(endpointUrl+'?id='+id, {
        method: 'DELETE',
        headers: {
            Accept:'application/json',
            'Content-Type': 'application/json'
        }
    }).then(t=>t.json()).catch(err=>{
        console.log(err);
    })
}