import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

export type CreateQuestionUseCaseInput = {
  authorID: string
  content: string
  title: string
}

export type CreateQuestionUseCaseOutput = {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorID,
    content,
    title,
  }: CreateQuestionUseCaseInput): Promise<CreateQuestionUseCaseOutput> {
    const question = Question.create({
      authorID: new UniqueEntityID(authorID),
      content,
      title,
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
