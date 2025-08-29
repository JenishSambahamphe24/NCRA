import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  AlertCircle,
  Loader2,
} from "lucide-react";

// Types
interface CooperativeInfo {
  coopsFullNameEng?: string;
  coopsFullNameNep?: string;
  status?: string;
  cooperativeCode?: string;
  registrationNo?: string;
  registerYear?: string;
  registeredFiscalYear?: string;
  classificationOfCooperative?: string;
  workingArea?: string;
  contactPerson?: string;
  contactEmail?: string;
  contactMobilePhone?: string;
  panNo?: string;
  numberOfBranch?: number;
  createdDate?: string;
}

interface CommitteeMember {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  position: string;
  gender: string;
  ethnicity: string;
  highestEducation: string;
  email: string;
  phoneNumber: string;
  province: string;
  district: string;
  localLevel: string;
  wardNo: string;
  panNo: string;
  nid: string;
  committeeType: string;
  cooperativeInfo?: CooperativeInfo;
}

const CooperativeDetail: React.FC = () => {
  // Add error boundary for useParams
  let params: any = {};
  let id: string | undefined = undefined;

  try {
    params = useParams({ from: "/_authenticated/cooperative-details/$id" });
    id = params.id;
  } catch (error) {
    console.error("Error getting params:", error);
    // Fallback: try to get ID from URL if possible
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      id = pathParts[pathParts.length - 1];
    }
  }

  const navigate = useNavigate();
  const [committeeData, setCommitteeData] = useState<CommitteeMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommitteeData = async () => {
      if (!id) {
        setError("No ID provided");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://ncra.dibugsoft.com/api/CommitteDetail/${id}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CommitteeMember | CommitteeMember[] = await response.json();
        setCommitteeData(Array.isArray(data) ? data : [data]);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("Error fetching committee data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommitteeData();
  }, [id]);

  const formatDate = (dateString?: string): string => {
    if (!dateString || dateString === "0001-01-01T00:00:00") return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadgeColor = (status?: string): string => {
    switch (status?.toLowerCase()) {
      case "registration":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCommitteeTypeBadge = (type?: string): string => {
    const colors: Record<string, string> = {
      executive: "bg-purple-100 text-purple-800",
      supervisory: "bg-orange-100 text-orange-800",
    };
    return colors[type?.toLowerCase() || ""] || "bg-gray-100 text-gray-800";
  };

  const handleRetry = (): void => {
    window.location.reload();
  };

  // Show error if no ID is available
  if (!id && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="flex items-center space-x-2 text-red-600 mb-2">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Invalid Route</span>
          </div>
          <p className="text-gray-600">No cooperative ID found in the URL</p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading committee details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mx-4">
          <div className="flex items-center space-x-2 text-red-600 mb-2">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Error Loading Data</span>
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!committeeData.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            No Committee Data Found
          </h2>
          <p className="text-gray-600">
            No committee details available for ID: {id}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Committee Details
          </h1>
        </div>

        <div className="space-y-6">
          {committeeData.map((member: CommitteeMember, index: number) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Cooperative Info Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                      {member.cooperativeInfo?.coopsFullNameEng || "N/A"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {member.cooperativeInfo?.coopsFullNameNep}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(member.cooperativeInfo?.status)}`}
                    >
                      {member.cooperativeInfo?.status || "Unknown"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCommitteeTypeBadge(member.committeeType)}`}
                    >
                      {member.committeeType} Committee
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Member Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <User className="h-5 w-5 mr-2 text-green-600" />
                      Member Information
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Full Name
                        </label>
                        <p className="text-gray-900">
                          {`${member.firstName} ${member.middleName || ""} ${member.lastName}`.trim()}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Position
                          </label>
                          <p className="text-gray-900 capitalize">
                            {member.position}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Gender
                          </label>
                          <p className="text-gray-900 capitalize">
                            {member.gender}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Ethnicity
                          </label>
                          <p className="text-gray-900">{member.ethnicity}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Education
                          </label>
                          <p className="text-gray-900 capitalize">
                            {member.highestEducation}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {member.email}
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {member.phoneNumber}
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {`${member.province}, ${member.district}, ${member.localLevel} - ${member.wardNo}`}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <label className="text-gray-500">PAN No:</label>
                          <span className="ml-2 text-gray-900">
                            {member.panNo}
                          </span>
                        </div>
                        <div>
                          <label className="text-gray-500">NID:</label>
                          <span className="ml-2 text-gray-900">
                            {member.nid}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cooperative Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                      Cooperative Details
                    </h3>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Cooperative Code
                          </label>
                          <p className="text-gray-900">
                            {member.cooperativeInfo?.cooperativeCode}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Registration No
                          </label>
                          <p className="text-gray-900">
                            {member.cooperativeInfo?.registrationNo}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Register Year
                          </label>
                          <p className="text-gray-900">
                            {member.cooperativeInfo?.registerYear}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Fiscal Year
                          </label>
                          <p className="text-gray-900">
                            {member.cooperativeInfo?.registeredFiscalYear}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Classification
                          </label>
                          <p className="text-gray-900">
                            {
                              member.cooperativeInfo
                                ?.classificationOfCooperative
                            }
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Working Area
                          </label>
                          <p className="text-gray-900 capitalize">
                            {member.cooperativeInfo?.workingArea}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Contact Person
                        </label>
                        <p className="text-gray-900">
                          {member.cooperativeInfo?.contactPerson}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          {member.cooperativeInfo?.contactEmail}
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          {member.cooperativeInfo?.contactMobilePhone}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <label className="text-gray-500">PAN No:</label>
                          <span className="ml-2 text-gray-900">
                            {member.cooperativeInfo?.panNo}
                          </span>
                        </div>
                        <div>
                          <label className="text-gray-500">Branches:</label>
                          <span className="ml-2 text-gray-900">
                            {member.cooperativeInfo?.numberOfBranch || 0}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">
                          Created Date
                        </label>
                        <p className="text-gray-900 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {formatDate(member.cooperativeInfo?.createdDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CooperativeDetail;
