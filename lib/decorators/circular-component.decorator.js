'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.CircularComponent = CircularComponent;

var _templation = require('@circular/templation');

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
//# sourceMappingURL=circular-component.decorator.js.map