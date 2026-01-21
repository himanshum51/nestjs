import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    if(value.name){
      value.name =  value.name.toUpperCase();
    }
    return value;
  }
}
