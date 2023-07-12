
const beehiveBaseUrl = 'http://localhost:8080/api/tests/ul';

export async function getBeehivesApiCall(id){
    const options ={
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = beehiveBaseUrl + '/pasieka/' + id;
    return await fetch(url, options);
}

export function getBeehiveByIdApiCall(id){
    console.log(id);
    const options ={
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = beehiveBaseUrl + '/' + id;
    return fetch(url, options);
}

export function postBeehiveApiCall(data){
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
    let url = beehiveBaseUrl+'/add';
    return  fetch(url,options);
}

export function putBeehiveApiCall(id, data){
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
    let url = beehiveBaseUrl+'/update/'+id;
    return  fetch(url,options);
}

export function deleteBeehiveApiCall(id){
    const options ={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = beehiveBaseUrl+'/delete/'+id;
    return  fetch(url,options);
}