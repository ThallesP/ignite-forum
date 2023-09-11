import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let questionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(questionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorID: new UniqueEntityID('1'),
      content: 'content',
      title: 'title',
      slug: Slug.create('slug'),
    })

    await questionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'slug',
    })

    expect(question.id).toEqual(newQuestion.id)
  })
})
