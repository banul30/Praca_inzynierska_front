const apiaryBaseUrl = 'http://localhost:8080/api/tests/pasieka';
const foodBaseUrl = 'http://localhost:8080/api/tests/pokarm';

export function getApiariesApiCall(){
    const options ={
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = apiaryBaseUrl + '/get'
    return fetch(url, options);
}
/*'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),*/

export async function getApiaryByIdApiCall(id){
    console.log(id);
    const options ={
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = apiaryBaseUrl + '/' + id;
    return await fetch(url, options);
}

export function postApiaryApiCall(data){
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
    let url = apiaryBaseUrl+'/add';
    return  fetch(url,options);
}

export function putApiaryApiCall(id, data){
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
    let url = apiaryBaseUrl+'/update/'+id;
    return  fetch(url,options);
}

export function deleteApiaryApiCall(apiaryId){
    const options ={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = apiaryBaseUrl+'/delete/'+apiaryId;
    return  fetch(url,options);
}

export function postFoodApiCall(data){
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
    let url = foodBaseUrl+'/add';
    return  fetch(url,options);
}

export function deleteFoodApiCall(id){
    const options ={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = foodBaseUrl+'/delete/'+id;
    return  fetch(url,options);
}

export function postApiaryNoteApiCall(data){
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
    let url = apiaryBaseUrl+'/add/notatka';
    return  fetch(url,options);
}

export function deleteApiaryNoteApiCall(id){
    const options ={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = apiaryBaseUrl+'/delete/notatka/'+id;
    return  fetch(url,options);
}