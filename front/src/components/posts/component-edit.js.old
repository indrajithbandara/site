import React from 'react';
import SlateSerializer from 'slate-plain-serializer';
import { Editor as SlateEditor } from 'slate-react';
// Local
import Prism, { TokenLength as PrismTokenLength } from 'utils/prism';

export const State = {
    editor: SlateSerializer.deserialize([
        '# Hola Mundo',
        '> Esto es una prueba',
        '',
        '## Dos',
        '### Tres',
        '#### Cuatro',
        '##### Cinco',
        '###### [Seis](6)',
        '',
        'De lo que se __puedede__ ~~hacer~~ _con markdown_.',
        '',
        '- uno',
        '  - a',
        '  - b',
        '  - c',
        '- dos',
        '- [tres](#tres)',
    ].join('\n')),
};

export class Component extends React.Component {

    state = State

    render() {
        return <section>
            <h3>Artículos</h3>
            <SlateEditor
                placeholder="Write post here ..."
                value={ this.state.editor }
                onChange={ this.handleChange }
                renderMark={ this.handleMark }
                decorateNode={ this.handleNode }
            />
        </section>;
    }

    handleChange = ({ value: editor }) => {
        this.setState({ editor });
    }

    handleNode = (node) => {
        if (node.kind !== 'block') return true;
        const texts = node.getTexts().toArray();
        const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
        const decorations = [];

        let txtIni = texts.shift();
        let txtEnd = txtIni;
        let posIni = 0;
        let posEnd = 0;
        let ini = 0;

        tokens.forEach((token) => {
            txtIni = txtEnd;
            posIni = posEnd;
            const len = PrismTokenLength(token);
            const end = ini + len;
            let togo = txtIni.text.length - posIni;
            let left = len;
            posEnd = posIni + left;
            while (togo < left) {
                txtEnd = texts.shift();
                left = len - togo;
                togo = txtEnd.text.length;
                posEnd = left;
            }
            if (typeof token !== 'string') {
                if (token.type === 'title' && token.content[0].type === 'punctuation') {
                    // eslint-disable-next-line no-param-reassign
                    token.type = `title-${token.content[0].length}`;
                }
                decorations.push({
                    anchorKey: txtIni.key,
                    anchorOffset: posIni,
                    focusKey: txtEnd.key,
                    focusOffset: posEnd,
                    marks: [{ type: token.type }],
                });
            }
            ini = end;
        });
        return decorations;
    }

    handleMark = ({ children, attributes, mark }) => {
        switch (mark.type) { // eslint-disable-line default-case
            case 'bold': return <strong {...attributes}>{children}</strong>;
            case 'italic': return <i {...attributes}>{children}</i>;
            case 'blockquote': return <blockquote {...attributes}>{children}</blockquote>;
            case 'title-1': return <h1 {...attributes}>{children}</h1>;
            case 'title-2': return <h2 {...attributes}>{children}</h2>;
            case 'title-3': return <h3 {...attributes}>{children}</h3>;
            case 'title-4': return <h4 {...attributes}>{children}</h4>;
            case 'title-5': return <h5 {...attributes}>{children}</h5>;
            case 'title-6': return <h6 {...attributes}>{children}</h6>;
            default: return undefined;
        }
    }
}

Object.defineProperty(Component, 'name', { value: 'LayoutContentAdminPosts' });
export default Component;
