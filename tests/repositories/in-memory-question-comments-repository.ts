import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public questionComments: QuestionComment[] = [];

  async findById(id: UniqueEntityID): Promise<QuestionComment | null> {
    return (
      this.questionComments.find((questionComment) =>
        questionComment.id.equals(id)
      ) ?? null
    );
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.questionComments.findIndex((q) =>
      q.id.equals(questionComment.id)
    );

    this.questionComments.splice(index, 1);
  }

  async create(questionComment: QuestionComment): Promise<void> {
    this.questionComments.push(questionComment);
  }
}
