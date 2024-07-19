import { Schema, model } from "mongoose";

const ModelSchema = new Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  organization: { type: String, required: true },
  description: { type: String, required: true },
  created_date: { type: String, required: true },
  url: { type: String, required: true },
  modality: { type: String, required: true },
  size: { type: String },
  sample: { type: String },
  analysis: { type: String },
  dependencies: { type: [String] },
  quality_control: { type: String },
  access: { type: String, required: true },
  license: { type: String },
  intended_uses: { type: String },
  prohibited_uses: { type: String },
  monitoring: { type: String },
  feedback: { type: String },
  model_card: { type: String },
  training_emissions: { type: String },
  training_time: { type: String },
  training_hardware: { type: String },
  monthly_active_users: { type: String },
  user_distribution: { type: String },
  failures: { type: String },
  lawsuits: { type: Number, default: 0 },
  lawsuit_inf: { type: String },
  credibility: { type: Number, default: 0 },
  risk: { type: Number, default: 0 },
  benchmarks: { type: Number, default: 0 },
  business_readiness: { type: Number, default: 0 },
  capabilities: { type: Number, default: 0 },
  success_stories: { type: Number, default: 0 },
  popularity: { type: Number, default: 0 },
  perceived_business_value: { type: Number, default: 0 },
});

const LLM = model("LLM", ModelSchema);

export default LLM;
