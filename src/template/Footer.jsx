import React from 'react';
import Style from 'styled-components';

const Component = Style.footer`
    border-top: 1px solid ${props => props.theme.colorFG};
    padding-top: 1rem;
    text-align: center;

    > h6 {
        margin:0;
        padding:0;
    }
`;

export default class Footer extends React.Component {
    render = () => <Component>
        <h6>soy footer</h6>
    </Component>
}
