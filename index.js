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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Directive; });
/**
 * @class Directive
 * Defines a directive that Templation will search for in the template and parse
 * @param {string} selector The selector that will be used in the directive (ex: crFor)
 * @param {function} parser The function that will be executed for the directive. The parser receives a reference to the directive, the effected element, and the associated data
 */
class Directive {
	constructor(selector, parser) {
		/** public properties */

		/** @public {string} The selector name for the directive */
		this.selector = selector;
		
		/** @public {function} The function that is executed for the directive */
		this.parser = parser;
	
		/** @public {string[]} An array of sub selectors. Referenced by using a colon (:) after the main selector (ex: crOn:click) */
		this.subSelectors = [];
	
		/** private properties */

		/** @private {number} A number indicating the order in which the directive should be processed */
		let _order = 0;
		this.setOrder = (order) => {
			_order = order;
			return this;
		};
		this.getOrder = () => { return _order; };
		
		/** @private {boolean} A boolean indicating if this directive should be processed before DOM insertion */
		let _pre = true;
		this.setPre = (pre) => {
			_pre = pre;
			return this;
		};
		this.isPre = () => { return _pre; };

		/** @private {boolean} A boolean indicating if this directive should be processed after DOM insertion */
		let _post = true;
		this.setPost = (post) => {
			_post = post;
			return this;
		};
		this.isPost = () => { return _post; };
	}

	/** public methods */

	/**
	 * @method Set the sub selectors
	 * @param {string[]} An array of strings to function as sub selectors
	 * @returns {Directive}
	 */
	setSubSelectors(subSelectors) {
		this.subSelectors = subSelectors;
		return this;
	}
}

/** export Directive */


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return using; });
/** user the passed object to execute the given code */
function using(obj, code, ref, refData) {
	/** replace html entities */
	const decodingMap = [
		{ entity: '&lt;', char: '<' },
		{ entity: '&gt;', char: '>' },
		{ entity: '&quot;', char: '"' },
		{ entity: '&amp;', char: '&' },
		{ entity: '&#10;', char: '\n' },
		{ entity: '&#9;', char: '\t' }
	];
	decodingMap.forEach(m => {
		code = code.replace(m.entity, m.char);
	});

	/** get the property and method names list */
	let properties = Object.getOwnPropertyNames(obj);
	let proto = Object.getPrototypeOf(obj);
	let publicMethods = Object.getOwnPropertyNames(proto);

	/** create list of private methods to remove */
	let privateMethods = ['constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__', 'toLocaleString'];
	publicMethods.forEach(m => m.startsWith('_') ? privateMethods.push(m) : null);
	privateMethods.forEach(rm => {
		let index = publicMethods.indexOf(rm);
		if (index > -1) publicMethods.splice(index, 1);
	});

	/** create a method string */
	let methods = '';
	publicMethods.forEach(m => {
		methods += `let ${m} = obj.${m}.bind(obj);`;
	});

	/** create a function for executing the given code */
	let withFunc = new Function('obj', ref, `
		let { ${properties.join(', ')} } = obj;
		${methods}
		return (${code});
	`).bind(obj);

	/** execute the function */
	return withFunc(obj, refData);
}

/** export the function */


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.CircularComponent = CircularComponent;

var _templation = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
	return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement); /** import Templation */

/**
 * CircularComponent
 * A decorator that will create a new web component and attach the component class to it
 * @param {object} config The component configuration object
 */
function CircularComponent(config) {
	return function (component) {
		/** create a CircularComponent class that extends the HTMLElement */
		var CircularComponent = function (_CustomElement2) {
			_inherits(CircularComponent, _CustomElement2);

			_createClass(CircularComponent, null, [{
				key: 'observedAttributes',

				/** static array of observed attributes */
				get: function get() {
					return config.attributes || [];
				}

				/** constructor */

			}]);

			function CircularComponent() {
				_classCallCheck(this, CircularComponent);

				/** attach the shadown dom */
				var _this = _possibleConstructorReturn(this, (CircularComponent.__proto__ || Object.getPrototypeOf(CircularComponent)).call(this));
				/** initialize the HTMLElement base class */


				_this.attachShadow({ mode: 'open' });

				/** initialize the component and build */
				_this.component = new component();
				_this.build();
				return _this;
			}

			/** respond to attribute changes */


			_createClass(CircularComponent, [{
				key: 'attributeChangedCallback',
				value: function attributeChangedCallback(attr, oldValue, newValue) {
					/** check if the attribute exists on the component and update */
					if (Object.keys(this.component).findIndex(function (a) {
						return a === attr;
					}) > -1) {
						this.component[attr] = newValue;
					}
				}

				/** build the component */

			}, {
				key: 'build',
				value: function build() {
					/** build the template */
					var template = document.createElement('template');

					/** set the template */
					if (config.template && config.template !== null) {
						template.innerHTML = config.template;
					} else if (config.templateUrl && config.templateUrl !== null) {
						template.innerHTML = config.templateUrl;
					} else {
						throw 'No template specified for component';
					}

					/** run the templation engine */
					var templation = new _templation.Templation();
					var compiler = templation.compile(this.shadowRoot, template, this.component);
					compiler.render();

					/** set styles */
					var styles = null;
					if (config.styles && config.styles !== null) {
						styles = config.styles;
					} else if (config.styleUrl && config.styleUrl !== null) {
						styles = config.styleUrl;
					}
					if (styles !== null) {
						/** create the styles node and attach to shadowRoot */
						var stylesNode = document.createElement('style');
						stylesNode.innerText = styles;
						this.shadowRoot.appendChild(stylesNode);
					}
				}
			}]);

			return CircularComponent;
		}(_CustomElement);

		/** register the custom component */


		customElements.define(config.selector, CircularComponent);
	};
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(5);

var Components = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyTestComponent = exports.MyTitleComponent = undefined;

var _myTitle = __webpack_require__(6);

var _myTest = __webpack_require__(18);

exports.MyTitleComponent = _myTitle.MyTitleComponent;
exports.MyTestComponent = _myTest.MyTestComponent;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MyTitleComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _circularComponent = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MyTitleComponent = exports.MyTitleComponent = (_dec = (0, _circularComponent.CircularComponent)(_defineProperty({
	selector: 'my-title',
	template: '<h1>The {{title}} Family</h1>',
	styles: __webpack_require__(17),
	attributes: ['title']
}, 'styles', ':host > h1 { font-size: 11px; }')), _dec(_class = function () {
	function MyTitleComponent() {
		_classCallCheck(this, MyTitleComponent);

		this.title = '';
	}

	_createClass(MyTitleComponent, [{
		key: 'testMethod',
		value: function testMethod() {
			alert('coming soon');
		}
	}]);

	return MyTitleComponent;
}()) || _class);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Templation", function() { return Templation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_container_class__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_directive_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_compiler_class__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives__ = __webpack_require__(12);
/** import dependencies */





/**
 * @class Templation
 * Initializes and configures the Templation engine
 */
class Templation {
	constructor() {
		/** public properties */

		/** @public {DirectiveContainer} The directive container */
		this.directiveContainer = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_container_class__["a" /* DirectiveContainer */]();

		/** add the built-in directives */
		this.directiveContainer.addDirective(__WEBPACK_IMPORTED_MODULE_3__directives__["b" /* crForDirective */]);
		this.directiveContainer.addDirective(__WEBPACK_IMPORTED_MODULE_3__directives__["c" /* crIfDirective */]);
		this.directiveContainer.addDirective(__WEBPACK_IMPORTED_MODULE_3__directives__["a" /* crClassDirective */]);
		this.directiveContainer.addDirective(__WEBPACK_IMPORTED_MODULE_3__directives__["d" /* crOnDirective */]);
	}

	/** public methods */

	/** create new compiler */
	compile(container, template, data) {
		/** create the compiler */
		const compiler = new __WEBPACK_IMPORTED_MODULE_2__classes_compiler_class__["a" /* Compiler */](container, template, data);
		compiler.setDirectiveContainer(this.directiveContainer);

		/** return the compiler */
		return compiler;
	}
}

/** export Templation */


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectiveContainer; });
/**
 * @class DirectiveContainer
 * Contains all the defined Directives and allows for managing them
 */
class DirectiveContainer {
	constructor() {
		/** public properties */

		/** @public {Directive[]} An array of Directive objects */
		this.directives = [];
	}

	/** public methods */

	/**
	 * Get the directives
	 * @return {Directive[]}
	 */
	getDirectives() {
		return this.directives;
	}

	/**
	 * Get a specific directive
	 * @return {Directive}
	 */
	getDirective(selector) {
		/** find the directive */
		let match = this.directives.find(dir => dir.selector === selector);
		return match;
	}

	/**
	 * Add a new directive
	 * @param {Directive} directive A directive to add to the configured directives container
	 * @return {DirectiveContainer}
	 */
	addDirective(directive) {
		/** set the order and add to directives list */
		directive.setOrder(this.directives.length);
		this.directives.push(directive);
		
		/** return DirectiveContainer */
		return this;
	}

	/**
	 * Remove a directive
	 * @param {string} selector A name of a directive to remove
	 * @return {DirectiveContainer}
	 */
	removeDirective(selector) {
		/** find the index of the directive */
		let index = this.directives.findIndex(dir => dir.selector === selector);
		if (index >= 0) this.directives.splice(index, 1);

		/** return DirectiveContainer */
		return this;
	}

	/**
	 * Set the order of a directive
	 * @param {string} selector A name of a directive to reorder
	 * @return {DirectiveContainer}
	 */
	setDirectiveOrder(selector, order) {
		/** find the matching directives */
		let index = this.directives.findIndex(dir => dir.selector === selector);
		if (index >= 0) {
			/** set the order */
			this.directives[index].setOrder(order);

			/** add 1 to each directives over after this one */
			this.directives.forEach((dir, i) => {
				if (i > index) dir.setOrder(dir.getOrder() + 1);
			});

			/** sort the directives */
			dirs.sort(function(a, b) {
				return a.order - b.order;
			});
		}

		/** return DirectiveContainer */
		return this;
	}
}

/** export the DirectiveContainer */


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Compiler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__observer_class__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__ = __webpack_require__(11);
/** import dependencies */



/**
 * @class Compiler
 * Compile the given template and push into the container
 * @param {string | element} container The container for the compiled html
 * @param {string | element} template The template to use for compilation
 * @param {object} data The object used for binding data and methods
 */
class Compiler {
	constructor(container, template, data) {
		/** check container for string id, or element */
		if (typeof container === 'string') container = document.getElementById(container);
	
		/** check template for string id, or element */
		if (typeof template === 'string') template = document.getElementById(template);
	
		/** check the template for one and only one child */
		if (template.nodeName !== 'TEMPLATE') throw 'The template should be a template element (<template>)';
		if (template.content.children.length !== 1) throw 'The template must contain one root element.';

		/** public properties */

		/** @public {element} The container element */
		this.container = container;
	
		/** @public {element} The template element */
		this.template = template;
	
		/** @public {object} The data object that is used for binding data values and methods */
		this.data = data;

		/** private properties */

		/** @private {boolean} A boolean indicating whether compilation has been initiated once */
		let _initd = false;
		this.setInitd = (initd) => {
			_initd = initd;
			return this;
		};
		this.initd = () => { return _initd; };

		/** @private {Observer} An instance of Observer that is watching data for us */
		let _observer = new __WEBPACK_IMPORTED_MODULE_0__observer_class__["a" /* Observer */](this.data, this.render, this)
		this.getObserver = () => { return _observer; };

		/** @private {DirectiveContainer} The DirectiveContainer object */
		let _directiveContainer = null;
		this.setDirectiveContainer = (directiveContainer) => { _directiveContainer = directiveContainer; };
		this.getDirectiveContainer = () => { return _directiveContainer; };

		/** empty the container */
		Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["b" /* emptyElement */])(this.container);
	}

	/** public methods */

	/** render out the processed template */
	render() {
		/** get the template and inner html */
		const tempDOM = Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["a" /* createTemporaryDOM */])(this.template, this.data, this.getDirectiveContainer().getDirectives());

		/** set the app */
		Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["d" /* updateDOM */])(this.container, Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["e" /* virtualizeDOM */])(tempDOM.content.children[0]), this.initd() ? Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["e" /* virtualizeDOM */])(this.container.children[0]) : undefined);
		
		/** cycle through post directives */
		Object(__WEBPACK_IMPORTED_MODULE_1__functions_dom_functions__["c" /* parseDirectives */])(this.getDirectiveContainer().getDirectives().filter(dir => dir.isPost()), this.container, this.data);

		/** set initd to true */
		this.setInitd(true);
	}
}

/** export Compiler */


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Observer; });
/**
 * @class Observer
 * Recursively observes every property on an object
 * @param {object} obj The object to setup observance on
 * @param {function} callback The callback function to execute when the data has changed
 */
class Observer {
	constructor(obj, callback, compiler) {
		/** public properties */

		/** @public {object} The obj to observe */
		this.obj = obj;

		/** @public {function} The callback function to execute when the obj has changed */
		this.callback = callback.bind(compiler);
	
		/** start observing */
		this.observe(this.obj);
	}

	/**
	 * @method Setup data observation on an object
	 * @param {object} An object to observe
	 * @returns {Directive}
	 */
	observe(obj) {
		/** check for array and observe */
		if (Array.isArray(obj) && !obj.hasOwnProperty('push')) this.observeArray(obj);

		/** for every property on the object setup observance */
		for (let prop in obj) {
			this.observeProp(obj, prop);
			if (typeof obj[prop] === 'object') {
				this.observe(obj[prop]);
			}
		}
	}

	/** observe the value of a property on an object */
	observeProp(obj, prop) {
		/** get a reference to this */
		let self = this;

		/** create getter / setter for firing callback on change */
		let value = obj[prop];
		Object.defineProperty(obj, prop, {
			get () {
				return value;
			},
			set (newValue) {
				/** set the value to the new value */
				value = newValue;

				/** setup observance */
				if (typeof value === 'object') self.observe(value);

				/** fire callback */
				self.callback();
			}
		});
	}

	/** observe an array for changes */
	observeArray(arrayObj) {
		/** get a reference to this */
		let self = this;
		
		/** overwrite array methods */
		const arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice'];
		arrayMethods.forEach(m => {
			const _method = Array.prototype[m];
			Object.defineProperty(arrayObj, m, {
				configurable: false,
				enumerable: false,
				writable: false,
				value: function () {
					/** get the result of the base array function */
					let result = _method.apply(this, arguments);

					/** setup observance on the new value */
					self.observe(this);

					/** fire callback */
					self.callback();

					/** return the result */
					return result;
				}
			});
		});
	}
}

/** export the class */


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createTemporaryDOM; });
/* unused harmony export templater */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return virtualizeDOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return updateDOM; });
/* unused harmony export hasChanged */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return parseDirectives; });
/* unused harmony export createElement */
/* unused harmony export isEventProp */
/* unused harmony export setProp */
/* unused harmony export setProps */
/* unused harmony export removeProp */
/* unused harmony export updateProps */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return emptyElement; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__using_function__ = __webpack_require__(1);
/** import functions */


/** create a temporary DOM object based on the template */
function createTemporaryDOM(template, data, directives) {
	/** create new template */
	let tempDOM = template.cloneNode(true);

	/** cycle through pre directives */
	parseDirectives(directives.filter(dir => dir.isPre()), tempDOM.content, data);

	/** replace simple template values */
	templater(tempDOM, data);

	/** return the virtual DOM */
	return tempDOM;
}

/** return a function that can do template parsing */
function templater(template, data) {
	/** get the html */
	let html = template.innerHTML;

	/** set the pattern for replacement */
	const re = /{{\s?([\w\W]*?)\s?}}/gmi;

	/** cycle over matches */
	let match;
	while ((match = re.exec(html)) !== null) {
		/** catch exceptions */
		try {
			/** replace the values in the html and reset the lastIndex of the regex */
			html = html.replace(match[0], Object(__WEBPACK_IMPORTED_MODULE_0__using_function__["a" /* using */])(data, match[1]));
			re.lastIndex = 0;
		} catch (ex) {
			console.log(ex);
		}
	}

	/** reset the innerHTML */
	template.innerHTML = html;
}

/** virtualize the passed DOM element */
function virtualizeDOM(element) {
	let vElement = { type: element.nodeName, props: [], children: [], value: '' };
	if (['#text', '#comment'].includes(element.nodeName)) vElement.value = element.nodeValue;

	if (element.attributes) {
		for (let i = 0; i < element.attributes.length; i++) {
			let a = element.attributes[i];
			vElement.props.push({ 'name': a.name, 'value': a.value });
		}
	}

	if (element.childNodes) {
		element.childNodes.forEach(c => {
			vElement.children.push(virtualizeDOM(c));
		});
	}

	return vElement;
}

/** update the given parent with new virtual DOM nodes */
function updateDOM(parent, newNode, oldNode, index) {
	if (!index) index = 0;

	if (!oldNode) {
		if (newNode) {
			let newDOMNode = createElement(newNode);
			parent.appendChild(newDOMNode);
		}
	} else if (!newNode) {
		parent.removeChild(parent.childNodes[index]);
	} else if (hasChanged(newNode, oldNode)) {
		let newDOMNode = createElement(newNode);
		parent.replaceChild(newDOMNode, parent.childNodes[index]);
	} else if (newNode.type) {
		updateProps(parent.childNodes[index], newNode.props, oldNode.props);

		const newLength = newNode.children.length;
		const oldLength = oldNode.children.length;
		
		/** check for less new than old */
		if (newLength < oldLength) {
			/** get all the old elements that are past the new */
			let children = [];
			for (let i = newLength; i < oldLength; i++) {
				children.push(parent.childNodes[index].childNodes[i]);
			}

			/** remove old elements */
			children.forEach(c => parent.childNodes[index].removeChild(c));
		}

		/** compare all new nodes */
		for (let i = 0; i < newLength; i++) {
			updateDOM(parent.childNodes[index], newNode.children[i], oldNode.children[i], i);
		}
	}
}

/** check to see if has changed */
function hasChanged(node1, node2) {
	return (typeof node1 !== typeof node2) || (node1.type !== node2.type) || (['#text', '#comment'].includes(node1.type) && node1.value !== node2.value);
}

/** find references to the given directives on the given element and parse */
function parseDirectives(dirs, element, data) {
	/** sort the directives */
	dirs.sort(function(a, b) {
		return a.order - b.order;
	});

	/** execute each directive */
	dirs.forEach(dir => {
		/** create an array of selectors */
		let selectors = [];

		/** check for sub selectors */
		if (dir.subSelectors.length > 0) {
			/** cycle thru sub selectors */
			dir.subSelectors.forEach(ss => {
				/** add the selector with sub selector */
				selectors.push(`${dir.selector}\\:${ss}`);
			});
		} else {
			/** add the single selector */
			selectors.push(dir.selector);
		}

		/** cycle through selectors */
		selectors.forEach(selector => {
			/** initialize the directive elements */
			let directiveElement;
			while ((directiveElement = element.querySelector(`[${selector}]`)) !== null) {
				let details = getDirectiveDetails(directiveElement, dir, selector);
				dir.parser(details, directiveElement, data);
			}
		});
	});
}

/** get the attribute name (selector), sub selector, and value of a directive */
function getDirectiveDetails(element, directive, selector) {
	/** initialize the details */
	let details = { 'value': null, 'subSelector': null };

	/** get the selector */
	selector = selector.replace('\\', '');
	if (directive.isPost()) selector = selector.toLowerCase();

	/** get the attribute value expression, and remove the attribute */
	var attrVal = element.getAttribute(selector);
	element.removeAttribute(selector);

	/** set details */
	details.value = attrVal;

	/** check for sub selector */
	if (selector.includes(':')) details.subSelector = selector.split(':')[1];

	/** return the details */
	return details;
}

/** create a DOM element based on the virtual DOM node passed */
function createElement(node) {
	if (node.type === '#text') {
		return document.createTextNode(node.value);
	}
	if (node.type === '#comment') {
		return document.createComment(node.value);
	}
	const $el = document.createElement(node.type);
	setProps($el, node.props);
	node.children.map(createElement).forEach($el.appendChild.bind($el));
	return $el;
}

/** check this property to see if it is an event property */
function isEventProp(prop) {
	return /^cron:/.test(prop.name);
}

/** set a target element's property value */
function setProp(target, prop) {
	target.setAttribute(prop.name, prop.value);
}

/** set multiple property values on a target element */
function setProps(target, props) {
	props.forEach(prop => {
		setProp(target, prop);
	});
}

/** remove a property from a target element */
function removeProp(target, prop) {
	target.removeAttribute(prop.name);
}

/** update the properties on a target element */
function updateProps(target, newProps, oldProps) {
	newProps.forEach(prop => {
		let match = oldProps.find(p => p.name === prop.name);
		if (match) {
			if (match.value !== prop.value) setProp(target, prop); // update
		} else {
			if (!isEventProp(prop)) {
				setProp(target, prop); // add new
			}
		}
	});
	oldProps.forEach(prop => {
		let match = newProps.find(p => p.name === prop.name);
		if (!match) {
			removeProp(target, prop);
		}
	});
}

/** empty an element of all children */
function emptyElement(element) {
	while (element.firstChild) element.removeChild(element.firstChild);
};

/** export the DOM related functions */


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__crfor_directive__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crif_directive__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__crclass_directive__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cron_directive__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__crfor_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__crif_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__crclass_directive__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__cron_directive__["a"]; });
/** import directives */





/** re-export */


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crForDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__ = __webpack_require__(0);
/** import dependencies */


/** create the directive */
const crForDirective = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__["a" /* Directive */]('crFor', forIterator);

/** export the directive */


/** define the directive parser function */
function forIterator(details, forElement, data) {
	/** get the for attribute value expression */
	var forAttrVal = details.value.split(' ');
	var entityRef = forAttrVal[0];
	var entityProp = forAttrVal[2];

	/** cycle over the property */
	var forHTML = '';

	let getDataProperty = new Function('obj', `
		return (obj.${entityProp});
	`);

	/** check the entityProperty type */
	let dataProperty = getDataProperty(data);
	if (Array.isArray(dataProperty)) {
		dataProperty.forEach((row, i) => {
			/** add html for the iteration */
			var rowEl = forElement.cloneNode(true);
			var rowHTML = rowEl.outerHTML;

			/** get the row properties */
			let rowProps = Object.getOwnPropertyNames(row);
			if (rowProps.length > 0) {
				rowProps.forEach(p => {
					rowHTML = rowHTML.replace(`${entityRef}.`, `${entityProp}[${i}].`);
				});
			}
			
			/** create regular expression to match the entityRef */
			let re = new RegExp(`([^\\w])(${entityRef}\\b)([^\\w])`, 'gmi'); // /([^\w])(n\b)([^/w])/gmi
			let match;
			while ((match = re.exec(rowHTML)) !== null) {
				try {
					let replacement = `${match[1]}${entityProp}[${i}]${match[3]}`;
					rowHTML = rowHTML.replace(match[0], replacement);
				} catch (ex) {
					console.log(ex);
				}
			}
			
			/** add the html to the crForHtml */
			forHTML += rowHTML;
		});
	}

	/** replace the forElements html */
	forElement.outerHTML = forHTML;
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crIfDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_using_function__ = __webpack_require__(1);
/** import dependencies */



/** create the directive */
const crIfDirective = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__["a" /* Directive */]('crIf', ifCheck);

/** export the directive */


/** define the directive parser function */
function ifCheck(details, ifElement, data) {
	/** evaluate the expression */
	if (Object(__WEBPACK_IMPORTED_MODULE_1__functions_using_function__["a" /* using */])(data, details.value) === false) {
		ifElement.parentNode.removeChild(ifElement);
	}
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crClassDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_using_function__ = __webpack_require__(1);
/** import dependencies */



/** create the directive */
const crClassDirective = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__["a" /* Directive */]('crClass', classCheck);

/** export the directive */


/** define the directive parser function */
function classCheck(details, classElement, data) {
	/** get the current class list */
	let classList = [];
	for (var i = 0; i < classElement.classList.length; i++) {
		classList.push(classElement.classList[i]);
	}

	/** evaluate the expression */
	let classObj = Object(__WEBPACK_IMPORTED_MODULE_1__functions_using_function__["a" /* using */])(data, details.value);
	
	/** create internal class check function */
	const hasClass = (className) => {
		return classList.includes(className);
	};

	/** add/remove classes */
	Object.keys(classObj).forEach(key => {
		/** check if the class is true */
		if (classObj[key] === true) {
			if (!hasClass(key)) classList.push(key);
		} else {
			if (hasClass(key)) classList.splice(classList.indexOf(key), 1);
		}
	});

	/** reset the class list */
	classElement.classList = classList.join(' ');
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return crOnDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_using_function__ = __webpack_require__(1);
/** import dependencies */



/** an array of event names to look for in the crOn event directive */
const eventTypes = [
	/** mouse events */
	'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup',
	
	/** keyboard events */
	'keydown', 'keypress', 'keyup',
	
	/** frame / object events */
	'abort', 'beforeunload', 'error', 'hashchange', 'load', 'pageshow', 'pagehide', 'resize', 'scroll', 'unload',
	
	/** form events */
	'blur', 'change', 'focus', 'focusin', 'focusout', 'input', 'invalid', 'reset', 'search', 'select', 'submit',
	
	/** drag events */
	'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop',
	
	/** clipboard events */
	'copy', 'cut', 'paste',
	
	/** print events */
	'afterprint', 'beforeprint',
	
	/** media events */
	'abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting',
	
	/** misc events */
	'online', 'offline', 'wheel',

	/** touch events */
	'touchcancel', 'touchend', 'touchmove', 'touchstart'
];

/** create the directive */
const crOnDirective = new __WEBPACK_IMPORTED_MODULE_0__classes_directive_class__["a" /* Directive */]('crOn', eventAttach)
	.setSubSelectors(eventTypes)
	.setPre(false)
	.setPost(true)

/** export the directive */


/** define the directive parser function */
function eventAttach(details, element, data) {
	/** create the event function */
	let eventFunc = function() {
		return Object(__WEBPACK_IMPORTED_MODULE_1__functions_using_function__["a" /* using */])(data, details.value);
	};

	/** remove and re-add the event listener */
	element.removeEventListener(details.subSelector, eventFunc);
	element.addEventListener(details.subSelector, eventFunc);
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ":host h1 {\n  margin: 5px 0px;\n  padding: 0px; }\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MyTestComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _circularComponent = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyTestComponent = exports.MyTestComponent = (_dec = (0, _circularComponent.CircularComponent)({
	selector: 'my-test',
	template: __webpack_require__(19),
	styles: __webpack_require__(20),
	attributes: ['name']
}), _dec(_class = function () {
	function MyTestComponent() {
		_classCallCheck(this, MyTestComponent);

		/** public properties */
		this.name = '';
		this.data = [{ 'id': 0, 'name': 'John Doe', age: 38, selected: true }, { 'id': 1, 'name': 'Jane Doe', age: 38, selected: true }, { 'id': 2, 'name': 'Billy Doe', age: 14, selected: true }, { 'id': 3, 'name': 'Samantha Doe', age: 12, selected: true }, { 'id': 4, 'name': 'Jeremiah Doe', age: 11, selected: true }, { 'id': 5, 'name': 'Susie Doe', age: 9, selected: true }, { 'id': 6, 'name': 'Ezekiel Doe', age: 7, selected: true }, { 'id': 7, 'name': 'Molly Doe', age: 6, selected: true }];
	}

	_createClass(MyTestComponent, [{
		key: 'changeValue',
		value: function changeValue() {
			var name = prompt('Enter A Name');
			this.data[0].name = name;
		}
	}, {
		key: 'addValue',
		value: function addValue() {
			alert('Test');
		}
	}]);

	return MyTestComponent;
}()) || _class);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "<div> <slot></slot> <div crfor=\"d in data\"> Hello! My name is {{d.name}} and I am {{d.age}} years old. </div> <button cron:click=changeValue()> Update </button> </div>";

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ":host {\n\tposition: absolute;\n\ttop: 75px;\n\tleft: 25px;\n\tbackground-color: #E6E6E6;\n\tpadding: 50px;\n}", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map