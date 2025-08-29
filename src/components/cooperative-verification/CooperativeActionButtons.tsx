import React from "react";
import { Check, CheckCircle, X } from "lucide-react";
import { TFormattedCooperativeData } from "@/types/cooperative.type";
import { FieldSet } from "@/components/cooperative-verification/FieldSet";

interface CooperativeActionButtonsProps {
  cooperative: TFormattedCooperativeData;
  handleVerificationAction: (action: "verify" | "unverify") => void;
  isLoadingAction: boolean;
  confirmationAction: string | null;
}

const CooperativeActionButtons: React.FC<CooperativeActionButtonsProps> = ({
  cooperative,
  handleVerificationAction,
  isLoadingAction,
  confirmationAction,
}) => {
  return (
    <FieldSet title="Actions" icon={Check}>
      {cooperative?.status?.toLowerCase() === "verified" && cooperative?.id ? (
        <div className="text-center py-4">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <p className="text-sm font-medium text-gray-900 mb-1">Verified</p>
          <p className="text-xs text-gray-600">
            This cooperative has been verified
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            onClick={() => handleVerificationAction("verify")}
            disabled={isLoadingAction}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4 mr-2" />
            {isLoadingAction && confirmationAction === "verify"
              ? "Verifying..."
              : "Verify"}
          </button>
          <button
            onClick={() => handleVerificationAction("unverify")}
            disabled={isLoadingAction}
            className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-4 h-4 mr-2" />
            {isLoadingAction && confirmationAction === "unverify"
              ? "Rejecting..."
              : "Reject"}
          </button>
        </div>
      )}
    </FieldSet>
  );
};

export default CooperativeActionButtons;
