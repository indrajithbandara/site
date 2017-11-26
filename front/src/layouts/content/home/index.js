import React from 'react';

export const Component = () => <section>
    <h2>Últimas publicaciones</h2>
    <section>

        <article>
            <section>
                <h3>Article 1</h3>
                <time>20 Mar 2017</time>
                <summary>This is the written part of the article.</summary>
            </section>
            <aside>
                <figure>
                    <img
                        src="http://via.placeholder.com/240x120"
                        alt="The name for the article"
                    />
                    <figcaption>The name of the article</figcaption>
                </figure>
            </aside>
        </article>

        <article>
            <section>
                <h3>Article 2</h3>
                <time>20 Mar 2017</time>
                <summary>This is the written part of the article.</summary>
            </section>
            <aside>
                <figure>
                    <img
                        src="http://via.placeholder.com/240x120"
                        alt="The name for the article"
                    />
                    <figcaption>The name of the article</figcaption>
                </figure>
            </aside>
        </article>
    </section>
</section>;

Object.defineProperty(Component, 'name', { value: 'LayoutHome' });
export default Component;

