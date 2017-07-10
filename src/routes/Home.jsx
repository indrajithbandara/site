import React from 'react';
import Style from 'styled-components';

export default class Home extends React.Component {
    render = () => <Component>
        <figure></figure>
        <aside>
            Hola Mundo
        </aside>
    </Component>
}

const Component = Style.section`
    width: 100%;
    height: 100%;
    display:grid;
    grid-template-columns: 40% 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "figure" "aside";
    justify-items: stretch;
    align-items: stretch;

    & > figure {
        display:block;
        background-color: var(--portrait00);
        background-image: url('hector-menendez.gif');
        background-size: 90%;
        background-position-x: 50%;
        background-position-y: 100%;
        background-blend-mode: multiply;
        margin:0;
        padding:0;
    }

    & > aside {
        background-color: white;
        padding: 1em;
    }
`;
