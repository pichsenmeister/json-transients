const date = new Date()

const testObj = {
    $_transient: '',
    XX_custom_prefix: '',
    isNull: null,
    isUndefined: undefined,
    str: "string",
    number: 1,
    bool: true,
    date: date,
    fn: () => { }
}

const obj = testObj
obj.nested_obj = {
    $_transient: '',
    XX_custom_prefix: '',
    isNull: null,
    isUndefined: undefined,
    str: "string",
    number: 1,
    bool: true,
    date: date,
    fn: () => { }
}
obj.nested_arr = [{
    $_transient: '',
    XX_custom_prefix: '',
    isNull: null,
    isUndefined: undefined,
    str: "string",
    number: 1,
    bool: true,
    date: date,
    fn: () => { }
}]

module.exports = {
    obj,
    arr: [obj],
    date
}