import { CircularComponent } from '../../../../lib';

@CircularComponent({
	selector: 'my-title',
	template: `<h1>The {{title}} Family</h1>`,
	styleUrl: './my-title.component.scss',
	attributes: ['title']
})
export class MyTitleComponent {
	constructor() {
		this.title = '';
	}

	testMethod() {
		alert('coming soon');
	}
}