const JsonTransients = require("../dist/index")
const payload = require("./payload")

test("it should throw an `invalid JSON` error if payload is not valid JSON", () => {
    const jst = new JsonTransients()

    expect(() => {
        jst.transform("string")
    }).toThrow("invalid JSON")

    expect(() => {
        jst.transform(undefined)
    }).toThrow("invalid JSON")

    expect(() => {
        jst.transform(null)
    }).toThrow("invalid JSON")

    expect(() => {
        jst.transform(3)
    }).toThrow("invalid JSON")

    expect(() => {
        jst.transform(true)
    }).toThrow("invalid JSON")

    expect(() => {
        jst.transform(() => { })
    }).toThrow("invalid JSON")

    expect(() => {
        jst.transform((new Date()))
    }).toThrow("invalid JSON")
})

test("it should not throw an `invalid JSON` error if payload is valid JSON", () => {
    const jst = new JsonTransients()

    jst.transform({})
    jst.transform([])
})

test("it should remove all functions on objects", () => {
    const jst = new JsonTransients()
    let result = jst.transform(payload.obj)

    expect(result.hasOwnProperty('fn')).toBe(false)
    expect(result.nested_obj.hasOwnProperty('fn')).toBe(false)
    expect(result.nested_arr[0].hasOwnProperty('fn')).toBe(false)

    result = jst.transform(payload.arr)

    expect(result[0].hasOwnProperty('fn')).toBe(false)
    expect(result[0].nested_obj.hasOwnProperty('fn')).toBe(false)
    expect(result[0].nested_arr[0].hasOwnProperty('fn')).toBe(false)
})

test("it should remove all undefined properties", () => {
    const jst = new JsonTransients()
    let result = jst.transform(payload.obj)

    expect(result.hasOwnProperty('isUndefined')).toBe(false)
    expect(result.nested_obj.hasOwnProperty('isUndefined')).toBe(false)
    expect(result.nested_arr[0].hasOwnProperty('isUndefined')).toBe(false)

    result = jst.transform(payload.arr)

    expect(result[0].hasOwnProperty('isUndefined')).toBe(false)
    expect(result[0].nested_obj.hasOwnProperty('isUndefined')).toBe(false)
    expect(result[0].nested_arr[0].hasOwnProperty('isUndefined')).toBe(false)
})

test("it should set all undefined properties to null if config is set", () => {
    const jst = new JsonTransients({ transformUndefined: true })
    let result = jst.transform(payload.obj)

    expect(result.isUndefined).toBe(null)
    expect(result.nested_obj.isUndefined).toBe(null)
    expect(result.nested_arr[0].isUndefined).toBe(null)

    result = jst.transform(payload.arr)

    expect(result[0].isUndefined).toBe(null)
    expect(result[0].nested_obj.isUndefined).toBe(null)
    expect(result[0].nested_arr[0].isUndefined).toBe(null)
})

test("it should transform all undefined properties to custom value", () => {
    const jst = new JsonTransients({
        transformUndefined: () => {
            return 'undefined'
        }
    })
    let result = jst.transform(payload.obj)

    expect(result.isUndefined).toBe('undefined')
    expect(result.nested_obj.isUndefined).toBe('undefined')
    expect(result.nested_arr[0].isUndefined).toBe('undefined')

    result = jst.transform(payload.arr)

    expect(result[0].isUndefined).toBe('undefined')
    expect(result[0].nested_obj.isUndefined).toBe('undefined')
    expect(result[0].nested_arr[0].isUndefined).toBe('undefined')
})

test("it should transform all dates to ISO string", () => {
    const jst = new JsonTransients()
    let result = jst.transform(payload.obj)

    const dateStr = payload.date.toISOString()

    expect(result.date).toBe(dateStr)
    expect(result.nested_obj.date).toBe(dateStr)
    expect(result.nested_arr[0].date).toBe(dateStr)

    result = jst.transform(payload.arr)

    expect(result[0].date).toBe(dateStr)
    expect(result[0].nested_obj.date).toBe(dateStr)
    expect(result[0].nested_arr[0].date).toBe(dateStr)
})

test("it should transform all dates to custom value", () => {
    const jst = new JsonTransients({
        transformDate: (value) => {
            return value.getTime()
        }
    })
    let result = jst.transform(payload.obj)

    const dateStr = payload.date.getTime()

    expect(result.date).toBe(dateStr)
    expect(result.nested_obj.date).toBe(dateStr)
    expect(result.nested_arr[0].date).toBe(dateStr)

    result = jst.transform(payload.arr)

    expect(result[0].date).toBe(dateStr)
    expect(result[0].nested_obj.date).toBe(dateStr)
    expect(result[0].nested_arr[0].date).toBe(dateStr)
})

test("it should remove all transient properties", () => {
    const jst = new JsonTransients()
    let result = jst.transform(payload.obj)

    expect(result.hasOwnProperty('$_transient')).toBe(false)
    expect(result.nested_obj.hasOwnProperty('$_transient')).toBe(false)
    expect(result.nested_arr[0].hasOwnProperty('$_transient')).toBe(false)

    result = jst.transform(payload.arr)

    expect(result[0].hasOwnProperty('$_transient')).toBe(false)
    expect(result[0].nested_obj.hasOwnProperty('$_transient')).toBe(false)
    expect(result[0].nested_arr[0].hasOwnProperty('$_transient')).toBe(false)
})

test("it should remove all transient properties with custom prefix", () => {
    const jst = new JsonTransients({ prefix: 'XX_' })
    let result = jst.transform(payload.obj)

    expect(result.hasOwnProperty('XX_custom_prefix')).toBe(false)
    expect(result.nested_obj.hasOwnProperty('XX_custom_prefix')).toBe(false)
    expect(result.nested_arr[0].hasOwnProperty('XX_custom_prefix')).toBe(false)

    result = jst.transform(payload.arr)

    expect(result[0].hasOwnProperty('XX_custom_prefix')).toBe(false)
    expect(result[0].nested_obj.hasOwnProperty('XX_custom_prefix')).toBe(false)
    expect(result[0].nested_arr[0].hasOwnProperty('XX_custom_prefix')).toBe(false)
})


