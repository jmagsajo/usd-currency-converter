/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ({

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(44);


/***/ }),

/***/ 44:
/***/ (function(module, exports) {

var converter = new Vue({
    el: '#converter-div',
    data: {
        token: "",
        amount: 0,
        codes: {},
        selected: "",
        date: "",
        computation: 0,
        targetCode: "",
        converterLoader: false
    },
    methods: {
        fetchToken: function fetchToken() {
            var that = this;
            return $.get('/api/v1/getToken', function (data) {
                that.token = data.access_token;
            });
        },
        compute: function compute() {
            var that = this;

            if (!that.selected) {
                alert("Please select a currency.");
                return false;
            }

            if ($.trim(that.amount) == "" || that.amount <= 0 || !$.isNumeric(that.amount)) {
                alert("Please enter a valid amount.");
                return false;
            }

            that.converterLoader = true;
            $('#btn-convert').attr('disabled', true);
            that.fetchToken().then(function () {
                $.ajax({
                    method: "POST",
                    url: "/api/v1/compute",
                    data: {
                        code_id: that.selected,
                        amount: that.amount
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        'Authorization': 'Bearer: ' + that.token
                    },
                    success: function success(d) {
                        $('#btn-convert').attr('disabled', false);
                        that.targetCode = d.code;
                        that.computation = d.data;
                        that.converterLoader = false;
                    },
                    error: function error() {
                        $('#btn-convert').attr('disabled', false);
                        alert('Server Error!');
                        that.converterLoader = false;
                    }
                });
            });
        },
        fetchCode: function fetchCode() {
            var that = this;
            that.fetchToken().then(function () {
                $('#currency').attr('disabled', true);
                $.ajax({
                    method: "POST",
                    url: "/api/v1/fetch-codes",
                    data: {
                        date: that.date
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        'Authorization': 'Bearer: ' + that.token
                    },
                    success: function success(d) {
                        $('#currency').attr('disabled', false);
                        if (d.dataCount > 0) {
                            that.codes = d.data;
                        } else {
                            if (Object.keys(that.codes).length > 0) {
                                that.codes = {};
                            }
                            alert("Date doesn't have convertion rate.");
                        }
                        setTimeout(function () {
                            if ($('#currency option:eq(0)').attr('selected') != "selected") {
                                $('#currency option:eq(0)').attr('selected', 'selected').trigger('change');
                            }
                        }, 0);
                    },
                    error: function error() {
                        alert('Server Error!');
                        $('#currency').attr('disabled', false);
                    }
                });
            });
        },
        onSelect: function onSelect() {
            var that = this;
            $(".datepicker").datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function onSelect(dateText, inst) {
                    var date = $(this).val();
                    that.date = date;
                    $(".datepicker").focus();
                    $(".datepicker").blur();
                    that.fetchCode();
                }
            });
            $('#currency option:eq(0)').attr('selected', 'selected').trigger('change');
        }
    },
    mounted: function mounted() {
        this.onSelect();
    },
    created: function created() {}
});

/***/ })

/******/ });