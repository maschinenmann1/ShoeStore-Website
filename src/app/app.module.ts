import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* ngx-bootstrap */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { ROUTES } from './routes';
import { COMPONENTS } from './components';
import { ReplaceTagDirective } from './directives/replace-tag.directive';
import { FormsModule } from '@angular/forms';
import { ProductsModule } from './products/products.module';
import { HttpClientModule } from '@angular/common/http';
import { CommentsModule } from './comments/comments.module';
import { PIPES } from './pipes';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from './shared';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    ReplaceTagDirective,
    ...ROUTES,
    ...COMPONENTS,
    ...PIPES,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    AccordionModule,
    ProductsModule,
    CommentsModule,
    HttpClientModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
