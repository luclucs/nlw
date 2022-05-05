import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepo } from "../feedbackRepo";

export class PrismaFeedbackRepo implements FeedbackRepo {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      // Cria o feedback no DB
      data: {
        type, //req.body.type
        comment, //req.body.comment
        screenshot, //req.body.screenshot
      },
    });
  }
}
