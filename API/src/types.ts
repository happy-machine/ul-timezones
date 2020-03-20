export interface Model {
  name?: string;
  id?: number;
  accuracy?: number;
  zero_precision?: number;
  one_precision?: number;
  percent_score_lower_limit?: number;
  percent_score_upper_limit?: number;
  train_val_split_percent?: number;
  comment_length: number;
  epochs: number;
  batch_size: number;
  embedding_vector_length?: number;
  dropout?: number;
  recurrent_dropout?: number;
  lstm_units: number;
  optimizer: string;
  language?: string;
  metrics?: string;
  loss: string;
  activation: string;
  notes?: string;
  path: string;
  collection_id?: number;
  strategy_id?: number;
  key_words?: [] | string;
  shuffling: number;
  stemming: number;
}

export interface ModelState {
  COMMENT_LENGTH: number;
  EMBEDDING_VECTOR_LENGTH: number;
  TRAIN_VAL_SPLIT_PERCENT: number;
  EPOCHS: number;
  BATCH_SIZE: number;
  LSTM_UNITS: number;
  KEY_WORDS: string[];
  DROPOUT: number;
  RECURRENT_DROPOUT: number;
  OPTIMIZER: string;
  METRICS: string;
  LOSS: string;
  ACTIVATION: string;
  PERCENT_SCORE_LOWER_LIMIT: number;
  PERCENT_SCORE_UPPER_LIMIT: number;
  DATA_TEST_SPLIT_PERCENT: number;
  collection_id: number;
  strategy_id: number;
  shuffling?: number;
  stemming?: number;
  knex?: object;
}

export interface DataFromDb {
  collection_id?: number;
  strategy_id?: number;
  data_id?: number;
  label?: number;
  marker_name?: string;
  organisation?: string;
  course_name?: string;
  course_level?: string;
  language?: string;
}

export interface labelledFromDb {
  collection_id: number;
  strategy_id: number;
  knex?: object;
}

export interface LabelToData {
  label: number;
  data_id: number;
  strategy_id: number;
  marker_name: string;
}

export interface DataToDb {
  text: string;
  language: string;
  text_source?: string;
  metadata_id: number;
}
export interface DataToCollection {
  data_id: number;
  collection_id: number;
}

export interface Config<T> {
  emails: T;
  labellingMode: T;
  labellingThreshold: T;
  commentKeyword: T;
  scoreKeyword: T;
}

export interface AllConfig {
  readonly config: object;
  readonly csvConfig: object;
}
export interface User {
  id?: number;
  email?: string;
  name?: string;
  login?: string;
  password?: string;
  collection_id?: number;
  strategy_id?: number;
  model_manager_access?: boolean | string;
  marking_tool_access?: boolean | string;
}
