import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString } from "class-validator";

export class CreateEpisodeDto{
     @IsString()
     readonly name:string;

     @IsBoolean()
     @IsOptional()
     readonly featured?:boolean;

     @IsDate()
     @IsOptional()
     @Type(()=>Date)
     publishedOn?: Date;
}