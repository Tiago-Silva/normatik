import {NewFunction, Function} from "@/app/interface/Function";


export class FunctionService {
    private async request<T>(url: string, options: RequestInit): Promise<T> {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    }

    async createFunction(data: NewFunction) {
        return this.request('/api/function', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
        });
    }

    async updateFunction(func: Function) {
        return this.request(`/api/function/${func.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: func.name,
                code: func.code,
                cbo: func.cbo,
                description: func.description ?? undefined,
                status: func.status,
                createAt: func.createdAt ?? undefined,
                updateAt: func.updatedAt ?? undefined,
                editedBy: func.editedBy ?? undefined,
                companyId: func.companyId ?? undefined,
                company: func.company,
            })
        })
    }

    async getFunctionByCompanyIdAndStatus(companyId: number, status: boolean): Promise<Function[]> {
        return this.request(`/api/function/search?companyId=${companyId}&status=${status}`, { method: 'GET' });
    }

}