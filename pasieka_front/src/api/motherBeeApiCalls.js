const motherBeeBaseUrl = 'http://localhost:8080/api/tests/matka';

export function postMotherBeeApiCall(id, data){
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
    let url = motherBeeBaseUrl+'/add/' + id;
    return  fetch(url,options);
}

export function putMotherBeeApiCall(id, data){
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
    let url = motherBeeBaseUrl+'/put/'+id;
    return  fetch(url,options);
}

export function deleteMotherBeeApiCall(id, beehiveId){
    const options ={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = motherBeeBaseUrl+'/delete/'+id+'/'+beehiveId;
    return  fetch(url,options);
}