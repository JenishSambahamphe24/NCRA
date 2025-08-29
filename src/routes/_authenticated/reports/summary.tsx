import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Building2, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProvinceWiseSummary } from "@/hooks/useCooperativeProfile";
import { TotalsData } from "@/types/summary-report.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/reports/summary")({
  component: ReportsSummaryPage,
});

function ReportsSummaryPage() {
  // const [data, setData] = useState<ProvinceData[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // const [totals, setTotals] = useState<TotalsData>({
  //   cooperatives: 0,
  //   male: 0,
  //   female: 0,
  //   others: 0,
  //   total: 0,
  //   totalShare: 0,
  //   totalShareAmount: 0
  // });

  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const response = await fetch('https://ncra.dibugsoft.com/api/DashboardReport/province-wise-summary');

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const apiData = await response.json();

  //     // Filter out the "Total" row if it exists and separate province data
  //     const provinceData = apiData.filter((item: ProvinceData) =>
  //       item.sNo !== "Total" &&
  //       item.province !== "Total" &&
  //       item.province &&
  //       item.province.trim() !== ""
  //     );

  //     // Calculate totals from the filtered data
  //     const calculatedTotals = provinceData.reduce(
  //       (acc: TotalsData, curr: ProvinceData) => ({
  //         cooperatives: acc.cooperatives + (curr.noOfCooperatives || 0),
  //         male: acc.male + (curr.maleMembers || 0),
  //         female: acc.female + (curr.femaleMembers || 0),
  //         others: acc.others + (curr.others || 0),
  //         total: acc.total + (curr.totalMembers || 0),
  //         totalShare: acc.totalShare + (curr.totalShares || 0),
  //         totalShareAmount: acc.totalShareAmount + (curr.totalShareAmount || 0),
  //       }),
  //       { cooperatives: 0, male: 0, female: 0, others: 0, total: 0, totalShare: 0, totalShareAmount: 0 }
  //     );

  //     setData(provinceData);
  //     setTotals(calculatedTotals);
  //   } catch (err) {
  //     console.error('Error fetching data:', err);
  //     setError(err instanceof Error ? err.message : 'Unknown error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const handleRetry = () => {
  //   fetchData();
  // };

  const { data, isLoading, isError, error, refetch } = useProvinceWiseSummary();

  const handleRetry = () => {
    refetch();
  };

  const provinceData = data?.filter(
    (item) =>
      item.sNo !== "Total" &&
      item.province !== "Total" &&
      item.province &&
      item.province.trim() !== "",
  );

  const totals = provinceData?.reduce(
    (acc, curr) => ({
      cooperatives: acc.cooperatives + (curr.noOfCooperatives || 0),
      male: acc.male + (curr.maleMembers || 0),
      female: acc.female + (curr.femaleMembers || 0),
      others: acc.others + (curr.others || 0),
      total: acc.total + (curr.totalMembers || 0),
      totalShare: acc.totalShare + (curr.totalShares || 0),
      totalShareAmount: acc.totalShareAmount + (curr.totalShareAmount || 0),
    }),
    {
      cooperatives: 0,
      male: 0,
      female: 0,
      others: 0,
      total: 0,
      totalShare: 0,
      totalShareAmount: 0,
    },
  );

  const tableHeadClassName = "border text-white p-3 text-center font-semibold";
  const tableRowDataClassName =
    "hover:bg-blue-50 transition-colors duration-200";
  const tableRowTotalClassName =
    "bg-gradient-to-r from-gray-100 to-gray-200 font-bold text-gray-800";

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center mb-6">
            <Building2 className="h-8 w-8 text-primary mr-3" />
            <CardTitle className="text-2xl font-bold text-primary">
              नेपालका प्रदेश अनुसार सहकारी तथा सदस्य विवरण
            </CardTitle>
          </div>

          <div className="mb-4 flex justify-end">
            <Button onClick={handleRetry} variant="outline" size="sm">
              <RefreshCw className="h-3 w-3 mr-1" />
              रिफ्रेश
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
              <span className="text-gray-600">डेटा लोड हुँदै छ...</span>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <p className="text-red-600 mb-4 text-center">
                डेटा लोड गर्न सकिएन: {error?.message}
              </p>
              <Button onClick={handleRetry} className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                पुनः प्रयास गर्नुहोस्
              </Button>
            </div>
          ) : !data || data.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-600">कुनै डेटा उपलब्ध छैन</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table className="min-w-full bg-white">
                <TableHeader>
                  <TableRow className="bg-primary text-white hover:bg-primary">
                    <TableHead className={tableHeadClassName} rowSpan={2}>
                      S.No.
                    </TableHead>
                    <TableHead className={tableHeadClassName} rowSpan={2}>
                      Province
                    </TableHead>
                    <TableHead className={tableHeadClassName} rowSpan={2}>
                      No. of
                      <br />
                      Cooperatives
                    </TableHead>
                    <TableHead className={tableHeadClassName} colSpan={4}>
                      No. of Members
                    </TableHead>
                    <TableHead className={tableHeadClassName} rowSpan={2}>
                      Total Share
                    </TableHead>
                    <TableHead className={tableHeadClassName} rowSpan={2}>
                      Total Share Amount
                    </TableHead>
                  </TableRow>
                  <TableRow className="bg-primary text-white hover:bg-primary">
                    <TableHead className={tableHeadClassName}>Male</TableHead>
                    <TableHead className={tableHeadClassName}>Female</TableHead>
                    <TableHead className={tableHeadClassName}>Others</TableHead>
                    <TableHead className={tableHeadClassName}>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {provinceData?.map((item, idx) => (
                    <TableRow
                      key={item.province || idx}
                      className={tableRowDataClassName}
                    >
                      <TableCell className="border border-gray-300 p-3 text-center font-medium text-gray-700">
                        {idx + 1}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-3 font-medium text-gray-800">
                        {item.province || "N/A"}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-3 text-right font-semibold text-blue-600">
                        {(item.noOfCooperatives || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-3 text-right text-gray-700">
                        {(item.maleMembers || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-3 text-right text-gray-700">
                        {(item.femaleMembers || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-3 text-right text-gray-700">
                        {(item.others || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-3 text-right font-semibold text-green-600">
                        {(item.totalMembers || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-3 text-right font-semibold text-green-600">
                        {(item.totalShares || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-3 text-right font-semibold text-green-600">
                        {(item.totalShareAmount || 0).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className={tableRowTotalClassName}>
                    <TableCell
                      className="border border-gray-400 p-3 text-center"
                      colSpan={2}
                    >
                      <span className="text-lg">Total</span>
                    </TableCell>
                    <TableCell className="border border-gray-400 p-3 text-right text-blue-700 text-lg">
                      {totals?.cooperatives.toLocaleString()}
                    </TableCell>
                    <TableCell className="border border-gray-400 p-3 text-right text-lg">
                      {totals?.male.toLocaleString()}
                    </TableCell>
                    <TableCell className="border border-gray-400 p-3 text-right text-lg">
                      {totals?.female.toLocaleString()}
                    </TableCell>
                    <TableCell className="border border-gray-400 p-3 text-right text-lg">
                      {totals?.others.toLocaleString()}
                    </TableCell>
                    <TableCell className="border border-gray-400 p-3 text-right text-green-700 text-lg">
                      {totals?.total.toLocaleString()}
                    </TableCell>
                    <TableCell className="border border-gray-400 p-3 text-right text-green-700 text-lg">
                      {totals?.totalShare.toLocaleString()}
                    </TableCell>
                    <TableCell className="border border-gray-400 p-3 text-right text-green-700 text-lg">
                      {totals?.totalShareAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
