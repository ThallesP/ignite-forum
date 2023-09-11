import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let answersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase
describe('Answer Question', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(answersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      authorID: 'author-id',
      content: 'answer content',
      questionID: 'question-id',
    })

    expect(answer.content).toEqual('answer content')
    expect(answersRepository.answers[0].id).toEqual(answer.id)
  })
})
