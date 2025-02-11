import { Company, NewCompany } from "@/app/interface/Company";

export class CompanyService {
    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    }

    async createCompany(data: NewCompany) {
        return this.request('/api/company', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    async getCompanyById(id: string) {
        return this.request(`/api/company/${id}`, { method: 'GET' });
    }

    async getAllCompanies(): Promise<Company[]> {
        return this.request('/api/company', { method: 'GET' });
    }

    async updateCompany(company: Company) {
        return this.request(`/api/company/${company.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: company.name,
                cnpj: company.cnpj,
                address: company.address,
                doctor: company.doctor,
                status: company.status,
            }),
        });
    }

    async deleteCompany(id: string) {
        return this.request(`/api/company/${id}`, { method: 'DELETE' });
    }
}