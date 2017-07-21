import React from 'react';
import PropTypes from "prop-types";

const catchApolloError = function(WrappedComponent, ErrorComponent) {
    return class ApolloErrorHandler extends React.Component {
        static propTypes = {
            data: PropTypes.shape({
                error: PropTypes.object
            })
        }

        render () {
            if (this.props.data) {
                const error = this.props.data.error;
                if (error) {
                    return <ErrorComponent {...this.props}/>;
                } else {
                    return <WrappedComponent {...this.props}/>
                }
            }
        }
    }
}

export default catchApolloError;