import React, {Fragment}  from 'react';

import Modal from  '../../components/UI/Modal/modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {

    return props => {
        
        const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

        return (
            <Fragment>
                <Modal 
                    show={error}
                    modalClose = {errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Fragment>
        );
        
        
    }
}

export default withErrorHandler;