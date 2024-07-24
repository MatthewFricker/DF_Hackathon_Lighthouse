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
  org_credibility: { type: Number, default: 0 },
  safety: { type: Number, default: 0 },
  performance: { type: Number, default: 0 },
  business_readiness_general: { type: Number, default: 0 },
  business_readiness_personal: { type: Number, default: 0 },
  capabilities: { type: Number, default: 0 },
  known_successes: { type: Number, default: 0 },
  popularity: { type: Number, default: 0 },
  perceived_business_value_general: { type: Number, default: 0 },
  perceived_business_value_personal: { type: Number, default: 0 },
});

const LLM = model("LLM", ModelSchema);

export default LLM;
