export interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type CustomError = Error & {
  response?: {
    data?: string;
  };
};

export type NewDiary = Omit<Diary, "id">;
