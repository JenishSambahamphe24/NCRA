import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const FinancialInfo = ({ methods }) => {
    const { control } = methods;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Financial Info</h3>
            <p className="text-sm text-gray-500">
                Provide financial details of the cooperative.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                    control={control}
                    name="totalShareAmount"
                    render={({ field }) => (
                        <FormItem className="w-60">
                            <FormLabel>
                                Total Share Amount <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total share amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Total Number of Shares */}
                <FormField
                    control={control}
                    name="numberOfTotalShare"
                    render={({ field }) => (
                        <FormItem className="w-70">
                            <FormLabel>
                                Total Number of Shares <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total number of shares"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseInt(e.target.value, 10) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Total Male Members */}
                <FormField
                    control={control}
                    name="noOfTotalMaleMember"
                    render={({ field }) => (
                        <FormItem className="w-60">
                            <FormLabel>
                                Total Male Members <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter number of male members"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseInt(e.target.value, 10) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Total Female Members */}
                <FormField
                    control={control}
                    name="noOfTotalFemaleMember"
                    render={({ field }) => (
                        <FormItem className="w-60">
                            <FormLabel>
                                Total Female Members <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter number of female members"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseInt(e.target.value, 10) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Total Saving Amount */}
                <FormField
                    control={control}
                    name="totalSavingAmount"
                    render={({ field }) => (
                        <FormItem className="w-48">
                            <FormLabel>Total Saving Amount</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total saving amount"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Total Liabilities */}
                <FormField
                    control={control}
                    name="totalLiabilities"
                    render={({ field }) => (
                        <FormItem className="w-48">
                            <FormLabel>Total Liabilities</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total liabilities"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Loan in Operation */}
                <FormField
                    control={control}
                    name="loanInOperation"
                    render={({ field }) => (
                        <FormItem className="w-48">
                            <FormLabel>Loan in Operation</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter loan in operation"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Total Institutional Assets */}
                <FormField
                    control={control}
                    name="totalAmountOfInstitutionalAssets"
                    render={({ field }) => (
                        <FormItem className="w-52">
                            <FormLabel>Total Institutional Assets</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter total institutional assets"
                                    value={field.value || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};