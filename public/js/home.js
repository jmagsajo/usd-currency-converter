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
/******/ 	return __webpack_require__(__webpack_require__.s = 41);
/******/ })
/************************************************************************/
/******/ ({

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(42);


/***/ }),

/***/ 42:
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var currency = new Vue({
	el: '#currency-table',
	data: _defineProperty({
		token: "",
		records: {},
		tableLoader: true
	}, "token", ""),
	methods: {
		fetchToken: function fetchToken() {
			var that = this;
			return $.get('/api/v1/getToken', function (data) {
				that.token = data.access_token;
			});
		},
		updateCurrency: function updateCurrency() {
			var that = this;
			$("#btn-update-loader").removeClass('hidden');
			$('#update-currency').attr('disabled', true);
			$('#example_wrapper').find('.odd').addClass('hidden');
			$('#example_wrapper').find('.even').addClass('hidden');
			that.tableLoader = true;
			that.fetchToken().then(function () {
				$.ajax({
					method: "GET",
					url: "/api/v1/update-currency",
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
						'Authorization': 'Bearer: ' + that.token
					},
					success: function success(d) {
						$('#example_wrapper').find('.odd').removeClass('hidden');
						$('#example_wrapper').find('.even').removeClass('hidden');
						that.records = d.data;
						that.tableLoader = false;
						alert('Currency successfully updated!');
						$("#btn-update-loader").addClass('hidden');
						$('#update-currency').attr('disabled', false);
						setTimeout(function () {
							var datatable = $('#example').DataTable();
							var obj = that.parseObj();
							datatable.clear();
							datatable.rows.add(obj);
							datatable.draw();
						}, 0);
					},
					error: function error() {
						$("#btn-update-loader").addClass('hidden');
						$('#update-currency').attr('disabled', false);
					}
				});
			});
		},
		parseObj: function parseObj() {
			var that = this;
			var arr1 = [];
			$.each(that.records, function (i, val) {
				var arr2 = [];
				arr2.push(val.exchangeRate);
				arr2.push(val.targetCurrency);
				arr2.push(val.targetName);
				arr1.push(arr2);
			});

			return arr1;
		}
	},
	mounted: function mounted() {
		var that = this;

		that.fetchToken().then(function () {
			$.ajax({
				method: "GET",
				url: "/api/v1/get-currency",
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
					'Authorization': 'Bearer: ' + that.token
				},
				success: function success(d) {
					that.records = d.data;
					that.tableLoader = false;
					$("#btn-update-loader").addClass('hidden');
					$('#update-currency').attr('disabled', false);
					setTimeout(function () {
						var datatable = $('#example').DataTable();
						var obj = that.parseObj();
						datatable.clear();
						datatable.rows.add(obj);
						datatable.draw();
					}, 0);
				},
				error: function error() {
					$("#btn-update-loader").addClass('hidden');
					$('#update-currency').attr('disabled', false);
				}
			});
		});
	},
	created: function created() {}
});

/***/ })

/******/ });