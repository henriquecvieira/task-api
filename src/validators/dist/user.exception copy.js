"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UserException = void 0;
var common_1 = require("@nestjs/common");
var UserException = /** @class */ (function (_super) {
    __extends(UserException, _super);
    function UserException(message) {
        return _super.call(this, message, common_1.HttpStatus.NOT_FOUND) || this;
    }
    return UserException;
}(common_1.HttpException));
exports.UserException = UserException;
