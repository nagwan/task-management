import axios from 'axios';

export const toggleLang = (i18n) => {
    if (i18n.language === 'ar') {
        i18n.changeLanguage("en")
        window.moment.locale('en-US')
        $("body").removeClass("ar");

    } else {
        i18n.changeLanguage("ar") 
        window.moment.locale('ar')
        $("body").addClass("ar");
    }
}


export const api = (url, data, method, token) => {

    const request = axios({
        method,
        url,
        data,
        headers: {
            'Authorization': token ? 'Bearer ' + token : '',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    })

    return request
}

export const checkAuthUser = () => {
    let user = localStorage.getItem('user');
    if (user != null) return true
    return false

}

