const weightBaseUrl = 'http://localhost:8080/api/tests/waga';

export function postWeightApiCall(id, data){
    const options ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        body: JSON.stringify(data),
        credentials: 'include'
    };
    let url = weightBaseUrl+'/add/' + id;
    return  fetch(url,options);
}

export function putWeightApiCall(id, data){
    const options ={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        body: JSON.stringify(data),
        credentials: 'include'
    };
    let url = weightBaseUrl+'/put/'+id;
    return  fetch(url,options);
}

export function deleteWeightApiCall(id){
    const options ={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = weightBaseUrl+'/delete/'+id;
    return  fetch(url,options);
}

export function getAvilableProducersApiCall(){
    const options ={
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = weightBaseUrl + '/get/producent' ;
    return fetch(url, options);
}

export function getWieghtDataApiCall(id){
    const options ={
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = 'http://localhost:8080/api/tests/daneWagowe/' + id;
    return fetch(url, options);
}