import AES from "crypto-js/aes";

export function CheckTokensExistence(navigate){
    if( !localStorage.getItem('csrfToken') || !localStorage.getItem('jwtAccessToken') || !localStorage.getItem('jwtRefreshToken')){
        navigate("/");
    }
}


export function getCsrfToken(){
    const url = `http://localhost:8080/api/tests/sec/csrf`;
    document.cookie="XSRF-TOKEN=;max-age=0"
    const options ={
        method: 'GET',
        credentials: 'include'
    }
    const promise = fetch(url,options);
    promise.then((resp) =>{
        if(document.cookie){
            console.log(document.cookie.split('; ').find((row) => row.startsWith('XSRF-TOKEN=')).split('=')[1]);
            localStorage.setItem('csrfToken', document.cookie.split('; ').find((row) => row.startsWith('XSRF-TOKEN=')).split('=')[1]);

        }

    } ).catch(reason => console.log(reason));

}

export function encodePassword(text){
    const secretKey = 'supersecretkey123456';
    return AES.encrypt(text, secretKey).toString();
}

export function getNewAccessTokenAndReload(navigate){
    const url = `http://localhost:8080/api/tests/sec/token/refresh`;
    const options ={
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtRefreshToken')
        },
        credentials: 'include'
    }
    const promise = fetch(url,options);
    promise.then((resp) =>{
        if(resp.status >=200 && resp.status < 300){
            localStorage.setItem('jwtAccessToken', resp.headers.get('access_token'));
            console.log('Added access token to local storage');
            console.log(resp.headers.get('access_token'));
            window.location.reload();
        }else {
            localStorage.removeItem('jwtAccessToken');
            localStorage.removeItem('jwtRefreshToken');
            localStorage.removeItem('csrfToken');
            navigate("/");
        }
    } ).catch(reason => console.log(reason));
}

export function getNewAccessToken(navigate){
    const url = `http://localhost:8080/api/tests/sec/token/refresh`;
    const options ={
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtRefreshToken')
        },
        credentials: 'include'
    }
    const promise = fetch(url,options);
    return promise.then((resp) =>{
        if(resp.status >=200 && resp.status < 300){
            localStorage.setItem('jwtAccessToken', resp.headers.get('access_token'));
            console.log('Added access token to local storage');
            console.log(resp.headers.get('access_token'));
        }else {
            localStorage.removeItem('jwtAccessToken');
            localStorage.removeItem('jwtRefreshToken');
            localStorage.removeItem('csrfToken');
            navigate("/");
        }
    } ).catch(reason => console.log(reason));
}

/*
export function getCsrfToken(){
        if(document.cookie){
            console.log(document.cookie.split('=')[1]);
            localStorage.setItem('csrfToken', document.cookie.split('=')[1]);
        }
/!*    document.cookie = 'XSRF-TOKEN='+ localStorage.getItem('csrfToken');*!/
}*/
