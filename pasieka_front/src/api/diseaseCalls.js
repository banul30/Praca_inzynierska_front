const diseaseBaseUrl = 'http://localhost:8080/api/tests/ul';

export function getAvilableDiseasesApiCall(id){
    const options ={
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = 'http://localhost:8080/api/tests/choroba' ;
    return fetch(url, options);
}

export function postDiseaseApiCall(beehiveId, diseaseId){
    const options ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = diseaseBaseUrl+'/add/' + diseaseId + '/' + beehiveId;
    return  fetch(url,options);
}

export function deleteDiseaseApiCall(beehiveId, diseaseId){
    const options ={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': localStorage.getItem('csrfToken'),
            'Authorization': 'Bearer ' + localStorage.getItem('jwtAccessToken')
        },
        credentials: 'include'
    };
    let url = diseaseBaseUrl+'/delete/choroba/' + diseaseId + '/' + beehiveId;
    return  fetch(url,options);
}