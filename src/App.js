import React, { Suspense } from 'react';
import Dashboard from "./container/Dashboard"
import { useTranslation } from 'react-i18next'

const App = () => {

    const { t, i18n } = useTranslation();

    const handleclick = (lang) => {
        i18n.changeLanguage(lang)
    }

    /*return (
        <div>
            <button onClick={()=>handleclick('en')}>en</button>
            <button onClick={()=>handleclick('pl')}>pl</button>
            <div>{t('description.part1')}</div>
        </div>
    );*/
    return (
        <Dashboard />
    )
}

export default App;
