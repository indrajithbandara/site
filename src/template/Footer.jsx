import React from 'react';
import Style from 'styled-components';

export default class Footer extends React.Component {
    render = () => <Component>
        <h6>
            <strong>️© Héctor Adan Menéndez Rivera,</strong>
            <span> 1981-{new Date().getFullYear()}.</span>
            <span> All rights reserved</span>
        </h6>
    </Component>
}

const Component = Style.footer`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    border-top: 1px dotted var(--colorFG-lighter);

    & > h6 {
        margin w|:0;
        padding:0;
        font-weight:normal;
        color: var(--colorFG-lighter);
    }
`;
