import { PartialType } from '@nestjs/mapped-types';
import { CreateTodo1Dto } from './create-todo1.dto';

export class UpdateTodo1Dto extends PartialType(CreateTodo1Dto) {}
