import React from 'react';
import PropTypes from 'prop-types';

export default class Link extends React.Component {

    static PropTypes = {
        href: PropTypes.string.isRequired
    };

    /**
     * Link was clicked
     */
    handleClick(e){
        e.preventDefault();
        window.history.pushState(null, '', this.props.href);
    }

    render = () =>
        <a href={this.props.href} onClick={this.handleClick.bind(this)} >
            {this.props.children}
        </a>;
}
