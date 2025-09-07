import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import './../formStyle.css'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useEffect } from "react";
import {
    Grid,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useCooperative } from "../cooperativeContext";
import axios from "axios";
import { useProvinces } from "../hooks/useCommonData";


export const AddressInfo = ({ methods }) => {
    const { cooperativeId } = useCooperative();
    const { data: provinces, isLoading: isProvincesLoading } = useProvinces();

    const addressMethods = useForm();
    const {
        control: addressControl,
        handleSubmit: handleAddressSubmit,
    } = addressMethods;

    const branchMethods = useForm();
    const {
        control: branchControl,
        handleSubmit: handleBranchSubmit,
        watch,
    } = branchMethods;

    const anyBranchOffice = watch('anyBranchOffice')
    return (
        <div  >
            <Grid component='form' container spacing={2} >
                <Grid size={{ xs: 12, sm: 2 }}>
                    <FormField
                        control={addressControl}
                        name="province"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel required>Province</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                provinces.map((prov, index) => (
                                                    <SelectItem key={index} value={prov.provinceCode}>
                                                        {prov.provinceName}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                    <FormField
                        control={addressControl}
                        name="district"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel required>District</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter district" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                    <FormField
                        control={addressControl}
                        name="localLevel"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel required>Local Level</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter local level" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>


                <Grid size={{ xs: 12, sm: 2 }}>
                    <FormField
                        control={addressControl}
                        name="wardNo"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel required>Ward Number</FormLabel>
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
                </Grid>

                <Grid size={{ xs: 12, sm: 2 }}>
                    <FormField
                        control={addressControl}
                        name="tole"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Tole/Street</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter tole or street name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>
                <div className="w-full flex justify-end">
                    <Button
                        variant="outline"
                        size="small"
                        className="px-[8px] py-[4px]"
                    >
                        save address
                    </Button>
                </div>
            </Grid>
            <Grid container component='form' spacing={2} mt={1}>
                <Grid size={{ xs: 12, sm: 2 }}>
                    <FormField
                        control={branchControl}
                        name="anyBranchOffice"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel required>Any branch Office ? </FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={true}>Yes</SelectItem>
                                            <SelectItem value={false}>No</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Grid>
                {
                    anyBranchOffice === 'true' && (
                        <>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <FormField
                                    control={branchControl}
                                    name="branchName"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel> Branch Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter branch Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <FormField
                                    control={branchControl}
                                    name="branchManagerName"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel> Manager/Chief Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter manager's/chief name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <FormField
                                    control={branchControl}
                                    name="ContactNumber"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel> Contact Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter contact number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 2 }}>
                                <FormField
                                    control={branchControl}
                                    name="province"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel required>Province</FormLabel>
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
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <FormField
                                    control={branchControl}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel required>District</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter district" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <FormField
                                    control={branchControl}
                                    name="localLevel"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel required>Local Level</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter local level" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Grid>


                            <Grid size={{ xs: 12, sm: 2 }}>
                                <FormField
                                    control={branchControl}
                                    name="wardNo"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel required>Ward Number</FormLabel>
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
                            </Grid>

                            <Grid size={{ xs: 12, sm: 2 }}>
                                <FormField
                                    control={branchControl}
                                    name="tole"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel>Tole/Street</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter tole or street name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </Grid>

                            <div className="w-full flex justify-end">
                                <Button
                                    variant="outline"
                                    size="small"
                                    className="px-[8px] py-[4px]"
                                >
                                    save branch
                                </Button>
                            </div>
                        </>
                    )
                }
            </Grid>
            <Grid container spacing={2} mt={1}>
                <TableContainer sx={{ borderRadius: 2 }}>
                    <Table >
                        <TableHead className="bg-[#052D6A]">
                            <TableCell className="table-head">
                                <h1>S.No</h1>
                            </TableCell>
                            <TableCell className="table-head">
                                <h1>Branch Name</h1>
                            </TableCell>
                            <TableCell className="table-head">
                                <h1>Manager Name</h1>
                            </TableCell>
                            <TableCell className="table-head">
                                <h1>Contact Number</h1>
                            </TableCell>
                            <TableCell className="table-head">
                                <h1>Location</h1>
                            </TableCell>
                            <TableCell className="table-head">
                                <h1>Action</h1>
                            </TableCell>
                        </TableHead>
                        <TableBody sx={{ bgcolor: "white" }}>
                            <TableCell className="table-body-cell">
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell">
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell">
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell">
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell">
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>
                            <TableCell className="table-body-cell">
                                <h1>
                                    asdfaed
                                </h1>
                            </TableCell>

                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
            <div className="flex justify-between pt-4">
                <Button
                    type="button"
                    variant="outline"
                >
                    Previous
                </Button>

                <Button
                    type="button"
                >
                    Next Step
                </Button>
            </div>
        </div>
    );
};