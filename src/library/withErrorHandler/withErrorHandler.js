import React,{
    Component
} from 'react';
/**
 * Components
 */

import Modal from '../Modal/modal';

/**
 * withErrorHandler component definition and export
 */

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState ({
                    error: error
                })
            });
        }

        componentWillUnmount () {
            // console.log('Will unmount', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return(
                <div>
                    <Modal 
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.error}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </div>
            );
        }
    } 
}

export default withErrorHandler;