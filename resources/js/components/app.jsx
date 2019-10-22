import React from 'react';
import { useTranslation } from "react-i18next";
import { toggleLang } from "../helpers/functions"

const App = (() => {
   const { t, i18n } = useTranslation();

   return (
      <div className="container my-16 py-8 px-8 text-center border border-primary-900">
         <h1>{t('phrases:welcome')}</h1>

         <button onClick={() => toggleLang(i18n)} className="btn btn-link">{t('phrases:toggle_lang_btn')}</button>

      </div>
   )

})


export default App
