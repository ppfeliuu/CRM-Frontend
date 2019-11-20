import React, { useState } from 'react'

const CRMContext = React.createContext([{}, () => {}]);

const CRMProvider = props => {
    //definir el state inicial

    const [auth, setToken] = useState({
        token: '',
        auth: false
    });

    return (
        <CRMContext.Provider value={[auth, setToken]}>
            {props.children}
        </CRMContext.Provider>
    )
}

export { CRMContext, CRMProvider };