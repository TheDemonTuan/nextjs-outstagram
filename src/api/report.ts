
import http, { ApiSuccessResponse } from "@/lib/http";
import { PostResponse } from "./post";
import { UserResponse } from "./user";
import { PostComment } from "./post_comment";
export const reportKey = "reports";

export enum ReportReason {
    Spam = 1,
    ReportReason,
    JustDontLikeIt,
    SuicideSelfInjuryOrEatingDisorders,
    IllegalOrRegulatedGoods,
    NudityOrSexualActivity,
    HateSpeechOrSymbols,
    ViolenceOrDangerousOrganisations,
    BullyingOrHarassment,
    IntellectualPropertyViolation,
    ScamOrFraud,
    FalseInformation,
    Drugs,
    SuicideOrSelfInjury,
    EatingDisorders,

    PretendingMe,
    PretendingSomeFriend,
    PretendingCelebrity,
    PretendingBusiness,

    UnderThe13Age
}

  
export enum ReportType {
	Post = 1,
	Reel,
	Comment,
	User,
}

export enum ReportStatus {
	Pending,
	Viewed,
}

export interface ReportResponse {
    id: string;
    by_user_id: string;
    reason: ReportReason;
    type: ReportType;
    info: string;
    status: ReportStatus
    created_at: Date;
    updated_at: Date;
}

export interface SendReportParams  {
    reason: ReportReason;
    type: ReportType;
    info: string;
};
  

export const sendReport = async (params: SendReportParams) =>
    http.post<ApiSuccessResponse<ReportResponse>>(`users/report`, params).then((res) => res.data);


export interface ReportWithTypeResponse {
    id: string;
    by_user_id: string;
    reason: ReportReason;
    type: ReportType;
    info: string;
    status: ReportStatus
    created_at: Date;
    updated_at: Date;
    post?: PostResponse;
    user?: UserResponse;
    reporting_user?: UserResponse;
    comment?: PostComment;
  }

export const getAllReport = async () => 
    http.get<ApiSuccessResponse<ReportWithTypeResponse[]>>(`admin/report`).then((res) => res.data);

export const updateStatusReport = async (reportID:string) => 
    http.patch<ApiSuccessResponse<boolean>>(`admin/report/status/${reportID}`).then((res) => res.data);