export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbackRepo {
  create: (data: FeedbackCreateData) => Promise<void>; //Toda function async vira uma Promise
}
