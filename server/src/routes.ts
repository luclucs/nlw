import express from "express";
import { SubmitFeedback } from "./functions/submitFeedback";
import { PrismaFeedbackRepo } from "./repositories/prisma/prismaFeedbackRepo";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  // Aguarda a requisição POST
  const { type, comment, screenshot } = req.body;
  const prismaFeedbackRepo = new PrismaFeedbackRepo();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedback = new SubmitFeedback(
    prismaFeedbackRepo,
    nodemailerMailAdapter
  );

  await submitFeedback.run({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
