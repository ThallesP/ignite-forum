import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
  findById(id: UniqueEntityID): Promise<Answer | null>;
}
