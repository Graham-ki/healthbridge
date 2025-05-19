declare module '@nlpjs/nlp' {
  export class Nlp {
    constructor(options?: any);
    use(plugin: any): void;
    addDocument(language: string, utterance: string, intent: string): void;
    addAnswer(language: string, intent: string, answer: string): void;
    train(): Promise<void>;
    process(language: string, utterance: string): Promise<any>;
  }
}

declare module '@nlpjs/lang-en' {
  const LangEn: any;
  export = LangEn;
}
