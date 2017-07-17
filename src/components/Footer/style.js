import Style from 'styled-components';

export default Style.footer`
    --local-color: var(--colorFg-lighter);

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    border-top: 1px dotted var(--local-color);

    & > h6 {
        margin 0;
        padding:0;
        font-weight:normal;
        color: var(--local-color);
    }
`;
