import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const DocUploadForm = ({ methods }) => {
    return (
        <div className="space-y-6">
            {/* Business Registration Certificate */}
            <FormField
                control={methods.control}
                name="businessRegisterCertificate"
                render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                        <FormLabel>
                            Business Registration Certificate <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) onChange(file);
                                }}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* PAN Certificate */}
            <FormField
                control={methods.control}
                name="panRegisterCertificate"
                render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                        <FormLabel>PAN Certificate</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) onChange(file);
                                }}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Other Business Related Certificate */}
            <FormField
                control={methods.control}
                name="otherRegisterCertificate"
                render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                        <FormLabel>Other Business Related Certificate</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) onChange(file);
                                }}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Approval bylaw of cooperatives */}
            <FormField
                control={methods.control}
                name="approvalbyLaw"
                render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                        <FormLabel>Approval bylaw of cooperatives</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) onChange(file);
                                }}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Feasibility report for cooperative operation */}
            <FormField
                control={methods.control}
                name="feasibilityReport"
                render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                        <FormLabel>Feasibility report for cooperative operation</FormLabel>
                        <FormControl>
                            <Input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) onChange(file);
                                }}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Remarks Textarea */}
            <FormField
                control={methods.control}
                name="remark"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Remarks</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Enter any additional remarks"
                                rows={4}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};