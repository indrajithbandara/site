import ToolsLogger from '@gik/tools-logger';

export const Log = ToolsLogger({
    nothrow: true, // don't throw errors when using log.error on any environment
});

export const LogHook = (level = 'info') => (hook) => {
    let message = `${hook.type}:${hook.path} [${hook.method}]`;
    if (hook.type === 'error') message += `: ${hook.error.message}`;
    Log[level](message);
    Log.debug('hook.data', hook.data);
    Log.debug('hook.params', hook.params);
    if (hook.result) Log.debug('hook.result', hook.result);
    if (hook.error) Log.debug(hook.error);
};

export default Log;
