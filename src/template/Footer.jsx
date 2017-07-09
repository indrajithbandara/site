import React from 'react';
import Style from 'styled-components';

const Component = Style.footer`
    border-top: 1px solid;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    & > h6 {
        margin:0;
        padding:0;
        opacity: 0.6;
    }
`;

export default class Footer extends React.Component {
    render = () => <Component>
        <h6>
            <strong>️© Héctor Adan Menéndez Rivera,</strong>
            <span> 1981-{new Date().getFullYear()}.</span>
            <span> All rights reserved</span>
        </h6>
    </Component>
}
