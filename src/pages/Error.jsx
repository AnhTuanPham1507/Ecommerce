import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

Error.propTypes = {
    title: PropTypes.string.isRequired,
};

function Error(props) {
    const title = props.title
    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>Oops!</h1>
                    <h2>404 - {title}</h2>
                </div>
                <Link to="/">Go TO Homepage</Link>
            </div>
        </div>
    );
}

export default Error;