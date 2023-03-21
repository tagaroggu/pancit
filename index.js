let CURRENT = null;
const STOPPED = new WeakSet();

function signal(initial = undefined) {
    let value = initial;
    let dependencies = new Set();

    return (newValue = undefined) => {
        if (newValue == undefined) {
            if (CURRENT != null) {
                dependencies.add(CURRENT.callback);
            }
            return value;
        } else {
            value = newValue;
            dependencies.forEach(callback => {
                if (STOPPED.has(callback)) dependencies.delete(callback);
                else callback();
            });
        }
    }
}

function effect(callback) {
    const c = () => {
        CURRENT = { callback: c, previous: CURRENT };
        try { callback() }
        finally { CURRENT = CURRENT.previous }
    }
    
    c();

    return () => { STOPPED.add(c) };
}

function computed(callback) {
    let s = signal();
    let c = () => s(callback());
    let d = effect(c);

    const get = () => s();
    get.stop = () => { d() };
}

export { signal, effect, computed };