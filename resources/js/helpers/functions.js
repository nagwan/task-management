export const toggleLang = (i18n) => {
    if (i18n.language === 'ar') {
        i18n.changeLanguage("en")
    } else {
        i18n.changeLanguage("ar")
    }
}
