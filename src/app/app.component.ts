import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { count, filter, map, merge, Observable, of, Subscriber } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxLab';
  list:String[] = [];
  elementsCounted=0;
  elementsFiltered=0;
  elementsMerged=0;
  observable1 = new Observable()
  observable2 = new Observable()
  constructor( private http: HttpClient){
  
  }

  observables(){
    
   this.observable1= new Observable( subscriber => {
    subscriber.next("hello");
    subscriber.next("how");
    subscriber.next("are");
    subscriber.next("you");

    setTimeout(() =>{
      subscriber.next("Good!");
      subscriber.complete();
    },1000);
   
  } );
   this.observable1.subscribe(({
   next: (v:any) => this.list.push(v),
   error: (e) => console.error(e),
}))
  
  }
  counted(){
    this.observable1.pipe(count()).subscribe(element => this.elementsCounted=element);
  }
  merged(){
    this.observable2 = of(1,2,3,4,5);
    merge(this.observable1,this.observable2).pipe(count()).subscribe(element=> this.elementsMerged=element)
  }

  filtered(){
    merge(this.observable1,this.observable2).pipe(filter((r:any) => isNaN(r)),count()).subscribe(element=>this.elementsFiltered=element)
    let observable3 = this.http.get("https://jsonplaceholder.typicode.com/posts");
    
  }
  
}
