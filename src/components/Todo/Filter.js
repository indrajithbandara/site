import React from 'react';

import Link from '../Router/Link';

export default class Filter extends React.Component {
    render = () => <section className="Todo-Filter">
        <Link href='/'>All</Link>
        <Link href='/active'>Active</Link>
        <Link href='/done'>Done</Link>
    </section>
}
