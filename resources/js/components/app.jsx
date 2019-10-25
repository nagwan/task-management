import React from 'react';
import { useTranslation } from "react-i18next";
import { toggleLang } from "../helpers/functions"
import { connect } from 'react-redux';
import { Route, Switch, Link } from "react-router-dom";
import Index from './projects/index'
import Show from './projects/show'

const App = connect(({ projects }) => ({ projects }))((props) => {
   const { t, i18n } = useTranslation();

   return (
      <div className="container my-16 py-8 px-8 text-center border border-primary-900">

         <Link to='/'>Projects</Link>

         <h1>{t('phrases:welcome')}</h1>

         <Switch>
            <Route exact path='/' component={Index} />
            <Route path='/projects/:id' component={Show} />
         </Switch>

         <button onClick={() => toggleLang(i18n)} className="btn btn-link">{t('phrases:toggle_lang_btn')}</button>
      </div>
   )

})


export default App
