# apollo-error-catcher
It is used as higher order component to catch apollo graphql error in a generic manner.

## Usage:
It is to wrap the react component which is using apollo-react to call graphql query. 
If there is any unhandled apollo error, it would catch the error and return a component which
is readable for user instead of a red error page. 

## Example:

We need to prepare our own Error Component for unhandled apollo error case.

```javascript
import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <p>not found</p>
        )
    }
}

export default NotFound;
```

In our react component which is using react-apollo to query. We import catchGraphqlError from apollo-error-catcher and the error 
component we have made above. We would wrap our component by catchGraphqlError

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {testAction} from '../../actions/testAction';
import catchGraphqlError from 'apollo-graphql-error'
import {NotFound} from '../Error';

class About extends React.Component {

    static propTypes = {
        email: PropTypes.string,
        isTested: PropTypes.bool,
        testAction: PropTypes.func
    };

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                {!this.props.data.loading && <p>{this.props.data.findUserByEmail.email}</p>}
            </div>
        )
    }
}

const getUserQuery = gql`
    query($email:String!)  {
        findUserByEmail(email: $email) {
            _id
            email
        }
    }
`;

const getUser = graphql(getUserQuery, {
    options: (ownProps) => {
        return {
            variables: {
                email: ownProps.email,
            }
        }
    }
});

const mapStateToProps = (state) => ({
  ...
});

const mapDispatchToProps = (dispatch) => ({
  ...
});

export default compose(
    getUser,
    connect(mapStateToProps, mapDispatchToProps)
)(catchGraphqlError(About, NotFound));
```

In case there is any error returned, e.g. network error. Error component would be shown instead
