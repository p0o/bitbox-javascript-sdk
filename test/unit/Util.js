const chai = require("chai")
const assert = require("assert")
const axios = require("axios")
const BITBOXSDK = require("../../lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const sinon = require("sinon")

describe("#Util", () => {
  describe("#validateAddress", () => {
    let sandbox
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should validate address", done => {
      const data = {
        isvalid: true,
        address: "bitcoincash:qpz7qtkuyhrsz4qmnnrvf8gz9zd0u9v7eqsewyk4w5",
        scriptPubKey: "76a91445e02edc25c701541b9cc6c49d02289afe159ec888ac",
        ismine: false,
        iswatchonly: false,
        isscript: false
      }

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      BITBOX.Util.validateAddress(
        "bitcoincash:qpz7qtkuyhrsz4qmnnrvf8gz9zd0u9v7eqsewyk4w5"
      )
        .then(result => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })
})
