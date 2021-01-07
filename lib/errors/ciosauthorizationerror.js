/**
 * `CIOSAuthorizationError` error.
 * 
 * @constructor
 * @param {string} [message]
 * @param {number} [code]
 * @access public
 */
function CIOSAuthorizationError(message, code) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'CIOSAuthorizationError';
  this.message = message;
  this.code = code;
  this.status = 500;
}

// Inherit from `Error`.
CIOSAuthorizationError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = CIOSAuthorizationError;
