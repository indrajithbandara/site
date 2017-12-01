import React from 'react';

export const State = {
};

export class Component extends React.Component {

    state = State;

    render() {
        console.log(this.state);
        return <section>
            add
        </section>;
    }
}

export default Component;
