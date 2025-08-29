export type TTotalCooperativesResponse ={
    totalCooperatives: number;
}

export type TTotalMembersResponse ={
    totalMembers: number;
}

export type TTotalSharesResponse ={
    totalNumberOfShares: number;
}

export type TTotalShareAmountResponse ={
    totalShareAmount: number;
}

export type TMemberDistributionResponse ={
    totalMembers: number;
    male: {
        count: number;
        percentage: number;
    };
    female: {
        count: number;
        percentage: number;
    };
}

export type TRegistrationTrendResponse ={
    year: string;
    count: number;
}[]