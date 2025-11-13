import { Injectable } from "@angular/core";

export interface EpaycoCheckout {
    name: string;
    description: string;
    invoice: string;
    currency: string;
    amount: number;
    tax_base: number;
    tax: number;
    country: string;
    lang: string;
    external: string;
    extra1?: string;
    extra2?: string;
    extra3?: string;
    response: string;
    confirmation: string;
    name_billing: string;
    address_billing: string;
    type_doc_billing: string;
    mobilephone_billing: string;
    number_doc_billing: string;
}

export interface EpaycoTaxCalculation {
    tax_base: number;
    tax: number;
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class EpaycoService {
    private P_KEY: string = '8ff4d88d051e0d27705171f20729dc34';
    private TEST_MODE: boolean = true;

    constructor() { }

    initializeCheckout(data: EpaycoCheckout): void {
        console.log('🔍 Verificando ePayco en window...');
        console.log('window.epayco:', (window as any).epayco);

        // ePayco a veces usa mayúscula
        const epayco = (window as any).epayco || (window as any).ePayco;

        if (!epayco) {
            console.error('❌ ePayco no está disponible. Asegúrate de que el script esté en index.html');
            alert('Error: El servicio de pago no está disponible. Por favor, recarga la página.');
            return;
        }

        if (!epayco.checkout) {
            console.error('❌ epayco.checkout no está disponible');
            console.log('Propiedades de epayco:', Object.keys(epayco));
            return;
        }

        this.openCheckout(data, epayco);
    }

    private openCheckout(data: EpaycoCheckout, epayco: any): void {
        console.log('✅ Abriendo checkout con P_KEY:', this.P_KEY);
        console.log('MODO TEST:', this.TEST_MODE);

        try {
            const handler = epayco.checkout.configure({
                key: this.P_KEY,
                test: this.TEST_MODE
            });

            handler.open(data);
            console.log('✅ Checkout abierto con datos:', data);
        } catch (error) {
            console.error('❌ Error al abrir el checkout de ePayco:', error);
        }
    }

    generateInvoiceNumber(): string {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 1000);
        return `FAC-${timestamp}-${randomNum}`;
    }

    calculateTax(subtotal: number): EpaycoTaxCalculation {
        const IVA = 0.19;
        const base = subtotal / (1 + IVA);
        const tax = subtotal - base;
        return {
            tax_base: Math.round(base * 100) / 100,
            tax: Math.round(tax * 100) / 100,
            total: subtotal
        };
    }

    isTestMode(): boolean {
        return this.TEST_MODE;
    }

    setTestMode(testMode: boolean): void {
        this.TEST_MODE = testMode;
        console.log('Modo de prueba de ePayco establecido en:', this.TEST_MODE);
    }
}