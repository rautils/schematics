import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= classify(name) %>DemoComponent } from './pages';

const routes: Routes = [
	{
		path: '',
		component: <%= classify(name) %>DemoComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class <%= classify(name) %>DemoRoutingModule {}
