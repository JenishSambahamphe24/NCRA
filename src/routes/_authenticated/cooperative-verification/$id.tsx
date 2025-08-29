import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  Clock,
  MessageSquare,
  Loader2,
  CheckCircle,
  XCircle,
  FileText,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  useCooperativeDetail,
  useSubmitCooperativeFeedback,
  useVerifyCooperative,
} from "@/hooks/useCooperative";
import {
  TCooperativeDetailInfo,
  TDocument,
  TFormattedCooperativeData,
} from "@/types/cooperative.type";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import CooperativeBasicInfo from "@/components/cooperative-verification/CooperativeBasicInfo";
import CooperativeAddressInfo from "@/components/cooperative-verification/CooperativeAddressInfo";
import CooperativeFinancialInfo from "@/components/cooperative-verification/CooperativeFinancialInfo";
import CooperativeExecutiveMembers from "@/components/cooperative-verification/CooperativeExecutiveMembers";
import CooperativeCommitteeMembers from "@/components/cooperative-verification/CooperativeCommitteeMembers";
import CooperativeDocuments from "@/components/cooperative-verification/CooperativeDocuments";
import CooperativeActionButtons from "@/components/cooperative-verification/CooperativeActionButtons";

function formatCooperativeData(
  api: TCooperativeDetailInfo,
): TFormattedCooperativeData {
  const co = api.cooperativeInfo || {};
  const addr = api.coopAddressInfo || {};
  const strength = api.coopStrength || {};
  const docs: TDocument[] = [];

  // Process AO Documents
  if (api.uploadAODoc) {
    const aoDoc = api.uploadAODoc;
    if (aoDoc.auditReport)
      docs.push({
        id: "audit_report",
        name: "Audit Report",
        type: aoDoc.auditReport.match(/\.(jpg|jpeg|png|gif)$/i)
          ? "image"
          : "pdf",
        url: `https://ncra.dibugsoft.com/${aoDoc.auditReport.replace(/^\/+/, "")}`,
      });
    if (aoDoc.taxClearance)
      docs.push({
        id: "tax_clearance",
        name: "Tax Clearance",
        type: aoDoc.taxClearance.match(/\.(jpg|jpeg|png|gif)$/i)
          ? "image"
          : "pdf",
        url: `https://ncra.dibugsoft.com/${aoDoc.taxClearance.replace(/^\/+/, "")}`,
      });
    if (aoDoc.boardMeetingDecision)
      docs.push({
        id: "board_meeting",
        name: "Board Meeting Decision",
        type: aoDoc.boardMeetingDecision.match(/\.(jpg|jpeg|png|gif)$/i)
          ? "image"
          : "pdf",
        url: `https://ncra.dibugsoft.com/${aoDoc.boardMeetingDecision.replace(/^\/+/, "")}`,
      });
    if (aoDoc.electionRelatedDoc)
      docs.push({
        id: "election_doc",
        name: "Election Related Document",
        type: aoDoc.electionRelatedDoc.match(/\.(jpg|jpeg|png|gif)$/i)
          ? "image"
          : "pdf",
        url: `https://ncra.dibugsoft.com/${aoDoc.electionRelatedDoc.replace(/^\/+/, "")}`,
      });
    if (aoDoc.otherDoc)
      docs.push({
        id: "other_doc",
        name: "Other Document",
        type: aoDoc.otherDoc.match(/\.(jpg|jpeg|png|gif)$/i) ? "image" : "pdf",
        url: `https://ncra.dibugsoft.com/${aoDoc.otherDoc.replace(/^\/+/, "")}`,
      });
  }

  // Process Registration Documents
  if (api.uploadRegistrationDoc) {
    const regDoc = api.uploadRegistrationDoc;
    if (regDoc.businessRegisterCertificate)
      docs.push({
        id: "business_cert",
        name: "Business Registration Certificate",
        type: regDoc.businessRegisterCertificate.match(/\.(jpg|jpeg|png|gif)$/i)
          ? "image"
          : "pdf",
        url: `https://ncra.dibugsoft.com/${regDoc.businessRegisterCertificate.replace(/^\/+/, "")}`,
      });
    if (regDoc.panRegisterCertificate)
      docs.push({
        id: "pan_cert",
        name: "PAN Registration Certificate",
        type: regDoc.panRegisterCertificate.match(/\.(jpg|jpeg|png|gif)$/i)
          ? "image"
          : "pdf",
        url: `https://ncra.dibugsoft.com/${regDoc.panRegisterCertificate.replace(/^\/+/, "")}`,
      });
    if (regDoc.otherRegisterCertificate)
      docs.push({
        id: "other_cert",
        name: "Other Registration Certificate",
        type: regDoc.otherRegisterCertificate.match(/\.(jpg|jpeg|png|gif)$/i)
          ? "image"
          : "pdf",
        url: `https://ncra.dibugsoft.com/${regDoc.otherRegisterCertificate.replace(/^\/+/, "")}`,
      });
    if (regDoc.approvaLbylaw)
      docs.push({
        id: "bylaw",
        name: "Approved Bylaw",
        type: regDoc.approvaLbylaw.match(/\.(jpg|jpeg|png|gif)$/i)
          ? "image"
          : "pdf",
        url: `https://ncra.dibugsoft.com/${regDoc.approvaLbylaw.replace(/^\/+/, "")}`,
      });
    if (regDoc.feasibilityReport)
      docs.push({
        id: "feasibility",
        name: "Feasibility Report",
        type: regDoc.feasibilityReport.match(/\.(jpg|jpeg|png|gif)$/i)
          ? "image"
          : "pdf",
        url: `https://ncra.dibugsoft.com/${regDoc.feasibilityReport.replace(/^\/+/, "")}`,
      });
  }

  // Executive details
  const executiveMembers = (api.executiveDetails || []).map((ex, i) => ({
    id: ex.id || i,
    name:
      `${ex.firstName || ""} ${ex.middleName || ""} ${ex.lastName || ""}`.trim() ||
      "-",
    position: ex.executiveMemberType || "-",
    email: ex.email || "",
    phone: ex.phoneNumber || "",
    gender: ex.gender || "",
    ethnicity: ex.ethnicity || "",
    panNo: ex.panNo || "",
    nid: ex.nid || "",
    education: ex.highestLevelEducation || "",
    province: ex.province || "",
    district: ex.district || "",
    localLevel: ex.localLevel || "",
    wardNo: ex.wardNo || "",
    address:
      `${ex.tole || ""}, Ward ${ex.wardNo || ""}, ${ex.localLevel || ""}, ${ex.district || ""}, ${ex.province || ""}`
        .replace(/^,\s*|\s*,\s*$/, "")
        .replace(/,\s*,/g, ","),
  }));

  // Committee details
  const committeeMembers = (api.committeeDetails || []).map((cm, i) => ({
    id: cm.id || i,
    name:
      `${cm.firstName || ""} ${cm.middleName || ""} ${cm.lastName || ""}`.trim() ||
      "-",
    position: cm.position || "-",
    committeeType: cm.committeeType || "-",
    email: cm.email || "",
    phone: cm.phoneNumber || "",
    gender: cm.gender || "",
    ethnicity: cm.ethnicity || "",
    panNo: cm.panNo || "",
    nid: cm.nid || "",
    education: cm.highestEducation || "",
    province: cm.province || "",
    district: cm.district || "",
    localLevel: cm.localLevel || "",
    wardNo: cm.wardNo || "",
    address:
      `${cm.tole || ""}, Ward ${cm.wardNo || ""}, ${cm.localLevel || ""}, ${cm.district || ""}, ${cm.province || ""}`
        .replace(/^,\s*|\s*,\s*$/, "")
        .replace(/,\s*,/g, ","),
  }));

  return {
    id: co.id || 0,
    name: co.coopsFullNameEng || co.coopsFullNameNep || "-",
    registrationNumber: co.registrationNo || "-",
    status: co.status ? co.status.toLowerCase() : "pending",
    submittedDate: co.createdDate ? co.createdDate.split("T")[0] : "-",
    cooperativeCode: co.cooperativeCode || "-",
    fiscalYear: co.fiscalYear?.yearNepali || "-",
    fullNameNepali: co.coopsFullNameNep || "-",
    fullNameEnglish: co.coopsFullNameEng || "-",
    registeredDate: co.registerDate ? co.registerDate.split("T")[0] : "-",
    registerYear: co.registerYear || "-",
    registeredFiscalYear: co.registeredFiscalYear || "-",
    classification: co.classificationOfCooperative || "-",
    type: co.workingArea || "-",
    workingArea: co.workingArea || "-",
    anyBranchOffice: !!co.anyBranchOffice,
    numberOfBranches: co.numberOfBranch ? co.numberOfBranch.toString() : "-",
    panNumber: co.panNo || "-",
    // Address
    province: addr.province || "",
    district: addr.district || "",
    localLevel: addr.localLevel || "",
    wardNo: addr.wardNo?.toString() || "",
    houseNo: addr.houseNo || "",
    tole: addr.tole || "",
    fullAddress: [
      addr.tole,
      `Ward No. ${addr.wardNo}`,
      addr.localLevel,
      addr.district,
      addr.province,
    ]
      .filter(Boolean)
      .join(", "),
    // Contact
    contactMobile: co.contactMobilePhone || "",
    contactOffice: co.contactOfficePhone || "",
    email: co.contactEmail || "",
    website: co.webUrl || "",
    contactPerson: co.contactPerson || "",
    contactPhone: co.contactPhone || "",
    // Financial/Membership
    totalShareAmount: strength.totalShareAmount || 0,
    totalShares: strength.numberOfTotalShare || 0,
    totalSavingAmount: strength.totalSavingAmount || 0,
    totalLiabilities: strength.totalLiabilities || 0,
    loanInOperation: strength.loanInOperation || 0,
    institutionalAssets: strength.totalAmountOfInstitudeAssets || 0,
    maleMembers: strength.noOfTotalMaleMember || 0,
    femaleMembers: strength.noOfTotalFemaleMember || 0,
    totalMembers:
      (strength.noOfTotalMaleMember || 0) +
      (strength.noOfTotalFemaleMember || 0),
    // Leadership, committee
    executiveMembers,
    committeeMembers,
    documents: docs,
  };
}

export const Route = createFileRoute(
  "/_authenticated/cooperative-verification/$id",
)({
  component: CooperativeVerificationPageWrapper,
  validateSearch: (search: Record<string, unknown>) =>
    z
      .object({
        verified: z.string().optional(),
      })
      .parse(search),
});

function CooperativeVerificationPageWrapper({}) {
  const { id } = Route.useParams();
  const {
    data: paginatedCooperative,
    error,
    isLoading,
  } = useCooperativeDetail(Number(id));

  const cooperativeData = paginatedCooperative?.data;
  const formattedCooperativeData: TFormattedCooperativeData | null =
    cooperativeData ? formatCooperativeData(cooperativeData) : null;
  const verifyMutation = useVerifyCooperative();
  const unverifyMutation = useSubmitCooperativeFeedback();

  // UI state
  const [selectedDocument, setSelectedDocument] = useState<TDocument | null>(
    null,
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [message, setMessage] = useState("");
  const isLoadingAction =
    verifyMutation.isPending || unverifyMutation.isPending;

  // ------ Status rendering
  const getStatusConfig = (status: string) => {
    const configs = {
      verified: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: <CheckCircle className="w-4 h-4" />,
        label: "Verified",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="w-4 h-4" />,
        label: "Pending",
      },
      registration: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <Clock className="w-4 h-4" />,
        label: "Registration",
      },
      unverified: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: <XCircle className="w-4 h-4" />,
        label: "Rejected",
      },
    };
    return configs[status?.toLowerCase()] || configs["pending"];
  };

  // ------ Confirm modal & API handler
  const handleVerificationAction = (action) => {
    setConfirmationAction(action);
    setShowConfirmationModal(true);
  };

  const handleCancelAction = () => {
    setShowConfirmationModal(false);
    setConfirmationAction(null);
    setMessage("");
  };

  const handleConfirmAction = async () => {
    if (!confirmationAction || !cooperativeData) return;
    try {
      if (confirmationAction === "verify") {
        await verifyMutation.mutateAsync(
          formattedCooperativeData?.id as number,
        );
        toast.success(
          `Cooperative "${formattedCooperativeData?.fullNameEnglish}" has been successfully verified!`,
        );
      } else if (confirmationAction === "unverify") {
        await unverifyMutation.mutateAsync({
          id: formattedCooperativeData?.id as number,
          cooperativeInfoId: formattedCooperativeData?.id as number,
          status: "unverified",
          message: message || "Application has been rejected",
        });
        toast.success(
          `Cooperative "${formattedCooperativeData?.fullNameEnglish}" has been rejected.`,
        );
      }
    } catch (error) {
      toast.error("Action failed: " + (error?.message ?? error));
    } finally {
      setShowConfirmationModal(false);
      setConfirmationAction(null);
      setMessage("");
    }
  };

  // ------ Document preview logic
  const handleDocumentClick = (document: TDocument) =>
    setSelectedDocument(document);
  const closeDocumentModal = () => setSelectedDocument(null);

  // -- RENDER
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-6 text-center">
          <CardContent>
            <Loader2 className="animate-spin my-4 mx-auto h-12 w-12 text-primary" />
            <CardDescription>Loading cooperative data...</CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !cooperativeData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-6 text-center">
          <CardContent>
            <XCircle className="w-12 h-12 mx-auto text-red-500" />
            <CardDescription className="mt-4 text-lg text-red-600">
              {error?.message || "Error loading cooperative details."}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusConfig = getStatusConfig(
    formattedCooperativeData?.status || "pending",
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Cooperative Verification
              </h1>
              <p className="text-sm text-gray-600">
                Review and verify cooperative details
              </p>
            </div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}
            >
              {statusConfig.icon}
              <span className="ml-2">{statusConfig.label}</span>
            </span>
            {formattedCooperativeData &&
              formattedCooperativeData?.status === "pending" &&
              formattedCooperativeData?.id && (
                <div className="flex space-x-2 ml-4">
                  <Button
                    onClick={() => handleVerificationAction("verify")}
                    disabled={verifyMutation.isPending}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    {verifyMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    Verify
                  </Button>
                  <Button
                    onClick={() => handleVerificationAction("unverify")}
                    disabled={unverifyMutation.isPending}
                    variant="destructive"
                  >
                    {unverifyMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <X className="mr-2 h-4 w-4" />
                    )}
                    Reject
                  </Button>
                </div>
              )}
            {formattedCooperativeData &&
              formattedCooperativeData?.status === "verified" &&
              formattedCooperativeData?.id && (
                <div className="flex space-x-2 ml-4">
                  <Button
                    onClick={() => handleVerificationAction("unverify")}
                    disabled={unverifyMutation.isPending}
                    variant="destructive"
                  >
                    {unverifyMutation.isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <X className="mr-2 h-4 w-4" />
                    )}
                    Unverify
                  </Button>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {formattedCooperativeData && (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* LEFT - Details */}
            <div className="lg:col-span-3">
              <CooperativeBasicInfo cooperative={formattedCooperativeData} />

              <CooperativeAddressInfo cooperative={formattedCooperativeData} />

              <CooperativeFinancialInfo
                cooperative={formattedCooperativeData}
              />

              <CooperativeExecutiveMembers
                cooperative={formattedCooperativeData}
              />

              <CooperativeCommitteeMembers
                cooperative={formattedCooperativeData}
              />
            </div>

            {/* RIGHT - Docs, Action */}
            <div className="lg:col-span-1">
              <CooperativeDocuments
                cooperative={formattedCooperativeData}
                handleDocumentClick={handleDocumentClick}
              />

              <CooperativeActionButtons
                cooperative={formattedCooperativeData}
                handleVerificationAction={handleVerificationAction}
                isLoadingAction={isLoadingAction}
                confirmationAction={confirmationAction}
              />
            </div>
          </div>
        </div>
      )}

      {/* Document Modal */}
      <Dialog open={!!selectedDocument} onOpenChange={closeDocumentModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-auto p-4">
            <div className="bg-gray-100 rounded h-96 flex items-center justify-center overflow-hidden">
              {selectedDocument?.type === "image" && selectedDocument?.url ? (
                <img
                  src={selectedDocument.url}
                  alt={selectedDocument.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : selectedDocument?.type === "pdf" && selectedDocument?.url ? (
                <iframe
                  src={selectedDocument.url}
                  title={selectedDocument.name}
                  className="w-full h-full"
                />
              ) : (
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    Preview Not Available
                  </p>
                  <p className="text-sm text-gray-500">
                    Click download to view the document
                  </p>
                </div>
              )}
            </div>
          </div>
          {selectedDocument?.url && (
            <DialogFooter className="p-4 flex justify-center">
              <Button asChild>
                <a
                  href={selectedDocument.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Download Document
                </a>
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmationModal} onOpenChange={handleCancelAction}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center mb-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  confirmationAction === "verify" ? "bg-primary" : "bg-red-100"
                }`}
              >
                {confirmationAction === "verify" ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <DialogTitle>
                  {confirmationAction === "verify"
                    ? "Verify Cooperative"
                    : "Reject Application"}
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  {formattedCooperativeData?.fullNameEnglish} (ID:{" "}
                  {formattedCooperativeData?.id})
                </p>
              </div>
            </div>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to{" "}
              {confirmationAction === "verify" ? "verify" : "reject"} this
              cooperative application?
            </p>
            {confirmationAction === "unverify" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Rejection Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please provide a reason for rejection..."
                  required
                />
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleCancelAction}
              disabled={isLoadingAction}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAction}
              disabled={
                isLoadingAction ||
                (confirmationAction === "unverify" && !message.trim())
              }
              className={`${
                confirmationAction === "verify" ? "bg-primary" : "bg-red-600"
              }`}
            >
              {isLoadingAction
                ? confirmationAction === "verify"
                  ? "Verifying..."
                  : "Rejecting..."
                : confirmationAction === "verify"
                  ? "Verify"
                  : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
