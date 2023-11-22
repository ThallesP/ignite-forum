import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  async findById(id: UniqueEntityID): Promise<Answer | null> {
    return this.answers.find((answer) => answer.id.equals(id)) ?? null;
  }

  async findManyByQuestionId(
    questionId: UniqueEntityID,
    { page }: PaginationParams
  ): Promise<Answer[]> {
    return this.answers
      .filter((answer) => answer.questionID.equals(questionId))
      .slice((page - 1) * 20, page * 20);
  }

  async save(answer: Answer): Promise<void> {
    const index = this.answers.findIndex((a) => a.id.equals(answer.id));

    this.answers[index] = answer;
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.answers.findIndex((a) => a.id.equals(answer.id));

    this.answers.splice(index, 1);
  }

  public answers: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer);
  }
}
