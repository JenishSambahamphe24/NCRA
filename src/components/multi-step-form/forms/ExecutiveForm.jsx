import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export const ExecutiveForm = ({ methods }) => {
    const provinces = [
        { value: "koshi", label: "Koshi Province" },
        { value: "madhesh", label: "Madhesh Province" },
        { value: "bagmati", label: "Bagmati Province" },
        { value: "gandaki", label: "Gandaki Province" },
        { value: "lumbini", label: "Lumbini Province" },
        { value: "karnali", label: "Karnali Province" },
        { value: "sudurpashchim", label: "Sudurpashchim Province" },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={methods.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select province" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {provinces.map((province) => (
                                            <SelectItem key={province.value} value={province.value}>
                                                {province.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={methods.control}
                    name="district"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>District</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter district" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                    control={methods.control}
                    name="localLevel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Local Level</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter local level" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="wardNo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ward Number</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Enter ward number"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={methods.control}
                    name="houseNo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>House Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter house number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={methods.control}
                name="tole"
                render={({ field }) => (
                    <FormItem>
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