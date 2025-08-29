import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export const CoopMemberForm = ({ methods }) => {
    return (
        <div className="space-y-6">
            {/* Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={methods.control}
                        name="file"
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel>Upload CSV or Excel file</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept=".csv,.xlsx,.xls"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            onChange(file);
                                        }}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};