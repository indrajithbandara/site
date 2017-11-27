import ToolsLogger from '@gik/tools-logger';

export const Log = ToolsLogger({
    nothrow: true, // don't throw errors when using log.error on any environment
});

export const LogHook = (level = 'info') => (hook) => {
    const name = `${hook.path}.${hook.method}:${hook.type}`;
    if (hook.error) {
        const { error } = hook;
        error.message = `[hook-error] ${name} » ${error.message}`;
        if (Log._levelVal < 30) Log.error(error); // eslint-disable-line no-underscore-dangle
        else Log.error(error.message);
    } else {
        Log[level](`[hook] ${name}`);
        Log.debug(`[hook-data] ${name} »`, hook.data);
        Log.debug(`[hook-params] ${name} »`, hook.params);
        if (hook.result) Log.debug(`[hook-result] ${name} »`, hook.result);
    }
};

export default Log;
