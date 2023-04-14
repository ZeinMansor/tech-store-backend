import { IsOptional, IsString } from "class-validator";

export class UpdateDto {

    @IsString()
    @IsOptional()
    public readonly name: string;
}