const userBaseUrl = 'http://localhost:8080/api/tests/uzytkownik';
const userDiseaseUrl = 'http://localhost:8080/api/tests/bazaChorob'

export function getUserApiCall(){
    const options ={
        method: 'GET',
        headers: {
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    return fetch(userBaseUrl, options);
}

export function putUserApiCall(data){
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
    let url = userBaseUrl+'/put';
    return  fetch(url,options);
}

export function putUserPasswordApiCall(data){
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
    let url = 'http://localhost:8080/api/tests/sec/password/change';
    return  fetch(url,options);
}

export function logoutUserApiCall(data){
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
    let url = 'http://localhost:8080/api/tests/sec/logout';
    return  fetch(url,options);
}

export function postDiseaseAlertApiCall(data){
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
    let url = userDiseaseUrl + '';
    return  fetch(url,options);
}