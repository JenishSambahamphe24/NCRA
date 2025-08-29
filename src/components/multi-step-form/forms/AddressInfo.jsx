import React from "react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Grid } from "@mui/material";

export const AddressInfo = ({ methods }) => {
    const { control } = methods;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-semibold">Address Info</h3>
            <p className="text-sm text-gray-500">
                Enter the address details of the cooperative.
            </p>
            <Grid container >
                <Grid item sm={6}>
                    <FormField
                        control={control}
                        name="province"
                        render={({ field }) => (
                            <FormItem className="w-52">
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                { value: "province-1", label: "Province 1" },
                                                { value: "province-2", label: "Province 2" },
                                                { value: "bagmati", label: "Bagmati Province" },
                                                { value: "gandaki", label: "Gandaki Province" },
                                                { value: "lumbini", label: "Lumbini Province" },
                                                { value: "karnali", label: "Karnali Province" },
                                                { value: "sudurpashchim", label: "Sudurpashchim Province" },
                                            ].map((prov) => (
                                                <SelectItem key={prov.value} value={prov.value}>
                                                    {prov.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>
                <Grid item sm={6}>
                    <FormField
                        control={control}
                        name="localLevel"
                        render={({ field }) => (
                            <FormItem className="w-56">
                                <FormLabel>Local Level</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter local level" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>

            </Grid>
            {/* Province */}


            {/* District */}
            <FormField
                control={control}
                name="district"
                render={({ field }) => (
                    <FormItem className="w-48">
                        <FormLabel>District</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter district" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Local Level */}


            {/* Ward Number */}
            <FormField
                control={control}
                name="wardNo"
                render={({ field }) => (
                    <FormItem className="w-28">
                        <FormLabel>Ward Number</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="Enter ward number"
                                {...field}
                                onChange={(e) =>
                                    field.onChange(e.target.value ? parseInt(e.target.value) : "")
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* House Number */}
            <FormField
                control={control}
                name="houseNo"
                render={({ field }) => (
                    <FormItem className="w-36">
                        <FormLabel>House Number</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter house number" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Tole/Street */}
            <FormField
                control={control}
                name="tole"
                render={({ field }) => (
                    <FormItem className="w-64">
                        <FormLabel>Tole/Street</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter tole or street name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};