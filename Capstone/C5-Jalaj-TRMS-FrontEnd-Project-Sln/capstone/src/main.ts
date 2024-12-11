import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppModule } from './app.module';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic'


platformBrowserDynamic().bootstrapModule(AppModule)