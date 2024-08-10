import { ReportReason, ReportResponse, ReportType, SendReportParams, sendReport } from "@/api/report";
import { ApiErrorResponse, ApiSuccessResponse } from "@/lib/http";
import { cn } from "@/lib/utils";
import { useModalStore } from "@/stores/modal-store";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import NotificationReportModal, { NotificationReportModalKey } from "./notification-report-modal";
import { toast } from "sonner";

export const ReportModalKey = "ReportModal";

const ReportModal = ({ type }: { type: ReportType }) => {
  const ReportItemOptions = [
    {
      title: "It's spam",
      reason: ReportReason.Spam,
      action: true,
    },
    {
      title: "Nudity or sexual activity",
      reason: ReportReason.NudityOrSexualActivity,
      action: true,
    },
    {
      title: "Hate speech or symbols",
      reason: ReportReason.HateSpeechOrSymbols,
      action: true,
    },
    {
      title: "Violence or dangerous organisations",
      reason: ReportReason.ViolenceOrDangerousOrganisations,
      action: true,
    },
    {
      title: "Sale of illegal or regulated goods",
      reason: ReportReason.IllegalOrRegulatedGoods,
      action: true,
    },
    {
      title: "Bullying or harassment",
      reason: ReportReason.BullyingOrHarassment,
      action: true,
    },
    {
      title: "Intellectual property violation",
      reason: ReportReason.IntellectualPropertyViolation,
      action: true,
    },
    {
      title: type === ReportType.Comment ? "Suicide, self-injury or eating disorders" : "Suicide or self-injury",
      reason: ReportReason.SuicideOrSelfInjury,
      action: true,
    },
    ...(type !== ReportType.Comment
      ? [
          {
            title: "Eating disorders",
            reason: ReportReason.EatingDisorders,
            action: true,
          },
          {
            title: "Scam or fraud",
            reason: ReportReason.ScamOrFraud,
            action: true,
          },
        ]
      : []),
    {
      title: "Drugs",
      reason: ReportReason.Drugs,
      action: true,
    },
    {
      title: "False information",
      reason: ReportReason.FalseInformation,
      action: true,
    },
    {
      title: "I just don't like it",
      reason: ReportReason.JustDontLikeIt,
      action: true,
    },
  ];

  const ReportUserItemOptions = [
    {
      title: "It's spam",
      reason: ReportReason.Spam,
      action: true,
    },
    {
      title: "I just don't like it",
      reason: ReportReason.JustDontLikeIt,
      action: true,
    },
    {
      title: "Suicide, self-injury or eating disorders",
      reason: ReportReason.SuicideOrSelfInjury,
      action: true,
    },
    {
      title: "Sale of illegal or regulated goods",
      reason: ReportReason.IllegalOrRegulatedGoods,
      action: true,
    },
    {
      title: "Nudity or sexual activity",
      reason: ReportReason.NudityOrSexualActivity,
      action: true,
    },
    {
      title: "Hate speech or symbols",
      reason: ReportReason.HateSpeechOrSymbols,
      action: true,
    },
    {
      title: "Violence or dangerous organisations",
      reason: ReportReason.ViolenceOrDangerousOrganisations,
      action: true,
    },
    {
      title: "Bullying or harassment",
      reason: ReportReason.BullyingOrHarassment,
      action: true,
    },
    {
      title: "Intellectual property violation",
      reason: ReportReason.IntellectualPropertyViolation,
      action: true,
    },

    {
      title: "Scam or fraud",
      reason: ReportReason.ScamOrFraud,
      action: true,
    },
    {
      title: "False information",
      reason: ReportReason.FalseInformation,
      action: true,
    },
    {
      title: "This account pretending to me",
      reason: ReportReason.PretendingMe,
      action: true,
    },
    {
      title: "This account pretending to someone I friend",
      reason: ReportReason.PretendingSomeFriend,
      action: true,
    },
    {
      title: "This account a celebrity or public figured",
      reason: ReportReason.PretendingCelebrity,
      action: true,
    },
    {
      title: "This account a business or organisation",
      reason: ReportReason.PretendingBusiness,
      action: true,
    },

    {
      title: "They may be under the age of 13",
      reason: ReportReason.UnderThe13Age,
      action: true,
    },
  ];

  const { modalOpen, modalClose, modalKey, modalData, setModalData } = useModalStore();

  const { mutate: sendReportMutate, isPending: sendReportIsPending } = useMutation<
    ApiSuccessResponse<ReportResponse>,
    ApiErrorResponse,
    SendReportParams
  >({
    mutationFn: (params) => sendReport(params),
    onSuccess: () => {
      modalOpen(NotificationReportModalKey);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "send report failed!");
    },
  });

  const handleSendReport = (reason: ReportReason) => {
    sendReportMutate({
      reason: reason,
      type: type,
      info: modalData.id,
    });
  };

  return (
    <>
      <Modal isOpen={modalKey === ReportModalKey} onOpenChange={modalClose} size="sm" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => {
            const reportOptions = type === ReportType.User ? ReportUserItemOptions : ReportItemOptions;
            return (
              <>
                <ModalHeader className="flex flex-col gap-1 items-center justify-center border-b-1 p-2">
                  Report
                </ModalHeader>
                {type !== ReportType.User && (
                  <ModalHeader className="flex flex-col gap-1 items-start py-2 border-b-1">
                    Why are you reporting this{" "}
                    {type === ReportType.Post ? "post" : type === ReportType.Comment ? "comment" : "reel"}?
                  </ModalHeader>
                )}
                <ModalBody
                  className={`mt-3 mb-3 cursor-pointer text-start p-0 border-b ${
                    sendReportIsPending ? "pointer-events-none opacity-50" : ""
                  }`}>
                  {reportOptions.map((optionItem, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div
                          key={index}
                          className="flex items-center gap-2 ml-5"
                          onClick={() => handleSendReport(optionItem.reason)}>
                          <p className={cn("text-black")}>{optionItem.title}</p>
                        </div>
                        {index !== ReportItemOptions.length - 1 && <hr className="w-full border-gray-300" />}
                      </React.Fragment>
                    );
                  })}
                  {sendReportIsPending && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                      <Spinner size="md" />
                    </div>
                  )}
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>

      <NotificationReportModal />
    </>
  );
};

export default ReportModal;
