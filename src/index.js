import React from 'react';
import PropTypes from "prop-types";

const catchGraphqlError = function(WrappedComponent) {
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
                    console.log(error);
                } else {
                    return <WrappedComponent {...this.props}/>
                }
            }
        }
    }
}

export default catchGraphqlError;