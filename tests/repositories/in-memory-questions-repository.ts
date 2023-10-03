import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = [];

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async save(question: Question): Promise<void> {
    const index = this.questions.findIndex((q) => q.id.equals(question.id));

    this.questions[index] = question;
  }

  async findById(id: UniqueEntityID): Promise<Question | null> {
    return this.questions.find((question) => question.id.equals(id)) ?? null;
  }

  async delete(question: Question): Promise<void> {
    const index = this.questions.findIndex((q) => q.id.equals(question.id));

    this.questions.splice(index, 1);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return (
      this.questions.find((question) => question.slug.value === slug) ?? null
    );
  }

  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }
}
