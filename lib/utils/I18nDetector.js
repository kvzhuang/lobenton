"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _i18next = require("i18next");

var _i18next2 = _interopRequireDefault(_i18next);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var I18nDetector = function () {
	function I18nDetector() {
		_classCallCheck(this, I18nDetector);

		this.defaultLanguage = null;
		this.nowLanguage = null;
		this.localesPath = null;
		this.i18next = null;
		this.needSetCookie = false;
	}

	_createClass(I18nDetector, [{
		key: "setDefaultLanguage",
		value: function setDefaultLanguage(defaultLanguage) {
			this.defaultLanguage = defaultLanguage;
		}
	}, {
		key: "setLocalesPath",
		value: function setLocalesPath(localesPath) {
			this.localesPath = localesPath;
		}
	}, {
		key: "detect",
		value: function detect(cookies) {
			var cookie = cookies.locale;
			var settings = {
				"lng": cookie,
				"fallbackLng": 'en',
				"resources": {}
			};

			if (cookie === undefined || !I18nDetector.hasOwnProperty(cookie.toUpperCase())) {
				this.needSetCookie = true;
				cookie = this.defaultLanguage;
				settings.lng = this.defaultLanguage;
			}

			this.nowLanguage = settings.lng;
			settings.resources[cookie] = require(_path2.default.join(this.localesPath, settings.lng, settings.lng + ".js"));
			this.i18next = _i18next2.default.init(settings);
		}
	}, {
		key: "getRealInstance",
		value: function getRealInstance() {
			return this.i18next;
		}
	}, {
		key: "getLanguage",
		value: function getLanguage() {
			return this.nowLanguage;
		}
	}, {
		key: "getNeedSetCookie",
		value: function getNeedSetCookie() {
			return this.needSetCookie;
		}
	}]);

	return I18nDetector;
}();

I18nDetector.EN = "en";
I18nDetector.ZHTW = "zhTW";

exports.default = I18nDetector;
