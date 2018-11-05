import { NgModule } from '@angular/core';
import { SanitizerPipe } from './sanitizer/sanitizer';

@NgModule({
	declarations: [
		SanitizerPipe],
	imports: [],
	exports: [
		SanitizerPipe]
})
export class PipesModule { }
