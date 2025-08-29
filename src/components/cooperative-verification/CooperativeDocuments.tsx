import React from "react";
import { FileText, Image, EyeIcon } from "lucide-react";
import { TFormattedCooperativeData, TDocument } from "@/types/cooperative.type";
import { FieldSet } from "@/components/cooperative-verification/FieldSet";

interface CooperativeDocumentsProps {
  cooperative: TFormattedCooperativeData;
  handleDocumentClick: (doc: TDocument) => void;
}

const CooperativeDocuments: React.FC<CooperativeDocumentsProps> = ({
  cooperative,
  handleDocumentClick,
}) => {
  return (
    <FieldSet title="Documents" icon={FileText}>
      {cooperative.documents && cooperative.documents.length > 0 ? (
        <div className="space-y-2">
          <div className="space-y-2">
            {cooperative.documents.map((doc, index) => (
              <div
                key={doc.id || index}
                className="flex items-center justify-between p-2 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer transition-colors text-sm"
                onClick={() => handleDocumentClick(doc)}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-shrink-0 mr-2">
                    {doc.type === "image" ? (
                      <Image className="w-4 h-4 text-blue-500" />
                    ) : (
                      <FileText className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-500 uppercase">
                      {doc.type === "image" ? "Image" : "PDF"}
                    </p>
                  </div>
                </div>
                <EyeIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No documents uploaded</p>
      )}
    </FieldSet>
  );
};

export default CooperativeDocuments;
