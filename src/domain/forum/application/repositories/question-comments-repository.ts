import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>;
  findById(id: UniqueEntityID): Promise<QuestionComment | null>;
  delete(questionComment: QuestionComment): Promise<void>;
}
