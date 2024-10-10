import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.enitity';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
     private episodes: Episode[] = [];

     async findAll(sort: 'asc' | 'desc' = 'asc') {
          const ascending = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
          const descending = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

          return sort === 'asc'
               ? this.episodes.sort(ascending)
               : this.episodes.sort(descending)
     }

     async findFeatured(){
          return this.episodes.filter((episode : Episode)=>episode.featured);
     }

     async findOne(id:string){
          return this.episodes.find((episode : Episode)=> episode.id === id);
     }

     async create(createEpisodeDto: CreateEpisodeDto){
          const newEpisode = {...createEpisodeDto, id:randomUUID()};
          this.episodes.push(newEpisode);
          return newEpisode;
     }
}
