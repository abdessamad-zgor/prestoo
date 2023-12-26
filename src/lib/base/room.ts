import {Guest} from './guest';

enum ProgressType {
  Individual,
  Group,
  Host
} 

type RoomConfiguration = {
  progress?: ProgressType
  quizTimeout?: number,
}

export class Room {
  _id: string;
  material: string ;
  configuration: RoomConfiguration;
  code: string;

  constructor(
    material: string = "",
    configuration: RoomConfiguration  = {},
    code: string = ""
  ){
    this._id = ""
    this.material = material 
    this.configuration = configuration
    this.code = code
  }


}
