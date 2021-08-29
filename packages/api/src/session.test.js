const session = require("./session")
// @ponicode
describe("session.sessionChecker", () => {
    test("0", () => {
        let callFunction = () => {
            session.sessionChecker({ session: { authorized: true } }, "a1969970175", " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            session.sessionChecker({ session: { authorized: true } }, "bc23a9d531064583ace8f67dad60f6bb", " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            session.sessionChecker({ session: { authorized: false } }, "bc23a9d531064583ace8f67dad60f6bb", " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            session.sessionChecker({ session: { authorized: false } }, 987650, " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            session.sessionChecker({ session: { authorized: true } }, 987650, " ")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            session.sessionChecker(undefined, Infinity, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
