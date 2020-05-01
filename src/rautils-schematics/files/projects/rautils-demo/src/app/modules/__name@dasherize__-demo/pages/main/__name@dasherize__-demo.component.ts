import { Component } from '@angular/core';

@Component({
	selector: '<%= dasherize(name) %>-demo',
	templateUrl: './<%= dasherize(name) %>-demo.component.html',
	styleUrls: ['./<%= dasherize(name) %>-demo.component.scss'],
})
export class <%= classify(name) %>DemoComponent { }
