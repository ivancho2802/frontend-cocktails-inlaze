import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  /**
   * se separa en varios grupos un arreglo para ajustarlo al diseño que se va a mostrar
   * @param array any
   * @param n numero de tamaño del grupo
   * @returns grupos varios
   */
  split(array:any[], n:number) {
    try {
      let [...arr]  = array;
      var res = [];
      while (arr.length) {
        res.push(arr.splice(0, n));
      }
      return res;
      
    } catch (error) {

      alert(JSON.stringify(error));

      return []
    }
  }

  /**
   * se separa en varios grupos un arreglo para ajustarlo al diseño que se va a mostrar
   * @param a any
   * @param n numero de grupos
   * @param balanced de numeros iguales
   * @returns grupos varios
   */
  chunkify(a:any[], n: number, balanced:boolean) {

    if (n < 2)
      return [a];

    var len = a.length,
      out = [],
      i = 0,
      size;

    if (len % n === 0) {
      size = Math.floor(len / n);
      while (i < len) {
        out.push(a.slice(i, i += size));
      }
    }

    else if (balanced) {
      while (i < len) {
        size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i += size));
      }
    }

    else {

      n--;
      size = Math.floor(len / n);
      if (len % size === 0)
        size--;
      while (i < size * n) {
        out.push(a.slice(i, i += size));
      }
      out.push(a.slice(size * n));

    }

    return out;
  }
}
