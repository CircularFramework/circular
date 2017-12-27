# @circular/components

Components is a simple web component library that was written as part of the Circular Framework. Underneath it is leveraging @circular/templation for html template syntax and data binding.

### Installation
_npm install @circular/components --save_

### How To Use
Currently, the components library is made up of just a class decorator that can be used to create a new HTML5 web component. Simply decorate your own class with the CircularComponent decorator and configure it properly. This will register a new web component for use in your web application. The properties and methods of your class will be bound to the newly created component.

### Circular-Loader Webpack Loader
One important piece is the circular-loader webpack loader. Upon compiling your code with webpack this loader will search your components for refererences to files in the templateUrl and styleUrl decorator configurations, and will replace them with require statements. See the webpack.config.js file in this project to see how it is used. Essentially you'll want to use the circular-loader after the babel-loader.

##### Example: Decorating a class

    import { CircularComponent } from '@circular/components';

    @CircularComponent({
        selector: 'my-component',
        templateUrl: './my-component.component.html',
        styleUrl: './my-component.component.css',
        attributes: ['name']
    })
    export class MyComponent {
        constructor() {
            /** public properties */
            this.name = '';
            this.data = [
                { 'id': 0, 'name': 'John Doe', age: 38, selected: true },
                { 'id': 1, 'name': 'Jane Doe', age: 38, selected: true }
            ];
        }

        changeValue() {
            let name = prompt('Enter A Name');
            this.data[0].name = name;
        }
    }

##### Example: Component Template (./my-component.component.html)
    
    <div>
        <slot></slot>
        <div crFor="d in data">
            Hello! My name is {{d.name}} and I am {{d.age}} years old.
        </div>
        
        <button crOn:click="changeValue()">
            Update
        </button>
    </div>
    
##### Example: Component Styles (./my-component.component.css)
**NOTE**: The styles can be either CSS or SCSS.
    
    :host {
        position: absolute;
        top: 75px;
        left: 25px;
        background-color: #E6E6E6;
        padding: 50px;
    }
    
##### Example: Using Web Component
    
    <html>
        <head>
            <title>Test</title>
        </head>
        <body>
            <my-component name="Test Component"></my-component>
        </body>
    </html>
    
# Documentation

### CircularComponent (decorator)
This decorator will bring together a class with a component and bind the properties and methods from the class to the new component. The decorator takes in a configuration object. The configuration object must specify either a template or templateUrl value.

##### Configuration
* selector: string;
  * The name of the new web component (ex. my-component)
* template: string;
  * An HTML string that will be used for the component template
* templateUrl: string;
  * A url pointing to an html file that contains the template.
* styles: string;
  * A string containing the styles associated with this component.
* styleUrl: string;
  * A url pointing to either a CSS or SCSS files containing the styles for the component.
* attributes: string[];
  * A string array of attributes that can be set on the component. When the value of an attribute is changed it will look for a matching property on your class and update it's value.
