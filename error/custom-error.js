class CustomErrorAPI extends Error {
  constructor(message, code) {
    super(message)
    this.statusCode = code
  }
}

const createNewError = (message, code) => {
  new CustomErrorAPI(message, code);
}

module.exports = { CustomErrorAPI, createNewError }

