import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase',
  standalone: true
})
export class SentenceCasePipe implements PipeTransform {

  transform(sentence: string): string {
    if(sentence){
      let upper = sentence.toUpperCase();
      return upper
    }else{
      return sentence;
    }
  }

}
