export default class myEvent {
    constructor() {
        this.handler = {};
    }

    addEvent(eventName, fn) {
        if (typeof this.handler[eventName] === 'undefined') {
            this.handler[eventName] = [];
        }
        this.handler[eventName].push(fn);
    }

    trigger(eventName) {
        if (typeof this.handler[eventName] === 'undefined') {
            return;
        }
        this.handler[eventName].forEach(fn => fn())
    }

    removeEvent(eventName, fn) {
        if (typeof this.handler[eventName] === 'undefined') {
            return;
        }
        if (typeof fn === 'function') {
            this.handler[eventName].splice(this.handler[eventName].indexOf(fn), 1);
        }
    }
}