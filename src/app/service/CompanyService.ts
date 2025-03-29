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
                doctor: company.doctor,
                status: company.status,
                registrationType: company.registrationType,
                fantasyName: company.fantasyName,
                cnae: company.cnae,
                cep: company.cep,
                rule: company.rule,
                esocialGroup: company.esocialGroup,
                businessGroupId: company.businessGroupId,
            }),
        });
    }

    async deleteCompany(id: string) {
        return this.request(`/api/company/${id}`, { method: 'DELETE' });
    }

    async getCompaniesByBusinessGroupAndStatus(businessGroupId: number, status: boolean, companyName: string): Promise<Company[]> {
        return this.request(`/api/company/search?businessGroupId=${businessGroupId}&status=${status}&companyName=${companyName}`, { method: 'GET' });
    }
}