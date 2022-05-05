import { SubmitFeedback } from "./submitFeedback";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedback(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.run({
        type: "BUG",
        comment: "example",
        screenshot: "data:image/png;base64,19239138",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without a type", async () => {
    await expect(
      submitFeedback.run({
        type: "",
        comment: "example",
        screenshot: "data:image/png;base64,19239138",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without a comment", async () => {
    await expect(
      submitFeedback.run({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,19239138",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.run({
        type: "BUG",
        comment: "example",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
