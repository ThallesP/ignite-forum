import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async findBySlug(slug: string): Promise<Question | null> {
    return (
      this.questions.find((question) => question.slug.value === slug) ?? null
    )
  }

  async create(question: Question): Promise<void> {
    this.questions.push(question)
  }
}
