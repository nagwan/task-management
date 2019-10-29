import axios from 'axios';


export const toggleLang = (i18n) => {
    if (i18n.language === 'ar') {
        i18n.changeLanguage("en")
    } else {
        i18n.changeLanguage("ar")
    }
}


export const api = (url, data, method, token) => {
    
    const request = axios({
        method,
        url,
        data,
        headers: {
            //'Authorization': 'Bearer '.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    })

    return request
}

