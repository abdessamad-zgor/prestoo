export class Guest {
  username: string 
  joinedAt: number
  avatar: string 
  code: string 
  feedback: string[] 
  progress: string[] 
  _id: string 

  constructor(
    username: string = "",
    joinedAt: number = -1,
    avatar: string = "",
    code: string = "",
    feedback: string[] = [],
    progress: string[] = [],
    _id: string = ""
  ){
    this.username = username 
    this.joinedAt = joinedAt
    this.avatar = avatar 
    this.code = code 
    this.feedback = feedback 
    this.progress = progress 
    this._id = _id 
  }

  addFeedback(feedback: string){
    this.feedback = [...this.feedback, feedback]
    return this.feedback
  }
}

