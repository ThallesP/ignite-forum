import { UniqueEntityID } from './unique-entity-id'

export class Entity<T> {
  protected props: T
  private _id: UniqueEntityID

  protected constructor(props: T, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  get id(): UniqueEntityID {
    return this._id
  }
}
