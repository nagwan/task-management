import React from 'react';
import { useTranslation } from "react-i18next";
import { toggleLang } from "../helpers/functions"
import { connect } from 'react-redux';
import { Route, Switch, Link } from "react-router-dom";
import Index from './projects/index'
import Show from './projects/show'
import Store from './projects/store'

const App = connect(({ projects }) => ({ projects }))((props) => {
   const { t, i18n } = useTranslation();

   return (
      <div className="container my-16 py-8 px-8 border border-primary-900">

         <Link className='my-12 mx-12' to='/projects'>Projects</Link>
         <Link className='my-12 mx-12' to='/new-project'>New Project</Link>

         <h1>{t('phrases:welcome')}</h1>

         <Switch> 
            <Route exact path='/projects' component={Index} />
            <Route path='/new-project' component={Store} />
            <Route path='/projects/:id' component={Show} />
         </Switch>

         <button onClick={() => toggleLang(i18n)} className="btn btn-link">{t('phrases:toggle_lang_btn')}</button>
      </div>
   )

})


export default App
