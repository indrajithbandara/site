import React from 'react';
import Style from './style';

export default class Footer extends React.Component {
    render = () => <Style>
        <h6>
            <strong>️© Héctor Adan Menéndez Rivera,</strong>
            <span> 1981-{new Date().getFullYear()}.</span>
            <span> All rights reserved</span>
        </h6>
    </Style>
}

