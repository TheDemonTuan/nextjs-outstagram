import { ReportReason } from "@/api/report";

export const ReportReasonDescriptions: Record<ReportReason, string> = {
  [ReportReason.Spam]: "spam",
  [ReportReason.ReportReason]: "general report reason",
  [ReportReason.JustDontLikeIt]: "just don't like it",
  [ReportReason.SuicideSelfInjuryOrEatingDisorders]: "suicide, self-injury, or eating disorders",
  [ReportReason.IllegalOrRegulatedGoods]: "illegal or regulated goods",
  [ReportReason.NudityOrSexualActivity]: "nudity or sexual activity",
  [ReportReason.HateSpeechOrSymbols]: "hate speech or symbols",
  [ReportReason.ViolenceOrDangerousOrganisations]: "violence or dangerous organisations",
  [ReportReason.BullyingOrHarassment]: "bullying or harassment",
  [ReportReason.IntellectualPropertyViolation]: "intellectual property violation",
  [ReportReason.ScamOrFraud]: "scam or fraud",
  [ReportReason.FalseInformation]: "false information",
  [ReportReason.Drugs]: "drugs",
  [ReportReason.SuicideOrSelfInjury]: "suicide or self-injury",
  [ReportReason.EatingDisorders]: "eating disorders",
  [ReportReason.PretendingMe]: "pretending to be me",
  [ReportReason.PretendingSomeFriend]: "pretending to be a friend",
  [ReportReason.PretendingCelebrity]: "pretending to be a celebrity",
  [ReportReason.PretendingBusiness]: "pretending to be a business",
  [ReportReason.UnderThe13Age]: "under 13 age",
};
