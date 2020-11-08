export class Task {
  id: number
  description: string
  isDone: boolean
  editing: boolean

  constructor(id: number, description: string, isDone: boolean, editing: boolean) {
    this.id = id
    this.description = description
    this.isDone = isDone
    this.editing = editing
  }
}