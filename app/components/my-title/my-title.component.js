import { CircularComponent } from '../../../src/decorators/circular-component.decorator';

@CircularComponent({
	selector: 'my-title',
	template: `<h1>The {{title}} Family</h1>`,
	styleUrl: './my-title.component.scss',
	attributes: ['title'],
	styles: ':host > h1 { font-size: 11px; }'
})
export class MyTitleComponent {
	constructor() {
		this.title = '';
	}

	testMethod() {
		alert('coming soon');
	}
}