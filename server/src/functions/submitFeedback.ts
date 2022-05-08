import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbackRepo } from "../repositories/feedbackRepo";

interface SubmitFeedbackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedback {
  constructor(
    private feedbackRepo: FeedbackRepo,
    private mailAdapter: MailAdapter
  ) {}

  async run(data: SubmitFeedbackRequest) {
    const { type, comment, screenshot } = data;

    if (!type) {
      throw new Error("Um tipo é necessário.");
    }

    if (!comment) {
      throw new Error("Um comentário é necessário.");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Formato de screenshot inválido.");
    }

    await this.feedbackRepo.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback!",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" />` : `<p>Sem screenshot do feedback :(</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}
