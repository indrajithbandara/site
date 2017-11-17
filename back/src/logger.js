import ToolsLogger from '@gik/tools-logger';

export const Log = ToolsLogger();

export const LogHook = () => (hook) => {
    let message = `${hook.type}:${hook.path} [${hook.method}]`;
    if (hook.type === 'error') message += `: ${hook.error.message}`;
    Log.info(message);
    Log.debug('hook.data', hook.data);
    Log.debug('hook.params', hook.params);
    if (hook.result) Log.debug('hook.result', hook.result);
    if (hook.error) Log.error(hook.error);
};

export default Log;
