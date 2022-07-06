import { Observable } from "rxjs";
type ObserverFun = (data: any) => void;
export class Emiter<Topic extends string | number | symbol> {
  private observers: Map<Topic, Function[]> = new Map();
  constructor() {}
  private addObserveFun(topic: Topic, fun: ObserverFun) {
    if (!this.observers.has(topic)) {
      this.observers.set(topic, []);
    }
    this.observers.get(topic)!.push(fun);
  }
  on(topic: Topic | Topic[]): Observable<any> {
    return new Observable<any>((observer) => {
      if (Array.isArray(topic)) {
        topic.forEach((top) => {
          this.addObserveFun(top, (data) => {
            observer.next(data);
          });
        });
      } else {
        this.addObserveFun(topic, (data) => {
          observer.next(data);
        });
      }
    });
  }
  emit(topic: Topic, data?: any) {
    this.observers.get(topic)?.forEach((fun) => {
      fun(data);
    });
  }
}
export default Emiter;
