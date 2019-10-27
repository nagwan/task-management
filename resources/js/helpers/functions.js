export const toggleLang = (i18n) => {
    if (i18n.language === 'ar') {
        i18n.changeLanguage("en")
    } else {
        i18n.changeLanguage("ar")
    }
}

export const api = (url, data, method) => {

    let request = new Request(url, {
        method: method,
        body: data ? JSON.stringify(data) : null,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
    });

    return fetch(request).then(response => response.json())
}

