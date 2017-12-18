/** import Templation */
import { Templation } from '@circular/templation';

/**
 * CircularComponent
 * A decorator that will create a new web component and attach the component class to it
 * @param {object} config The component configuration object
 */
export function CircularComponent(config) {
	return function(component) {
		/** create a CircularComponent class that extends the HTMLElement */
		class CircularComponent extends HTMLElement {
			/** static array of observed attributes */
			static get observedAttributes() { return config.attributes || []; }

			/** constructor */
			constructor() {
				/** initialize the HTMLElement base class */
				super();

				/** attach the shadown dom */
				this.attachShadow({ mode: 'open' });

				/** initialize the component and build */
				this.component = new component();
				this.build();
			}

			/** respond to attribute changes */
			attributeChangedCallback(attr, oldValue, newValue) {
				/** check if the attribute exists on the component and update */
				if (Object.keys(this.component).findIndex(a => a === attr) > -1) {
					this.component[attr] = newValue;
				}
			}

			/** build the component */
			build() {
				/** build the template */
				let template = document.createElement('template');
				
				/** set the template */
				if (config.template && config.template !== null) {
					template.innerHTML = config.template;
				} else if (config.templateUrl && config.templateUrl !== null) {
					template.innerHTML = config.templateUrl;
				} else {
					throw 'No template specified for component';
				}

				/** run the templation engine */
				let templation = new Templation();
				let compiler = templation.compile(this.shadowRoot, template, this.component);
				compiler.render();

				/** set styles */
				let styles = null;
				if (config.styles && config.styles !== null) {
					styles = config.styles;
				} else if (config.styleUrl && config.styleUrl !== null) {
					styles = config.styleUrl;
				}
				if (styles !== null) {
					/** create the styles node and attach to shadowRoot */
					let stylesNode = document.createElement('style');
					stylesNode.innerText = styles;
					this.shadowRoot.appendChild(stylesNode);
				}
			}
		}

		/** register the custom component */
		customElements.define(config.selector, CircularComponent);
	}
}