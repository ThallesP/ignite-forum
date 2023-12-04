import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answerComments: AnswerComment[] = [];

  async findManyByAnswerId(
    answerId: UniqueEntityID,
    { page }: PaginationParams
  ): Promise<AnswerComment[]> {
    return this.answerComments
      .filter((answerComment) => answerComment.answerID.equals(answerId))
      .slice((page - 1) * 20, page * 20);
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.answerComments.push(answerComment);
  }

  async findById(id: UniqueEntityID): Promise<AnswerComment | null> {
    return (
      this.answerComments.find((answerComment) =>
        answerComment.id.equals(id)
      ) ?? null
    );
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.answerComments.findIndex((a) =>
      a.id.equals(answerComment.id)
    );

    this.answerComments.splice(index, 1);
  }
}
