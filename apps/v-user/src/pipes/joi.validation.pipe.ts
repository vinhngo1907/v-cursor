import { ObjectSchema } from 'joi';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private schema: ObjectSchema) { }

    transform(value: any) {
        const { error } = this.schema.validate(value);
        if (error) {
            throw new BadRequestException('Validation failed');
        }
        return value;
    }
}
