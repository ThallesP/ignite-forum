import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

export type AnswerQuestionUseCaseInput = {
  authorID: string
  questionID: string
  content: string
}
export type AnswerQuestionUseCaseOutput = {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorID,
    content,
    questionID,
  }: AnswerQuestionUseCaseInput): Promise<AnswerQuestionUseCaseOutput> {
    const answer = Answer.create({
      authorID: new UniqueEntityID(authorID),
      content,
      questionID: new UniqueEntityID(questionID),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
