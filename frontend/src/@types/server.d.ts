export interface Server {
    id: number;
    title: string;
    description: string;
    questions: {
      id: number;
      name: string;
      survey: number;
      question: string;
      vote: number;
    }[];
}