import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useFiscalYearManagement } from "@/hooks/useFiscalYear";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TFiscalYearRequest } from "@/types/fiscal-year.type";
import { CalendarIcon, EditIcon, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/fiscal-year")({
  component: FiscalYearPage,
});

function FiscalYearPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingFiscalYear, setEditingFiscalYear] = useState<any>(null);
  const [createFormKey, setCreateFormKey] = useState(0);

  const {
    fiscalYears,
    isLoading,
    error,
    createFiscalYear,
    updateFiscalYear,
    isCreating,
    isUpdating,
    refetch,
  } = useFiscalYearManagement();

  const createForm = useForm<TFiscalYearRequest>({
    defaultValues: {
      yearNepali: "",
      yearEnglish: "",
      activeFiscalYear: false,
      index: 0,
    },
  });

  const editForm = useForm<TFiscalYearRequest>({
    defaultValues: {
      yearNepali: "",
      yearEnglish: "",
      activeFiscalYear: false,
      index: 0,
    },
  });

  const handleCreate = (data: TFiscalYearRequest) => {
    createFiscalYear(data, {
      onSuccess: () => {
        createForm.reset();
        setCreateFormKey((prev) => prev + 1);
        setTimeout(() => refetch(), 100);
      },
    });
  };

  const handleEdit = (fiscalYear: any) => {
    setEditingFiscalYear(fiscalYear);
    editForm.reset({
      yearNepali: fiscalYear.yearNepali,
      yearEnglish: fiscalYear.yearEnglish,
      activeFiscalYear: fiscalYear.activeFiscalYear,
      index: fiscalYear.index,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = (data: TFiscalYearRequest) => {
    updateFiscalYear(
      { id: editingFiscalYear.id, data },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setEditingFiscalYear(null);
          editForm.reset();
          setTimeout(() => refetch(), 100);
        },
      },
    );
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingFiscalYear(null);
    editForm.reset();
  };

  const handleRetryFetch = () => {
    toast.promise(refetch(), {
      loading: "Refreshing data...",
      success: "Data refreshed successfully!",
      error: "Failed to refresh data",
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading fiscal years...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <CalendarIcon className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-primary">
          Fiscal Year Management
        </h1>
      </div>

      {/* General Error Messages */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">
              Error loading data: {error.message}
            </p>
            <Button
              variant="link"
              onClick={handleRetryFetch}
              className="text-red-700 p-0 h-auto"
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Create Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Fiscal Year</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...createForm}>
            <form
              key={createFormKey}
              onSubmit={createForm.handleSubmit(handleCreate)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={createForm.control}
                  name="yearNepali"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year (Nepali)</FormLabel>
                      <FormControl>
                        <Input placeholder="२०८१-२०८२" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="yearEnglish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year (English)</FormLabel>
                      <FormControl>
                        <Input placeholder="2024-2025" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={createForm.control}
                  name="index"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Index</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createForm.control}
                  name="activeFiscalYear"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-8">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Active Fiscal Year</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isCreating}
                className="bg-primary hover:bg-primary/90"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Fiscal Year"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fiscal Years</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nepali Year</TableHead>
                <TableHead>English Year</TableHead>
                <TableHead>Index</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fiscalYears.map((fiscalYear) => (
                <TableRow key={fiscalYear.id}>
                  <TableCell className="font-medium">
                    {fiscalYear.yearNepali}
                  </TableCell>
                  <TableCell>{fiscalYear.yearEnglish}</TableCell>
                  <TableCell>{fiscalYear.index}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        fiscalYear.activeFiscalYear ? "default" : "secondary"
                      }
                    >
                      {fiscalYear.activeFiscalYear ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(fiscalYear)}
                      className="mr-2"
                    >
                      <EditIcon className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Fiscal Year</DialogTitle>
          </DialogHeader>
          {editingFiscalYear && (
            <Form {...editForm}>
              <form
                onSubmit={editForm.handleSubmit(handleUpdate)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="yearNepali"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year (Nepali)</FormLabel>
                        <FormControl>
                          <Input placeholder="२०८१-२०८२" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="yearEnglish"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year (English)</FormLabel>
                        <FormControl>
                          <Input placeholder="2024-2025" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={editForm.control}
                    name="index"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Index</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={editForm.control}
                    name="activeFiscalYear"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-8">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Active Fiscal Year</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
