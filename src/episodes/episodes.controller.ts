import { Body, Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from 'src/config/config.service';
import { IsPositivePipe } from 'src/pipes/is-positive.pipe';
import { ApiKeyGuard } from 'src/guards/api-key.guard';

@Controller('episodes')
export class EpisodesController {

     constructor(
          private episodesService : EpisodesService,
          private configService : ConfigService
     ){}
     
     @Get()
     findAll(
          @Query('sort') sort: 'asc' | 'desc' = 'desc',
          @Query('limit', new DefaultValuePipe(100), IsPositivePipe, ParseIntPipe) limit : number
     ){
          return this.episodesService.findAll(sort);
     }

     @Get('featured')
     findFeatured(){
          return this.episodesService.findFeatured();
     }

     @Get(':id')
     async findOne(
          @Param('id') id:string
     ){
          const episode = await this.episodesService.findOne(id);
          // if(!episode) throw new HttpException('Episode not found!', HttpStatus.NOT_FOUND)
          if(!episode) {
               throw new NotFoundException('Episode not found!')
          }

          return episode;
     }

     @UseGuards(ApiKeyGuard) // can be used for each requests or the entire controller...!!!
     @Post('create')
     create(@Body(ValidationPipe) input:CreateEpisodeDto){
          return this.episodesService.create(input);
     }
}
