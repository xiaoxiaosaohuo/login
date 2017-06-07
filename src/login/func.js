import 'whatwg-fetch';
export const fetchData = (url,query) =>{
    return fetch(url,{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            "X-Requested-With":"XMLHttpRequest"
        },
        body:JSON.stringify(query)
    }).then(response =>{
        return response.json();
    })
}
export const fetchDataWithToken = (url) =>{
    return fetch(url,{
        method:'POST',
        credentials: 'same-origin',
        headers:{
            "Content-Type":'application/json',
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(response =>{
        return response.json();
    })
}

export const fetchDataGet = (url,query) =>{
    return fetch(url,{
        method:'GET',
        headers:{
            "Content-Type":'application/json',
            "X-Requested-With":"XMLHttpRequest"
        }
    }).then(response =>{
        return response.json();
    })
}


export const  getQueryString = () => {
    var r = window.location.search.substr(1).split("=")[1]
    if (r != null) return unescape(r);
    return null;
}
