import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export type StudentProps = {
  name: string
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: UniqueEntityID) {
    return new Student(
      {
        ...props,
      },
      id,
    )
  }
}
