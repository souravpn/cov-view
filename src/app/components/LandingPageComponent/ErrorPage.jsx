import React from 'react';

import './ErrorPage.scss'

const ErrorPage = () => {

    console.log("ErrorPage")

    return(
        <div className="error-page">
            <div className="error-page-body">
                <a className="error-page-body-text">error page body</a>
            </div>
            <div className="error-page-footer">
                <a className="error-page-footer-text">error page footer</a>
            </div>
        </div>
    )
}

export default ErrorPage;