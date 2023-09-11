import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let questionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(questionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorID: '1',
      content: 'content',
      title: 'title',
    })

    expect(question.id).toBeTruthy()
    expect(questionsRepository.questions[0].id).toEqual(question.id)
  })
})
