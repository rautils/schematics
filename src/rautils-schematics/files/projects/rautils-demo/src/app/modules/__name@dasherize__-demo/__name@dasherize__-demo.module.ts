import { NgModule } from '@angular/core';

import { <%= classify(name) %>Module } from 'projects/<%= dasherize(name) %>/src';

import { <%= classify(name) %>DemoRoutingModule } from './<%= dasherize(name) %>-demo-routing.module';

import { <%= classify(name) %>DemoComponent } from './pages';

@NgModule({
	declarations: [<%= classify(name) %>DemoComponent],
	imports: [<%= classify(name) %>DemoRoutingModule, <%= classify(name) %>Module],
	exports: [],
})
export class <%= classify(name) %>DemoModule {}
