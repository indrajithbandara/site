import Prism from 'prismjs';

// Enable the Markdown language
import 'prismjs/components/prism-markdown';

export const TokenLength = (token) => {
    if (typeof token === 'string') return token.length;
    const { length, content } = token;
    if (typeof length === 'number') return length;
    if (typeof content === 'string') return content.length;
    if (Array.isArray(content))
        return content.reduce((len, cur) => len + TokenLength(cur), 0);
    return -1;
};

export default Prism;
