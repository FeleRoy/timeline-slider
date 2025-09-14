export type timelineDate = {
    title: string,
    firstYear: number,
    lastYear: number,
    yearsDate: yearsDateInfo[]
}


export type yearsDateInfo = {
    year: number | string;
    text: string;
}