const _transformDate = (value) => {
    return value.toISOString()
}

const _transformUndefined = (_value) => {
    return null
}

const _isValidJSON = (value) => {
    const obj = Object.prototype.toString.call(value)
    return obj === '[object Object]' || obj === '[object Array]'
}

const _getType = (value) => {
    const obj = Object.prototype.toString.call(value)
    return obj.replace('[object ', '').replace(']', '')
}

const _deepCopy = (value, config) => {
    const dateToJSON = Date.prototype.toJSON
    delete Date.prototype.toJSON;

    const copy = JSON.parse(JSON.stringify(value, (k, v) => {
        if (k.startsWith(config.prefix)) return undefined
        if (v === undefined && config.transformUndefined) return config.transformUndefined(v)
        if (_getType(v) === 'Date') return config.transformDate(v)
        return v
    }))

    Date.prototype.toJSON = dateToJSON

    return copy
}

const PREFIX = '$_'

class JST {
    constructor(config) {
        this.config = config || {}
        this.config.prefix = this.config.prefix || PREFIX
        this.config.transformDate = this.config.transformDate || _transformDate
        this.config.transformUndefined = this.config.transformUndefined === true ? _transformUndefined : this.config.transformUndefined
    }

    transform (value) {
        if (!_isValidJSON(value)) throw 'invalid JSON'
        const copy = _deepCopy(value, this.config)
        return copy
    }
}

module.exports = JST