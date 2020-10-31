// Current model
export interface FormDetails {
    type: "lizenz";
    licenseId: number;
    isFullInvoice: boolean;
    invoiceId?: number;
}


// Choice Type model
interface License {
    readonly type: "License";
    licenseId: number;
}

interface LicenseFromInvoice {
    readonly type: "LicenseFromInvoice";
    licenseId: number;
    invoiceId: number;
}

interface FullInvoice {
    readonly type: "FullInvoice";
    invoiceId: number;
}

type FormDetails = License | LicenseFromInvoice | FullInvoice;


// Usage
function getNumber(formDetails: FormDetails): number {
   switch (formDetails.type) {
       case "License":
           return 0;
       case "LicenseFromInvoice":
           return 1;
       case "FullInvoice":
           return 2;
   }
}

function main() {
    const formDetails: License = {
        type: "License",
        licenseId: 3,
    };

    getNumber(formDetails);
}
