const { CustomErrorAPI } = require("../error/custom-error")

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({msg: "Server Error"});
}

module.exports = errorHandler;